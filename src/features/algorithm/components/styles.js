import { StyleSheet } from 'react-native';
import AppStyles from '@/config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.white,
  },
  ctx: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newWizardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor: AppStyles.colors.lightWhite,
  },
  labels: {
    width: '100%',
    justifyContent: 'center',
  },
  label: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  indicatorCont: {
    flex: 1,
    justifyContent: "center"
  },
  indicatorHori: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default styles;

export const datepickerStyles = {
  dateIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0,
  },
  dateTouchBody: {
    width: '100%',
  },
  dateInput: {
    height: 45,
    padding: 12,
    width: '100%',
    alignItems: 'flex-start',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: AppStyles.colors.lightWhite,
  },
  placeholderText: {
    fontSize: 12,
    color: AppStyles.colors.grey,
    fontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
  },
  dateText: {
    fontSize: 12,
    color: AppStyles.colors.grey,
    fontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
  },
  btnTextConfirm: {
    color: AppStyles.colors.primaryColor,
  },
};
