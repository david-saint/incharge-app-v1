import { StyleSheet } from 'react-native';
import AppStyles from '@/config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.lightWhite,
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
  },
});

export default styles;
