/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Linking
} from 'react-native';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promiseMiddleware from './common/middlewares/promiseMiddleware';
import { Scene, Router, ActionConst, Modal, Stack, Actions } from 'react-native-router-flux';
import * as reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk, promiseMiddleware)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

import * as commonStyles from '@common/styles/commonStyles';
import Login from './views/pages/Login';
import Signup from './views/pages/Signup';
import Payment from './views/pages/Payment';
import Main from './views/pages/Main';
import Profile from './views/pages/Profile';
import RequestDetail from './views/pages/RequestDetail';
import NewRequest from './views/pages/NewRequest';
import StartScreen from './startScreen';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const scenes = Actions.create(
      <Scene key="root" navigationBarStyle={styles.navigationBarStyle} hideNavBar>
        <Scene key="Login" component={ Login } hideNavBar panHandlers={null} initial/>
        <Stack key="Register" navigationBarStyle={styles.navigationBarStyle} hideNavBar>
          <Scene key="Signup" component={ Signup } hideNavBar = { false } panHandlers={null} />
          <Scene key="Payment" component={ Payment } hideNavBar = { false } panHandlers={null} />
        </Stack>
        <Scene key="Main" component={ Main } hideNavBar = { false } panHandlers={null} />
        <Scene key="Profile" component={ Profile } hideNavBar = { false } panHandlers={null} />
        <Scene key="RequestDetail" component={ RequestDetail } hideNavBar = { false } panHandlers={null} />
        <Scene key="NewRequest" component={ NewRequest } hideNavBar = { false } panHandlers={null} />
      </Scene>
    );

    return (
      <Provider store={ store }>
        <Router hideNavBar={ true } scenes={ scenes }/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  navigationBarStyle: {
    backgroundColor: commonStyles.themeColor,
    borderBottomWidth: 0,
    height: 68,
  },
  navigationBarStyle2: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: commonStyles.lineColor,
  },
});