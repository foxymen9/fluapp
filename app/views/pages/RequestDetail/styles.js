import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.whiteColor,
  },
  separator: {
    backgroundColor: commonStyles.greyTonicColor,
    height: 1,
  },
  progressBar: {
    flexDirection: 'row',
  },
  progressBarRed: {
    backgroundColor: commonStyles.themeColor,
    height: 2,
    width: commonStyles.screenWidth / 10 * 6,
  },
  progressBarGrey: {
    backgroundColor: commonStyles.greyTonicColor,
    height: 2,
    width: commonStyles.screenWidth / 10 * 4,
  },
  buttonWrapper: {
    padding: 10,
  },
  textModeActive: {
    color: commonStyles.greenColor,
    fontFamily: 'Averta',
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
  textModeInactive: {
    color: commonStyles.mainTextColor,
    fontFamily: 'Averta',
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
    textTitle: {
    color: commonStyles.whiteColor,
    fontFamily: 'Averta',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'transparent',    
  },
  textDiscover: {
    color: commonStyles.mainTextColor,
    fontFamily: 'Averta',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  textPhone: {
    color: commonStyles.mainTextColor,
    fontFamily: 'Averta',
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 50,
    backgroundColor: 'transparent',    
  },
  mainContentContainer: {
    flex: 1,
    // backgroundColor: 'red',
    // alignItems: 'center',
    paddingHorizontal: 20,
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
  contentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 120,
  },
  modeContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  checkContainer: {

  },    
  codeModeWrapper: {
    flex: 1,
    // marginHorizontal: 20,
    // justifyContent: 'flex-end',
    // marginBottom: 10,
  },
  textContinue: {
    color: commonStyles.whiteColor,
    fontFamily: 'Averta',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
  imageClose: {
    width: 15,
    height: 15,
  },
  imageAvatar: {
  },
  textInstruction: {
    color: commonStyles.greyTextColor,
    fontFamily: 'Averta',
    lineHeight: 23,
    fontSize: 14,
    textAlign: 'left',
    backgroundColor: 'transparent',  
  },
  textReset: {
    color: commonStyles.whiteColor,
    fontFamily: 'Averta',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  flatListContainer: {
    flex: 1,
    backgroundColor: commonStyles.whiteColor,
    paddingHorizontal: 20,
    
    shadowColor: commonStyles.lightGreyColor,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
  },
  sectionHeaderContainer: {
    paddingTop: 28,
    paddingBottom: 10,
    backgroundColor: commonStyles.whiteColor,
  },
  textSectionHeaderTitle: {
    color: commonStyles.mainTextColor,
    fontFamily: 'Averta',
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  textName: {
    flex: 1,
    color: commonStyles.primaryGreenColor,
    fontFamily: 'Averta',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    textAlign: 'right',
  },
  textPoint: {
    color: commonStyles.mainTextColor,
    fontFamily: 'Averta',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
});
