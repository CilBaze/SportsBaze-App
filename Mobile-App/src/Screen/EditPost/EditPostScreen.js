import * as React from 'react';
import { View, Text, TouchableOpacity, Keyboard, Image, Button, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './editPost_styles'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { requestGetApi, sports_category, sports } from '../../NetworkCall/Service'
import { requestPostApi, edit_post } from '../../NetworkCall/Service'
import Toast from 'react-native-custom-toast';
import { getAsyncStorage } from '../../Routes/AsynstorageClass'
import NetInfo from "@react-native-community/netinfo";
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import VideoPlayer from 'react-native-video-controls';
import CustomAlert from '../CustomAlert';

let Sports_category_arr = []
let UploadUriPath = ''
let post_id = ''
let description = ""
let inputDescription = ''
let sportsName = ''
let subsportsName = ''
let imageUrl = ''
let upload_imgUrl = ''
let subsportId = ''
let sportId = ''
let imageUrl2 = ''

class EditPostScreen extends React.Component {

  constructor() {

    super()

    this.state = {
      textcaption: '',
      category_Name: '',
      sub_category_Name: '',
      category_id: '',
      sub_category_id: '',
      Sports_category: [],
      uploadFilePath: '',
      sportsList_name: [],
      isSignUpModalVisible: false,
      setResponse: '',
      imagePath: '',
      phone: '',
      theamColor: '',
      Alert_Visibility: false,
      alert_msg: ''

    }
  }


  componentDidMount = async () => {
    this.CheckConnectivity();
    this.setState({ textcaption: description })
    this.setState({ category_Name: sportsName })
    this.setState({ sub_category_Name: subsportsName })
    this.setState({ category_id: sportId })
    this.setState({ sub_category_id: subsportId })
    this.setState({ imagePath: imageUrl })
    console.log("imageUrl::", imageUrl)
    let theamColor = await getAsyncStorage('theamColor')
    this.setState({ theamColor: theamColor })
    this.getSportsList();

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
        this.setState({ alert_msg: "Internet is not connected." })
      }
      console.log("Is connected?", state.isConnected);
    });

    NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      if (state.isConnected == true) {
      } else {
        this.setState({ Alert_Visibility: true })
        this.setState({ alert_msg: "Internet is not connected." })
      }
    });
  }

  getSportsCategoryList = async () => {

    const body = {
    }
    let subSports = sports_category + "/" + this.state.category_id
    const { responseJson, err } = await requestGetApi(subSports, body, 'GET')
    console.log("sports_categorylist Response------------", responseJson)
    let new_data
    if (responseJson.status == true) {
      this._subcategory_menu.show();
      Sports_category_arr = responseJson.data;
      this.setState({ Sports_category: Sports_category_arr })
      console.log("data::::::::::============", this.state.SportList_item)

    }
  }

  getSportsList = async () => {
    const body = {
    }
    const { responseJson, err } = await requestGetApi(sports, body, 'GET')
    console.log("sports_categorylist Response------------", responseJson)

    if (responseJson.status == true) {
      console.log('customerlist- sport-------:::::::::::::', responseJson.data);
      Sports_name_arr = responseJson.data;

      this.setState({ sportsList_name: Sports_name_arr })
      console.log("data::::::::::============", this.state.sportsList_name)

    }


  }
  _category_menu = null;
  setCategoryMenuRef = ref => {
    this._category_menu = ref;
  }
  hideCategoryMenu = () => {
    this._category_menu.hide();
  };
  Category_Action = (category_name, category_id) => {
    this.setState({ category_Name: category_name })
    this.setState({ category_id: category_id })
  }
  showCategoryMenu = () => {
    this._category_menu.show();
    this.setState(this.state.sportsList_name)
  };

  _subcategory_menu = null;
  setSubCategoryMenuRef = ref => {
    this._subcategory_menu = ref;
  }
  hideSubCategoryMenu = () => {
    this._subcategory_menu.hide();
  };
  SubCategory_Action = (sub_sports_name, sub_category_id) => {
    this.setState({ sub_category_Name: sub_sports_name })
    this.setState({ sub_category_id: sub_category_id })
  }
  showSubCategoryMenu = () => {
    this.getSportsCategoryList();
    this.setState(this.state.Sports_category);
  };

  UploadPost = async () => {
    if (this.state.textcaption == '') {
      this.refs.customToast.showToast('Please write caption!', 5000);
      return;
    }
    if (this.state.category_id == '') {
      this.refs.customToast.showToast('Please enter category name!', 5000);
      return;
    }
    if (this.state.sub_category_id == '') {
      this.refs.customToast.showToast('Please enter subcategory name!', 5000);
      return;
    }


    let token = await getAsyncStorage('tokenkey');
    const formData = new FormData()
    var fileName = Math.floor(Math.random() * 100) + 1;

    formData.append('sports_id', this.state.category_id)
    formData.append('sub_sports_id', this.state.sub_category_id)
    formData.append('description', this.state.textcaption)
    formData.append('post_id', post_id)

    console.log("imgeurl", this.state.setResponse);
    if (this.state.setResponse != '') {
      const fileFormat = this.state.setResponse.path.split(".");
      formData.append("media", {
        uri: Platform.OS === "android" ? this.state.setResponse.uri : this.state.setResponse.uri.replace("file://", ""),
        type: (this.state.setResponse.path.indexOf('.mp4') > -1 || this.state.setResponse.path.indexOf('.mov') > -1 || this.state.setResponse.path.indexOf('.wmv') > -1) ? "video/" + fileFormat[fileFormat.length - 1] : this.state.setResponse.type,
        name: (this.state.setResponse.path.indexOf('.mp4') > -1 || this.state.setResponse.path.indexOf('.mov') > -1 || this.state.setResponse.path.indexOf('.wmv') > -1) ? "abcbcbc." + fileFormat[fileFormat.length - 1] : this.state.setResponse.fileName,
      })
    }


    const { responseJson, err } = await requestPostApi(edit_post, formData, 'POST', token)

    console.log("Response of formData+", formData)
    console.log("Response of postEdit", JSON.stringify(responseJson))
    if (responseJson.status == true) {
      this.props.navigation.replace('MyPostScreen');
      //this.props.navigation.navigate('MyPostScreen')
    } else {
      this.setState({ Alert_Visibility: true })
      this.setState({ alert_msg: responseJson.message })
    }

  }
  onCancel = () => {

    this.props.navigation.goBack()
  }
  UploadImg = () => {
    console.log("kirti")
    this.setState({ isSignUpModalVisible: !this.state.isSignUpModalVisible });
  };
  GotToUploadScreen = () => {
    upload_imgUrl = this.state.setResponse,
      imageUrl2 = upload_imgUrl.uri
    this.setState({ imagePath: imageUrl2 })
    this.setState({ isSignUpModalVisible: !this.state.isSignUpModalVisible });
  };
  render() {

    const { navigate } = this.props.navigation;
    UploadUriPath = this.props.route.params.uploadUrl
    post_id = this.props.route.params.post_id
    description = this.props.route.params.description
    sportsName = this.props.route.params.sports_name
    subsportsName = this.props.route.params.subsports_name
    imageUrl = this.props.route.params.image
    sportId = this.props.route.params.sportId
    subsportId = this.props.route.params.subsportId

    console.log("image::", imageUrl)

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>
        <View style={{ flex: 2 }}>
          {this.state.theamColor == 'BLACK' ?
            <View style={styles.UploadText}>
              <TouchableOpacity style={styles.textbg} onPress={this.onCancel}>
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity >
              <View style={styles.textbg}>
                <Text style={styles.text}>Edit Post</Text>
                <View style={{ height: 1, backgroundColor: "#fff", width: 80 }}></View>
              </View>
              <TouchableOpacity style={styles.textbg} onPress={this.UploadPost}>
                <Text style={styles.text}>Upload</Text>
              </TouchableOpacity>
            </View> :
            <View style={styles.UploadText2}>
              <TouchableOpacity style={styles.textbg2} onPress={this.onCancel}>
                <Text style={styles.text2}>Cancel</Text>
              </TouchableOpacity >
              <View style={styles.textbg2}>
                <Text style={styles.text2}>Edit Post</Text>
                <View style={{ height: 1, backgroundColor: "#000", width: 80 }}></View>
              </View>
              <TouchableOpacity style={styles.textbg2} onPress={this.UploadPost}>
                <Text style={styles.text2}>Upload</Text>
              </TouchableOpacity>
            </View>
          }


          <View style={styles.ImageBg}>

            {this.state.imagePath.split('.').pop() == 'mp4' ? (
              <VideoPlayer style={styles.uploadImg}
                source={{ uri: this.state.imagePath }}
                toggleResizeModeOnFullscreen={true} />
            ) : (
              <Image
                style={styles.uploadImg}
                source={{ uri: this.state.imagePath }}
                resizeMode={'cover'}
                rate={1.0}
              />
            )}
            <View style={styles.InputBg}>
              <TextInput
                style={styles.inputStyle}
                underlineColorAndroid="#F6F6F7"
                placeholder="Write a caption..."
                placeholderTextColor="#9B9B9D"
                keyboardType="default"
                returnKeyType="next"
                onChangeText={(textcaption) => this.setState({ textcaption })}
                value={this.state.textcaption}
                underlineColorAndroid='transparent'
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                multiline={true}
              />
            </View>

          </View>
          <Text style={styles.select_text}>Select category</Text>
          <View >
            <View style={styles.backgroundLogin} onStartShouldSetResponder={this.showCategoryMenu}>
              <Menu
                style={styles.MenuBg}
                ref={this.setCategoryMenuRef}
                button={<Text style={styles.MenuText}>{this.state.category_Name}</Text>}>
                {this.state.sportsList_name.map((item, key) =>
                  <MenuItem onPress={() => {
                    this.hideCategoryMenu();
                    this.Category_Action(item.sports_name, item.sports_id);
                  }}>
                    <Text style={styles.menuSelectText}> {item.sports_name}</Text></MenuItem>
                )}
                <Image style={styles.Sports} source={require('../../Images/arrow_sports.png')}></Image>
              </Menu>
              <Image style={styles.Sports} source={require('../../Images/collapse_arrow.png')}></Image>
            </View>
          </View>

          <Text style={styles.select_text_2}>Select Sub category</Text>
          <View >
            <View style={styles.backgroundLogin_2} onStartShouldSetResponder={this.showSubCategoryMenu}>
              <Menu
                style={styles.MenuBg}
                ref={this.setSubCategoryMenuRef}
                button={<Text style={styles.MenuText}>{this.state.sub_category_Name}</Text>}>
                {this.state.Sports_category.map((item, key) =>
                  <MenuItem onPress={() => {
                    this.hideSubCategoryMenu();
                    this.SubCategory_Action(item.sub_sports_name, item.sub_sports_id);
                  }}>
                    <Text style={styles.menuSelectText}> {item.sub_sports_name}</Text></MenuItem>
                )}
                <Image style={styles.Sports} source={require('../../Images/arrow_sports.png')}></Image>
              </Menu>
              <Image style={styles.Sports} source={require('../../Images/collapse_arrow.png')}></Image>
            </View>
          </View>
          <View style={styles.NextButton_2}>
            <Toast ref="customToast" backgroundColor="#fff" textColor='black' />
          </View>
        </View>
        <Modal
          isVisible={this.state.isSignUpModalVisible}
          onRequestClose={() => {
            this.setState({ isSignUpModalVisible: false });
          }}>


          <View style={styles.SignupModal}>
            <View onStartShouldSetResponder={() => {
              ImagePicker.openCamera(
                {
                  includeBase64: false,
                  compressImageMaxHeight: 1000,
                  compressImageMaxWidth: 1000,

                }).then(image => {
                  console.log(image);
                  this.setState({ setResponse: image });
                  this.GotToUploadScreen();
                },
                );
            }}

              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '15%', marginBottom: 5 }}>
              <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require("../../Images/ic-camera.png")}></Image>
              <Text style={{ color: "#fff", fontSize: 16, fontFamily: 'Raleway-Regular' }}> Take image</Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 0.5,
                backgroundColor: '#98989B',
                marginTop: 10
              }}></View>
            <View style={{ flexDirection: 'row', marginTop: '5%', marginLeft: "28%" }}
              onStartShouldSetResponder={() => {
                ImagePicker.openPicker(
                  {
                    multiple: true,
                    width: 300,
                    height: 400,
                    showsSelectedCount: true,
                    maxFiles: 10
                  }).then(image => {
                    console.log(image);
                    this.setState({ setResponse: image });
                    this.GotToUploadScreen();
                  },
                  );
              }}>
              <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require("../../Images/ic-gallery.png")}></Image>
              <Text style={{ color: "#fff", fontSize: 16, fontFamily: 'Raleway-Regular' }}>Gallery</Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 0.5,
                backgroundColor: '#98989B',
                marginTop: 10
              }}></View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '5%' }}
              onStartShouldSetResponder={() => {
                ImagePicker.openCamera(
                  {
                    mediaType: 'video',
                    includeBase64: false,
                    width: 300,
                    height: 400,
                  }).then(image => {
                    console.log(image);
                    this.setState({ setResponse: image });
                    this.GotToUploadScreen();
                  },
                  );
              }}>
              <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require("../../Images/ic_video.png")}></Image>
              <Text style={{ color: "#fff", fontSize: 16, fontFamily: 'Raleway-Regular' }}>Take video</Text>
            </View>
          </View>
        </Modal>
        <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
      </SafeAreaView>
    )
  }

}



export default EditPostScreen