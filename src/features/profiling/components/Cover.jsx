import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import AppStyles from '@/config/styles';
import AppMetrics from '@/config/metrics';
import { Header } from 'react-navigation';
import Animated from 'react-native-reanimated';

export const φ = (1 + Math.sqrt(5)) / 2;
export const MIN_COVER_HEIGHT = Header.HEIGHT + 32;
export const COVER_HEIGHT = AppMetrics.height * (1 / φ);
export const Δ = COVER_HEIGHT - MIN_COVER_HEIGHT;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: COVER_HEIGHT,
    justifyContent: 'center',
  },
});

const { interpolate, Extrapolate } = Animated;

export default function Cover({ children, color, y }) {
  const padding = interpolate(y, {
    inputRange: [-MIN_COVER_HEIGHT, 0, COVER_HEIGHT],
    outputRange: [0, 26, 126],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const opacity = interpolate(y, {
    inputRange: [-64, 0, Δ],
    outputRange: [0, 0.1, 0.3],
    extrapolate: Extrapolate.CLAMP,
  });
  const height = interpolate(y, {
    inputRange: [0, COVER_HEIGHT],
    outputRange: [COVER_HEIGHT, MIN_COVER_HEIGHT],
    extrapolateRight: Extrapolate.CLAMP,
  });
  return (
    <Animated.View
      style={[
        styles.container,
        { padding, height, backgroundColor: color },
      ]}>
      {children}
      <Animated.View
        style={{
          opacity,
          ...StyleSheet.absoluteFillObject,
          backgroundColor: AppStyles.colors.lightWhite,
        }} />
    </Animated.View>
  );
}

Cover.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node,
};
