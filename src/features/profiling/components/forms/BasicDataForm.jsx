import React, { Component } from 'react';
import AppStyles from '@/config/styles';
import { Button } from 'react-native-paper';
import  type { FormProps } from 'redux-form';
import { Field, reduxForm } from 'redux-form';
import Input from '@/components/reuseable/Input';
import Picker from '@/components/reuseable/Picker';
import DatePicker from '@/components/reuseable/DatePicker';
import {
  Text,
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import {
  required,
} from 'redux-form-validators';

import { genders } from './data';

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

class BasicDataForm extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      date: '2016-05-15',
    };
  }

  render() {
    const {
      color,
      error,
      onNext,
      submitting,
      handleSubmit,
    } = this.props;
    console.log(genders);
    return (
      
      <View style={styles.container}>
        <View style={styles.fieldControl}>
          <Field
            label="age"
            name={'age'}
            dense={false}
            placeholder="Age"
            component={Input}
            autoCapitalize="none"
            keyboardType="number-pad"
            validate={[]}
            />
        </View>
        <View style={styles.fieldControl}>
          <Field
            label="date_of_birth"
            name={'date_of_birth'}
            placeholder="Date Of Birth"
            component={DatePicker}
            color={AppStyles.colors.primaryColor}
            validate={[]}
          />
        </View>
        <View style={styles.fieldControl}>
          <Field
            label="address"
            name={'address'}
            placeholder="Address"
            component={Input}
            autoCapitalize="words"
            validate={[]}
            />
        </View>
        <View style={styles.fieldControl}>
          <Field
            items={genders}
            label="gender"
            name={'gender'}
            placeholder={{ label: 'Gender' }}
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
              backgroundColor: color || AppStyles.colors.primaryColor,
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
  form: 'profiling-basic-data',
  onSubmitSuccess: (result, dispatch, props) => {
    props.onNextSuccess();
  },
})(BasicDataForm);
