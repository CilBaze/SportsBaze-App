import React, { useEffect, useState, ImageBackground } from 'react'
import AppNavigation from './src/Routes/AppNaviagtion'
import { MenuProvider } from 'react-native-popup-menu';
import messaging from '@react-native-firebase/messaging';
import { setAsyncStorage } from './src/Routes/AsynstorageClass';
import RemotePushController from './src/Screen/RemotePushController';
import NotificationController from './src/Screen/ NotificationController.ios';
import { Platform } from 'react-native';

export default class App extends React.Component {

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    this.getToken()
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  async getToken() {

    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        setAsyncStorage('FCMId', token);
        console.log('FCMId===', token)
      })
  }
  async componentDidMount() {
    this.requestUserPermission()

  }


  render() {

    return (

      <MenuProvider>

        {Platform.OS == 'ios' ?

          <NotificationController /> :
          <RemotePushController />
        }
        <AppNavigation />

      </MenuProvider>

    );
  }

}
