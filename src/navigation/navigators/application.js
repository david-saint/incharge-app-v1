import { createStackNavigator } from 'react-navigation';

import * as screens from '../screens';
import MainStack from './main';
import ProfilingContainer from '@/features/profiling/containers';

const ApplicationStack = createStackNavigator(
  {
    [screens.PROFILING]: {
      screen: ProfilingContainer,
      navigationOptions: { header: null, gesturesEnabled: false },
    },
    [screens.MAINBASE]: {
      screen: MainStack,
      navigationOptions: { header: null, gesturesEnabled: false },
    },
  },
);

export default ApplicationStack;
