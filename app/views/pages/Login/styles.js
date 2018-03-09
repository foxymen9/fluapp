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
  buttonWrapper: {
    padding: 10,
  },
  textTitle: {
    color: '#fff',
    fontFamily: 'Averta',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'transparent',    
  },
  textForgot: {
    fontFamily: 'Averta',
    fontSize: 14,
    fontWeight: '600',
    color: commonStyles.darkGreyColor,
  },
  forgotWrapper: {
    position: 'absolute',
    right: 10,
    top: 35,
  },
  mainContentContainer: {
    flex: 1,
    marginHorizontal: 20,
    // alignItems: 'center',
  },
  textWrapper: {
  },
  buttonContinueWrapper: {
    alignSelf: 'stretch',
    height: 50,
    borderRadius: 5,
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
  textDescription: {
    color: commonStyles.mainTextColor,
    fontFamily: 'Averta',
    fontSize:36,
    lineHeight: 42,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginBottom: 31,
    marginTop: 95,
  },
  bottomContainer: {
  },
  textResend : {
    color: commonStyles.greenColor,
    fontFamily: 'Averta',
    lineHeight: 23,
    fontSize: 14,
    fontStyle: 'italic',
    backgroundColor: 'transparent',  
    // textDecorationLine: 'underline',
  },
  textResendWrapper: {
    borderColor: commonStyles.primaryGreenColor,
    borderBottomWidth: 1,
  },
  modeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
  },
  codeModeWrapper: {
    // flex: 1,
    marginBottom: 10,
  },
});