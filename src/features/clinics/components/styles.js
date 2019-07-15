import { StyleSheet } from 'react-native';
import AppStyles from '@/config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppStyles.colors.white,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  searchBox: {
    marginTop: 10,
    borderRadius: 4,
  },
  searchInput: {
    fontFamily: AppStyles.SECOND_FONT_REGULAR,
  },
});

export default styles;
