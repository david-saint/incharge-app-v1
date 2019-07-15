import React from 'react';
import PropTypes from 'prop-types';
import AppStyles from '@/config/styles';
import Animated from 'react-native-reanimated';

export default function Seperator({ color, width, thickness }) {
  return (
    <Animated.View style={{ backgroundColor: color, width, height: thickness }}/>
  );
}

Seperator.propTypes = {
  color: PropTypes.string,
};

Seperator.defaultProps = {
  width: 20,
  thickness: 2,
  color: AppStyles.colors.primaryColor,
};
