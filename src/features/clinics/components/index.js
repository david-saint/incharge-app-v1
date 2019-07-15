import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setToken } from '@/api/http';
import AppStyles from '@/config/styles';
import AppMetrics from '@/config/metrics';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Geolocation from '@react-native-community/geolocation';
import { getClinicsAPI, DEFAULT_PAGINATION } from '@/api/clinics';
import MapView, {
  Marker,
  Callout,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {
  View,
  Alert,
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
    radius: 15,
    clinics: [],
    position: null,
    paginationData: {},
    sort: 'distance|ASC',
  }

  componentDidMount() {
    // Get the user's current location
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({ position });
        this._getClinics();
      },
      error => Alert.alert('Error', JSON.stringify(error)),
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
      position: { coords },
    } = this.state;

    const params = {
      sort,
      page,
      mode,
      radius,
      search: query,
      with: 'location',
      latitude: coords.latitude,
      longitude: coords.longitude,
      per_page: DEFAULT_PAGINATION,
    };

    getClinicsAPI(params)
      .then(({ data }) => this.setState({ clinics: data }))
      .catch(response => Alert.alert('Network Error', response));
  }

  render() {
    const { query, position, clinics } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        {
          position && (
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0222,
                longitudeDelta: 0.0222 * AppMetrics.aspectRatio,
              }}
              customMapStyle={mapStyle}
            >
              <Marker
                key={0}
                title="You"
                coordinate={{
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                }} />
              {
                clinics && clinics.map(clinic => (
                  <Marker
                    key={clinic.id}
                    title={clinic.name}
                    coordinate={{
                      latitude: clinic.latitude,
                      longitude: clinic.longitude,
                    }}
                    image={require('@/assets/images/marker-2.5.png')}>
                      <Callout tooltip={true}>
                        <ClinicCallout clinic={clinic} />
                      </Callout>
                    </Marker>
                ))
              }
            </MapView>
          )
        }
        <SafeAreaView style={styles.content}>
          <Searchbar
            value={query}
            placeholder="Search"
            style={styles.searchBox}
            inputStyle={styles.searchInput}
            onChangeText={q => this.setState({ query: q })}
          />
        </SafeAreaView>
      </View>
    );
  }
}

Index.propTypes = {
  auth: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
