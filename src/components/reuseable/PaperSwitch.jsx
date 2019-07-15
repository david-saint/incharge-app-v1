import React, { Component } from 'react';
import AppStyles from '@/config/styles';
import { Switch } from 'react-native-paper';
import type { FieldProps } from 'redux-form';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  errors: {
    fontSize: 11,
    marginTop: 5,
    color: '#B00020',
    paddingHorizontal: 12,
    fontFamily: AppStyles.fonts.FONT_BOLD,
  },
});

type Props = {} & FieldProps;

class PaperSwitch extends Component<Props> {
  render() {
    const { input, label, meta: { touched, error } } = this.props;
    return (
      <View>
        <Switch
          {...this.props}
          value={input.value}
          onValueChange={input.onChange}
          color={AppStyles.colors.primaryColor}
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

export default PaperSwitch;
