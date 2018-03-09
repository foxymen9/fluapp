import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonWrapper: {
    padding: 10,
  },
  cameraButtonWrapper: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  imageTake: {
    width: 150,
    height: 150,
  },
  imageClose: {
    width: 26,
    height: 26,
  },
  closeButtonWrapper: {
    position: 'absolute',
    right: 75,
    top: 0,
  },
  imageBack: {
    width: 15,
    height: 15,
  },
  imageCamera: {
    width: 150,
    height: 150,
  },
  textNavTitle: {
    color: '#fff',
    fontFamily: 'Averta',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  mainContentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  dropDownTitle: {
    width: 76,
    marginRight: 20,
  },
  textFieldInputContainerStyle: {
  },
  textFieldContainerStyle: {
    flex: 1,
  },
  imagePwd: {
    width: 21,
    height: 21,
  },
  pwdIconWrapper: {
    position: 'absolute',
    right: 0,
    top: 35,
  },
  checkContainer: {
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  checkRowContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textMatch: {
    color: commonStyles.grayColor,
    fontSize: 22,
    marginLeft: 10,
  },
  imageTick: {
    height: 15,
    width: 15,
  },
  textGreenCheck: {
    color: commonStyles.primaryGreenColor,
    fontFamily: 'Averta',
    lineHeight: 23,
    fontSize: 14,
    textAlign: 'left',
    backgroundColor: 'transparent',  
    marginLeft: 10,
  },
  textGreyCheck: {
    color: commonStyles.lightGreyColor,
    fontFamily: 'Averta',
    lineHeight: 23,
    fontSize: 14,
    textAlign: 'left',
    backgroundColor: 'transparent',  
    marginLeft: 10,
  },
});