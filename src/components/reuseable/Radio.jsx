import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppStyles from '@/config/styles';
import type { FieldProps } from 'redux-form';
import {
  View,
  Text,
  PickerIOS,
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

class PickerDefault extends Component<Props> {
  render() {
    const {
      input, items, label, meta: { touched, error },
    } = this.props;
    return (
      <View style={styles.contain}>
        <PickerIOS
          {...this.props}
          selectedValue={input.value}
          onValueChange={input.onChange}>
          {
            items.map(c => (
              <PickerIOS.Item label={c.label} key={c.key} value={c.value} />
            ))
          }
        </PickerIOS>
        {
          touched && (
            error && <Text style={styles.errors}>{`The ${label} field ${error}`}</Text>
          )
        }
      </View>
    );
  }
}

PickerDefault.propTypes = {
  items: PropTypes.array.isRequired,
};

export default PickerDefault;
