import React from 'react'
import { View, Text, Image, Alert, Button } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './profile_styles';
import { clearAsyncStorage, setAsyncStorage } from '../../Routes/AsynstorageClass';
import { requestGetApi, get_profile, getcolor } from '../../NetworkCall/Service';
import { getAsyncStorage } from '../../Routes/AsynstorageClass';
import NetInfo from "@react-native-community/netinfo";
import Loader from '../CustomComponent/Loader';
import messaging from '@react-native-firebase/messaging';

let PublicDetails = ''
let unsubscribe
let userStatus = ''
class ProfileScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      myProfile: '',
      isSignUpModalVisible: false,
      setResponse: [],
      loading: false,
      theamColor: ''

    }
  }
  async componentDidMount() {
    this.CheckConnectivity();
    userStatus = await getAsyncStorage('status');
    this.getUserDetailsList();
    unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getUserDetailsList();
    });
    let theamColor = await getAsyncStorage('theamColor')
    this.setState({ theamColor: theamColor })
  }


  CheckConnectivity = () => {

    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      if (state.isConnected == true) {
      } else {
        alert("internet not connected")
      }
      console.log("Is connected?", state.isConnected);
    });

    NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      if (state.isConnected == true) {
      } else {
        alert("internet not connected")
      }
    });
  }
  GoTobackScreen = () => {
    this.props.navigation.navigate("HomeScreen");
  }

  logOut = async () => {

    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: () => {
          clearAsyncStorage(),
          this.clearData()
        }
      }],
      { cancelable: false });

    return true;
    //  this.logoutButton();  
  }
  clearData =async () => {
    await clearAsyncStorage();
     this.requestUserPermission()
     this.getToken()
     this.getTheam();
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
     messaging()
       .getToken()
       .then(token => {
         setAsyncStorage('FCMId', token);
         console.log('FCMId===', token)
 
         if(token!=null){
           console.log('token=======', token);
           this.props.navigation.replace('SignInScreen');    }
       })
     
       
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
  goToMyPostScreen = () => {
    this.props.navigation.navigate('MyPostScreen');
  }

  GoToProfileEdit() {
    console.log("profile.pic", PublicDetails.profile_pic);
    this.props.navigation.navigate('EditProfileScreen', {
      profile_pic: PublicDetails.profile_pic,
    })

  }
  getUserDetailsList = async () => {
    this.setState({ loading: true, })
    const body = {
    }
    let token_value = await getAsyncStorage('tokenkey');
    const { responseJson, err } = await requestGetApi(get_profile, body, 'GET', token_value)
    this.setState({ loading: false, })
    if (responseJson.status == true) {
      PublicDetails = responseJson.data;
      await setAsyncStorage("myuserId", responseJson.data.id)
      this.setState({ myProfile: PublicDetails });
    } else {
    }
  }

  followersList = async () => {
    this.props.navigation.navigate("MyFallwers");
  }
  followingList = () => {
    this.props.navigation.navigate("Myfollowing");
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>
        {this.state.theamColor == 'BLACK' ?
          <View style={styles.Header_Bg}>
            <View style={{ flexDirection: 'row', marginLeft: 25, }}>
              <Image style={{ width: 20, height: 20, marginTop: 5, tintColor: 'white' }} source={require("../../Images/myprofile.png")}></Image>
              <Text style={styles.headerText}>Profile</Text>
            </View>
          </View>
          :
          <View style={styles.Header_Bg2}>
            <View style={{ flexDirection: 'row', marginLeft: 25, }}>
              <Image style={{ width: 20, height: 20, marginTop: 5, tintColor: 'Black' }} source={require("../../Images/myprofile.png")}></Image>
              <Text style={styles.headerText2}>Profile</Text>
            </View>
          </View>}
        <View style={styles.fieldBG}>

          {PublicDetails.profile_pic == '' ? (
            <Image
              style={{ marginLeft: '2%', width: 60, height: 60 }}
              source={require('../../Images/ic_profile.png')}
            />
          ) : (
            <Image
              style={{
                marginLeft: '2%',
                width: 60,
                height: 60,
                borderRadius: 60 / 2,
              }}
              source={{ uri: PublicDetails.profile_pic }}
            />
          )}
          <View style={{ marginLeft: "2%", marginTop: "0%" }}>
            <Text style={styles.ProfileText}>{PublicDetails.first_name + " " + PublicDetails.last_name}</Text>
            <Text style={styles.ProfileText_2}>{PublicDetails.user_group_name}</Text>
            {PublicDetails.profession == "" ?
              null
              :
              <Text style={styles.ProfileText_2}>{PublicDetails.profession}</Text>
            }
            <Text style={styles.ProfileText_2}>{PublicDetails.sport_name}</Text>
          </View>

        </View>
        {userStatus != "4" ?
          <View style={styles.followersBg}>
            <TouchableOpacity style={{ marginTop: "15%", marginLeft: "21%" }}>
              <Text style={styles.Text_2}>{PublicDetails.total_posts}</Text>
              <Text style={styles.Text_1}>Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: "11%", marginLeft: "18%" }} onPress={() => this.followersList()}>
              <Text style={styles.Text_2}>{PublicDetails.total_follower}</Text>
              <Text style={styles.Text_1}>Followers</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: "11%", marginLeft: "18%" }} onPress={() => this.followingList()}>
              <Text style={styles.Text_2}>{PublicDetails.total_following}</Text>
              <Text style={styles.Text_1}>Following</Text>
            </TouchableOpacity>

          </View>
          :
          <View style={styles.followersBg}>
            <View style={{ marginTop: "5%", marginLeft: "18%" }}>
              <Text style={styles.Text_2}>{PublicDetails.total_posts}</Text>
              <Text style={styles.Text_1}>Post</Text>
            </View>
            <View style={{ marginTop: "5%", marginLeft: "18%" }} onPress={() => this.followersList()}>
              <Text style={styles.Text_2}>{PublicDetails.total_follower}</Text>
              <Text style={styles.Text_1}>Followers</Text>
            </View>
            <View style={{ marginTop: "5%", marginLeft: "18%" }} onPress={() => this.followingList()}>
              <Text style={styles.Text_2}>{PublicDetails.total_following}</Text>
              <Text style={styles.Text_1}>Following</Text>
            </View>

          </View>
        }

        <View style={styles.followersBg_2}>
          <View style={{ marginTop: '5%' }}>
          </View>
          <ScrollView>
            {userStatus != "4" ?
              <View>
                <TouchableOpacity style={styles.userdetails} onPress={() => { this.goToMyPostScreen() }}>
                  <Image style={styles.userDetails_icon} source={require('../../Images/ic-post.png')}></Image>
                  <Text style={styles.Text_3}>My Post</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.userdetails_2} onPress={() => this.GoToProfileEdit()}>
                  <Image style={styles.userDetails_icon} source={require('../../Images/ic-edit.png')}></Image>
                  <Text style={styles.Text_3}>Edit Profile Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.userdetails_2} onPress={() => this.props.navigation.navigate('FavouriteScreen')}>
                  <Image style={styles.userDetails_icon} source={require('../../Images/ic-save.png')}></Image>
                  <Text style={styles.Text_3}>Saved</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.userdetails_2} onPress={() => this.props.navigation.navigate('EventListScreen')}>
                  <Image style={styles.userDetails_icon} source={require('../../Images/ic-event.png')}></Image>
                  <Text style={styles.Text_3}> My Events</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.userdetails_2} onPress={this.logOut}>
                  <Image style={styles.userDetails_icon} source={require('../../Images/ic-logout.png')}></Image>
                  <Text style={styles.Text_3}>Logout</Text>
                </TouchableOpacity>
              </View>
              :
              <View>
                <View style={styles.userdetails}>
                  <Image style={styles.userDetails_icon} source={require('../../Images/ic-post.png')}></Image>
                  <Text style={styles.Text_3}>My Post</Text>
                </View>
                <View style={styles.userdetails_2}>
                  <Image style={styles.userDetails_icon} source={require('../../Images/ic-edit.png')}></Image>
                  <Text style={styles.Text_3}>Edit Profile Details</Text>
                </View>
                <View style={styles.userdetails_2}>
                  <Image style={styles.userDetails_icon} source={require('../../Images/ic-save.png')}></Image>
                  <Text style={styles.Text_3}>Saved</Text>
                </View>
                <View style={styles.userdetails_2}>
                  <Image style={styles.userDetails_icon} source={require('../../Images/ic-event.png')}></Image>
                  <Text style={styles.Text_3}> My Events</Text>
                </View>
                <TouchableOpacity style={styles.userdetails_2} onPress={this.logOut}>
                  <Image style={styles.userDetails_icon} source={require('../../Images/ic-logout.png')}></Image>
                  <Text style={styles.Text_3}>Logout</Text>
                </TouchableOpacity>
              </View>
            }
          </ScrollView>
        </View>
        <Loader isLoader={this.state.loading}></Loader>

      </SafeAreaView>
    )
  }

}

export default ProfileScreen;