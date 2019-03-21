/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createAppContainer } from 'react-navigation'
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from 'redux-saga'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from "react-navigation-redux-helpers";
import * as WeChat from 'react-native-wechat'

import { Provider, connect } from "react-redux";

import AppNavigator from './src/routers'
import mySaga from './src/sagas'
import { login } from './src/reducers'
import { E } from './src/config'
import SplashScreen from 'react-native-splash-screen'
import { LocalStore } from './src/utils';

const navReducer = createNavigationReducer(AppNavigator);

const appReducer = combineReducers({
  nav: navReducer,
  login
})

export const routerMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.router
);

const AppN = reduxifyNavigator(AppNavigator, "root");

const mapStateToProps = state => ({
  state: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(AppN);

const sagaMiddleware = createSagaMiddleware()
// mount it on the Store

const store = createStore(
  appReducer,
  applyMiddleware(sagaMiddleware)
)



// then run the saga
sagaMiddleware.run(mySaga)

global.actionUtil = (type, payload) => store.dispatch({ type, payload }) //定义全局actions

global.SessionID = null
global.globalServer = null

// global.serverVersion = false // true 记录 false 计算

// 隐藏 黄色提示
console.disableYellowBox = true;

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
    WeChat.registerApp(E.WECHAT_APP_ID)
    WeChat.isWXAppInstalled().then(function (isInstalled) {
      E.WECHAT_INSTALLED = isInstalled
    });
    // LocalStore._getData('serverVersion').then((val) => {
    //   if (val != null) {
    //     if (val == 'true') {
    //       global.serverVersion = true;
    //     } else if (val == 'false') {
    //       global.serverVersion = false;
    //     }
    //   }
    // })
  }
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}
