import React, { Component } from 'react';
import AppStyles from '@/config/styles';
import Icon from 'react-native-vector-icons/Feather';
import {
  View,
} from 'react-native';

import styles from './styles';

export default class AlgorithmScreen extends Component {
  static navigationOptions = {
    title: 'Pill Reminder',
    activeTintColor: AppStyles.colors.primaryColor,
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      if (focused) {
        return <Icon name="clock" size={25} />;
      }
      return <Icon name="clock" size={20} color={AppStyles.colors.inactiveGreyColor} />;
    },
  }

  render() {
    return (
      <View style={styles.container} />
    );
  }
}
