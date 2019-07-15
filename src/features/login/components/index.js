import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppStyles from '@/config/styles';
import { Button } from 'react-native-paper';
import BackArrow from '@/components/BackArrow';
import { AUTHREGISTER, AUTHPASSWORD } from '@/navigation/screens';
import { SafeAreaView, StackActions } from 'react-navigation';
import WaveSeperatorSVG from '@/components/svg/WaveSeperatorSVG';
import {
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import styles from './styles';

import LoginForm from './LoginForm';

export default class AuthenticationLogin extends Component {
  static navigationOptions = {
    headerTransparent: true,
    headerBackImage: <BackArrow />,
  }

  _onPressButton = (to) => {
    const replaceAction = StackActions.replace({
      routeName: to,
    });
    this.props.navigation.dispatch(replaceAction);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <WaveSeperatorSVG style={{ alignSelf: 'center' }} />
        </View>
        <View style={styles.contain}>
          <KeyboardAvoidingView
            style={styles.formContainer}
            contentContainerStyle={styles.formContainer}
            behavior={Platform.OS === 'ios' ? 'position' : ''}>
            <View style={styles.formContainer}>
              <LoginForm onRegister={this.props.login} />
              <View style={{ width: '100%' }}>
                <Text
                  onPress={() => this._onPressButton(AUTHPASSWORD)}
                  style={[styles.actionText, { textAlign: 'center', color: '#BDBDBD' }]}>
                  Forgotten your password?
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.footerContainer}>
            <Text style={styles.footer}>Haven't registered yet?</Text>
            <Button
              compact
              type="text"
              uppercase={false}
              onPress={() => this._onPressButton(AUTHREGISTER)}
              contentStyle={{
                fontSize: 14,
                lineHeight: 14,
                fontFamily: AppStyles.fonts.FONT_SEMIBOLD,
              }}>
              <Text style={[styles.footer, { color: AppStyles.colors.primaryColor }]}>
                Join now.
              </Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

AuthenticationLogin.propTypes = {
  navigation: PropTypes.object,
  login: PropTypes.func.isRequired,
};
