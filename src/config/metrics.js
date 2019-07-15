/*
 * platform/application wide metrics for proper styling
*/

import {
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const metrics = {
  width,
  height,
  aspectRatio: width / height,
  isLandscape: width > height,
  topPadding: Platform.OS === 'ios' ? 34 : 0,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 54 : 66,
  statusBarHeight: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
};

export default metrics;
