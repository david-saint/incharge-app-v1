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

import { sectors, religions } from './data';

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

class MoreInformationForm extends Component<Props> {
  state = {
    isChristian: false,
  }

  _checkReligion = (e, value) => {
    this.setState({
      isChristian: value === 'CHRISTIANITY',
    });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  render() {
    const {
      color,
      error,
      onNext,
      levels,
      submitting,
      handleSubmit,
    } = this.props;
    const { isChristian } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.fieldControl}>
          <Field
            label="height"
            name={'height'}
            placeholder="Height (in cm)"
            component={Input}
            autoCapitalize="none"
            keyboardType="decimal-pad"
            />
        </View>
        <View style={styles.fieldControl}>
          <Field
            label="weight"
            name={'weight'}
            placeholder="Weight (in KG)"
            component={Input}
            autoCapitalize="none"
            keyboardType="numeric"
            />
        </View>
        <View style={styles.fieldControl}>
          <Field
            label="occupation"
            name={'occupation'}
            placeholder="Occupation"
            component={Input}
            autoCapitalize="words"
            />
        </View>
        <View style={styles.fieldControl}>
          <Field
            items={religions}
            label="religion"
            name={'religion'}
            component={Picker}
            onChange={this._checkReligion}
            placeholder={{ label: 'Religion' }}
            validate={[required()]}
            />
        </View>
        {
          isChristian && (
            <View style={styles.fieldControl}>
              <Field
                items={sectors}
                label="religion sector"
                name={'religion_sector'}
                placeholder={{ label: 'Religious Sector' }}
                component={Picker}
                validate={[required()]}
                />
            </View>
          )
        }
        <View style={styles.fieldControl}>
          <Field
            items={levels}
            label="education level"
            name={'education_level'}
            placeholder={{ label: 'Education Level' }}
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
              backgroundColor: color || AppStyles.colors.accentColor,
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
  form: 'profiling-more-info',
  onSubmitSuccess: (result, dispatch, props) => {
    props.onNextSuccess();
  },
})(MoreInformationForm);
