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
    fontFamily: AppStyles.fonts.SECOND_FONT_SEMIBOLD,
  },
  errors: {
    fontSize: 11,
    marginTop: 5,
    color: '#B00020',
    paddingHorizontal: 12,
    fontFamily: AppStyles.fonts.SECOND_FONT_BOLD,
  },
});

type Props = {} & FieldProps;

class PaperInputTwo extends Component<Props> {
  state = {
    value: this.props.value || '',
  }

  _textChanged = (text, ...args) => {
    this.setState({
      value: text,
    });
    this.props.input.onChange(text, ...args);
  }

  render() {
    const { input, label, meta: { touched, error } } = this.props;
    return (
      <View>
        <TextInput
          {...this.props}
          value={this.state.value}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          style={styles.textinput}
          error={touched && error}
          onChangeText={this._textChanged}
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

export default PaperInputTwo;
