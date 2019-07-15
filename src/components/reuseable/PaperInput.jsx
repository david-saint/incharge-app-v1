import React, { Component } from 'react';
import AppStyles from '@/config/styles';
import type { FieldProps } from 'redux-form';
import { TextInput } from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  textinput: {
    fontSize: 14,
    lineHeight: 14,
    backgroundColor: AppStyles.colors.white,
    fontFamily: AppStyles.fonts.FONT_SEMIBOLD,
  },
  errors: {
    fontSize: 11,
    marginTop: 5,
    color: '#B00020',
    paddingHorizontal: 12,
    fontFamily: AppStyles.fonts.FONT_BOLD,
  },
});

type Props = {} & FieldProps;

class PaperInput extends Component<Props> {
  render() {
    const { input, label, meta: { touched, error } } = this.props;
    return (
      <View>
        <TextInput
          {...this.props}
          value={input.value}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          style={styles.textinput}
          error={touched && error}
          onChangeText={input.onChange}
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

export default PaperInput;
