import React, { Component } from 'react';
import AppStyles from '@/config/styles';
import { Button } from 'react-native-paper';
import  type { FormProps } from 'redux-form';
import { Field, reduxForm } from 'redux-form';
import PaperInput from '@/components/reuseable/PaperInput';
import {
  Text,
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import {
  email,
  length,
  required,
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

class LoginForm extends Component<Props> {
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
            label="Password"
            name={'password'}
            secureTextEntry={true}
            component={PaperInput}
            validate={[required(), length({ min: 6 })]}
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
            accessibilityLabel="Sign ip"
            disabled={submitting}
            contentStyle={styles.actionButtonContent}>
            {
              submitting || <Text style={styles.actionButtonContent}>Sign in</Text>
            }
          </Button>
        </View>
      </View>
    );
  }
}

export default reduxForm({ form: 'login' })(LoginForm);
