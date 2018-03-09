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
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EmailValidator from 'email-validator';
import { TextInputMask } from 'react-native-masked-text';
import SplashScreen from 'react-native-splash-screen'

import * as commonStyles from '@common/styles/commonStyles';
import globalStyle from '@common/styles/commonStyles';
import { styles } from './styles';

import {calculateYearDiff} from '@common/helpers/helpers';

const backImage = require('@common/assets/imgs/ico_nav_back_white.png');

const displayNames = {'email': 'Email', 'password': 'Password'};
const refNames = ['email', 'password'];
const unrequiredRefNames = [];

export default class Login extends Component {

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


  static renderTitle(props) {
    return (
      <Text style={styles.textNavTitle}>New Additional Account</Text>
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
      keyboardHeight: new Animated.Value(0),
    };

    this.emailRef = this.updateRef.bind(this, 'email');
    this.passwordRef = this.updateRef.bind(this, 'password');
  }

  componentDidMount() {
    SplashScreen.hide();
    this._isMounted = true;
    this.keyboardWillShowSubscription = Keyboard.addListener('keyboardWillShow', (e) => this.keyboardWillShow(e));
    this.keyboardWillHideSubscription = Keyboard.addListener('keyboardWillHide', (e) => this.keyboardWillHide(e));
    this.email.focus();
  }


  componentWillUnmount() {
    this._isMounted = false;
    this.keyboardWillShowSubscription.remove();
    this.keyboardWillHideSubscription.remove();
  }


  keyboardWillShow(e) {
    Animated.timing(
      this.state.keyboardHeight,
      {
        toValue:  e.endCoordinates.height,
        duration: e.duration,
      }
    ).start();
  }


  keyboardWillHide(e) {
    Animated.timing(
      this.state.keyboardHeight,
      {
        toValue:  0,
        duration: e.duration,
      }
    ).start();
  }

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

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({ errors });
  }

  onChangeText(text) {
    let { errors = {} } = this.state;
    refNames
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          delete errors[name];
          this.setState({ [name]: text });
        }
      });
    this.setState({ errors });
  }

  onForgotPassword() {
    console.log('forgot password');
  }


  onChangePassword(text) {
  }

  onContinue() {
    Actions.Main();
  }

  onSignup() {
    Actions.Signup();
  }


  render() {
    let { errors = {}, ...data } = this.state;
    let { email = '', } = data;

    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <KeyboardAwareScrollView style={styles.mainContentContainer}>
          <Text style={styles.textDescription} numberOfLines={2}>Flu app</Text>
          <View style={styles.textWrapper}>
            <TextField
              key='email'
              ref={this.emailRef}
              label={'Email address'}
              keyboardType='email-address'
              autoCapitalize='none'
              fontSize={15}
              fontFamily={'Averta'}
              fontWeight={'bold'}
              returnKeyType='next'
              tintColor = {commonStyles.primaryGreenColor}
              titleTextStyle={globalStyle.tfTitleStyle}
              labelTextStyle={globalStyle.tfLabelStyle}
              affixTextStyle={globalStyle.tfAffixStyle}
              error={errors.email}
              errorColor={commonStyles.themeColor}
              autoCorrect={false}
              baseColor={commonStyles.lightGreyColor}
              onChangeText={() => this.onChangeText()}
              onFocus={() => this.onFocus()}
              value={data.email}
              onSubmitEditing={() => this.password.focus()}
            />
          </View>
          <View style={styles.textWrapper}>
            <TextField
              key='password'
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
              onChangeText={this.onChangePassword.bind(this)}
              onFocus={() => this.onFocus()}
              onSubmitEditing={() => this.validateInputs()}
            />
            <TouchableOpacity
              style = {styles.forgotWrapper}
              onPress={() => this.onForgotPassword()}>
              <Text style={styles.textForgot}>Forgot?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.codeModeWrapper}>
            <TouchableOpacity
              style={styles.modeContainer}
              onPress={()=>this.onSignup()}
            >
              <View style={styles.textResendWrapper}>
                <Text style={styles.textResend}>Sign up</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}} />
        </KeyboardAwareScrollView>
        <Animated.View style={[styles.bottomContainer, {marginBottom: this.state.keyboardHeight}]}>
          <TouchableHighlight 
            style={[globalStyle.buttonGreenWrapper, globalStyle.buttonBottom]}
            onPress={() => this.validateInputs()}
            // onPress={() => this.onContinue()}
            underlayColor={commonStyles.greenActiveBackgroundColor}
          >
            <Text style={globalStyle.buttonText}>Log in</Text>
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  }
}