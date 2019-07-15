import { NavigationActions } from 'react-navigation';

let _navigator = false;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params = {}) {
  const navigateAction = NavigationActions.navigate({
    routeName, params,
  });
  _navigator.dispatch(navigateAction);
}

function reset(index, actions = []) {
  const resetAction = NavigationActions.reset({
    index, actions,
  });
  _navigator.dispatch(resetAction);
}

function replace(routeName, params = {}) {
  const replaceAction = NavigationActions.replace({
    routeName, params,
  });
  _navigator.dispatch(replaceAction);
}

// add other navigation functions that you need and export them

export default {
  reset,
  replace,
  navigate,
  setTopLevelNavigator,
};
