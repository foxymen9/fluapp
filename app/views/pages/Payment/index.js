import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  KeyboardAvoidingView,
  Animated,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-picker';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EmailValidator from 'email-validator';

import { TextInputMask } from 'react-native-masked-text';

import * as commonStyles from '@common/styles/commonStyles';
import globalStyle from '@common/styles/commonStyles';
import { styles } from './styles';

import {calculateYearDiff} from '@common/helpers/helpers';

const cameraImage = require('@common/assets/imgs/ico_general_small_camera_grey.png');
const backImage = require('@common/assets/imgs/ico_nav_back_white.png');

const displayNames = {'cardnumber': 'Card Number', 'nameoncard': 'Name on the card', 'postalcode': 'Postal Code'};
const refNames = ['cardnumber', 'nameoncard', 'postalcode']

export default class VerifyAccount extends Component {
  
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
      <Text style={styles.textTitle}>Verify your account</Text>
    );
  }


  constructor(props) {
    super(props);
    
    this.state = {
      card_number:'',
      keyboardHeight: new Animated.Value(0),
    };

    this.cardNumber = '';
    this.workingNumber = '';

    this.cardnumberRef = this.updateRef.bind(this, 'cardnumber');
    this.nameoncardRef = this.updateRef.bind(this, 'nameoncard');
    this.postalcodeRef = this.updateRef.bind(this, 'postalcode');
  }

  componentDidMount() {
    this._isMounted = true;
    this.keyboardWillShowSubscription = Keyboard.addListener('keyboardWillShow', (e) => this.keyboardWillShow(e));
    this.keyboardWillHideSubscription = Keyboard.addListener('keyboardWillHide', (e) => this.keyboardWillHide(e));
    this.cardnumber.focus();
  }


  componentWillUnmount() {
    this._isMounted = false;
    this.keyboardWillShowSubscription.remove();
    this.keyboardWillHideSubscription.remove();
  }


  keyboardWillShow(e) {
    console.log(e);
    Animated.timing(
      this.state.keyboardHeight,
      {
        toValue:  e.endCoordinates.height,
        duration: e.duration,
      }
    ).start();
  }


  keyboardWillHide(e) {
    console.log(e);
    Animated.timing(
      this.state.keyboardHeight,
      {
        toValue:  e.endCoordinates.height,
        duration: e.duration,
      }
    ).start();
  }

  formatCardNumber (number) {
    var x = number.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
    number = !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4]? '-' + x[4] : '');
		this.setState({card_number:number});
  }

  hashCardNumber (number) {

    // console.log('original text : ', number);
    // let changeLocation = -1;
    // const splitNumber = number.split(' ');

    // let j = 0;
    // for (let i = 0 ; i < splitNumber.length ; i ++) {
    //   if ((j != 3) && (splitNumber[i].length != 0) && (splitNumber[i].length < 4)) {
    //     changeLocation = j;
    //     break;
    //   }

    //   if (splitNumber[i].length != 0) {
    //     j++;
    //   }
    // }

    // let completedNumbers = '';
    // for (let i = 0 ; i < splitNumber.length ; i ++) {
    //   if ((splitNumber[i].length != 0) && (splitNumber[i].length < 4)) {
    //     completedNumbers += 'splitNumber[i]';
    //     this.workingNumber = splitNumber[i];
    //     changeLocation = j;
    //   } else if ((splitNumber[i].length != 0) && (splitNumber[i].length == 4)) {
    //     completedNumbers += splitNumber[i];
    //     j++;
    //   } else if (splitNumber[i].length > 4) {
    //     completedNumbers += splitNumber[i];//.slice(0, 4);
    //     this.workingNumber = splitNumber[i][4];
    //     j ++;
    //     changeLocation = j;
    //   }
    // }

    // console.log('split length : ', splitNumber.length, changeLocation, completedNumbers, this.workingNumber);
    const placeholder = 'X';
    let j = 0;
    let realNumber = '';
    for (let i = 0 ; i < number.length ; i++) {
      if (number[i] === placeholder) {
        realNumber += this.cardNumber[j];
        j ++;
      } else {
        realNumber += number[i];
      }
    }

    let x = realNumber.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);

    this.cardNumber = x[1] + x[2] + x[3] + x[4];

    for (let i = 1 ; i < 4 ; i++) {
      if (x[i].length === 4) {
        x[i] = placeholder + placeholder + placeholder + placeholder;
      }
    }

    number = !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4]? '-' + x[4] : '');

    this.setState({card_number:number});
  }

  formatPostalCode (value) {
    let x = value.replace(/\W/g, '').match(/([0-9a-zA-Z]{0,3})([0-9a-zA-Z]{0,3})/);
    value = !x[2] ? x[1] : x[1] + ' ' + x[2] + (x[3] ? '-' + x[3] : '');
    value = value.toUpperCase();
    this.setState({postalcode:value});
  }

  isValidePostalCode(postalCode)
  {
    // First check for the pattern
    if(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postalCode)) {
      return true;
    }
    return false;
  };

  validateInputs() {
    let errors = {};

    refNames
      .forEach((name) => {
        let value = this[name].value();

        if (!value) {
          errors[name] = displayNames[name] + ' is required';
        } else {
          if ('email' === name) {
            if (!EmailValidator.validate(value)) {
              errors[name] = 'Invalid email';
            }
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

    if (this.cardnumber.isFocused()) {
      this.setState({card_number:''});
    }

    for (let name in errors) {
      let ref = this[name];

      if (name === 'cardnumber') {
        this.setState({card_number:''});
      }

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

  onNumberBlur() {
    this.hashCardNumber(this.state.card_number);
  }


  onContinue() {
    Keyboard.dismiss();
    Actions.VerifyPhoneNumber();
  }


  render() {
    let { errors = {}, ...data } = this.state;
    let { cardnumber = '', } = data;
    const {postalcode} = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content'/>
        <View style={styles.mainContentContainer}>
          <TextField
            key='cardnumber'
            ref={this.cardnumberRef}
            label={'Card number'}
            fontSize={15}
            fontFamily={'Averta'}
            fontWeight={'bold'}
            keyboardType={'number-pad'}
            returnKeyType='done'
            tintColor = {commonStyles.primaryGreenColor}
            titleTextStyle={globalStyle.tfTitleStyle}
            labelTextStyle={globalStyle.tfLabelStyle}
            affixTextStyle={globalStyle.tfAffixStyle}
            error={errors.cardnumber}
            errorColor={commonStyles.themeColor}
            autoCorrect={false}
            baseColor={commonStyles.lightGreyColor}
            onChangeText={(card_number) => this.formatCardNumber(card_number)}
            // onChangeText={(value) => this.setState({card_number:value})}
            onFocus={() => this.onFocus()}
            onBlur={() => this.onNumberBlur()}
            value = {this.state.card_number}
            onSubmitEditing={()=>this.nameoncard.focus()}
          />
          <TextField
            key='nameoncard'
            ref={this.nameoncardRef}
            label={'Name on the card'}
            fontSize={15}
            fontFamily={'Averta'}
            fontWeight={'bold'}
            returnKeyType='next'
            autoCapitalize={'words'}
            tintColor = {commonStyles.primaryGreenColor}
            titleTextStyle={globalStyle.tfTitleStyle}
            labelTextStyle={globalStyle.tfLabelStyle}
            affixTextStyle={globalStyle.tfAffixStyle}
            error={errors.nameoncard}
            errorColor={commonStyles.themeColor}
            autoCorrect={false}
            baseColor={commonStyles.lightGreyColor}
            onChangeText={()=>this.onChangeText()}
            onFocus={() => this.onFocus()}
            value={data.nameoncard}
            onSubmitEditing={()=>this.postalcode.focus()}
          />
          <TextField
            key='postalcode'
            ref={this.postalcodeRef}
            label={'Postal code'}
            keyboardType={'ascii-capable'}
            fontSize={15}
            fontFamily={'Averta'}
            fontWeight={'bold'}
            returnKeyType='go'
            autoCapitalize={'characters'}
            tintColor = {commonStyles.primaryGreenColor}
            titleTextStyle={globalStyle.tfTitleStyle}
            labelTextStyle={globalStyle.tfLabelStyle}
            affixTextStyle={globalStyle.tfAffixStyle}
            error={errors.postalcode}
            errorColor={commonStyles.themeColor}
            autoCorrect={false}
            baseColor={commonStyles.lightGreyColor}
            onChangeText={(value) => this.formatPostalCode(value)}
            onFocus={() => this.onFocus()}
            value={postalcode}
            onSubmitEditing={()=>this.validateInputs()}
          />
          <View style={{flex: 1}} />
        </View>
        <Animated.View style={[styles.bottomContainer, {marginBottom: this.state.keyboardHeight}]}>
          <TouchableHighlight 
            style={[globalStyle.buttonGreenWrapper, globalStyle.buttonBottom]}
            onPress={()=>this.validateInputs()}
            underlayColor={commonStyles.greenActiveBackgroundColor}
          >
            <Text style={globalStyle.buttonText}>Sign up</Text>
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  }
}