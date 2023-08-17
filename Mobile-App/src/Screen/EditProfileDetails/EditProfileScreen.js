import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './editProfile_styles';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-custom-toast';
import NetInfo from '@react-native-community/netinfo';
import { getAsyncStorage, setAsyncStorage } from '../../Routes/AsynstorageClass';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { requestPostApiMedia, UpdateUserProfile } from '../../NetworkCall/Service';
import HeaderScreen from '../header'
import CustomAlert from '../CustomAlert';

let SportList_Data = [];
let userEmail = '';
let userFirstName = '';
let userLastName = '';
let userDOB = '';
let profile_pic = '';
let oneTimeSelected_date = ''
let userLName = '';
let userFName = ''
let token = ''
let ImagePath = ''

class EditProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      value: false,
      isChecked: false,
      filePath: '',
      userfirst_name: '',
      userLast_name: '',
      email: '',
      captureImage: '',
      userEmail: '',
      userLastName: '',
      userEmail: '',
      userDOB: '',
      isDatePickerVisible: false,
      oneTimeSelected_date: '',
      Alert_Visibility: false,
      alert_msg: ''
    };
  }
  async componentDidMount() {
    this.CheckConnectivity();
    userEmail = await getAsyncStorage('email');
    userDOB = await getAsyncStorage('dob');
    let profilepic = await getAsyncStorage('profile_pic');
    token = await getAsyncStorage('tokenkey');
    if (profilepic == null) {
      this.setState({ profile_pic: profile_pic });
    } else {
      this.setState({ profile_pic: profilepic });
    }
    userLName = await getAsyncStorage('LastName');
    userFName = await getAsyncStorage('FisrtName');
    let fullname = userFName + " " + userLName;
    this.setState({ userFirstName: userFName });
    this.setState({ userLastName: userLName });

    this.setState({ userEmail: userEmail });
    this.setState({ oneTimeSelected_date: userDOB });

  }

  openAlert = () => {
    this.setState({ Alert_Visibility: false })
  }
  closeAlert = () => {
    this.setState({ Alert_Visibility: false })
  }
  CheckConnectivity = () => {
    NetInfo.fetch().then((state) => {
      console.log('Connection type', state.type);
      if (state.isConnected == true) {
      } else {
        this.setState({ Alert_Visibility: true })
        this.setState({ alert_msg: "Internet is not connected." })
      }
      console.log('Is connected?', state.isConnected);
    });

    NetInfo.addEventListener((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected == true) {
      } else {
        this.setState({ Alert_Visibility: true })
        this.setState({ alert_msg: "Internet is not connected." })
      }
    });
  };
  CheckedDetails = () => {
    this.setState({ isChecked: !this.state.isChecked });
  };

  fileNameFromUrl(url) {
    var matches = url.match(/\/([^\/?#]+)[^\/]*$/);
    if (matches != null) {
      if (matches.length > 1 || matches != null) {
        return matches[1];
      }

    }
    return null;
  }
  chooseFile = async () => {
    const options = {
      title: 'Select Image',
      mediaType: 'photo',
      maxHeight: 100,
      maxWight: 100,
      quality: 0.8,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },

      profile_pic: ''
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        ImagePath = response;
        this.setState({ captureImage: response });
        console.log('captureImage::::::', this.state.captureImage);

        const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({ profile_pic: source.uri });

      }
    });

  };

  NextScreen = async () => {
    console.warn("gdsag")
    if (this.state.userFirstName == '') {
      this.refs.customToast.showToast('Please enter first name!', 5000);
      return;
    }
    await setAsyncStorage('FisrtName', this.state.userFirstName);
    await setAsyncStorage('LastName', this.state.userLastName);
    await setAsyncStorage('dob', this.state.oneTimeSelected_date);
    try {
      const UserEmail = this.state.email;
      await AsyncStorage.setItem('profile_pic', this.state.profile_pic);
      await AsyncStorage.setItem('Athlete_Useremail', UserEmail);

    } catch (error) {
      console.log('error::::::', error);
    }
    const formData = new FormData();
    formData.append('first_name', this.state.userFirstName);
    formData.append('last_name', this.state.userLastName);
    formData.append('dob', this.state.oneTimeSelected_date);
    if (ImagePath != "") {
      formData.append("profile_pic", {
        uri: Platform.OS === "android" ? ImagePath.uri : ImagePath.uri.replace("file://", ""),
        type: ImagePath.type,
        name: this.fileNameFromUrl(ImagePath.uri)
      })

    }
    console.log("token", token);
    console.log("Form Data", formData);
    const { responseJson, err } = await requestPostApiMedia(UpdateUserProfile, formData, 'POST', token);
    console.log("Response=>", responseJson);
    if (responseJson.status == true) {
      this.props.navigation.navigate('Tab', {
      });
    } else {
      this.setState({ Alert_Visibility: true })
      this.setState({ alert_msg: responseJson.message })
    }


  };
  GoBack = () => {
    this.props.navigation.goBack();
  };

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };
  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false })
  }

  handleDatePicked = (date) => {
    oneTimeSelected_date = date.getFullYear() + "-" + (date.getMonth() + 1) + " -" + date.getDate();
    this.setState({ oneTimeSelected_date })
    this.hideDatePicker();
  };

  render() {

    profile_pic = this.props.route.params.profile_pic;
    console.log("profile_pic", profile_pic);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>
        <HeaderScreen title='' navigation={this.props.navigation} />
        <View style={{ marginTop: '2%' }}>
          <View
            style={{ alignItems: 'center', flexDirection: 'column' }}>
            <Text style={styles.headerText}>Edit Profile Detail</Text>
            <TouchableOpacity onPress={this.chooseFile}>
              {this.state.profile_pic != '' ? (
                <Image source={{ uri: this.state.profile_pic }} style={styles.img} />
              ) : (
                <Image
                  style={styles.img}
                  source={require('../../Images/profile.png')}
                />
              )}
              <Image
                style={styles.camera}
                source={require('../../Images/camera.png')}></Image>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: '0%' }}>
            <ScrollView>
              <View style={styles.backgroundLogin}>
                <TextInput
                  style={styles.inputStyle}
                  underlineColorAndroid="#F6F6F7"
                  placeholder="First name"
                  placeholderTextColor="#D2D2D3"
                  keyboardType="default"
                  returnKeyType="next"
                  onChangeText={(userFirstName) => {
                    this.setState({ userFirstName });
                  }}
                  value={this.state.userFirstName}
                  underlineColorAndroid="transparent"
                  onSubmitEditing={() =>
                    this._lastname_input && this._lastname_input.focus()
                  }
                  blurOnSubmit={false}
                />


              </View>
              <View style={styles.backgroundLogin}>
                <TextInput
                  style={styles.inputStyle}
                  underlineColorAndroid="#F6F6F7"
                  placeholder="Last Name"
                  placeholderTextColor="#D2D2D3"
                  keyboardType="default"
                  returnKeyType="next"
                  onChangeText={(userLastName) => {
                    this.setState({ userLastName });
                  }}
                  ref={(ref) => {
                    this._lastname_input = ref;
                  }}
                  value={this.state.userLastName}
                  underlineColorAndroid="transparent"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                />


              </View>

              <View style={styles.backgroundLogin_2}  >
                <TextInput editable={false}
                  placeholderTextColor="#D2D2D3"
                  placeholder="select date of birth"
                  style={{
                    alignSelf: 'center',
                    marginLeft: "5%",
                    color: '#fff',
                    fontSize: 16, fontFamily: 'Raleway-Regular', width: '48%'
                  }}
                  value={this.state.oneTimeSelected_date} ></TextInput>
                <DateTimePickerModal
                  isVisible={this.state.isDatePickerVisible}
                  mode="date"
                  onConfirm={this.handleDatePicked}
                  onCancel={this.hideDatePicker}
                  forment="dd-MM-y" />
                <TouchableOpacity style={{ marginLeft: "30%", }} onPress={this.showDatePicker}>
                  <Image style={{ alignSelf: 'center', width: 18, height: 18, }} source={require('../../Images/calender.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.backgroundLogin_2}>
                <TextInput
                  style={styles.inputStyle}
                  underlineColorAndroid="#F6F6F7"
                  placeholder="Email"
                  placeholderTextColor="#D2D2D3"
                  keyboardType='default'
                  editable={false}
                  returnKeyType="next"
                  onChangeText={(userEmail) =>
                    this.setState({ userEmail })
                  }
                  value={this.state.userEmail}
                  underlineColorAndroid="transparent"
                  ref={(ref) => {
                    this._emailinput = ref;
                  }}
                  onSubmitEditing={() =>
                    this._passwordinput && this._passwordinput.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>


              <TouchableOpacity
                style={styles.NextButton}
                onPress={this.NextScreen}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
              <View style={styles.NextButton_2}>
                <Toast
                  ref="customToast"
                  backgroundColor="#fff"
                  textColor="black"
                />
              </View>
            </ScrollView>
          </View>
        </View>
        <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
      </SafeAreaView>
    );
  }
}

export default EditProfileScreen;
