import React, { Component } from 'react';
import moment from 'moment';
import AppStyles from '@/config/styles';
import type { FieldProps } from 'redux-form';
import DatePicker from 'react-native-datepicker';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
  contain: {
    width: '100%',
    position: 'relative',
  },
  errors: {
    fontSize: 11,
    marginTop: 5,
    color: '#B00020',
    paddingHorizontal: 8,
    fontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
  },
});

type Props = {} & FieldProps;

class DatePickerDefault extends Component<Props> {
  render() {
    const {
      color,
      input,
      label,
      meta: { touched, error },
    } = this.props;
    const customStyles = {
      dateIcon: {
        position: 'absolute',
        left: 0,
        top: 4,
        marginLeft: 0,
      },
      dateTouchBody: {
        width: '100%',
      },
      dateInput: {
        height: 45,
        padding: 12,
        width: '100%',
        alignItems: 'flex-start',
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: AppStyles.colors.lightWhite,
        borderColor: (touched && error) ? '#B00020' : '#EAEAEA',
      },
      placeholderText: {
        fontSize: 12,
        color: AppStyles.colors.grey,
        fontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
      },
      dateText: {
        fontSize: 12,
        color: AppStyles.colors.grey,
        fontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
      },
      btnTextConfirm: { color },
    };

    return (
      <View style={styles.contain}>
        <DatePicker
          mode="date"
          showIcon={false}
          style={{ width: '100%' }}
          date={input.value}
          format="YYYY-MM-DD"
          minDate="1900-01-01"
          maxDate={moment().subtract(15, 'years').format('YYYY-MM-DD')}
          cancelBtnText="Cancel"
          confirmBtnText="Confirm"
          onOpenModal={input.onFocus}
          onCloseModal={input.onBlur}
          onDateChange={input.onChange}
          customStyles={{ ...customStyles }}
          {...this.props}
          />
        {
          touched && (
            error && <Text style={styles.errors}>{`The ${label} field ${error}`}</Text>
          )
        }
      </View>
    );
  }
}

export default DatePickerDefault;
