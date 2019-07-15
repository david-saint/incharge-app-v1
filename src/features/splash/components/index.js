import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Splash from '@/components/Splash';
import * as screens from '@/navigation/screens';

export default class SplashScreen extends PureComponent {
  componentDidMount() {
    this.routeDidFocus = this.props.navigation.addListener(
      'didFocus',
      this.getAuthenticatedUser,
    );
    this._checkRedirect();
  }

  componentWillUnmount() {
    this.routeDidFocus.remove();
  }

  componentDidUpdate() {
    this._checkRedirect();
  }

  _checkRedirect = () => {
    const { valid, navigation, profiled } = this.props;
    if (valid && navigation.isFocused()) {
      if (profiled) {
        navigation.navigate(screens.MAINBASE);
      } else {
        navigation.navigate(screens.PROFILING);
      }
    }
  }

  getAuthenticatedUser = () => {
    const { token } = this.props;
    this.props.userFetch(token);
  }

  render() {
    return (
      <Splash />
    );
  }
}

SplashScreen.propTypes = {
  valid: PropTypes.bool,
  token: PropTypes.string,
  profiled: PropTypes.bool,
  navigation: PropTypes.object,
  userFetch: PropTypes.func.isRequired,
};
