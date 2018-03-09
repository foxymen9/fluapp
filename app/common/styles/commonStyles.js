import {
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

import { ifIphoneX } from 'react-native-iphone-x-helper';

import ExtraDimensions from 'react-native-extra-dimensions-android';

export const { width: screenWidthIOS, height: screenHeightIOS } = Dimensions.get('window');

export const RealWidth = ExtraDimensions.get('REAL_WINDOW_WIDTH');
export const RealHeight = ExtraDimensions.get('REAL_WINDOW_HEIGHT');
export const softMenubarHeight = ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT');
export const statusbarHeight = ExtraDimensions.get('STATUS_BAR_HEIGHT');
export const smartbarHeight = ExtraDimensions.get('SMART_BAR_HEIGHT');

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? ifIphoneX(44, 30) : 0;

function getScreenHeight() {
  if (Platform.OS === "ios") {
    return screenHeightIOS;
  }
  else {
    return RealHeight - softMenubarHeight - statusbarHeight - smartbarHeight;
  }
}

function getScreenWidth() {
  if (Platform.OS === "ios") {
    return screenWidthIOS;
  }
  else {
    return RealWidth;
  }
}

export let screenHeight = getScreenHeight();
export let screenWidth = getScreenWidth();

export const menuHeight = 30 + STATUSBAR_HEIGHT;
export const tabBarHieght = 45;

export const screenNormalHeight = screenHeight - menuHeight;
export const screenSubHeight = screenHeight - menuHeight - tabBarHieght;
export const screenSubWidth = screenWidth * 0.9;

export const padding = screenWidth * 0.05;

export const buttonBottomHeight = 40;
export const normalFontSize = 16;
export const buttonHeight = 50;

// export const normalFont = 'Swissra-Normal';
export const normalFont = 'ProximaNova-Regular';

export const BigNavBarHeight = 105;
export const DefaultNavBarHeight = 88;


//colors
export const themeColor = '#ee2e24';
export const greenColor = '#12909d';
export const greyBackgroundColor = '#f6f6f7';
export const greyButtonColor = '#a5a8af';
export const greyTextColor = '#a5a8af';
export const mainBackgroundColor = '#f6f6f7';
export const whiteColor = '#fff';
export const mainTextColor = '#202126';
export const greenBackgroundColor = '#00a0ad';
export const lineColor = '#e8e9eb';
export const greenActiveBackgroundColor = '#2c757f';
export const redActiveBackgroundColor = '#ca271e';
export const themeAcitveColor = '#bc261e';
export const lightGreyButtonActiveColor = '#86898e';
export const lightGreyCardActiveColor = '#b4b7bd10';
export const goldColor = '#ffad63';



export const primaryBlackColor = '#2b2c32';
export const darkGreyColor = '#7c7f83';
export const lightGreyColor = '#b4b7bd';
export const primaryGreenColor = '#00A0AD';
export const darkRedColor = '#E40000';
export const warmGreenColor = '#7AC143';
export const greyTonicColor = '#E8E9EB';
export const subtleGreyColor = '#F6F6F7';
export const inactiveLineColor = '#E3E6E9';
export const pendingCreditColor = '#CFD1D5';
export const availableCreditColor = '#F7F7F8';

export const tutorialScreenWidth = 375;

export default StyleSheet.create({
	buttonGreenWrapper: {
		alignSelf: 'stretch',
		height: 55,
		borderRadius: 3,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: primaryGreenColor,
		shadowColor: primaryGreenColor,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
  },
  buttonRedWrapper: {
		alignSelf: 'stretch',
		height: 55,
		borderRadius: 3,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: themeColor,
		shadowColor: themeColor,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	buttonGreyWrapper: {
		alignSelf: 'stretch',
		height: 55,
		borderRadius: 3,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: lightGreyColor,
		shadowColor: lightGreyColor,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	buttonTop: {
		marginVertical: 5,
		marginHorizontal: 20,
	},
	buttonBottom: {
		marginTop: 5,
		marginHorizontal: 20,
		marginBottom: 20,
	},
	buttonBottomInside: {
		marginTop: 5,
		marginBottom: 20,
	},
	buttonText: {
		color: '#fff',
		fontFamily: 'Averta',
		fontSize: 16,
		fontWeight: '600',
		backgroundColor: 'transparent',
	},
	textHeadingPlus: {
    color: primaryBlackColor,
    fontFamily: 'Averta',
    fontSize: 52,
    lineHeight: 52,
    letterSpacing: -0.3,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    textAlign: 'left',
  },
  textHeading1: {
    color: primaryBlackColor,
    fontFamily: 'Averta',
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: -0.2,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    textAlign: 'left',
  },
  textHeading2: {
    color: primaryBlackColor,
    fontFamily: 'Averta',
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: 0,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    textAlign: 'left',
  },
  textHeading3: {
    color: primaryBlackColor,
    fontFamily: 'Averta',
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: 0,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    textAlign: 'left',
  },
  textDescriptionPlus: {
    color: darkGreyColor,
    fontFamily: 'Averta',
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: 0,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    textAlign: 'left',
  },
  textDescription1: {
    color: primaryBlackColor,
    fontFamily: 'Averta',
    fontSize: 16,
    lineHeight: 30,
    letterSpacing: 0,
    backgroundColor: 'transparent',
    textAlign: 'left',
  },
  textDescription2: {
    color: primaryBlackColor,
    fontFamily: 'Averta',
    fontSize: 14,
    lineHeight: 30,
    letterSpacing: 0,
    backgroundColor: 'transparent',
    textAlign: 'left',
  },
	searchInput: {
		backgroundColor: '#0000001e', 
		height: 29,
		fontFamily: 'Averta',
		fontSize: 15,
		borderRadius: 10,
		textAlign: 'left',
		shadowColor: primaryBlackColor,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	tfTitleStyle: {
		fontFamily: 'Averta',
		fontSize: 13,
		height: 45,
		textAlign: 'left',
		fontWeight: '600',
	},
	tfLabelStyle: {
		fontFamily: 'Averta',
		fontWeight: '600',
	},
	tfAffixStyle: {
		fontFamily: 'Averta',
		fontWeight: '600',
  },
  separator: {
    backgroundColor: greyTonicColor,
    height: 1,
  },
  modalStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
});
