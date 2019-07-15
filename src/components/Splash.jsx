import React from 'react';
import AppStyles from '@/config/styles';
import { SafeAreaView } from 'react-navigation';

import {
  View,
  Text,
  StatusBar,
  StyleSheet,
} from 'react-native';

import HouseSVG from './svg/HouseSVG';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: AppStyles.colors.primaryColor,
  },
  logo: {
    fontSize: 33,
    fontFamily: AppStyles.fonts.FONT_BOLD,
    color: '#ffffff',
  },
});

export default function Splash() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={AppStyles.colors.primaryColor} barStyle="light-content" />
      <View style={{ marginBottom: 5 }}>
        <HouseSVG />
      </View>
      <Text style={styles.logo}>InCharge</Text>
    </SafeAreaView>
  );
}
