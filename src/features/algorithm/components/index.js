import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AppStyles from '@/config/styles';
import { SETTINGS } from '@/navigation/screens';
import Icon from 'react-native-vector-icons/Feather';
import { Calendar } from 'react-native-calendars';
import { getHumanPlan } from '@/features/algorithm/actions';
// import { WebView } from 'react-native-webview';
// import { BASE_API } from '@/api/constants';
import {
  Appbar,
  Button,
  Surface,
  Headline,
  Paragraph,
  Subheading,
  ActivityIndicator,
  Colors
} from 'react-native-paper';
import {
  View,
  StatusBar,
} from 'react-native';

import styles from './styles';
import AlgorithmWizard from './AlgorithmWizard';

export default class AlgorithmScreen extends Component {
  static navigationOptions = {
    title: 'Algorithm',
    headerBackTitle: null,
    activeTintColor: AppStyles.colors.primaryColor,
    tabBarIcon: ({ focused }) => {
      if (focused) {
        return <Icon name="layers" size={25} />;
      }
      return <Icon name="layers" size={20} color={AppStyles.colors.inactiveGreyColor} />;
    },
  }

  state = {
    started: false,
  }

  componentDidMount() {
    const { algorithm } = this.props;
    this.props.setPeriodCalculatorDetails({
      cycle_length: algorithm.cycle_length,
      period_length: algorithm.period_length,
      last_period_started_at: algorithm.last_period_started_at,
    });
    
    this.props.getAlgo(this.props.auth.name);
  }
  LoadingIndicatorView() {
    return <View style={[styles.indicatorCont, styles.indicatorHori]}><ActivityIndicator animating={true} color={Colors.red800} size="large"/></View>
  }
  _renderNewAlgorithmWizard = () => {
    if (this.state.started === false) {
      return (
        <View style={styles.newWizardContainer}>
          <Headline
            style={{
              width: '80%',
              marginVertical: 8,
              textAlign: 'center',
              fontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
            }}>
            Find out the best Contraceptive Plan for you!
          </Headline>
          <Button
            mode="text"
            icon="graphic-eq"
            onPress={() => this.setState({ started: true })}
            >
            Run Algorithm
          </Button>
        </View>
      );
    }
    return (
      <AlgorithmWizard
        auth={this.props.auth}
        algorithm={this.props.algorithm}
        profile={this.props.profile}
        onChangePlan={this.props.setPlan}
        onChangePeriod={this.props.setPeriodCalculatorDetails}/>
    );
  }

  _renderPillCalendar = () => (
    <View style={styles.mainContainer}>
      <View style={{ padding: 20 }}>
        <Subheading style={{
          textAlign: 'center',
          fontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
        }}>
          The Best Contraceptive Plan for you is the {' '}
          <Subheading
            style={{ fontFamily: AppStyles.fonts.SECOND_FONT_SEMIBOLD }}>
            {getHumanPlan(this.props.algorithm.plan)}
          </Subheading>
        </Subheading>
        <Button
            mode="text"
            icon="graphic-eq"
            onPress={() => this.setState({ started: true }, () => this.props.startAlgorithm())}
            >
            Run Algorithm Again
          </Button>
      </View>
      {
        this.props.profile.gender !== 'MALE' && this.props.algorithm.period_calendar && (
          <Surface
            style={{
              margin: 20,
              padding: 14,
              elevation: 1,
              width: '90%',
            }}>
                <Fragment>
                  <Calendar
                    style={{ width: '100%' }}
                    // Specify theme properties to override specific styles for calendar parts. Default = {}
                    theme={{
                      textDayFontSize: 12,
                      textMonthFontSize: 14,
                      textDayFontWeight: '400',
                      textDayHeaderFontSize: 14,
                      textMonthFontWeight: 'bold',
                      textDayHeaderFontWeight: '300',
                      selectedDayTextColor: '#ffffff',
                      textSectionTitleColor: '#b6c1cd',
                      arrowColor: AppStyles.colors.mateBlack,
                      todayTextColor: AppStyles.colors.primaryColor,
                      textDayFontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
                      textMonthFontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
                      selectedDayBackgroundColor: AppStyles.colors.accentColor,
                      textDayHeaderFontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
                    }}
                    // Collection of dates that have to be colored in a special way. Default = {}
                    markedDates={this.props.algorithm.marks}
                    // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
                    markingType={'period'}
                  />
                  <View style={styles.labels}>
                    <View style={styles.label}>
                      <View style={{
                        width: 8,
                        margin: 5,
                        height: 8,
                        borderRadius: 8,
                        backgroundColor: '#f4507c',
                      }} />
                      <Paragraph
                        style={{
                          fontSize: 11,
                        }}
                        theme={{
                          fonts: {
                            regular: AppStyles.fonts.SECOND_FONT_REGULAR,
                          },
                        }}>
                        Menstrual Period
                      </Paragraph>
                    </View>
                    <View style={styles.label}>
                      <View style={{
                        width: 8,
                        margin: 5,
                        height: 8,
                        borderRadius: 8,
                        backgroundColor: '#D8A7CB',
                      }} />
                      <Paragraph
                        style={{
                          fontSize: 11,
                        }}
                        theme={{
                          fonts: {
                            regular: AppStyles.fonts.SECOND_FONT_REGULAR,
                          },
                        }}>
                        Fertile Periods. This is when you're most likely to get pregnant.
                      </Paragraph>
                    </View>
                  </View>
                </Fragment>
          </Surface>
        )
      }
    </View>
  )

  render() {
    const { navigation, algorithm } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Appbar.Header
          dark={false}
          style={{ elevation: 5 }}
          theme={{
            colors: {
              primary: AppStyles.colors.white,
              text: AppStyles.colors.mateBlack,
            },
            fonts: {
              medium: AppStyles.fonts.FONT_SEMIBOLD,
              regular: AppStyles.fonts.FONT_REGULAR,
            },
          }}>
          <Appbar.Content
            title="Algorithm"
            titleStyle={{
              textAlign: 'center',
              color: AppStyles.colors.mateBlack,
              fontFamily: AppStyles.fonts.FONT_SEMIBOLD,
            }}
          />
          <Appbar.Action icon="more-vert" onPress={() => navigation.navigate(SETTINGS)} />
        </Appbar.Header>
        {
          algorithm.ran_algorithm_at === null
            ? this._renderNewAlgorithmWizard()
            : this._renderPillCalendar()
        }
      </View>
    );
  }
}

AlgorithmScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  setPlan: PropTypes.func.isRequired,
  getAlgo: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  algorithm: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  startAlgorithm: PropTypes.func.isRequired,
  setPeriodCalculatorDetails: PropTypes.func.isRequired,
};
