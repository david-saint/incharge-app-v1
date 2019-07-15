import { StyleSheet } from 'react-native';
import AppStyles from '@/config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // backgroundColor: AppStyles.colors.primaryColor,
    backgroundColor: '#E56C44',
  },
  logo: {
    fontSize: 33,
    fontFamily: AppStyles.fonts.FONT_BOLD,
    color: '#ffffff',
  },
});

export default styles;
