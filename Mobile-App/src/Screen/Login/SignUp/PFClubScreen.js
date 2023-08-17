import * as React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Keyboard, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './athlete_styles';
import AsyncStorage from '@react-native-community/async-storage';
import { requestPostApiMedia, register } from '../../../NetworkCall/Service'
import AppLoader, { loaderRef } from '../../AppLoader';
import { showLoader, hideLoader } from '../../AppLoader';
import Toast from 'react-native-custom-toast';
import DocumentPicker from 'react-native-document-picker';
import { setAsyncStorage } from '../../../Routes/AsynstorageClass'
import NetInfo from "@react-native-community/netinfo";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomAlert from '../../CustomAlert';


let filePath = ''

let scoutClub_Fname = ''
let coutClub_Lname = ''
let coutClub_email = ''
let coutClub_password = ''
let parent_fname = ''
let parent_Lname = ''
let parent_email = ''
let parent_no = ''
let ImagePath = ""
let Dob = ''
let Address = ""
let City = ''
let Country = ''
let ZipCode = ''
let Nationality = ''
let ContactNo = ''
let GenderName = ''
let SportsId = ''
let SportList_Data = []
let profession = ''

class PFClubScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      value: false,
      image_filePath: '',
      singleFile: 'Scouting License',
      selectIdCard: 'ID Card',
      selectLetterFile: 'Letter of Employment',
      Sports_text: '',
      isChecked: false,
      selectFileResponse: '',
      selectLetterFileResponse: '',
      selectIdCardResponse: '',
      scouting_sports_text: '',
      scouting_sports_id: '',
      ischeckedFreelance: 0,
      Alert_Visibility: false,
      alert_msg: ''
    }
  }


  async componentDidMount() {
    this.CheckConnectivity();
    try {
      filePath = await AsyncStorage.getItem('ProfilePic');
      console.log('ScoutClub_image', filePath);
      this.setState({ image_filePath: filePath })
    } catch (error) {

      console.warn("error", error)

    }
  }
  openAlert = () => {
    this.setState({ Alert_Visibility: false });
  }
  closeAlert = () => {
    this.setState({ Alert_Visibility: false })
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

  SubmitData = async () => {
    console.log("this.state.ischeckedFreelance", this.state.ischeckedFreelance)
    if (this.state.selectFileResponse == "" && this.state.selectLetterFileResponse == "" && this.state.selectIdCardResponse == "") {
      this.setState({ Alert_Visibility: true })
      this.setState({ alert_msg: "Please upload at least one document." })
      return;
    }
    this.props.navigation.navigate('clubTermCondition', {
      athelte_Fname: scoutClub_Fname,
      athelte_Lname: coutClub_Lname,
      athelte_email: coutClub_email,
      athelte_password: coutClub_password,
      athelte_parent_fname: parent_fname,
      athelte_parent_Lname: parent_Lname,
      athelte_parent_email: parent_email,
      athelte_parent_no: parent_no,
      imageUrl: ImagePath,
      sports_id: SportsId,
      oneTimeSelected_date: Dob,
      Gender_Name: GenderName,
      address: Address,
      city: City,
      country: Country,
      zip_code: ZipCode,
      nationality: Nationality,
      contact_no: ContactNo,
      selectLetterFile: this.state.selectLetterFile,
      selectIdCard: this.state.selectIdCard,
      singleFile: this.state.singleFile,
      selectLetterFileResponse: this.state.selectLetterFileResponse,
      selectIdCardResponse: this.state.selectIdCardResponse,
      selectFileResponse: this.state.selectFileResponse,
      scouting_sports_id: this.state.scouting_sports_id,
      ischeckedFreelance: this.state.ischeckedFreelance,
      profession: profession
    })
  }



  selectOneFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      this.setState({ selectFileResponse: res })
      this.setState({ singleFile: res.name })
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  selectIDCard = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      this.setState({ selectIdCardResponse: res })
      this.setState({ selectIdCard: res.name })
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  selectLetterFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      this.setState({ selectLetterFileResponse: res })
      this.setState({ selectLetterFile: res.name })
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  GoBack = () => {
    this.props.navigation.goBack()

  }
  setMenuRef = ref => {
    this._menu = ref;
  };
  showMenu = () => {
    this._menu.show();
    this.setState(this.state.data)
  };
  hideMenu = () => {
    this._menu.hide();
  };
  reviewAction = (job_name, sports_id) => {
    this.setState({ scouting_sports_text: job_name })
    this.setState({ scouting_sports_id: sports_id })
  }
  CheckedDetails = async () => {
    await this.setState({ isChecked: !this.state.isChecked })
    console.log("this.state.isChecked", this.state.isChecked)
    if (this.state.isChecked == true) {
      await this.setState({ ischeckedFreelance: 1 });
      console.log("ischeckedFreelance", this.state.ischeckedFreelance)
    } else {
      await this.setState({ ischeckedFreelance: 0 });
      console.log("ischeckedFreelance:::::", this.state.ischeckedFreelance)
    }



  }
  render() {
    const { navigate } = this.props.navigation;

    scoutClub_Fname = this.props.route.params.coutClub_Fname
    coutClub_Lname = this.props.route.params.coutClub_Lname
    coutClub_email = this.props.route.params.coutClub_email
    coutClub_password = this.props.route.params.coutClub_password
    parent_fname = this.props.route.params.acoutClub_parent_fname
    parent_Lname = this.props.route.params.coutClub_parent_Lname
    parent_email = this.props.route.params.coutClub_parent_email
    parent_no = this.props.route.params.coutClub_parent_no
    ImagePath = this.props.route.params.imageUrl

    Dob = this.props.route.params.Dob
    Address = this.props.route.params.Address
    City = this.props.route.params.City
    Country = this.props.route.params.Country
    ZipCode = this.props.route.params.ZipCode
    Nationality = this.props.route.params.Nationality
    ContactNo = this.props.route.params.ContactNo

    SportsId = this.props.route.params.SportsId
    GenderName = this.props.route.params.GenderName
    SportList_Data = this.props.route.params.SportList_Data
    profession = this.props.route.params.profession
    return (
      <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#000' }}>
        <View style={{ flex: 1, }}>
          <View>
            <AppLoader ref={loaderRef} />

          </View>
          <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ right: 80, marginTop: "11%", }} onPress={this.GoBack}>
                <Image style={{ width: 20, height: 20 }} source={require('../../../Images/back.png')} />
              </TouchableOpacity>
              <Text style={styles.headerText2}>SCOUT FORM</Text>
            </View>

            <TouchableOpacity style={styles.imgBg}>
              {this.state.image_filePath != null ? <Image
                source={{ uri: this.state.image_filePath }} style={styles.img}
              /> :
                <Image style={styles.img} source={require('../../../Images/profile.png')} />
              }
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', }}>
              <View style={styles.navigation_dot_1}></View>
              <View style={styles.navigation_line_2}></View>
              <View style={styles.navigation_dot_1}></View>
              <View style={styles.navigation_line_2}></View>
              <View style={styles.navigation_dot_1}></View>
            </View>
          </View>

          <View style={{ flex: 1.5, marginTop: "5%" }}>
            <Text style={styles.account_details_2}>Professional Verification</Text>
            <ScrollView>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.scoutingCheckBox}>Sport Scouting for:</Text>
              </View>
              <View style={styles.backgroundLogin_4} onStartShouldSetResponder={this.showMenu}>
                <Menu style={{ width: "83%", backgroundColor: '#1D1C24', marginTop: "1%" }}
                  ref={this.setMenuRef}
                  button={
                    this.state.scouting_sports_text != '' ?
                      <Text style={{
                        color: "#D2D2D3", marginLeft: "10%", alignSelf: 'center',
                        justifyContent: 'center', fontSize: 14, fontFamily: 'Raleway-Regular'
                      }}>
                        {this.state.scouting_sports_text}</Text>

                      : <Text style={{
                        color: "#D2D2D3", marginLeft: "10%", alignSelf: 'center',
                        justifyContent: 'center', fontSize: 14, fontFamily: 'Raleway-Regular'
                      }}>
                        Sport Scouting</Text>
                  }

                >

                  {SportList_Data.map((item, key) =>
                    <MenuItem style={{ color: "#D2D2D3" }} onPress={() => { this.hideMenu(); this.reviewAction(item.sports_name, item.sports_id); }}>
                      <Text style={{ color: "#D2D2D3", marginLeft: "8%", fontFamily: 'Raleway-Regular', fontSize: 14 }}>  {item.sports_name}</Text>
                    </MenuItem>
                  )}

                  <Image style={styles.Sports} source={require('../../../Images/arrow_sports.png')}></Image>
                </Menu>
                <Image style={styles.Sports} source={require('../../../Images/collapse_arrow.png')}></Image>
              </View>

              <View style={{ flexDirection: 'row', marginTop: "8%", marginLeft: "10%", }}>
                <TouchableOpacity style={styles.CheckedBox} onPress={this.CheckedDetails}>
                  {this.state.isChecked == true ? <Image source={require('../../../Images/checked.png')} /> :

                    <Image source={require('../../../Images/unchecked.png')} />}

                </TouchableOpacity>
                <Text style={styles.ticBox}>Tick box if you are a Freelance</Text>
              </View>

              <Text style={styles.document_details}>Upload 1 out of 3 documents below</Text>

              <View style={styles.PVbackground}>
                {this.state.singleFile != '' ?
                  <Text style={styles.UploadText}>{this.state.singleFile}</Text>
                  :
                  <Text style={styles.UploadText}>Scouting License</Text>
                }
                <TouchableOpacity style={styles.Browserll} onPress={this.selectOneFile}>
                  <Text style={styles.BrowserText}>Browse</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.PVbackground_2}>
                {this.state.selectLetterFile != '' ?
                  <Text style={styles.UploadText}>{this.state.selectLetterFile}</Text>
                  :
                  <Text style={styles.UploadText}>Letter of Employment</Text>
                }
                <TouchableOpacity style={styles.Browserll} onPress={this.selectLetterFile}>
                  <Text style={styles.BrowserText}>Browse</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.PVbackground_2}>
                {this.state.selectIdCard != '' ?
                  <Text style={styles.UploadText}>{this.state.selectIdCard}</Text>
                  :
                  <Text style={styles.UploadText}>ID Card</Text>
                }
                <TouchableOpacity style={styles.Browserll} onPress={this.selectIDCard}>
                  <Text style={styles.BrowserText}>Browse</Text>
                </TouchableOpacity>
              </View>


              <TouchableOpacity style={styles.SubmitButton} onPress={this.SubmitData}>
                <Text style={{ color: '#fff' }}>Next</Text>

              </TouchableOpacity>
              <View style={styles.NextButton_2}>
                <Toast ref="customToast" backgroundColor="#fff" textColor='black' />
              </View>
            </ScrollView>


          </View>


        </View>
        <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
      </KeyboardAwareScrollView>
    )
  }


}

export default PFClubScreen