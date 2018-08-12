import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.themeColor,
  },
  buttonWrapper: {
    padding: 10,
  },
  imageClose: {
    width: 15,
    height: 15,
  },
  imageSetting: {
    width: 40,
    height: 40,
  },
  imageLogout: {
    width: 40,
    height: 40,
  },
  textTitle: {
    color: '#fff',
    fontFamily: 'Averta',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  searchContainer: {
    marginHorizontal: 15,
    // marginTop: 13,
  },
  mainContentContainer: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  inviteContainer: {
    flexDirection: 'row',
    marginTop: 18,
    alignItems: 'center',
  },
  imageInviteConnection: {
    width: 40,
    height: 40,
  },
  textDescription: {
    color: commonStyles.mainTextColor,
    fontFamily: 'Averta',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 14,
    backgroundColor: 'transparent',
  },
  sectionHeaderContainer: {
    marginTop: 28,
    marginBottom: 19,
  },
  textSectionHeaderTitle: {
    color: commonStyles.mainTextColor,
    fontFamily: 'Averta',
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  iconNav: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
