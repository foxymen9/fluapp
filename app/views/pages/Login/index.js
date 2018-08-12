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
import { 
  signin,
  getAuth2,
  setAuth2Info,
  setUserInfo,
} from '@redux/user/actions';

const backImage = require('@common/assets/imgs/ico_nav_back_white.png');
const topLogoImage = require('@common/assets/imgs/login_logo.png');

const displayNames = {'email': 'Email'};
const refNames = ['email'];


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
      email: 'test@test.com',
      loading: false,
    };

    this.emailRef = this.updateRef.bind(this, 'email');
  }

  componentDidMount() {
    SplashScreen.hide();
    this._isMounted = true;
    this.keyboardWillShowSubscription = Keyboard.addListener('keyboardWillShow', (e) => this.keyboardWillShow(e));
    this.keyboardWillHideSubscription = Keyboard.addListener('keyboardWillHide', (e) => this.keyboardWillHide(e));
    this.props.setAuth2Info();
    this.props.setUserInfo();
  }


  componentWillUnmount() {
    this._isMounted = false;
    this.keyboardWillShowSubscription.remove();
    this.keyboardWillHideSubscription.remove();
  }


  componentWillReceiveProps(nextProps) {
    if (Actions.currentScene !== 'Login') {
      return;
    }
    if (nextProps.status.type === types.USER_GET_AUTH2_REQUEST) {
      this.setState({ loading: true });
    } else if (this.props.status.type === types.USER_GET_AUTH2_REQUEST && nextProps.status.type === types.USER_GET_AUTH2_SUCCESS) {
      this.props.signin(this.state.email);
    } else if (this.props.status.type === types.USER_GET_AUTH2_REQUEST && nextProps.status.type === types.USER_GET_AUTH2_FAILED) {
      this.setState({ loading: false });
    } else if (this.props.status.type === types.USER_SIGNIN_REQUEST && nextProps.status.type === types.USER_SIGNIN_SUCCESS) {
      this.setState({ loading: false });
      Actions.Main();
    } else if (this.props.status.type === types.USER_SIGNIN_REQUEST && nextProps.status.type === types.USER_SIGNIN_FAILED) {
      this.setState({ loading: false });
    } else if (this.props.status.type !== types.SET_LOCAL_STORAGE_USER_INFO && nextProps.status.type === types.SET_LOCAL_STORAGE_USER_INFO) {
      if (nextProps.user.Id) {
        Actions.Main();
      }
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

  onSignIn() {
    this.props.getAuth2();
  }

  onSignup() {
    Actions.Signup();
  }


  render() {
    let { errors = {}, ...data} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <Spinner visible={this.state.loading} />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={true}
        >
          <Image source={topLogoImage} style={styles.imageTop} resizeMode="contain" />
          <View  style={styles.mainContentContainer}>
            <Text style={styles.textDescription} numberOfLines={2}>Flu app</Text>
            <View style={styles.textWrapper}>
              <TextField
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
                onSubmitEditing={() => this.validateInputs()}
              />
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


const mapStateToProps = ({ status, user }) => {
  return {
    status,
    user,
  }
};


const mapDispatchToProps = {
  signin,
  getAuth2,
  setAuth2Info,
  setUserInfo,
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
