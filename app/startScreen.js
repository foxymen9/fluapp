import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  AsyncStorage,
} from 'react-native';


import {Actions} from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen'

import * as commonStyles from '@common/styles/commonStyles';
import globalStyle from '@common/styles/commonStyles';

const logoImage = require('@common/assets/imgs/splash.png');


export default class StartScreen extends Component {
  constructor(props) {
    super(props);
   
  }


  componentDidMount() {
    SplashScreen.hide();

    setTimeout(function(){ 
      Actions.Login();
    }, 3000);
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={styles.contentConainer}>
          <Image source={logoImage} style={styles.imageLogo} resizeMode="contain" />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.themeColor,
  },
  topPadding: {
    flex: 1,
  },
  contentConainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iamgeLogo: {
    width: '100%',
    height: '100%',
  },
  textTitle: {
    color: '#fff',
    fontFamily: 'Averta',
    fontSize: 37,
    fontWeight: '300',
    width: 195,
    backgroundColor: 'transparent',
    marginTop: 31,
  },
  textDescription: {
    color: '#ffffff80',
    fontFamily: 'Averta',
    fontSize: 14,
    width: 195,
    backgroundColor: 'transparent',
    marginTop: 16,
  },
});
