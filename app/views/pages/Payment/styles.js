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
    color: commonStyles.whiteColor,
    fontFamily: 'Averta',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'transparent',    
  },
  mainContentContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  cardContainer: {
    alignSelf: 'stretch',
    height: 200,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: commonStyles.whiteColor,
    marginTop: 20,

    shadowColor: commonStyles.lightGreyColor,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cardWarpper: {
    width: commonStyles.screenWidth - 40,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCamera: {
    width: 24,
    height: 24,
  },
  imageCard: {
    width: commonStyles.screenWidth - 40,
    height: 200,
    borderRadius: 3,
  },
  cameraWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInstruction: {
    color: commonStyles.primaryGreenColor,
    fontFamily: 'Averta',
    fontSize: 14,
    lineHeight: 30,
    backgroundColor: 'transparent',
    marginTop: 10,
    fontWeight: '600',
  },
});
