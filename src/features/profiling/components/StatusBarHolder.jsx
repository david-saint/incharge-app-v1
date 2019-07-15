import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';

export default class StatusBarHolder extends Component {
  render() {
    const { dark } = this.props;
    if (dark) {
      return <StatusBar barStyle="dark-content" />;
    }
    return <StatusBar barStyle="light-content" />;
  }
}

StatusBarHolder.propTypes = {
  dark: PropTypes.bool,
};

StatusBarHolder.defaultProps = {
  dark: false,
};
