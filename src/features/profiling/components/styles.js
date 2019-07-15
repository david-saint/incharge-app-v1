import AppStyles from '@/config/styles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.lightWhite,
  },
  dotStyle: {
    height: 4,
    width: 4,
    marginLeft: 9,
    marginRight: 9,
    borderRadius: 4,
    display: 'none',
    backgroundColor: '#BBBBBB',
  },
  activeDotStyle: {
    height: 8,
    width: 8,
    marginLeft: 9,
    marginRight: 9,
    borderRadius: 8,
    display: 'none',
    backgroundColor: AppStyles.colors.primaryColor,
  },
});
