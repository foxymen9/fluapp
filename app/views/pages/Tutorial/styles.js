import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.greenColor,
  },
  mainContentContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 100,
  },
  imageTutorial: {
    // flex: 1,
    width: commonStyles.screenWidth - 60,
    height: (commonStyles.screenWidth - 60) * 1.778,
  },

});