import React, { Component } from 'react';
import Swiper from 'react-native-web-swiper';
import { Button } from 'react-native-paper';
import Seperator from '@/components/reuseable/Seperator';
import * as screens from '@/navigation/screens';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  StatusBar,
} from 'react-native';

import styles from './styles';

export default class AuthenticationBase extends Component {
  static navigationOptions = {
    header: null,
    headerBackTitle: null,
    gesturesEnabled: false,
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f7f7f7" />
        <View style={styles.imageContainer}>
          <View style={{ flex: 2 }} />
          <Image
            style={{
              flex: 8,
              height: undefined,
              width: undefined,
            }}
            resizeMode="contain"
            source={require('@/assets/images/setup-image.png')}
            />
        </View>
        <View style={styles.sliderContainer}>
          <Swiper
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.activeDotStyle}
            nextButtonElement={<Text />}
            prevButtonElement={<Text />}
            >
            <View style={styles.slides}>
              <Text style={styles.title}>Hi there!</Text>
              <Seperator />
              <Text style={styles.subtitle}>
                Are you curious about what contraceptive method is best for you?.
              </Text>
            </View>

            <View style={styles.slides}>
              <Text style={styles.title}>Keep track</Text>
              <Seperator />
              <Text style={styles.subtitle}>
                We help you keep track of your most fertile periods.
              </Text>
            </View>

            <View style={styles.slides}>
              <Text style={styles.title}>Clinics</Text>
              <Seperator />
              <Text style={styles.subtitle}>
                We have a large database of family planning centers near you!
              </Text>
            </View>

            <View style={styles.slides}>
              <Text style={styles.title}>Reminders</Text>
              <Seperator />
              <Text style={styles.subtitle}>
                We set remind you when you need to use your pills.
              </Text>
            </View>

            <View style={styles.slides}>
              <Text style={styles.title}>Lets get started</Text>
              <Seperator />
              <Text style={styles.subtitle}>
                What are you waiting for? Let us help you be better.
              </Text>
            </View>
          </Swiper>
        </View>
        <View style={styles.actionContainer}>
          <View style={[styles.actionGroupContainer, { backgroundColor: '#ffffff' }]}>
            <Button
              mode="contained"
              uppercase={false}
              accessibilityLabel="Sign in"
              contentStyle={styles.actionButtonContent}
              onPress={() => navigation.navigate(screens.AUTHLOGIN)}
              style={styles.actionButton}>
              <Text style={styles.actionButtonContent}>Sign in</Text>
            </Button>
          </View>
          <View style={[styles.actionGroupContainer, { flex: 3 }]}>
            <Button
              mode="contained"
              uppercase={false}
              accessibilityLabel="Sign UP"
              contentStyle={styles.actionButtonContent}
              onPress={() => navigation.navigate(screens.AUTHREGISTER)}
              style={[styles.actionButton, styles.withShadow]}>
              <Text style={[styles.actionButtonContent, { color: '#BDBDBD' }]}>Sign up</Text>
            </Button>
            <Button
              mode="text"
              uppercase={false}
              accessibilityLabel="Forgot your password"
              onPress={() => navigation.navigate(screens.AUTHPASSWORD)}
              color="#BDBDBD">
              <Text style={[styles.actionButtonContent, { color: '#BDBDBD' }]}>
                Forgot Password?
              </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

AuthenticationBase.propTypes = {
  navigation: PropTypes.object,
};
