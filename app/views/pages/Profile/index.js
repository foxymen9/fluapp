import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EmailValidator from 'email-validator';

import Spinner from '@common/components/spinner';
import * as types from '@redux/actionTypes';
import * as commonStyles from '@common/styles/commonStyles';
import globalStyle from '@common/styles/commonStyles';
import { styles } from './styles';
import { getMyProfile } from '@redux/profile/actions';

const cameraImage = require('@common/assets/imgs/ico_general_small_camera_grey.png');
const backImage = require('@common/assets/imgs/ico_nav_back_white.png');
const closeImage = require('@common/assets/imgs/ico_green_close.png');

const displayNames = {'firstName': 'First name', 'lastName': 'Last name', 'emailAddress': 'Email address'};
const refNames = ['firstName', 'lastName', 'emailAddress',];
const unrequiredRefNames = ['phoneNumber'];


class Profile extends Component {

  static renderLeftButton(props) {
    return (
      <TouchableOpacity 
        style={styles.buttonWrapper}
        onPress={() => props.onLeft()}
      >
        <Image source={backImage} style={styles.imageBack} resizeMode="contain" />
      </TouchableOpacity>
    );
  }

  static renderRightButton(props) {
    return (
      <TouchableOpacity
        onPress={() => props.onRight()}
        style={styles.buttonWrapper}
      >
        <Text style={styles.textBarItem}>Edit</Text>
      </TouchableOpacity>
    );
  }


  static renderTitle(props) {
    return (
      <Text style={styles.textNavTitle}>My profile</Text>
    );
  }

  static propTypes = {
    selectedUserName: PropTypes.string,
  }


  static defaultProps = {
    selectedUserName: '',
  }


  constructor(props) {
    super(props);

    this.state = {
      selectedImageFile: null,
      currentImage: null,
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      keyboardHeight: new Animated.Value(0),
      editable: false,
    };

    this.firstNameRef = this.updateRef.bind(this, 'firstName');
    this.lastNameRef = this.updateRef.bind(this, 'lastName');
    this.emailAddressRef = this.updateRef.bind(this, 'emailAddress');
    this.phoneNumberRef = this.updateRef.bind(this, 'phoneNumber');
  }


  componentDidMount() {
    this._isMounted = true;
    Actions.refresh({onLeft: this.onBack.bind(this)})
    Actions.refresh({onRight: this.onEdit.bind(this)})
    this.props.getMyProfile();
  }


  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.status.type === types.USER_PROFILE_REQUEST && nextProps.status.type === types.USER_PROFILE_SUCCESS) {
      this.setState({
        firstName: nextProps.profile.firstName,
        lastName: nextProps.profile.lastName,
        emailAddress: nextProps.profile.email,
        phoneNumber: nextProps.profile.phoneNumbers[0],
        currentImage: {uri: nextProps.profile.photo.fullEmailPhotoUrl}
      });
    }
  }

  onBack() {
    Actions.pop();
  }


  onEdit() {
    // let { editable } = this.state;
    this.setState({editable: true});
  }

  validateInputs() {
    let errors = {};
    refNames.forEach((name) => {
      let value = this[name].value();

      if (!value) {
        errors[name] = displayNames[name] + ' is required';
      } else {
        if ('email' === name) {
          isValid = EmailValidator.validate(value);
          if (!isValid) {
            errors[name] = 'Invalid email';
          }
        }
      }
    });

    unrequiredRefNames.forEach((name) => {
      let value = this[name].value();
      if (value!==undefined && 'emailAddress' === name && value != '') {
        if (!EmailValidator.validate(value)) {
          errors[name] = 'Invalid email';
        }
      }
    });

    this.setState({ errors });
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      this.onContinue();
    } else {
    }
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  onFocus() {
    let { errors = {} } = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({ errors });
  }

  onChangeText(text) {
    refNames
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  }

  onRemoveImage() {
    this._isMounted && this.setState((state) => {
      state.currentImage = cameraImage;
      state.selectedImageFile = null;
      return state;
    });
  }

  get renderCameraImage() {
    return (
      <View style={styles.imageContainer}>
        <TouchableOpacity 
          style={styles.cameraButtonWrapper}
          onPress={this.onOpenCamera.bind(this)}
          activeOpacity={this.state.editable ? 0.6 : 1}
        >
          <Image 
            source={this.state.currentImage} 
            style={this.state.currentImage === cameraImage ? styles.imageCamera : styles.imageTake} 
            resizeMode="cover" 
          />

          {
            this.state.currentImage !== cameraImage && this.state.editable == true ?
              <TouchableOpacity 
                style={styles.closeButtonWrapper}
                onPress={this.onRemoveImage.bind(this)}
              >
                <Image source={closeImage} style={styles.imageClose} resizeMode="contain" />
              </TouchableOpacity>
            : 
              null
          }
        </TouchableOpacity> 
      </View>
    );    
  }

  onOpenCamera() {
    if (this.state.editable == false) {
      return;
    }
    const options = {
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
          state.currentImage = source,
          state.selectedImageFile = response;
          return state;
        });

        //do something here...
      }
    });
  }

  onContinue() {
    Actions.pop();
  }

  render() {
    let { errors = {}, ...data } = this.state;
    const {firstName, lastName, phoneNumber, emailAddress, editable, } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <Spinner />
        <KeyboardAwareScrollView style={styles.mainContentContainer}>
          {this.renderCameraImage}
          <TextField
            ref={this.firstNameRef}
            label='First name'
            value={firstName}
            returnKeyType={'next'}
            error={errors.firstName}
            onChangeText={(value)=>this.setState({firstName : value})}
            onFocus={() => this.onFocus()}
            onSubmitEditing={() => this.lastName.focus()}
            editable={editable}

            textColor={commonStyles.primaryBlackColor}
            labelFontSize={13}
            fontSize={15}
            fontFamily={'Averta'}
            fontWeight={'600'}
            autoCapitalize={'words'}
            tintColor = {commonStyles.primaryGreenColor}
            titleTextStyle={globalStyle.tfTitleStyle}
            labelTextStyle={globalStyle.tfLabelStyle}
            affixTextStyle={globalStyle.tfAffixStyle}
            errorColor={commonStyles.themeColor}
            autoCorrect={false}
            baseColor={commonStyles.lightGreyColor}
            inputContainerStyle={styles.textFieldInputContainerStyle}
            containerStyle={styles.textFieldContainerStyle}
          />

          <TextField
            ref={this.lastNameRef}
            label='Last name'
            value={lastName}
            returnKeyType={'next'}
            error={errors.lastName}
            onChangeText={(value)=>this.setState({lastName: value})}
            onFocus={() => this.onFocus()}
            onSubmitEditing={() => this.emailAddress.focus()}
            editable={editable}

            textColor={commonStyles.primaryBlackColor}
            labelFontSize={13}
            fontSize={15}
            fontFamily={'Averta'}
            fontWeight={'600'}
            autoCapitalize={'words'}
            tintColor = {commonStyles.primaryGreenColor}
            titleTextStyle={globalStyle.tfTitleStyle}
            labelTextStyle={globalStyle.tfLabelStyle}
            affixTextStyle={globalStyle.tfAffixStyle}
            errorColor={commonStyles.themeColor}
            autoCorrect={false}
            baseColor={commonStyles.lightGreyColor}
            inputContainerStyle={styles.textFieldInputContainerStyle}
            containerStyle={styles.textFieldContainerStyle}
          />

          <TextField
            ref={this.emailAddressRef}
            label='Email address'
            value={emailAddress}
            returnKeyType={'next'}
            error={errors.emailAddress}
            keyboardType={'email-address'}
            onChangeText={(value)=>this.setState({emailAddress: value})}
            onFocus={() => this.onFocus()}
            onSubmitEditing={() => this.phoneNumber.focus()}
            editable={editable}

            textColor={commonStyles.primaryBlackColor}
            labelFontSize={13}
            fontSize={15}
            fontFamily={'Averta'}
            fontWeight={'600'}
            autoCapitalize={'words'}
            tintColor = {commonStyles.primaryGreenColor}
            titleTextStyle={globalStyle.tfTitleStyle}
            labelTextStyle={globalStyle.tfLabelStyle}
            affixTextStyle={globalStyle.tfAffixStyle}
            errorColor={commonStyles.themeColor}
            autoCorrect={false}
            baseColor={commonStyles.lightGreyColor}
            inputContainerStyle={styles.textFieldInputContainerStyle}
            containerStyle={styles.textFieldContainerStyle}
          />

          <TextField
            ref={this.phoneNumberRef}
            label='Phone number (optional)'
            value={phoneNumber}
            returnKeyType={'done'}
            keyboardType={'phone-pad'}
            onChangeText={(value)=>this.setState({phoneNumber : value})}
            onFocus={() => this.onFocus()}
            onSubmitEditing={() => this.validateInputs()}
            editable={editable}

            textColor={commonStyles.primaryBlackColor}
            labelFontSize={13}
            fontSize={15}
            fontFamily={'Averta'}
            fontWeight={'600'}
            autoCapitalize={'words'}
            tintColor = {commonStyles.primaryGreenColor}
            titleTextStyle={globalStyle.tfTitleStyle}
            labelTextStyle={globalStyle.tfLabelStyle}
            affixTextStyle={globalStyle.tfAffixStyle}
            errorColor={commonStyles.themeColor}
            autoCorrect={false}
            baseColor={commonStyles.lightGreyColor}
            inputContainerStyle={styles.textFieldInputContainerStyle}
            containerStyle={styles.textFieldContainerStyle}
          />
        </KeyboardAwareScrollView>
        {
          editable ?
          <TouchableHighlight 
            style={[globalStyle.buttonGreenWrapper, globalStyle.buttonBottom]}
            onPress={() => this.onContinue()}
            underlayColor={commonStyles.greenActiveBackgroundColor}
          >
            <Text style={globalStyle.buttonText}>Save</Text>
          </TouchableHighlight>
          :
          <View style={[globalStyle.buttonGreyWrapper, globalStyle.buttonBottom]}>
            <Text style={globalStyle.buttonText}>Save</Text>
          </View>
        }
      </View>
    );
  }
}


const mapStateToProps = ({ status, profile }) => {
  return {
    status,
    profile,
  }
};


const mapDispatchToProps = {
  getMyProfile,
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
