import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppStyles from '@/config/styles';
import { PROFILING } from '@/navigation/screens';
import { Switch } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import BackArrow from '@/components/svg/BackArrowSVG';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import LogoutSVG from '@/components/svg/LogoutSVG';

export default class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Settings',
    headerTransparent: true,
    headerBackImage: <BackArrow />,
    headerTitleStyle: {
      fontSize: 18,
      lineHeight: 23,
      fontWeight: '600',
      color: AppStyles.colors.black,
    },
    headerStyle: {
      marginVertical: 15,
      marginHorizontal: 30,
    },
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.state.params.logout()}>
        <LogoutSVG />
      </TouchableOpacity>
    ),
  })

  state = {
    isLocationEnabled: true,
    isNotificationEnabled: true,
  }

  componentDidMount() {
    this.props.navigation.setParams({
      logout: this.props.logout,
    });
  }

  render() {
    const { isLocationEnabled, isNotificationEnabled } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={AppStyles.colors.white} barStyle="dark-content" />
        <ScrollView
          style={styles.contained}
          scrollEventThrottle={1}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}>

          <View style={styles.card}>
            <Text style={styles.title}>Notification</Text>
            <View style={styles.actions}>
              <Text style={styles.actionText}>Allow Notification</Text>
              <Switch
                disabled={true}
                value={isNotificationEnabled}
                color={AppStyles.colors.primaryColor}
                onValueChange={() => {
                  this.setState({ isNotificationEnabled: !isNotificationEnabled });
                }} />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Security and Location</Text>
            <View style={styles.actions}>
              <Text style={styles.actionText}>Automatic Location</Text>
              <Switch
                disabled={true}
                value={isLocationEnabled}
                color={AppStyles.colors.primaryColor}
                onValueChange={() => {
                  this.setState({ isLocationEnabled: !isLocationEnabled });
                }} />
            </View>
          </View>

          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(PROFILING)}>
              <Text style={[styles.title, { color: AppStyles.colors.primaryColor }]}>
                Change Profile Information
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Protection and Privacy</Text>
            <View style={styles.actions}>
              <Text style={styles.actionText}>
                Help protect your website and its users {'\n'}
                with clear and fair website terms and {'\n'}
                conditions. These terms and conditions {'\n'}
                for a website set out key issues such as acceptable use,
                privacy, cookies, registration and passwords, intellectual property, {'\n'}
                links to other sites, termination and disclaimers of responsibility.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

SettingsScreen.propTypes = {
  logout: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};
