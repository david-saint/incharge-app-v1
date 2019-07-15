import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import AppStyles from '@/config/styles';
import AppMetrics from '@/config/metrics';
import { Header } from 'react-navigation';
import Animated from 'react-native-reanimated';
import Seperator from '@/components/reuseable/Seperator';
import LinearGradient from 'react-native-linear-gradient';

import HeaderComponent from './Header.jsx';
import {
  COVER_HEIGHT, MIN_COVER_HEIGHT, φ, Δ,
} from './Cover.jsx';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fakeHeader: {
    left: 0,
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    height: Header.HEIGHT,
    top: AppMetrics.statusBarHeight,
    justifyContent: 'space-between',
  },
  cover: {
    height: COVER_HEIGHT - Header.HEIGHT,
  },
  gradient: {
    alignItems: 'center',
    ...StyleSheet.absoluteFill,
  },
  header: {
    zIndex: 2,
    height: MIN_COVER_HEIGHT,
    marginTop: -MIN_COVER_HEIGHT,
  },
  content: {
    paddingVertical: 12 * φ,
    paddingHorizontal: 10 * φ,
    height: AppMetrics.height + 10,
    marginTop: -MIN_COVER_HEIGHT,
    backgroundColor: AppStyles.colors.white,
  },
  titleContain: {
    alignItems: 'center',
    height: Header.HEIGHT - 10,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 18,
    color: '#7F7F7F',
    textAlign: 'left',
    textTransform: 'capitalize',
    fontFamily: AppStyles.fonts.SECOND_FONT_SEMIBOLD,
  },
});

const { interpolate, Extrapolate } = Animated;

export default function Content({
  title, color, children, y, setScrollRef,
}) {
  const v = AppMetrics.width - (20 * φ);
  const opacity = interpolate(y, {
    inputRange: [-Δ, 0, Δ],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const height = interpolate(y, {
    inputRange: [-COVER_HEIGHT, 0],
    outputRange: [0, COVER_HEIGHT],
    extrapolate: Extrapolate.CLAMP,
  });
  const width = interpolate(y, {
    inputRange: [-Δ, 0, Δ],
    outputRange: [20, v / 3, v],
    extrapolate: Extrapolate.CLAMP,
  });
  const ψ = interpolate(y, {
    inputRange: [0, Δ],
    outputRange: [10 * φ, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const marginTop = interpolate(y, {
    inputRange: [0, Δ],
    outputRange: [10, AppMetrics.statusBarHeight + 20],
    extrapolate: Extrapolate.CLAMP,
  });
  const thickness = interpolate(y, {
    inputRange: [0, Δ],
    outputRange: [1, StyleSheet.hairlineWidth],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.ScrollView
      onScroll={Animated.event([{
        nativeEvent: {
          contentOffset: { y },
        },
      }])}
      snapToInterval={COVER_HEIGHT}
      decelerationRate="normal"
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
      stickyHeaderIndices={[1]}
      ref={r => setScrollRef(r)}
      >
      <View style={styles.cover}>
        <Animated.View style={[styles.gradient, { height }]}>
          <LinearGradient
            end={{ x: 0, y: 1 }}
            start={{ x: 0, y: 0.3 }}
            style={StyleSheet.absoluteFill}
            colors={[
              'transparent',
              'rgba(240, 240, 240, 0.2)',
              AppStyles.colors.lightWhiteTransparent,
            ]} />
        </Animated.View>
      </View>
      <View style={styles.header}>
        <HeaderComponent { ...{ y, title }} />
      </View>
      <Animated.View
        style={[
          styles.content,
          {
            borderTopLeftRadius: ψ,
            borderTopRightRadius: ψ,
          }]}>
        <Animated.View style={[styles.titleContain, { opacity }]}>
          <Text style={styles.title}>{title}</Text>
          <Seperator {...{ color, width, thickness }} />
        </Animated.View>
        <Animated.View style={{ marginTop }}>
          {children}
        </Animated.View>
      </Animated.View>
    </Animated.ScrollView>
  );
}

Content.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
  setScrollRef: PropTypes.func,
};
