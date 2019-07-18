import { createStackNavigator } from 'react-navigation';

import * as screens from '../screens';
import MainStack from './main';
import SettingsContainer from '@/features/settings/containers';
import ProfilingContainer from '@/features/profiling/containers';

const ApplicationStack = createStackNavigator(
  {
    [screens.PROFILING]: {
      screen: ProfilingContainer,
      navigationOptions: { header: null, gesturesEnabled: false },
    },
    [screens.SETTINGS]: {
      screen: SettingsContainer,
    },
    [screens.MAINBASE]: {
      screen: MainStack,
      navigationOptions: { header: null, headerBackTitle: null, gesturesEnabled: false },
    },
  },
);

export default ApplicationStack;
