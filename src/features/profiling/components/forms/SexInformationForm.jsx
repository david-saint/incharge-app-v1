import React, { Component } from 'react';
import AppStyles from '@/config/styles';
import { Button } from 'react-native-paper';
import  type { FormProps } from 'redux-form';
import { Field, reduxForm } from 'redux-form';
import Input from '@/components/reuseable/Input';
import Picker from '@/components/reuseable/Picker';
import {
  Text,
  View,
  Platform,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import {
  required,
} from 'redux-form-validators';

import { boolean, maritalStatus } from './data';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldControl: {
    width: '100%',
    marginVertical: 15,
  },
  actionButton: {
    height: 40,
    fontSize: 12,
    width: '100%',
    lineHeight: 40,
    borderRadius: 0,
    marginBottom: 24,
    fontFamily: AppStyles.fonts.SECOND_FONT_BOLD,
  },
  actionButtonContent: {
    fontSize: 12,
    lineHeight: 20,
    color: AppStyles.colors.lightWhite,
    fontFamily: AppStyles.fonts.SECOND_FONT_BOLD,
    paddingTop: Platform.OS === 'ios' ? 2 : 0,
  },
  actionText: {
    fontSize: 12,
    lineHeight: 25,
    color: AppStyles.colors.grey,
    fontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
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

class SexInformationForm extends Component<Props> {
  state = {
    isSexuallyActive: false,
  }

  _checkSexualActivity = (e, value) => {
    this.setState({
      isSexuallyActive: value === true,
    });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  render() {
    const {
      color,
      error,
      onNext,
      reasons,
      profile: { submitting },
      handleSubmit,
    } = this.props;
    const { isSexuallyActive } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.fieldControl}>
          <Field
            items={maritalStatus}
            label="marital status"
            name={'marital_status'}
            component={Picker}
            placeholder={{ label: 'Marital Status' }}
            validate={[required()]}
            />
        </View>
        <View style={styles.fieldControl}>
          <Field
            label="number of children"
            name={'children'}
            component={Input}
            autoCapitalize="none"
            keyboardType="number-pad"
            placeholder="Number of Children"
            />
        </View>
        <View style={styles.fieldControl}>
          <Field
            items={boolean}
            label="sexually active"
            name={'sexually_active'}
            placeholder={{ label: 'Are you sexually active?' }}
            component={Picker}
            validate={[required()]}
            onChange={this._checkSexualActivity}
            />
        </View>
        {
          isSexuallyActive && (
            <View style={styles.fieldControl}>
              <Field
                items={boolean}
                label="pregnancy status"
                name={'pregnant'}
                placeholder={{ label: 'Are you currently pregnant?' }}
                component={Picker}
                validate={[required()]}
                />
            </View>
          )
        }
        <View style={styles.fieldControl}>
          <Field
            items={reasons}
            label="reason"
            name={'reason'}
            placeholder={{ label: 'Reason for Contraception' }}
            component={Picker}
            validate={[required()]}
            />
        </View>
        <Text style={styles.errors}>{error}</Text>
        <View style={styles.fieldControl}>
          <Button
            mode="contained"
            uppercase={true}
            loading={submitting}
            onPress={handleSubmit(onNext)}
            style={[styles.actionButton, {
              backgroundColor: submitting ? AppStyles.colors.lightGrey : color || AppStyles.colors.secondAccentColor,
            }]}
            accessibilityLabel="Done"
            font={AppStyles.fonts.SECOND_FONT_SEMIBOLD}
            disabled={submitting}
            contentStyle={styles.actionButtonContent}>
            {
              submitting || <Text style={styles.actionButtonContent}>DONE</Text>
            }
          </Button>
        </View>
      </View>
    );
  }
}

export default reduxForm({
  form: 'profiling-sex-info',
  onSubmitSuccess: (result, dispatch, props) => {
    props.onNextSuccess(props.profile, props.token);
  },
})(SexInformationForm);
