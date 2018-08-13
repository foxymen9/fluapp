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
import { connect } from 'react-redux';

import ImagePicker from 'react-native-image-picker';
import * as mime from 'react-native-mime-types';
import _ from 'lodash';

import * as commonStyles from '@common/styles/commonStyles';
import globalStyle from '@common/styles/commonStyles';
import { styles } from './styles';
import * as types from '@redux/actionTypes';
import Spinner from '@common/components/spinner';
import { 
  uploadAttachment,
  getAttachmentBody,
} from '@redux/user/actions';
import { 
  INSURANCE_CARD_FRONT_IMAGE,
  INSURANCE_CARD_BACK_IMAGE,
  USER_AVATAR_IMAGE,
} from '@common/styles/commonStrings';


const backImage = require('@common/assets/imgs/ico_nav_back_white.png');
const greenCameraImage = require('@common/assets/imgs/ico_general_small_camera_green.png');


class Payment extends Component {
  
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
      loading: false,
    };
    this.cards = [];
  }


  componentDidMount() {
    this._isMounted = true;
    const {
      attachments
    } = this.props.user;
    this.cards = _.filter(attachments, attachment => attachment.Description !== 'Avatar')
    if (this.cards.length > 0) {
      console.log('Attachement : ', this.cards[0]);
      this.props.getAttachmentBody(this.cards[0].Id, this.cards[0].Description);
    }
  }


  componentWillUnmount() {
    this._isMounted = false;
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.status.type === types.UPLOAD_ATTACHMENT_REQUEST) {
      this.setState({ loading: true });
    } else if (this.props.status.type === types.UPLOAD_ATTACHMENT_REQUEST && nextProps.status.type === types.UPLOAD_ATTACHMENT_SUCCESS) {
      this.setState({ loading: false });
    } else if (this.props.status.type === types.UPLOAD_ATTACHMENT_REQUEST && nextProps.status.type === types.UPLOAD_ATTACHMENT_FAILED) {
      this.setState({ loading: false });
    } 
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
        const mimeType = mime.lookup(response.uri);
        let description = ''
        if (selectedIndex === 0) {
          description = INSURANCE_CARD_FRONT_IMAGE;
        } else {
          description = INSURANCE_CARD_BACK_IMAGE;
        }
        this.props.uploadAttachment(this.props.user.account.Id, response.fileName, mimeType, description, response.data);
      }
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <Spinner visible={this.state.loading} />
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
        {/* 
          <Image 
            source={{uri: 'https://na54.salesforce.com/services/data/v43.0/sobjects/Attachment/00P0a00000cQ4BpEAK/Body'}} 
            // source={{uri: 'https://na54.force.com/servlet/servlet.FileDownload?file=00P0a00000cQ4BpEAK&operationContext=S1'}} 
            style={{width: 100, height: 100, backgroundColor: 'green'}}
          /> 
        */}
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


const mapStateToProps = ({ status, user }) => {
  return {
    status,
    user,
  }
};


const mapDispatchToProps = {
  uploadAttachment,
  getAttachmentBody,
};


export default connect(mapStateToProps, mapDispatchToProps)(Payment);
