import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import { setToken } from '@/api/http';
import AppStyles from '@/config/styles';
import AppMetrics from '@/config/metrics';
import { SafeAreaView } from 'react-navigation';
import { GOOGLE_MAPS_APIKEY } from '@/api/constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import { getClinicsAPI, DEFAULT_PAGINATION } from '@/api/clinics';
import NotificationService from '@/features/notifications/service';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {
  Menu,
  Button,
  Surface,
  Searchbar,
} from 'react-native-paper';
import MapView, {
  Marker,
  Callout,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  Platform,
  TextInput,
  StatusBar,
} from 'react-native';

import styles from './styles';
import mapStyle from './map.json';
import ClinicCallout from './ClinicCallout.jsx';

export default class Index extends Component {
  static navigationOptions = {
    title: 'Clinics',
    activeTintColor: AppStyles.colors.primaryColor,
    tabBarIcon: ({ focused }) => {
      if (focused) {
        return <Icon name="location-arrow" size={25} />;
      }
      return <Icon name="location-arrow" size={20} color={AppStyles.colors.inactiveGreyColor} />;
    },
  }

  state = {
    page: 1,
    query: '',
    mode: 'km',
    radius: '15',
    clinics: [],
    position: null,
    origin: undefined,
    menuVisible: false,
    paginationData: {},
    sort: 'distance|ASC',
    currentPosition: {},
    previousPosition: {},
    perPageVisible: false,
    filtersVisible: false,
    destination: undefined,
    perPage: DEFAULT_PAGINATION,
  }

  marker = {}

  constructor(props) {
    super(props);
    this.notification = NotificationService.configure(this.onRegister, this.onNotification);
  }

  onRegister = () => console.log('notifications registered')

  onNotification = ({ foreground, userInteraction }) => {
    if (foreground || userInteraction) {
      Alert.alert(
        'Pill Reminder',
        'Have you taken your pills yet?',
        [
          {
            text: 'No',
            onPress: () => {
              this.props.updateReminderTime(
                moment(this.props.reminder.next_reminder_time).add(30, 'minutes').format(),
              );
            },
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              this.props.updateReminderTime(
                moment(this.props.reminder.next_reminder_time).add(1, 'day').format(),
              );
            },
          },
        ],
      );
    } else {
      this.props.updateReminderTime(
        moment(this.props.reminder.next_reminder_time).add(30, 'minutes').format(),
      );
    }
  }

  componentDidMount() {
    // Get the user's current location
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          position,
          currentPosition: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          previousPosition: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
        this._getClinics();
      },
      (error) => {
        if (Platform.OS === 'android') {
          RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 1000,
            fastInterval: 500,
          })
            .then((data) => {
              if (data === 'already-enabled') {
                Alert.alert('Error', JSON.stringify(error));
              }
            }).catch((err) => {
              Alert.alert('Error', JSON.stringify(error));
            });
        }
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    // Set the bearer token just in case
    const { auth: { token } } = this.props;
    setToken(token);
    // Add Listener. to update list often
    this.routeDidFocus = this.props.navigation.addListener(
      'didFocus',
      this._getClinics,
    );
  }

  componentWillUnmount() {
    this.routeDidFocus.remove();
  }

  _getClinics = () => {
    const {
      sort,
      page,
      mode,
      query,
      radius,
      perPage,
      position: { coords },
    } = this.state;

    const params = {
      sort,
      page,
      mode,
      radius,
      search: query,
      with: 'location',
      per_page: perPage,
    };

    if (query.length < 3) {
      params.latitude = coords.latitude;
      params.longitude = coords.longitude;
    }

    getClinicsAPI(params)
      .then(({ data }) => this.setState({ clinics: data }))
      .catch(response => Alert.alert('Network Error', response));
  }

  _search = _.debounce(() => this._getClinics(), 500);

  _handleSearch = (query) => {
    this.setState({ query });
    this._search();
  }

  _renderClinicItem = ({ item }) => (
    <Surface style={styles.listItem}>
      <View style={styles.majorTextContain}>
        <View style={styles.majorText}>
          <Text style={styles.majorTextTop}>
            {item.actual_distance}
          </Text>
          <Text style={styles.majorTextBottom}>
            {
              item.mode === 'km'
                ? 'KILOMETERS'
                : 'MILES'
            }
          </Text>
        </View>
        <Image
          source={require('@/assets/images/tripline.png')}
          style={styles.dividerImage}
          resizeMode="contain" />
      </View>
      <View style={styles.minorTextContain}>
        <Text style={styles.minorTextTitle}>
          {
            item.name > 28
              ? `${((item.name).substring(0, 28))}...`
              : item.name
          }
        </Text>
        <Text style={styles.minorTextAddress}>
          {
            item.address > 22
              ? `${((item.address).substring(0, 22))}...`
              : item.address
          }
        </Text>
        <Button
          type="text"
          icon="directions"
          onPress={() => this._getDirection(item.latitude, item.longitude)}>
            <Text style={styles.minorTextButton}>DIRECTIONS</Text>
        </Button>
      </View>
    </Surface>
  )

  getRotation = (prevPos, curPos) => {
    if (!prevPos) {
      return 0;
    }
    const xDiff = curPos.latitude - prevPos.latitude;
    const yDiff = curPos.longitude - prevPos.longitude;
    return (Math.atan2(yDiff, xDiff) * 180.0) / Math.PI;
  }

  updateMap = () => {
    const { currentPosition, previousPosition } = this.state;
    const curRot = this.getRotation(previousPosition, currentPosition);
    this.map.animateCamera({ heading: curRot, center: currentPosition });
  }

  changePosition = (latitude, longitude) => {
    this.setState({
      previousPosition: this.state.currentPosition,
      currentPosition: { latitude, longitude },
    });
    this.updateMap();
  }

  _onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const c = viewableItems[0].item;
      this.changePosition(parseFloat(c.latitude), parseFloat(c.longitude));
      this.marker[c.id].showCallout();
    }
  }

  _getDirection = (latitude, longitude) => {
    const { position } = this.state;
    const origin = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    const destination = { latitude, longitude };
    this.setState({ origin, destination });
  }

  render() {
    const {
      query,
      origin,
      clinics,
      position,
      destination,
      filtersVisible,
      currentPosition,
    } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        {
          position && position.coords && (
            <MapView
              style={styles.map}
              customMapStyle={mapStyle}
              provider={PROVIDER_GOOGLE}
              ref={(ref) => { this.map = ref; }}
              initialRegion={{
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude,
                latitudeDelta: 0.0422,
                longitudeDelta: 0.0422 * AppMetrics.aspectRatio,
              }}
            >
              <Marker
                key={0}
                title="You"
                coordinate={{
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                }}
                image={require('@/assets/images/marker-2.5.png')}/>
              {
                clinics && clinics.map(clinic => (
                  <Marker
                    key={clinic.id}
                    title={clinic.name}
                    pinColor={AppStyles.colors.primaryDark}
                    coordinate={{
                      latitude: parseFloat(clinic.latitude),
                      longitude: parseFloat(clinic.longitude),
                    }}
                    ref={(ref) => { this.marker[clinic.id] = ref; }}>
                      <Callout tooltip={true}>
                        <ClinicCallout clinic={clinic} />
                      </Callout>
                    </Marker>
                ))
              }
              {
                origin && destination && (
                  <MapViewDirections
                    origin={origin}
                    strokeWidth={2}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeColor={AppStyles.colors.primaryColor} />
                )
              }
            </MapView>
          )
        }
        <SafeAreaView style={styles.content}>
          <View>
            <Searchbar
              value={query}
              placeholder="Search"
              style={styles.searchBox}
              inputStyle={styles.searchInput}
              onChangeText={this._handleSearch}
              icon={filtersVisible ? 'filter-list' : 'search'}
              onIconPress={() => this.setState({ filtersVisible: !filtersVisible })}
            />
            {
              filtersVisible && (
                <Surface style={styles.filterContainer}>
                  <View style={styles.filterRow}>
                    <Text style={styles.filterLabel}>Search Radius</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <TextInput
                        value={this.state.radius}
                        keyboardType="number-pad"
                        style={styles.filterInput}
                        onChangeText={text => this.setState({ radius: text })}
                        />
                      <Menu
                        visible={this.state.menuVisible}
                        onDismiss={() => this.setState({ menuVisible: false })}
                        anchor={
                          <Button
                            type="text"
                            onPress={() => this.setState({ menuVisible: true })}>
                            {this.state.mode === 'km' ? 'KILOMETERS' : 'MILES'}
                          </Button>
                        }
                      >
                        <Menu.Item onPress={() => this.setState({ mode: 'mi' })} title="MILES" />
                        <Menu.Item onPress={() => this.setState({ mode: 'km' })} title="KILOMETERS" />
                      </Menu>
                    </View>
                  </View>

                  <View style={styles.filterRow}>
                    <Text style={styles.filterLabel}>Number of Results</Text>
                    <Menu
                        visible={this.state.perPageVisible}
                        onDismiss={() => this.setState({ perPageVisible: false })}
                        anchor={
                          <Button
                            type="text"
                            onPress={() => this.setState({ perPageVisible: true })}>
                            {this.state.perPage}
                          </Button>
                        }
                      >
                        <Menu.Item onPress={() => this.setState({ perPage: 5 })} title="5" />
                        <Menu.Item onPress={() => this.setState({ perPage: 10 })} title="10" />
                        <Menu.Item onPress={() => this.setState({ perPage: 20 })} title="20" />
                        <Menu.Item onPress={() => this.setState({ perPage: 50 })} title="50" />
                        <Menu.Item onPress={() => this.setState({ perPage: 100 })} title="100" />
                        <Menu.Item onPress={() => this.setState({ perPage: 200 })} title="200" />
                      </Menu>
                  </View>
                </Surface>
              )
            }
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={clinics}
              horizontal={true}
              decelerationRate="fast"
              snapToAlignment="center"
              keyExtractor={item => item.id.toString() }
              showsHorizontalScrollIndicator={false}
              snapToInterval={AppMetrics.width - 70}
              ref={(ref) => { this.clinicList = ref; }}
              renderItem={item => this._renderClinicItem(item)}
              onViewableItemsChanged={this._onViewableItemsChanged}
              viewabilityConfig={{ itemVisiblePercentThreshold: 90 }} />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

Index.propTypes = {
  auth: PropTypes.object.isRequired,
  reminder: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  updateReminderTime: PropTypes.func.isRequired,
};
