/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
} from 'react-native';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promiseMiddleware from './common/middlewares/promiseMiddleware';
import { Scene, Router, Actions } from 'react-native-router-flux';
import * as reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk, promiseMiddleware)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

import * as commonStyles from '@common/styles/commonStyles';
import Tutorial from './views/pages/Tutorial';
import Login from './views/pages/Login';
import Signup from './views/pages/Signup';
import Payment from './views/pages/Payment';
import Main from './views/pages/Main';
import Profile from './views/pages/Profile';
import RequestDetail from './views/pages/RequestDetail';
import NewRequest from './views/pages/NewRequest';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
      isShowTutorial: false,
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('ShowedTutorial', (error, result) => {
      if (result === 'true') {
        this.setState({
          initialized: true,
          isShowTutorial : false,
        });
      } else {
        this.setState({
          initialized: true,
          isShowTutorial : true,
        });
      }
    });
    
  }

  render() {
    if (!this.state.initialized) {
      return null;
    }

    const scenes = Actions.create(
      <Scene key="root" navigationBarStyle={styles.navigationBarStyle} >
        <Scene key="Login" component={Login} hideNavBar />
        <Scene key="Tutorial" component={Tutorial} hideNavBar initial={this.state.isShowTutorial}/>
        <Scene key="Signup" component={Signup} />
        <Scene key="Payment" component={Payment} />
        <Scene key="Main" component={Main} />
        <Scene key="Profile" component={Profile} />
        <Scene key="RequestDetail" component={RequestDetail} />
        <Scene key="NewRequest" component={NewRequest} />
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
});