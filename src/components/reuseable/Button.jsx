import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppStyles from '@/config/styles';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 34,
    color: '#ffffff',
    borderRadius: 10,
    backgroundColor: AppStyles.colors.primaryColor,
  },
});

class Button extends Component {
  static propTypes = {
    style: PropTypes.object,
  }

  render() {
    return (
      <PaperButton
        {...this.props}
        style={[styles.button, this.props.style]}
        >
        {this.props.children}
      </PaperButton>
    );
  }
}

export default Button;
