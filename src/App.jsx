/**
 * The Entrypoint to the incharge application.
 * Features include: redux, react-navigation,
 * redux-thunk, reselect, redux-persist,
 * react-native-paper, react-native-icons.
 */

import React, { Component } from 'react';

import configureStore from '@/store';
import { Provider } from 'react-redux';
import AppNavigator from '@/navigation';
import AppStyles from '@/config/styles';
import Splash from '@/components/Splash';
import NavigationService from '@/navigation/service';
import { PersistGate } from 'redux-persist/es/integration/react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const { persistor, store } = configureStore();

// TODO: Make this dynamically stored in the redux state
// TODO: Ability to toggle this theme btwn this and DarkTheme.
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    text: AppStyles.colors.mateBlack,
    primary: AppStyles.colors.primaryColor,
    // TODO: Add the default colors for InCharge.
  },
  fonts: {
    thin: {
      fontFamily: AppStyles.fonts.FONT_THIN,
    },
    light: {
      fontFamily: AppStyles.fonts.FONT_LIGHT,
    },
    regular: {
      fontFamily: AppStyles.fonts.FONT_REGULAR,
    },
  },
};

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Splash />} persistor={persistor}>
          <PaperProvider theme={theme}>
            <AppNavigator
              ref={(navigatorRef) => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }} />
          </PaperProvider>
        </PersistGate>
      </Provider>
    );
  }
}
