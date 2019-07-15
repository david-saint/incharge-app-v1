import AppStyles from '@/config/styles';
import { Header } from 'react-navigation';
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? Header.HEIGHT + 36 : Header.HEIGHT,
    justifyContent: 'space-between',
  },
  contain: {
    flex: 1,
    width: '100%',
  },
  logo: {
    fontSize: 33,
    fontFamily: AppStyles.fonts.FONT_REGULAR,
    color: '#333333',
  },
  title: {
    fontSize: 34,
    lineHeight: 34,
    color: '#323232',
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: AppStyles.fonts.FONT_SEMIBOLD,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  formContainer: {
    flex: 11,
    zIndex: 2,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    fontSize: 14,
    lineHeight: 14,
    color: '#BDBDBD',
    fontFamily: AppStyles.fonts.FONT_SEMIBOLD,
  },
});

export default styles;
