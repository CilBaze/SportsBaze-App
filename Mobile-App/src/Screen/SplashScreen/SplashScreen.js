import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  SafeAreaView
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { getAsyncStorage, setAsyncStorage } from '../../Routes/AsynstorageClass'
import NetInfo from "@react-native-community/netinfo";
import { requestGetApi, userstatus, getcolor } from '../../NetworkCall/Service';

class SplashScreen extends React.Component {

  componentDidMount() {
    this.CheckConnectivity();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    console.log("height", windowHeight, "width", windowWidth)
    setTimeout(() => {
      this._retrieveData();
    }, 3800)
  }

  CheckConnectivity = () => {

    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      if (state.isConnected == true) {
      } else {
        alert("internet not connected")
      }
    });

    NetInfo.addEventListener(state => {
      if (state.isConnected == true) {
      } else {
        alert("internet not connected")
      }
    });
  }
  async getStatus() {
    const body = {
    }
    let token_value = await getAsyncStorage('tokenkey');
    const { responseJson, err } = await requestGetApi(userstatus, body, 'GET', token_value);
    console.log("userstatus=>", responseJson.data.status);
    await setAsyncStorage("status", responseJson.data.status);
  }
  _retrieveData = async () => {
    try {
      let tokenkey = await getAsyncStorage('tokenkey');
      this.getTheam();
      if (tokenkey !== null) {
        this.getStatus();
        this.props.navigation.navigate("Tab");
      }
      else {
        this.props.navigation.navigate("SignInScreen");
      }
    } catch (error) {
    }
  }

  getTheam = async () => {
    const body = {
    }
    let token_value = await getAsyncStorage('tokenkey');
    const { responseJson, err } = await requestGetApi(getcolor, body, 'GET');
    console.log("getcolor=>", responseJson.data)
    this.setState({ theamColor: responseJson.data.color })
    await setAsyncStorage('theamColor', responseJson.data.color)

  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../Images/splash.gif')}
          style={{
            width: "100%",
            height: "100%",
          }}

        />

      </View>
    );
  }
}



export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: '#000',

  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});