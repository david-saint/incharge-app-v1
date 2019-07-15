import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppStyles from '@/config/styles';
import { Button } from 'react-native-paper';
import BackArrow from '@/components/BackArrow';
import { AUTHLOGIN } from '@/navigation/screens';
import { SafeAreaView, StackActions } from 'react-navigation';
import WaveSeperatorSVG from '@/components/svg/WaveSeperatorSVG';
import {
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import styles from './styles';

import RegisterForm from './RegisterForm';

export default class AuthenticationRegister extends Component {
  static navigationOptions = {
    headerTransparent: true,
    headerBackImage: <BackArrow />,
  }

  _onPressButton = () => {
    const replaceAction = StackActions.replace({
      routeName: AUTHLOGIN,
    });
    this.props.navigation.dispatch(replaceAction);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <WaveSeperatorSVG style={{ alignSelf: 'center' }} />
        </View>
        <View style={styles.contain}>
          <KeyboardAvoidingView
            style={styles.formContainer}
            contentContainerStyle={styles.formContainer}
            behavior={Platform.OS === 'ios' ? 'position' : ''}>
            <View style={styles.formContainer}>
              <RegisterForm onRegister={this.props.register} />
            </View>
          </KeyboardAvoidingView>
          <View style={styles.footerContainer}>
            <Text style={styles.footer}>Already registered?</Text>
            <Button
              compact
              type="text"
              uppercase={false}
              onPress={this._onPressButton}
              contentStyle={{
                fontSize: 14,
                lineHeight: 14,
                fontFamily: AppStyles.fonts.FONT_SEMIBOLD,
              }}>
              <Text style={[styles.footer, { color: AppStyles.colors.primaryColor }]}>Log in</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

AuthenticationRegister.propTypes = {
  navigation: PropTypes.object,
  register: PropTypes.func.isRequired,
};
