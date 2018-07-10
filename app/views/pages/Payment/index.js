import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

import * as commonStyles from '@common/styles/commonStyles';
import globalStyle from '@common/styles/commonStyles';
import { styles } from './styles';

const backImage = require('@common/assets/imgs/ico_nav_back_white.png');
const greenCameraImage = require('@common/assets/imgs/ico_general_small_camera_green.png');


export default class Payment extends Component {
  
  static propTypes = {
  }


  static defaultProps = {
  }


  static renderLeftButton(props) {
    return (
      <TouchableOpacity 
        style={styles.buttonWrapper}
        onPress={() => Actions.pop()}
      >
        <Image source={backImage} style={styles.imageClose} resizeMode="contain" />
      </TouchableOpacity>
    );
  }


  static renderRightButton(props) {
    return (
      <View />
    );
  }

  
  static renderTitle(props) {
    return (
      <Text style={styles.textTitle}>Insurance Card</Text>
    );
  }


  constructor(props) {
    super(props);

    this.state = {
      selectedFrontImageFile: null,
      selectedBackImageFile: null,
      currentFrontImage: greenCameraImage,
      currentBackImage: greenCameraImage,
    };
  }


  componentDidMount() {
    this._isMounted = true;
  }


  componentWillUnmount() {
    this._isMounted = false;
  }


  onSave() {
    Actions.pop();
  }


  onSelectedCard(selectedIndex) {
    const  options = {
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
      }
    };
    
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }  else if (response.error) {
        console.log('ImagePicker Error: ', response.error); 
      } else {
        const source = {uri: response.uri}
        this._isMounted && this.setState((state) => {
          if (selectedIndex == 0) {
            state.currentFrontImage = source,
            state.selectedFrontImageFile = response;
          } else {
            state.currentBackImage = source,
            state.selectedBackImageFile = response;
          }
          return state;
        });

        //do something here...
      }
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={styles.mainContentContainer}>
          <View style={styles.cardContainer}>
            <TouchableHighlight
              style={styles.cardWarpper}
              underlayColor={commonStyles.lightGreyCardActiveColor}
              onPress={() => this.onSelectedCard(0)}
            >
              {
                this.state.currentFrontImage != greenCameraImage ?
                <Image source={this.state.currentFrontImage} style={styles.imageCard} resizeMode="cover" />
                :
                <View style={styles.cameraWrapper}>
                  <Image source={this.state.currentFrontImage} style={styles.imageCamera} resizeMode="contain" />
                  <Text style={styles.textInstruction}>Front of card</Text>
                </View>
              }
            </TouchableHighlight>
          </View>
          <View style={styles.cardContainer}>
            <TouchableHighlight
              style={styles.cardWarpper}
              underlayColor={commonStyles.lightGreyCardActiveColor}
              onPress={() => this.onSelectedCard(1)}
            >
              <View style={styles.cardWrapper}>
                {
                  this.state.currentBackImage != greenCameraImage ?
                  <Image source={this.state.currentBackImage} style={styles.imageCard} resizeMode="cover" />
                  :
                  <View style={styles.cameraWrapper}>
                    <Image source={this.state.currentBackImage} style={styles.imageCamera} resizeMode="contain" />
                    <Text style={styles.textInstruction}>Back of card</Text>
                  </View>
                }
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <TouchableHighlight 
          style={[globalStyle.buttonGreenWrapper, globalStyle.buttonBottom]}
          onPress={() => this.onSave()}
          underlayColor={commonStyles.greenActiveBackgroundColor}
        >
          <Text style={globalStyle.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}