import AppStyles from '@/config/styles';
import AppMetrics from '@/config/metrics';
import {
  Platform,
  StyleSheet,
} from 'react-native';

const getShadow = () => {
  if (Platform.OS === 'android') {
    return { backgroundColor: '#ffffff' };
  }

  return {
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowRadius: 20,
    shadowOffset: { width: 2, height: 8 },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: AppMetrics.isLandscape ? 0 : 1,
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: AppMetrics.width,
    // backgroundColor: AppStyles.colors.primaryColor,
  },
  logo: {
    fontSize: 33,
    fontFamily: AppStyles.fonts.FONT_REGULAR,
    color: '#333333',
  },
  imageContainer: {
    flex: 10,
    width: '100%',
    marginBottom: 5,
  },
  sliderContainer: {
    flex: 4,
    width: '100%',
    paddingHorizontal: 20,
  },
  slides: {
    flex: 1,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
    marginBottom: 5,
    fontFamily: AppStyles.fonts.FONT_SEMIBOLD,
    color: '#000000',
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 25,
    fontFamily: AppStyles.fonts.FONT_REGULAR,
    color: '#BDBDBD',
    textAlign: 'center',
  },
  dotStyle: {
    height: 4,
    width: 4,
    marginLeft: 9,
    marginRight: 9,
    borderRadius: 4,
    backgroundColor: '#BBBBBB',
  },
  activeDotStyle: {
    height: 8,
    width: 8,
    marginLeft: 9,
    marginRight: 9,
    borderRadius: 8,
    backgroundColor: AppStyles.colors.primaryColor,
  },
  actionContainer: {
    flex: 6,
    width: '100%',
  },
  actionGroupContainer: {
    flex: 2,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: AppStyles.colors.lightWhite,
  },
  actionButton: {
    height: 48,
    width: '100%',
    borderRadius: 10,
    marginBottom: 24,
  },
  actionButtonContent: {
    fontSize: 14,
    lineHeight: 26,
    color: AppStyles.colors.lightWhite,
    fontFamily: AppStyles.fonts.FONT_BOLD,
    paddingTop: Platform.OS === 'ios' ? 2 : 0,
  },
  withShadow: getShadow(),
});

export default styles;
