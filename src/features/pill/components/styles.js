import { StyleSheet } from 'react-native';
import AppStyles from '@/config/styles';
import AppMetrics from '@/config/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.lightWhite,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor: AppStyles.colors.lightWhite,
  },
  newWizardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alarmContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alarmInfo: {
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: AppStyles.colors.grey,
    fontFamily: AppStyles.fonts.SECOND_FONT_BOLD,
  },
  alarmTime: {
    fontSize: (AppMetrics.width / 2.2) / 4,
    marginVertical: 0,
    color: AppStyles.colors.mateBlack,
    fontFamily: AppStyles.fonts.OSWALD_REGULAR,
  },
  alarmTimeHour: {
    letterSpacing: 0,
    fontSize: AppMetrics.width / 2.2,
    fontFamily: AppStyles.fonts.OSWALD,
  },
  alarmTimeMinute: {
    fontSize: (AppMetrics.width / 2.2) / 2,
    color: AppStyles.colors.primaryColor,
  },
  alarmTimeLabel: {
    fontSize: (AppMetrics.width / 2.2) / 8,
    fontWeight: '600',
    textTransform: 'uppercase',
    fontFamily: AppStyles.fonts.OSWALD,
  },
  alarmDate: {
    textTransform: 'uppercase',
    color: '#3f3f3f',
    fontFamily: AppStyles.fonts.OSWALD,
  },
});

export default styles;
