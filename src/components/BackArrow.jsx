import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import BackArrowSVG from './svg/BackArrowSVG';

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
});

export default function BackArrow({ rotate, color }) {
  return (
    <View style={[styles.container, { transform: [{ rotate: `${rotate}deg` }] }]}>
      <BackArrowSVG {...{ color }} />
    </View>
  );
}

BackArrow.propTypes = {
  color: PropTypes.string,
  rotate: PropTypes.number,
};

BackArrow.defaultProps = {
  rotate: 0,
};
