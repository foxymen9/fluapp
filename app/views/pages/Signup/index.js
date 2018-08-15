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

import * as commonStyles from '@common/styles/commonStyles';
import globalStyle from '@common/styles/commonStyles';
import { styles } from './styles';
import { 
  getAuth2,
  checkEmail,
  signup,
  getUserDetail,
  updateUserInfo,
  getAttachments,
} from '@redux/user/actions';
import * as types from '@redux/actionTypes';


const cameraImage = require('@common/assets/imgs/ico_general_small_camera_grey.png');
const backImage = require('@common/assets/imgs/ico_nav_back_white.png');
const closeImage = require('@common/assets/imgs/ico_green_close.png');

const displayNames = {'firstName': 'First name', 'lastName': 'Last name', 'emailAddress': 'Email address'};
const refNames = ['firstName', 'lastName', 'emailAddress',];


class Signup extends Component {

  static renderLeftButton(props) {
    return (
      <TouchableOpacity 
        style={styles.buttonWrapper}
        onPress={() => Actions.pop()}
      >
        <Image source={backImage} style={styles.imageBack} resizeMode="contain" />
      </TouchableOpacity>
    );
  }


  static renderRightButton(props) {
    if (props.isSignupMode) {
      return <View />
    }
    return (
      <TouchableOpacity
        onPress={() => props.onRight()}
        style={styles.buttonWrapper}
      >
        <Text style={styles.textBarItem}>+</Text>
      </TouchableOpacity>
    );
  }


  static renderTitle(props) {
    return (
      <Text style={styles.textNavTitle}>{props.isSignupMode ? 'Sign up' : 'My profile'}</Text>
    );
  }


  static propTypes = {
    isSignupMode: PropTypes.bool,
  }


  static defaultProps = {
    isSignupMode: true,
  }


  constructor(props) {
    super(props);

    this.state = {
      selectedImageFile: null,
      currentImage: cameraImage,
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      keyboardHeight: new Animated.Value(0),
      loading: false,
      edited: props.isSignupMode ? true : false,
    };

    this.firstNameRef = this.updateRef.bind(this, 'firstName');
    this.lastNameRef = this.updateRef.bind(this, 'lastName');
    this.emailAddressRef = this.updateRef.bind(this, 'emailAddress');
    this.phoneNumberRef = this.updateRef.bind(this, 'phoneNumber');
  }


  componentDidMount() {
    this._isMounted = true;
    if (!this.props.isSignupMode) {
      Actions.refresh({
        onRight: this.onAddInsuranceCard.bind(this)
      });

      this.props.getAttachments(this.props.user.account.Id);
      const {
        Name, 
        Patient_Email__c,
        Phone,
      } = this.props.user.account;
      
      const arrayName = Name.split(' ');
      let firstName = '';
      let lastName = '';
      if (arrayName.length > 0) {
        firstName = arrayName[0];
      }
      if (arrayName.length > 1) {
        lastName = arrayName[1];
      }
      this.setState({
        firstName: firstName,
        lastName: lastName,
        emailAddress: Patient_Email__c,
        phoneNumber: Phone,
      })
    }
  }


  componentWillUnmount() {
    this._isMounted = false;
  }
  

  componentWillReceiveProps(nextProps) {
    if (Actions.currentScene !== 'Signup') {
      return;
    }
    if (nextProps.status.type === types.USER_GET_AUTH2_REQUEST || nextProps.status.type === types.CHECK_EMAIL_EXISTING_REQUEST || nextProps.status.type === types.GET_ATTACHMENTS_REQUEST) {
      this.setState({ loading: true });
    } else if (this.props.status.type === types.USER_GET_AUTH2_REQUEST && nextProps.status.type === types.USER_GET_AUTH2_SUCCESS) {
      this.props.checkEmail(this.state.emailAddress)
    } else if (this.props.status.type === types.USER_GET_AUTH2_REQUEST && nextProps.status.type === types.USER_GET_AUTH2_FAILED) {
      this.setState({ loading: false });
    } else if (this.props.status.type === types.CHECK_EMAIL_EXISTING_REQUEST && nextProps.status.type === types.CHECK_EMAIL_EXISTING_SUCCESS) {
      if (this.props.isSignupMode) {
        this.props.signup(
          this.state.emailAddress,
          this.state.firstName + ' ' + this.state.lastName,
          this.state.phoneNumber
        );
      } else {
        this.props.updateUserInfo(
          this.props.user.account.Id,
          this.state.emailAddress,
          this.state.firstName + ' ' + this.state.lastName,
          this.state.phoneNumber
        );
      }
    } else if (this.props.status.type === types.CHECK_EMAIL_EXISTING_REQUEST && nextProps.status.type === types.CHECK_EMAIL_EXISTING_FAILED) {
      this.setState({ loading: false });
    } else if (this.props.status.type === types.USER_SIGNUP_REQUEST && nextProps.status.type === types.USER_SIGNUP_SUCCESS) {
      this.props.getUserDetail(nextProps.user.account.Id);
    } else if (this.props.status.type === types.USER_SIGNUP_REQUEST && nextProps.status.type === types.USER_SIGNUP_FAILED) {
      this.setState({ loading: false });
    } else if (this.props.status.type === types.GET_USER_DETAIL_REQUEST && nextProps.status.type === types.GET_USER_DETAIL_SUCCESS) {
      this.setState({ loading: false });
      Actions.Main();
    } else if (this.props.status.type === types.GET_USER_DETAIL_REQUEST && nextProps.status.type === types.GET_USER_DETAIL_FAILED) {
      this.setState({ loading: false });
    } else if (this.props.status.type === types.UPDATE_USER_DETAIL_REQUEST && nextProps.status.type === types.UPDATE_USER_DETAIL_SUCCESS) {
      this.setState({ loading: false });
      Actions.Main();
    } else if (this.props.status.type === types.UPDATE_USER_DETAIL_REQUEST && nextProps.status.type === types.UPDATE_USER_DETAIL_FAILED) {
      this.setState({ loading: false });
    } else if (this.props.status.type === types.GET_ATTACHMENTS_REQUEST && nextProps.status.type === types.GET_ATTACHMENTS_SUCCESS) {
      this.setState({ loading: false });
    } else if (this.props.status.type === types.GET_ATTACHMENTS_REQUEST && nextProps.status.type === types.GET_ATTACHMENTS_FAILED) {
      this.setState({ loading: false });
    }
  }


  onAddInsuranceCard() {
    Actions.Payment();
  }


  validateInputs() {
    let errors = {};
    refNames.forEach((name) => {
      let value = this[name].value();

      if (!value) {
        errors[name] = displayNames[name] + ' is required';
      } else {
        if ('emailAddress' === name) {
          isValid = EmailValidator.validate(value);
          if (!isValid) {
            errors[name] = 'Invalid email';
          }
        }
      }
    });

    this.setState({ errors });
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      this.onContinue();
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
        >
          <Image 
            source={this.state.currentImage} 
            style={this.state.currentImage === cameraImage ? styles.imageCamera : styles.imageTake} 
            resizeMode="cover" 
          />

          {
            this.state.currentImage !== cameraImage ?
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
          state.currentImage = source,
          state.selectedImageFile = response;
          return state;
        });
        //do something here...
      }
    });
  }

  checkEdited() {
    const {
      Name, 
      Patient_Email__c,
      Phone,
    } = this.props.user.account;

    let edited = false;
    const changedName = this.state.firstName + ' ' + this.state.lastName;

    if (Name !== changedName) {
      edited = true;
    } else if (Patient_Email__c !== this.state.emailAddress) {
      edited = true;
    } else if (Phone !== this.state.phoneNumber) {
      edited = true;
    }
    this.setState({
      edited,
    });
  }

  onChangeFirstName(value) {
    this.setState({
      firstName : value,
    }, () => {
      this.checkEdited();
    });
  }


  onChangeLastName(value) {
    this.setState({
      lastName: value,
    }, () => {
      this.checkEdited();
    });
  }


  onChangeEmail(value) {
    this.setState({
      emailAddress: value,
    }, () => {
      this.checkEdited();
    });
  }


  onChangePhoneNumber(value) {
    this.setState({
      phoneNumber : value,
    }, () => {
      this.checkEdited();
    });
  }


  onContinue() {
    if (this.props.isSignupMode) {
      this.props.getAuth2();
    } else {
      this.props.checkEmail(this.state.emailAddress)
    }
  }


  render() {
    let { errors = {}, } = this.state;
    const {firstName, lastName, phoneNumber, emailAddress} = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <Spinner visible={this.state.loading} />
        <KeyboardAwareScrollView style={styles.mainContentContainer}>
          {this.renderCameraImage}
          <TextField
            ref={this.firstNameRef}
            label='First name'
            value={firstName}
            returnKeyType={'next'}
            error={errors.firstName}
            onChangeText={(value) => this.onChangeFirstName(value)}
            onFocus={() => this.onFocus()}
            onSubmitEditing={() => this.lastName.focus()}

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
            onChangeText={(value) => this.onChangeLastName(value)}
            onFocus={() => this.onFocus()}
            onSubmitEditing={() => this.emailAddress.focus()}

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
            onChangeText={(value) => this.onChangeEmail(value)}
            onFocus={() => this.onFocus()}
            onSubmitEditing={() => this.phoneNumber.focus()}

            textColor={commonStyles.primaryBlackColor}
            labelFontSize={13}
            fontSize={15}
            fontFamily={'Averta'}
            fontWeight={'600'}
            autoCapitalize={'none'}
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
            returnKeyType={'done'}
            keyboardType={'phone-pad'}
            onChangeText={(value) => this.onChangePhoneNumber(value)}
            onFocus={() => this.onFocus()}
            onSubmitEditing={() => this.validateInputs()}

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
          <TouchableHighlight 
            style={[this.state.edited ? globalStyle.buttonGreenWrapper : globalStyle.buttonGreyWrapper, globalStyle.buttonBottom]}
            disabled={!this.state.edited}
            onPress={()=>this.validateInputs()}
            underlayColor={commonStyles.greenActiveBackgroundColor}
          >
            <Text style={globalStyle.buttonText}>{this.props.isSignupMode ? 'Sign up' : 'Save'}</Text>
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
  getAuth2,
  checkEmail,
  signup,
  getUserDetail,
  updateUserInfo,
  getAttachments,
};


export default connect(mapStateToProps, mapDispatchToProps)(Signup);
