import React, { Component } from 'react';
import AppStyles from '@/config/styles';
import { Button } from 'react-native-paper';
import { TERMS_URL } from '@/api/constants';
import  type { FormProps } from 'redux-form';
import { Field, reduxForm } from 'redux-form';
import PaperInput from '@/components/reuseable/PaperInput';
import PaperSwitch from '@/components/reuseable/PaperSwitch';
import {
  Text,
  View,
  Linking,
  Platform,
  StyleSheet,
} from 'react-native';
import {
  email,
  length,
  required,
  acceptance,
  numericality,
} from 'redux-form-validators';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldControl: {
    width: '100%',
    marginVertical: 15,
  },
  actionButton: {
    height: 48,
    width: '100%',
    borderRadius: 10,
    marginBottom: 24,
  },
  actionButtonContent: {
    fontSize: 14,
    lineHeight: 26,
    color: AppStyles.colors.lightWhite,
    fontFamily: AppStyles.fonts.FONT_BOLD,
    paddingTop: Platform.OS === 'ios' ? 2 : 0,
  },
  actionText: {
    fontSize: 14,
    lineHeight: 25,
    color: '#303030',
    fontFamily: AppStyles.fonts.FONT_BOLD,
  },
  isCompact: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errors: {
    fontSize: 11,
    marginTop: 5,
    color: '#B00020',
    paddingHorizontal: 12,
    fontFamily: AppStyles.fonts.FONT_BOLD,
  },
});

type Props = {} & FormProps;

class RegisterForm extends Component<Props> {
  handleClick = () => {
    Linking.canOpenURL(TERMS_URL).then((supported) => {
      if (supported) {
        Linking.openURL(TERMS_URL);
      } else {
        console.log('Could not open the url.', TERMS_URL);
      }
    });
  };

  render() {
    const {
      error,
      onRegister,
      submitting,
      handleSubmit,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.fieldControl}>
          <Field
            mode="flat"
            label="Name"
            name={'name'}
            component={PaperInput}
            validate={[required(), length({ min: 2 })]}
            />
        </View>
        <View style={styles.fieldControl}>
          <Field
            mode="flat"
            label="Email"
            autoCapitalize="none"
            name={'email'}
            component={PaperInput}
            keyboardType="email-address"
            validate={[required(), email()]}
            />
        </View>
        <View style={styles.fieldControl}>
          <Field
            mode="flat"
            label="Phone"
            name={'phone'}
            component={PaperInput}
            keyboardType="phone-pad"
            validate={[required(), numericality({ int: true })]}
            />
        </View>
        <View style={styles.fieldControl}>
          <Field
            mode="flat"
            label="Password"
            name={'password'}
            secureTextEntry={true}
            component={PaperInput}
            validate={[required(), length({ min: 6 })]}
            />
        </View>
        <View style={[styles.fieldControl, styles.isCompact]}>
          <Text style={styles.actionText}>
            I accept the{' '}
            <Text
              onPress={this.handleClick}
              style={{ color: AppStyles.colors.primaryColor }}>
              Terms and Privacy Policy
            </Text>
          </Text>
          <Field
            name={'agreedTerms'}
            component={PaperSwitch}
            validate={[required(), acceptance()]}
            />
        </View>
        <Text style={styles.errors}>{error}</Text>
        <View style={styles.fieldControl}>
          <Button
            mode="contained"
            uppercase={false}
            loading={submitting}
            onPress={handleSubmit(onRegister)}
            style={styles.actionButton}
            accessibilityLabel="Sign up"
            disabled={submitting}
            contentStyle={styles.actionButtonContent}
            >
            {
              submitting || <Text style={styles.actionButtonContent}>Sign up</Text>
            }
          </Button>
        </View>
      </View>
    );
  }
}

export default reduxForm({ form: 'register' })(RegisterForm);
