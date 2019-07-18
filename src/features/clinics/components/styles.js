import { StyleSheet } from 'react-native';
import AppStyles from '@/config/styles';
import AppMetrics from '@/config/metrics';

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
    justifyContent: 'space-between',
  },
  searchBox: {
    marginTop: 10,
    borderRadius: 4,
    marginHorizontal: 20,
  },
  searchInput: {
    fontFamily: AppStyles.SECOND_FONT_REGULAR,
  },
  filterContainer: {
    padding: 6,
    elevation: 5,
    marginTop: 10,
    borderRadius: 4,
    marginHorizontal: 20,
  },
  filterRow: {
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterLabel: {
    padding: 8,
    fontSize: 14,
    color: AppStyles.colors.inactiveGreyColor,
    fontFamily: AppStyles.fonts.SECOND_FONT_LIGHT,
  },
  filterInput: {
    width: 50,
    textAlign: 'right',
    fontSize: 16,
    color: AppStyles.colors.mateBlack,
    fontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
  },
  listContainer: {
    height: 135,
    width: '100%',
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  listItem: {
    flex: 1,
    padding: 20,
    elevation: 4,
    borderRadius: 10,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: AppMetrics.width - 90,
    justifyContent: 'space-between',
    backgroundColor: AppStyles.colors.white,
  },
  majorTextContain: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  minorTextContain: {
    flex: 3,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  majorText: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  majorTextTop: {
    fontSize: 36,
    lineHeight: 44,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: AppStyles.colors.grey,
    fontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
  },
  majorTextBottom: {
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: AppStyles.colors.inactiveGreyColor,
    fontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
  },
  dividerImage: {
    height: 60,
  },
  minorTextTitle: {
    fontSize: 14,
    lineHeight: 23,
    textAlign: 'center',
    color: AppStyles.colors.inactiveGreyColor,
    fontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
  },
  minorTextAddress: {
    fontSize: 9,
    lineHeight: 15,
    color: '#A9A9B0',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
  },
  minorTextButton: {
    fontSize: 11,
  },
});

export default styles;
