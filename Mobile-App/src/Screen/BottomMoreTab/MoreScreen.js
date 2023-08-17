import React from 'react'
import { View, Text, Image, Alert, Button } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './bottom_styles';
import { clearAsyncStorage, getAsyncStorage, setAsyncStorage } from '../../Routes/AsynstorageClass';
import NetInfo from "@react-native-community/netinfo";
import messaging from '@react-native-firebase/messaging';
import CustomAlert from '../CustomAlert';



let myProfile = ''
let userStatus = ''
class MoreScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      isSignUpModalVisible: false,
      setResponse: [],
      title: 'More',
      theamColor: '',
      Alert_Visibility: false,
      alert_msg: ''
    }
  }

  async componentDidMount() {
    this.CheckConnectivity();
    myProfile = await getAsyncStorage("profile_pic");
    userStatus = await getAsyncStorage('status');
    let theamColor = await getAsyncStorage('theamColor')
    this.setState({ theamColor: theamColor })
  }

  openAlert = () => {
    this.setState({ Alert_Visibility: false })
  }
  closeAlert = () => {
    this.setState({ Alert_Visibility: false })
  }
  CheckConnectivity = () => {

    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      if (state.isConnected == true) {
      } else {
        this.setState({ Alert_Visibility: true })
        this.setState({ alert_msg: 'Internet not connected' })
      }
      console.log("Is connected?", state.isConnected);
    });

    NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      if (state.isConnected == true) {
      } else {
        this.setState({ Alert_Visibility: true })
        this.setState({ alert_msg: 'Internet not connected' })
      }
    });
  }
  GoTobackScreen = () => {
    this.props.navigation.goBack()
  }

  logOut = async () => {

    Alert.alert(
      'Logout App',
      'Logout the application?',
      [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: () => { this.clearData }
      }],
      { cancelable: false });

    return true;
  }

  clearData = async () => {
    await clearAsyncStorage();
    this.requestUserPermission()
    this.getToken()

  }
  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
   
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

        if (token != null) {
          console.log('token=======', token)

          this.props.navigation.navigate('SignInScreen');
        }
      })


  }

  goToEventScreen = () => {
    this.props.navigation.navigate('EventScreen');
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>
        {this.state.theamColor == 'BLACK' ?
          <View style={styles.Header_Bg}>
            <View style={{ flexDirection: 'row', marginLeft: 25, }}>
              <Image style={{ width: 20, height: 20, marginTop: 5, tintColor: 'white' }} source={require("../../Images/menu.png")}></Image>
              <Text style={{
                color: '#fff',
                fontSize: 18,
                alignSelf: 'center',
                marginLeft: '15%',
                fontFamily: 'Raleway-Bold'
              }}>More</Text>
            </View>
          </View> :
          <View style={styles.Header_Bg2}>
            <View style={{ flexDirection: 'row', marginLeft: 25, }}>
              <Image style={{ width: 20, height: 20, marginTop: 5, tintColor: 'Black' }} source={require("../../Images/menu.png")}></Image>
              <Text style={{
                color: '#000',
                fontSize: 18,
                alignSelf: 'center',
                marginLeft: '15%',
                fontFamily: 'Raleway-Bold'
              }}>More</Text>
            </View>
          </View>}

        <ScrollView>
          {userStatus != "4" ?
            <View style={styles.followersBg_2}>
              <TouchableOpacity style={styles.userdetails} onPress={() => this.goToEventScreen()}>
                <Image style={styles.userDetails_icon} source={require('../../Images/ic-event.png')}></Image>
                <Text style={styles.Text_3}>Sports Event</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userdetails_2} onPress={() => this.props.navigation.navigate('SportsCenterScreen')}>
                <Image style={styles.userDetails_icon} source={require('../../Images/ic-sports-center.png')}></Image>
                <Text style={styles.Text_3}>Sports Centre</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.userdetails_2} onPress={() => this.props.navigation.navigate('GymScreen')} >
                <Image style={styles.userDetails_icon} source={require('../../Images/ic-gym.png')}></Image>
                <Text style={styles.Text_3}>Gym</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userdetails_2} onPress={() => this.props.navigation.navigate('CoachingAcademy')} >
                <Image style={styles.userDetails_icon} source={require('../../Images/ic-coaching.png')}></Image>
                <Text style={styles.Text_3}>Coaching Academy</Text>
              </TouchableOpacity> */}
              <TouchableOpacity style={styles.userdetails_2} onPress={() => this.props.navigation.navigate('FitnessStudo')} >
                <Image style={styles.userDetails_icon} source={require('../../Images/ic-fitness.png')}></Image>
                <Text style={styles.Text_3}>Fitness Studio</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userdetails_2} onPress={this.sportsPodcast} >
                <Image style={styles.userDetails_icon} source={require('../../Images/ic-podcast.png')}></Image>
                <Text style={styles.Text_3}>Sports Podcast</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userdetails_2} onPress={() => this.props.navigation.navigate('PersonalTrainer')} >
                <Image style={styles.userDetails_icon2} source={require('../../Images/personaltrainer.png')}></Image>
                <Text style={styles.Text_3}>Personal Trainer</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.userdetails_2} onPress={this.sportsPodcast} >
                <Image style={styles.userDetails_icon} source={require('../../Images/ic-practice.png')}></Image>
                <Text style={styles.Text_3}>Practitioner</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.userdetails_2} onPress={this.sportsPodcast} >
                <Image style={styles.userDetails_icon} source={require('../../Images/ic-learning.png')}></Image>
                <Text style={styles.Text_3}>Learning</Text>
              </TouchableOpacity>
            </View>
            :
            <View style={styles.followersBg_2}>
              <View style={styles.userdetails}>
                <Image style={styles.userDetails_icon} source={require('../../Images/ic-event.png')}></Image>
                <Text style={styles.Text_3}>Sports Event</Text>
              </View>
              <View style={styles.userdetails_2}>
                <Image style={styles.userDetails_icon} source={require('../../Images/ic-sports-center.png')}></Image>
                <Text style={styles.Text_3}>Sports Center</Text>
              </View>
              {/* <View style={styles.userdetails_2} >
                <Image style={styles.userDetails_icon} source={require('../../Images/ic-gym.png')}></Image>
                <Text style={styles.Text_3}>Gym</Text>
              </View>
              <View style={styles.userdetails_2}>
                <Image style={styles.userDetails_icon} source={require('../../Images/ic-coaching.png')}></Image>
                <Text style={styles.Text_3}>Coaching Academy</Text>
              </View> */}
              <View style={styles.userdetails_2}>
                <Image style={styles.userDetails_icon} source={require('../../Images/ic-fitness.png')}></Image>
                <Text style={styles.Text_3}>Fitness Studio</Text>
              </View>
              <TouchableOpacity style={styles.userdetails_2} onPress={this.sportsPodcast} >
                <Image style={styles.userDetails_icon} source={require('../../Images/ic-fitness.png')}></Image>
                <Text style={styles.Text_3}>Sports Podcast</Text>
              </TouchableOpacity>
              <View style={styles.userdetails_2}>
                <Image style={styles.userDetails_icon} source={require('../../Images/personaltrainer.png')}></Image>
                <Text style={styles.Text_3}>Personal Trainer</Text>
              </View>

              <TouchableOpacity style={styles.userdetails_2} onPress={this.sportsPodcast} >
                <Image style={styles.userDetails_icon} source={require('../../Images/ic-fitness.png')}></Image>
                <Text style={styles.Text_3}>Practitioner</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.userdetails_2} onPress={this.sportsPodcast} >
                <Image style={styles.userDetails_icon} source={require('../../Images/ic-fitness.png')}></Image>
                <Text style={styles.Text_3}>Learning</Text>
              </TouchableOpacity>
            </View>
          }
        </ScrollView>
        <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
      </SafeAreaView>
    )
  }

  sportsPodcast = () => {
    this.setState({ Alert_Visibility: true });
    this.setState({ alert_msg: '"Coming Soon"' })
  }

}

export default MoreScreen;