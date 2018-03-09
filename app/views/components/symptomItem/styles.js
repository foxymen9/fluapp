import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';
export const styles = StyleSheet.create({
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
    borderColor: commonStyles.greyTonicColor,
    borderBottomWidth: 1,
  },
  editItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 75,
    backgroundColor: commonStyles.greyBackgroundColor
  },
  removeItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 75,
    backgroundColor: commonStyles.themeColor,
  },
  imageAvatar: {
    height: 30,
    width: 30,
    // borderRadius: 20,
    marginRight: 10,
  },
  imageTick: {
    height: 13,
    width: 13,
  },
  imageEdit: {
    height: 20,
    width: 20,
  },
  imageRemove: {
    height: 20,
    width: 20,
  },
  mainContentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textActive: {
    color: commonStyles.primaryGreenColor,
    fontFamily: 'Averta',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    backgroundColor: 'transparent',
  },
  textInactive: {
    color: commonStyles.mainTextColor,
    fontFamily: 'Averta',
    fontSize: 16,
    lineHeight: 20,
    backgroundColor: 'transparent',
  },
  textAmount: {
    color: commonStyles.greyTextColor,
    fontFamily: 'Averta',
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
  textEdit: {
    color: commonStyles.greyTextColor,
    fontFamily: 'Averta',
    fontSize: 13,
    backgroundColor: 'transparent',
    marginTop:4,
  },
  textRemove: {
    color: '#fff',
    fontFamily: 'Averta',
    fontSize: 13,
    backgroundColor: 'transparent',
    marginTop:4,
  },
  textNumber: {
    color: commonStyles.greyTextColor,
    fontFamily: 'Averta',
    fontSize: 14,
    backgroundColor: 'transparent',    
  },
  activeView: {
    backgroundColor: commonStyles.themeColor,
    width: 8,
    height: 8,
    borderRadius: 4,    
  },
  nameAvatarContainer: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#e3e6e980'
  },
  textAvatarName: {
    fontFamily: 'Averta',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#20212680',
  },
});