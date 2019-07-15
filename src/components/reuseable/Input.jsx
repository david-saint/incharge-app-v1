import React, { Component } from 'react';
import AppStyles from '@/config/styles';
import type { FieldProps } from 'redux-form';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
  contain: {
    width: '100%',
    position: 'relative',
  },
  input: {
    height: 45,
    padding: 12,
    fontSize: 12,
    color: AppStyles.colors.grey,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: AppStyles.colors.lightWhite,
    fontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
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

class Input extends Component<Props> {
  render() {
    const { input, label, meta: { touched, error } } = this.props;
    return (
      <View style={styles.contain}>
        <TextInput
          {...this.props}
          value={input.value}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          onChangeText={input.onChange}
          style={[styles.input, {
            borderColor: (touched && error) ? '#B00020' : '#EAEAEA',
          }]}
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

export default Input;
