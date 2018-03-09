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
  },
  imageAvatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  imageActive: {
    width: 23,
    height: 18,
  },
  mainContentContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  textName: {
    color: commonStyles.mainTextColor,
    fontFamily: 'Averta',
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: 'transparent',
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