import { createBottomTabNavigator } from 'react-navigation';
import {
  AnimatedCircleBarComponent,
} from 'react-navigation-custom-bottom-tab-component/AnimatedCircleBarComponent';

import * as screens from '../screens';
import FAQContainer from '@/features/faq/containers';
import { withCustomStyle } from './components/CircleBottomBar';
import MapScreenContainer from '@/features/clinics/containers';
import AlgorithmContainer from '@/features/algorithm/containers';
import PillReminderContainer from '@/features/pill/containers';

const MainStack = createBottomTabNavigator(
  {
    [screens.MAPSCREEN]: {
      screen: MapScreenContainer,
      navigationOptions: { header: null, gesturesEnabled: false },
    },
    [screens.ALGORITHM]: {
      screen: AlgorithmContainer,
      navigationOptions: { header: null, gesturesEnabled: false },
    },
    [screens.PILL]: {
      screen: PillReminderContainer,
      navigationOptions: { header: null, gesturesEnabled: false },
    },
    [screens.FAQ]: {
      screen: FAQContainer,
      navigationOptions: { header: null, gesturesEnabled: false },
    },
  },
  {
    initialRouteName: screens.MAPSCREEN,
    tabBarComponent: withCustomStyle()(AnimatedCircleBarComponent),
  },
);

export default MainStack;
