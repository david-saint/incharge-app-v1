import React, { Component } from 'react';
import AppStyles from '@/config/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  View,
} from 'react-native';

import styles from './styles';

export default class AlgorithmScreen extends Component {
  static navigationOptions = {
    title: 'FAQs',
    activeTintColor: AppStyles.colors.primaryColor,
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      if (focused) {
        return <Icon name="question" size={25} />;
      }
      return <Icon name="question" size={20} color={AppStyles.colors.inactiveGreyColor} />;
    },
  }

  render() {
    return (
      <View style={styles.container} />
    );
  }
}
