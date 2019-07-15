import React from 'react';
import PropTypes from 'prop-types';
import AppStyles from '@/config/styles';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Surface } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    width: 225,
    padding: 20,
    elevation: 8,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 14,
    lineHeight: 16,
    marginBottom: 26,
    color: AppStyles.colors.mateBlack,
  },
  subContent: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subTitle: {
    flex: 4,
    fontSize: 12,
    flexWrap: 'wrap',
    color: AppStyles.colors.grey,
  },
  actionText: {
    flex: 2,
    fontSize: 16,
    lineHeight: 26,
    textTransform: 'uppercase',
    color: AppStyles.colors.primaryColor,
    fontFamily: AppStyles.fonts.SECOND_FONT_SEMIBOLD,
  },
});

export default function ClinicCallout({ clinic }) {
  return (
    <Surface style={styles.container}>
      <Text style={styles.title}>
        {clinic.name}
      </Text>
      <View style={styles.subContent}>
        <Text style={styles.subTitle}>{clinic.address}</Text>
        <Text style={styles.actionText}>{clinic.distance}</Text>
      </View>
    </Surface>
  );
}

ClinicCallout.propTypes = {
  clinic: PropTypes.object.isRequired,
};
