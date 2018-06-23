import React, { Component } from 'react';
import {
  View,
  StatusBar,
  AsyncStorage,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';
import AppIntroSlider from 'react-native-app-intro-slider';

import { styles } from './styles';

const tutorialImage1 = require('@common/assets/imgs/tutorials/tutorial_1.png');
const tutorialImage2 = require('@common/assets/imgs/tutorials/tutorial_2.png');
const tutorialImage3 = require('@common/assets/imgs/tutorials/tutorial_3.png');
const tutorialImage4 = require('@common/assets/imgs/tutorials/tutorial_4.png');

const slides = [
  {
    key: '1',
    image: tutorialImage1,
    imageStyle: styles.imageTutorial,
  },
  {
    key: '2',
    image: tutorialImage2,
    imageStyle: styles.imageTutorial,
  },
  {
    key: '3',
    image: tutorialImage3,
    imageStyle: styles.imageTutorial,
  },
  {
    key: '4',
    image: tutorialImage4,
    imageStyle: styles.imageTutorial,
  },
];


export default class Login extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    SplashScreen.hide();
    this._isMounted = true;
  }


  componentWillUnmount() {
    this._isMounted = false;
  }


  onSignIn() {
    AsyncStorage.setItem('ShowedTutorial', 'true', () => {
      Actions.Login();
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <AppIntroSlider
          slides={slides}
          showSkipButton  
          onDone={this.onSignIn}
          onSkip={this.onSignIn}
        />
      </View>
    );
  }
}