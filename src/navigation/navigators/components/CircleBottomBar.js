import React from 'react';
import AppStyles from '@/config/styles';
import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 10,
    marginTop: 10,
    fontFamily: AppStyles.fonts.SECOND_FONT_SEMIBOLD,
  },
});

const withCustomStyle = OverwriteProps => Component => props => (
  <Component
    {...props}
    {...OverwriteProps}
    activeTintColor={AppStyles.colors.primaryColor}
    inactiveTintColor={AppStyles.colors.inactiveGreyColor}
    labelStyle={styles.labelStyle} />
);


export {
  withCustomStyle,
};
