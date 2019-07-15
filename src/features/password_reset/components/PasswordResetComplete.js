import React, { Component } from 'react';
import AppStyles from '@/config/styles';
import { Button } from 'react-native-paper';
import BackArrow from '@/components/BackArrow';
import * as screens from '@/navigation/screens';
import { openInbox } from 'react-native-email-link';
import {
  Text,
  View,
  Image,
  StatusBar,
} from 'react-native';

import styles from '@/features/authentication/components/styles';

export default class AuthenticationBase extends Component {
  static navigationOptions = {
    headerTransparent: true,
    headerBackImage: <BackArrow />,
  }

  render() {
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
            source={require('@/assets/images/email-sent.png')}
            />
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 30, }}>
          <Text
            style={[
              styles.title,
              {
                textAlign: 'center',
                fontSize: 24,
                lineHeight: 25,
                fontFamily: AppStyles.fonts.FONT_BOLD,
              }]}>
            Check your Email!
          </Text>
          <Text style={[styles.subtitle]}>
            We have sent a reset password link to your registered email address.
          </Text>
        </View>
        <View style={[styles.actionContainer, { marginTop: 10 }]}>
          <View style={[styles.actionGroupContainer, { backgroundColor: '#ffffff' }]}>
            <Button
              mode="contained"
              uppercase={false}
              accessibilityLabel="Sign in"
              contentStyle={styles.actionButtonContent}
              onPress={() => openInbox()}
              style={styles.actionButton}>
              <Text style={styles.actionButtonContent}>Go To Email</Text>
            </Button>
          </View>
          <View
            style={[styles.actionGroupContainer, { flex: 3, backgroundColor: '#ffffff' }]}></View>
        </View>
      </View>
    );
  }
}
