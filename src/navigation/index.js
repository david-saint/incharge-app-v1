import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import SplashScreen from '@/features/splash/containers';

import * as screens from './screens';
import ApplicationStack from './navigators/application';
import AthenticationStack from './navigators/authentication';

const AppNavigator = createSwitchNavigator(
  {
    [screens.SPLASH]: {
      screen: SplashScreen,
      navigationOptions: { gesturesEnabled: false, header: null },
    },
    [screens.APPLICATION]: {
      screen: ApplicationStack,
      navigationOptions: { gesturesEnabled: false, header: null },
    },
    [screens.AUTH]: {
      screen: AthenticationStack,
      navigationOptions: { header: null, gesturesEnabled: false },
    },
  },
  {
    initialRouteName: screens.SPLASH,
  },
);

export default createAppContainer(AppNavigator);
