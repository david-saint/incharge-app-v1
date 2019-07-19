import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import AppStyles from '@/config/styles';
import { SETTINGS } from '@/navigation/screens';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/Feather';
import NotificationService from '@/features/notifications/service';
import {
  Title,
  Button,
  Appbar,
  Headline,
} from 'react-native-paper';
import {
  View,
  Text,
  Alert,
  StatusBar,
} from 'react-native';

import styles from './styles';
import { datepickerStyles } from '@/features/algorithm/components/styles';

export default class PillScreen extends Component {
  static navigationOptions = {
    title: 'Pill Reminder',
    headerBackTitle: null,
    activeTintColor: AppStyles.colors.primaryColor,
    tabBarIcon: ({ focused }) => {
      if (focused) {
        return <Icon name="clock" size={25} />;
      }
      return <Icon name="clock" size={20} color={AppStyles.colors.inactiveGreyColor} />;
    },
  }

  state = {
    updating: false,
    time: moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
  }

  constructor(props) {
    super(props);
    this.notification = new NotificationService(this.onRegister, this.onNotification);
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

  _renderCreateReminder = () => (
    <View style={styles.newWizardContainer}>
      <Headline
        style={{
          width: '90%',
          marginVertical: 8,
          textAlign: 'center',
          fontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
        }}>
        You have not started any pills. {'\n'}
        <Title
          style={{
            textAlign: 'center',
            fontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
          }}>
          Start one now to get daily reminders.
        </Title>
      </Headline>
      <Button
        mode="text"
        icon="blur-on"
        onPress={() => this.props.startPillReminder()}>
        Start Pill Reminder
      </Button>
    </View>
  )

  _renderReminder = () => {
    const { reminder } = this.props;
    const data = moment(reminder.next_reminder_time).format('hh:mm a');
    const date = moment(reminder.next_reminder_time).format('dddd, D MMM YYYY');
    const d = data.split(':');
    const hour = d[0];
    const minute = d[1].split(' ')[0];
    const a = d[1].split(' ')[1];
    return (
      <View style={styles.mainContainer}>
        <View style={styles.alarmContainer}>
          <Text style={styles.alarmInfo}>Next reminder is scheduled for</Text>
          <Text style={styles.alarmTime}>
            <Text style={styles.alarmTimeHour}>{hour}</Text>
            :
            <Text style={styles.alarmTimeMinute}>{minute}</Text>
            <Text style={styles.alarmTimeLabel}>{a}</Text>
          </Text>
          <Text style={styles.alarmDate}>{date}</Text>
        </View>
        <View>
          <Button
            mode="text"
            icon="blur-linear"
            onPress={() => this.setState({ updating: !this.state.updating }) }>
            Update reminder time
          </Button>
          <View style={{ marginVertical: 2 }} />
          {
            this.state.updating && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <DatePicker
                  mode="time"
                  showIcon={false}
                  cancelBtnText="Cancel"
                  style={{ width: 150 }}
                  date={this.state.time}
                  format="YYYY-MM-DD HH:mm:ss"
                  confirmBtnText="Confirm"
                  customStyles={{ ...datepickerStyles }}
                  onDateChange={time => this.setState({ time })} />
                  <Button
                    mode="text"
                    onPress={() => {
                      if (this.state.time !== '') {
                        this.props.updateReminderTime(this.state.time);
                      }
                      this.setState({ updating: false });
                    }}>
                    Done
                  </Button>
              </View>
            )
          }
          <View style={{ marginVertical: 2 }} />
          <Button
            mode="text"
            icon="blur-off"
            onPress={() => this.props.cancelPillReminder()}>
            Cancel the reminder
          </Button>
        </View>
      </View>
    );
  }

  render() {
    const { navigation, reminder } = this.props;
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
            title="Pill Reminder"
            titleStyle={{
              textAlign: 'center',
              color: AppStyles.colors.mateBlack,
              fontFamily: AppStyles.fonts.FONT_SEMIBOLD,
            }}
          />
          <Appbar.Action icon="more-vert" onPress={() => navigation.navigate(SETTINGS)} />
        </Appbar.Header>
        {
          reminder.set_at
            ? this._renderReminder()
            : this._renderCreateReminder()
        }
      </View>
    );
  }
}

PillScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  reminder: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  startPillReminder: PropTypes.func.isRequired,
  updateReminderTime: PropTypes.func.isRequired,
  cancelPillReminder: PropTypes.func.isRequired,
};
