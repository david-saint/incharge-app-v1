import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppStyles from '@/config/styles';
import { SETTINGS } from '@/navigation/screens';
import Icon from 'react-native-vector-icons/Feather';
import {
  Appbar,
} from 'react-native-paper';
import {
  View,
  StatusBar,
} from 'react-native';

import styles from './styles';

export default class AlgorithmScreen extends Component {
  static navigationOptions = {
    title: 'Pill Reminder',
    headerBackTitle: null,
    activeTintColor: AppStyles.colors.primaryColor,
    tabBarIcon: ({ focused }) => {
      if (focused) {
        return <Icon name="clock" size={25} />;
      }
      return <Icon name="clock" size={20} color={AppStyles.colors.inactiveGreyColor} />;
    },
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Appbar.Header
          dark={false}
          style={{ elevation: 5 }}
          theme={{
            colors: {
              primary: AppStyles.colors.white,
              text: AppStyles.colors.mateBlack,
            },
            fonts: {
              medium: AppStyles.fonts.FONT_SEMIBOLD,
              regular: AppStyles.fonts.FONT_REGULAR,
            },
          }}>
          <Appbar.Content
            title="Pill Reminder"
            titleStyle={{
              textAlign: 'center',
              color: AppStyles.colors.mateBlack,
              fontFamily: AppStyles.fonts.FONT_SEMIBOLD,
            }}
          />
          <Appbar.Action icon="more-vert" onPress={() => navigation.navigate(SETTINGS)} />
        </Appbar.Header>
        <View style={styles.mainContainer} />
      </View>
    );
  }
}

AlgorithmScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
