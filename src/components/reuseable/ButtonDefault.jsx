import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppStyles from '@/config/styles';
import {
  Button,
  StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 45,
    color: '#ffffff',
    borderRadius: 0,
    backgroundColor: AppStyles.colors.primaryColor,
  },
});

class ButtonDefault extends Component {
  render() {
    return (
      <Button
        {...this.props}
        style={styles.button}>
        {this.props.children}
      </Button>
    );
  }
}

ButtonDefault.propTypes = {
  children: PropTypes.node,
};

export default ButtonDefault;
