import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Animated,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EmailValidator from 'email-validator';
import SplashScreen from 'react-native-splash-screen'

import * as commonStyles from '@common/styles/commonStyles';
import globalStyle from '@common/styles/commonStyles';
import Spinner from '@common/components/spinner';
import * as types from '@redux/actionTypes';
import { styles } from './styles';
import { signin } from '@redux/user/actions';

const backImage = require('@common/assets/imgs/ico_nav_back_white.png');
const topLogoImage = require('@common/assets/imgs/login_logo.png');

const displayNames = {'email': 'Email', 'password': 'Password'};
const refNames = ['email', 'password'];


class Login extends Component {

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


  constructor(props) {
    super(props);

    this.state = {
      keyboardHeight: new Animated.Value(0),
      email: '',
      password: '',
    };

    this.emailRef = this.updateRef.bind(this, 'email');
    this.passwordRef = this.updateRef.bind(this, 'password');
  }

  componentDidMount() {
    SplashScreen.hide();
    this._isMounted = true;
    this.keyboardWillShowSubscription = Keyboard.addListener('keyboardWillShow', (e) => this.keyboardWillShow(e));
    this.keyboardWillHideSubscription = Keyboard.addListener('keyboardWillHide', (e) => this.keyboardWillHide(e));
  }


  componentWillUnmount() {
    this._isMounted = false;
    this.keyboardWillShowSubscription.remove();
    this.keyboardWillHideSubscription.remove();
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.status.type === types.USER_SIGNIN_REQUEST && nextProps.status.type === types.USER_SIGNIN_SUCCESS) {
      Actions.Main();
    }
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

    refNames.forEach((name) => {
      let value = this[name].value();

      if (!value) {
        errors[name] = displayNames[name] + ' is required';
      } else if ('email' === name) {
        if (!EmailValidator.validate(value)) {
          errors[name] = 'Invalid email';
        }
      }
    });
    this.setState({ errors });
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      this.onSignIn();
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

  onForgotPassword() {
    console.log('forgot password');
  }


  onChangePassword(text) {
    this.setState({
      password: text,
    });
  }

  onSignIn() {
    this.props.signin(this.state.email, this.state.password);
  }

  onSignup() {
    Actions.Signup();
  }


  render() {
    let { errors = {}, ...data} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <Spinner />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={true}
        >
          <Image source={topLogoImage} style={styles.imageTop} resizeMode="contain" />
          <View  style={styles.mainContentContainer}>
            <Text style={styles.textDescription} numberOfLines={2}>Flu app</Text>
            <View style={styles.textWrapper}>
              <TextField
                // key='email'
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
                value={data.email}
                onChangeText={this.onChangeText.bind(this)}
                onFocus={() => this.onFocus()}
                onSubmitEditing={() => this.password.focus()}
              />
            </View>
            <View style={styles.textWrapper}>
              <TextField
                // key='password'
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
                value={data.password}
                onChangeText={this.onChangeText.bind(this)}
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
          </View>
        </KeyboardAwareScrollView>
        <Animated.View style={[styles.bottomContainer, {marginBottom: this.state.keyboardHeight}]}>
          <TouchableHighlight 
            style={[globalStyle.buttonGreenWrapper, globalStyle.buttonBottom]}
            onPress={() => this.validateInputs()}
            underlayColor={commonStyles.greenActiveBackgroundColor}
          >
            <Text style={globalStyle.buttonText}>Log in</Text>
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  }
}


const mapStateToProps = ({ status }) => {
  return {
    status,
  }
};


const mapDispatchToProps = {
  signin,
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
