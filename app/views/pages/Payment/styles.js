import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.whiteColor,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  progressBarRed: {
    backgroundColor: commonStyles.themeColor,
    height: 2,
    width: commonStyles.screenWidth / 7,
  },
  progressBarGrey: {
    backgroundColor: commonStyles.greyTonicColor,
    height: 0,
    width: commonStyles.screenWidth / 7 * 6,
  },
  buttonWrapper: {
    padding: 10,
  },
  textTitle: {
    color: commonStyles.whiteColor,
    fontFamily: 'Averta',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'transparent',    
  },
  mainContentContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10,
    // backgroundColor: 'red',
    // alignItems: 'center',
  },
  buttonContinueWrapper: {
    alignSelf: 'stretch',
    height: 50,
    borderRadius: 5,
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: commonStyles.greenColor,
  },
  textContinue: {
    color: '#fff',
    fontFamily: 'Averta',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
});
