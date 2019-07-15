import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import AppStyles from '@/config/styles';
import AppMetrics from '@/config/metrics';
import { Header } from 'react-navigation';
import Animated from 'react-native-reanimated';
import { Δ, COVER_HEIGHT, MIN_COVER_HEIGHT } from './Cover.jsx';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: AppMetrics.statusBarHeight,
    backgroundColor: AppStyles.colors.white,
  },
  title: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    fontFamily: AppStyles.fonts.FONT_SEMIBOLD,
  },
});

const { interpolate, Extrapolate } = Animated;

export default function HeaderComponent({ title, y }) {
  const opacity = interpolate(y, {
    inputRange: [0, COVER_HEIGHT - MIN_COVER_HEIGHT - Header.HEIGHT],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const textOpacity = interpolate(y, {
    inputRange: [0, Δ],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Animated.Text style={[styles.title, { opacity: textOpacity }]}>{title}</Animated.Text>
    </Animated.View>
  );
}

HeaderComponent.propTypes = {
  title: PropTypes.string,
};
