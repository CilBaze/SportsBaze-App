import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './athlete_styles';
import AsyncStorage from '@react-native-community/async-storage';
import AppLoader, { loaderRef } from '../../AppLoader';
import Toast from 'react-native-custom-toast';
import DocumentPicker from 'react-native-document-picker';
import NetInfo from "@react-native-community/netinfo";
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
let profession = ''

class ProfessionalVerifactiuonCTScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      value: false,
      image_filePath: '',
      singleFile: '',
      selectIdCard: '',
      selectLetterFile: '',
      selectFileResponse: '',
      selectLetterFileResponse: '',
      selectIdCardResponse: '',
      Alert_Visibility: false,
      alert_msg: ''

    }
  }

  async componentDidMount() {
    this.CheckConnectivity();
    try {
      filePath = await AsyncStorage.getItem('ProfilePic');
      console.log('Coachtrainer_image', filePath);
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
    console.log("file:::::::", this.state.selectLetterFile, this.state.selectIdCard, this.state.singleFile)
    if (this.state.singleFile == "" && this.state.selectLetterFile == "" && this.state.selectIdCard == "") {
      this.setState({ Alert_Visibility: true })
      this.setState({ alert_msg: "Please upload at least one document." })
      return;
    }
    this.props.navigation.navigate('CoachTermCondition', {
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
    profession = this.props.route.params.profession
    return (
      <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#000' }}>
        <View style={{ flex: 1, }}>
          <View>
            <AppLoader ref={loaderRef} />

          </View>
          <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ marginRight: "10%", marginTop: "11%", }} onPress={this.GoBack}>
                <Image style={{ width: 20, height: 20 }} source={require('../../../Images/back.png')} />
              </TouchableOpacity>
              <Text style={styles.headerText}>COACH / TRAINER FORM</Text>
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
              <Text style={{ color: '#fff', fontFamily: 'Raleway-Bold', fontSize: 14 }}>Next</Text>
            </TouchableOpacity>

            <View style={styles.NextButton_2}>
              <Toast ref="customToast" backgroundColor="#fff" textColor='black' />
            </View>
          </View>
        </View>
        <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
      </KeyboardAwareScrollView>
    )
  }


}

export default ProfessionalVerifactiuonCTScreen