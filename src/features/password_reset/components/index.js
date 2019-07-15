import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackArrow from '@/components/BackArrow';
import { AUTHREGISTER } from '@/navigation/screens';
import { SafeAreaView, StackActions } from 'react-navigation';
import WaveSeperatorSVG from '@/components/svg/WaveSeperatorSVG';
import {
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import styles from './styles';

import PasswordResetForm from './PasswordResetForm';

export default class AuthenticationPasswordReset extends Component {
  static navigationOptions = {
    headerBackTitle: null,
    headerTransparent: true,
    headerBackImage: <BackArrow />,
  }

  _onPressButton = () => {
    const replaceAction = StackActions.replace({
      routeName: AUTHREGISTER,
    });
    this.props.navigation.dispatch(replaceAction);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Reset Your Password</Text>
          <WaveSeperatorSVG style={{ alignSelf: 'center' }} />
        </View>
        <View style={styles.contain}>
          <KeyboardAvoidingView
            style={styles.formContainer}
            contentContainerStyle={styles.formContainer}
            behavior={Platform.OS === 'ios' ? 'position' : ''}>
            <View style={styles.formContainer}>
              <PasswordResetForm onRegister={this.props.passwordReset} />
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    );
  }
}

AuthenticationPasswordReset.propTypes = {
  navigation: PropTypes.object,
  passwordReset: PropTypes.func.isRequired,
};
