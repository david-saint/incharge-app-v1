import React from 'react';
import {
  Svg,
  Path,
} from 'react-native-svg';
import { View } from 'react-native';
import AppStyles from '@/config/styles';

export default function WaveSeperatorSVG() {
  return (
    <View style={{ marginVertical: 8 }}>
      <Svg height="4" width="46" fill="none" viewBox="0 0 46 4">
        <Path d="M34.1679 1.06679C30.4308 -2.62868 26.6936 4.76226 22.9565 1.06679C19.2194 -2.62868 15.4823 4.76226 11.7452 1.06679C7.47422 -2.62868 3.73711 4.76226 0 1.06679V2.93321C3.73711 6.62868 7.47422 -0.762259 11.7452 2.93321C15.4823 6.62868 19.2194 -0.762259 22.9565 2.93321C26.6936 6.62868 30.4308 -0.762259 34.1679 2.93321C38.4389 6.62868 42.176 -0.762259 45.9131 2.93321V1.06679C42.176 -2.62868 38.4389 4.76226 34.1679 1.06679Z" fill={AppStyles.colors.primaryColor} fillRule="evenodd"/>
      </Svg>
    </View>
  );
}
