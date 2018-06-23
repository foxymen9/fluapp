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

import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-picker';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EmailValidator from 'email-validator';

import * as commonStyles from '@common/styles/commonStyles';
import globalStyle from '@common/styles/commonStyles';
import { styles } from './styles';

const cameraImage = require('@common/assets/imgs/ico_general_small_camera_grey.png');
const greenTickImage = require('@common/assets/imgs/green_tick.png');
const greyTickImage = require('@common/assets/imgs/gray_tick.png');
const ico_avatar_lisa = require('@common/assets/imgs/avatars/ico_avatar_lisa.png');
const backImage = require('@common/assets/imgs/ico_nav_back_white.png');
const closeImage = require('@common/assets/imgs/ico_green_close.png');

const TitleData = [
  { value: 'Mr.' },
  { value: 'Mrs.' },
];

const displayNames = {'firstName': 'First name', 'lastName': 'Last name', 'dateBirth': 'Date of birth', 'password': 'Password', 'confirmPassword':'Password confirmation', 'emailAddress': 'Email address'};
const refNames = ['firstName', 'lastName', 'dateBirth', 'password', 'emailAddress', 'confirmPassword'];
const unrequiredRefNames = ['phoneNumber'];


export default class Profile extends Component {

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


  onBack() {
    Actions.pop();
  }


  onEdit() {
    // let { editable } = this.state;
    this.setState({editable: true});
  }


  constructor(props) {
    super(props);

    this.state = {
      selectedImageFile: null,
      currentImage: ico_avatar_lisa,
      title: 'Mrs.',
      firstName: 'Lisa',
      lastName: 'Allan',
      emailAddress: 'lisa.allan@alexis.ca',
      dateBirth: '02/20/1989',
      keyboardHeight: new Animated.Value(0),
      editable: false,
    };

    this.firstNameRef = this.updateRef.bind(this, 'firstName');
    this.middleNameRef = this.updateRef.bind(this, 'middleName');
    this.lastNameRef = this.updateRef.bind(this, 'lastName');
    this.emailAddressRef = this.updateRef.bind(this, 'emailAddress');
    this.phoneNumberRef = this.updateRef.bind(this, 'phoneNumber');
    this.dateBirthRef = this.updateRef.bind(this, 'dateBirth');
    this.passwordRef = this.updateRef.bind(this, 'password');
    this.confirmPasswordRef = this.updateRef.bind(this, 'confirmPassword');
  }


  componentDidMount() {
    this._isMounted = true;
    Actions.refresh({onLeft: this.onBack.bind(this)})
    Actions.refresh({onRight: this.onEdit.bind(this)})
  }


  componentWillUnmount() {
    this._isMounted = false;
  }


  checkCapitalLetter(text) {
    // match all capital letters and store in array letters
    const letters = text.match(/[A-Z]/g);

    if(!letters){
      return false;
    } else {
      return true;
    }    
  }


  checkNumberOne(text) {
    // match all capital letters and store in array letters
    const letters = text.match(/\d/g);

    if(!letters){
      return false;
    } else {
      return true;
    }    
  }


  onChangeNewPassword(text) {
    this.setState({newPassword: text});

    // check 8 characters
    if (text.length >= 8) {
      this.setState({isEightCharacters: true});
    } else {
      this.setState({isEightCharacters: false});
    }

    // check capital letter
    if (this.checkCapitalLetter(text)) {
      this.setState({isCapitalLetter: true});
    } else {
      this.setState({isCapitalLetter: false});
    }

    // check one number
    if (this.checkNumberOne(text)) {
      this.setState({isOneNumber: true});
    } else {
      this.setState({isOneNumber: false});
    }

    //check match
    if ((text.length > 0) && (text === this.state.confirmNewPassword)) {
      this.setState({isMatch: true});
    } else {
      this.setState({isMatch: false});
    }
  }


  onChangeConfirmNewPassword(text) {
    this.setState({confirmNewPassword: text});

    //check match
    if ((text.length > 0) && (text === this.state.newPassword)) {
      this.setState({isMatch: true});
    } else {
      this.setState({isMatch: false});
    }
  }


  validateInputs() {
    let errors = {};
    const {isEightCharacters, isCapitalLetter, isOneNumber, isMatch} = this.state;

    if (!isEightCharacters || !isCapitalLetter || !isOneNumber) {
      errors.password = 'Your password does not meet the requirements';
    }
    if (!isMatch) {
      errors.confirmPassword = 'Your passwords do not match';
    }

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
        else if ('dateBirth' === name) {
          isValid = this.isValidDate(value);
          if (!isValid) {
            errors[name] = 'Invalid date';
          }
        }
        else if ('password' === name && value.length < 6) {
          errors[name] = 'Too short';
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


  formatDate (number) {
    let x = number.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
    number = !x[2] ? x[1] : x[1] + '/' + x[2] + (x[3] ? '/' + x[3] : '');
    this.setState({dateBirth:number});
  }


  isValidDate(dateString) {
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
      return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
      return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  };


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


  onChangeTitle(text) {
    this.setState({title: text});
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
    const {firstName, lastName, phoneNumber, dateBirth, emailAddress} = this.state;
    Actions.pop();
  }


  render() {
    let { errors = {}, ...data } = this.state;
    const {firstName, lastName, phoneNumber, dateBirth, emailAddress, isEightCharacters, isCapitalLetter, isOneNumber, isMatch, editable, title} = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <KeyboardAwareScrollView style={styles.mainContentContainer}>
          {this.renderCameraImage}
          <View style={styles.rowContainer}>
            {
              editable ?
              <Dropdown
                containerStyle={styles.dropDownTitle}
                value={title}
                label='Title'
                data={TitleData}
                fontSize={15}
                labelFontSize={13}
                fontWeight={'600'}
                titleTextStyle={globalStyle.tfTitleStyle}
                labelTextStyle={globalStyle.tfLabelStyle}
                affixTextStyle={globalStyle.tfAffixStyle}

                onChangeText={this.onChangeTitle.bind(this)}
              />
              :
              <TextField
                label='Title'
                value={title}
                returnKeyType={'next'}
                onChangeText={(value)=>this.setState({title : value})}
                editable={false}

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
                containerStyle={styles.dropDownTitle}
              />
            }
            
            <TextField
              ref={this.firstNameRef}
              label='First name'
              value={firstName}
              returnKeyType={'next'}
              error={errors.firstName}
              onChangeText={(value)=>this.setState({firstName : value})}
              onFocus={() => this.onFocus()}
              onSubmitEditing={() => this.middleName.focus()}
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
          </View>
          <TextField
            ref={this.middleNameRef}
            label='Middle name (optional)'
            returnKeyType={'next'}
            onChangeText={(value)=>this.setState({middleName : value})}
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
            onSubmitEditing={() => this.password.focus()}
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
            ref={this.passwordRef}
            label={'Password'}
            fontSize={15}
            fontFamily={'Averta'}
            fontWeight={'bold'}
            secureTextEntry={true}
            returnKeyType='go'
            tintColor = {commonStyles.primaryGreenColor}
            titleTextStyle={globalStyle.tfTitleStyle}
            labelTextStyle={globalStyle.tfLabelStyle}
            affixTextStyle={globalStyle.tfAffixStyle}
            error={errors.password}
            errorColor={commonStyles.themeColor}
            autoCorrect={false}
            baseColor={commonStyles.lightGreyColor}
            value={this.state.password}
            onChangeText={this.onChangeNewPassword.bind(this)}
            onFocus={() => this.onFocus()}
            onSubmitEditing={() => this.confirmPassword.focus()}
            editable={editable}
          />
          <View style={styles.checkContainer}>
          { isEightCharacters ? 
            <View style={styles.checkRowContainer}>
              <Image source={greenTickImage} style={styles.imageTick} resizeMode="contain" />
              <Text style={styles.textGreenCheck}>8 characters</Text>
            </View>
            :
            <View style={styles.checkRowContainer}>
              <Image source={greyTickImage} style={styles.imageTick} resizeMode="contain" />
              <Text style={styles.textGreyCheck}>8 characters</Text>
            </View>
          }
          { isCapitalLetter ? 
            <View style={styles.checkRowContainer}>
              <Image source={greenTickImage} style={styles.imageTick} resizeMode="contain" />
              <Text style={styles.textGreenCheck}>Capital letter</Text>
            </View>
            :
            <View style={styles.checkRowContainer}>
              <Image source={greyTickImage} style={styles.imageTick} resizeMode="contain" />
              <Text style={styles.textGreyCheck}>Capital letter</Text>
            </View>
          }
          { isOneNumber ? 
            <View style={styles.checkRowContainer}>
              <Image source={greenTickImage} style={styles.imageTick} resizeMode="contain" />
              <Text style={styles.textGreenCheck}>One number</Text>
            </View>
            :
            <View style={styles.checkRowContainer}>
              <Image source={greyTickImage} style={styles.imageTick} resizeMode="contain" />
              <Text style={styles.textGreyCheck}>One number</Text>
            </View>
          }
          </View>

          <TextField
            ref={this.confirmPasswordRef}
            label='Confirm new password'
            fontSize={15}
            fontFamily={'Averta'}
            secureTextEntry={true}
            returnKeyType='go'
            tintColor = {commonStyles.primaryGreenColor}
            titleTextStyle={globalStyle.tfTitleStyle}
            labelTextStyle={globalStyle.tfLabelStyle}
            affixTextStyle={globalStyle.tfAffixStyle}
            error={errors.confirmPassword}
            errorColor={commonStyles.themeColor}
            autoCorrect={false}
            baseColor={commonStyles.lightGreyColor}
            value={this.state.confirmNewPassword}
            onChangeText={this.onChangeConfirmNewPassword.bind(this)}
            onFocus={() => this.onFocus()}
            onSubmitEditing={() => this.phoneNumber.focus()}
            editable={editable}
          />

          <TextField
            ref={this.phoneNumberRef}
            label='Phone number (optional)'
            returnKeyType={'done'}
            keyboardType={'phone-pad'}
            onChangeText={(value)=>this.setState({phoneNumber : value})}
            onFocus={() => this.onFocus()}
            onSubmitEditing={() => this.dateBirth.focus()}
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
            ref={this.dateBirthRef}
            label='Date of birth'
            returnKeyType={'done'}
            keyboardType={'numeric'}
            placeholder='MM/DD/YYYY'
            error={errors.dateBirth}
            onChangeText={(number) => this.formatDate(number)}
            value={dateBirth}
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
            onPress={()=>this.onContinue()}
            underlayColor={commonStyles.greenActiveBackgroundColor}
          >
            <Text style={globalStyle.buttonText}>Save</Text>
          </TouchableHighlight>
          :
          <TouchableHighlight 
            style={[globalStyle.buttonGreyWrapper, globalStyle.buttonBottom]}
            onPress={()=>this.onContinue()}
            underlayColor={commonStyles.lightGreyButtonActiveColor}
          >
            <Text style={globalStyle.buttonText}>Save</Text>
          </TouchableHighlight>
        }
      </View>
    );
  }
}