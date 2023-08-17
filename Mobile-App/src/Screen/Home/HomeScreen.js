import * as React from 'react';
import { View, Text, Image, Button, BackHandler, useRef, TextInput, Diamention, ActivityIndicator, Dimensions, ImageBackground } from 'react-native';
import { FlatList, TouchableOpacity, } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './home_styles';
import ReadMore from 'react-native-read-more-text';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import { requestGetApi, uploadPost, userSearch, bell_notification, requestPostApiUrlEncodedform, sports } from '../../NetworkCall/Service';
import { getAsyncStorage, setAsyncStorage } from '../../Routes/AsynstorageClass';
import { requestPostApiMedia, likePost, unlikePost, shared_post, favourite_post, post_unfavourite, getcolor } from '../../NetworkCall/Service';
import moment from 'moment';
import Toast from 'react-native-custom-toast';
import NetInfo from '@react-native-community/netinfo';
import VideoPlayer from 'react-native-video-player';
import firebase from 'firebase'
import AppLoader, { hideLoader, loaderRef, showLoader } from '../AppLoader'
import BottomTabBar from '../BottomTabBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loader from '../CustomComponent/Loader';
import Carousel from 'react-native-snap-carousel';
import CustomAlert from '../CustomAlert';
import ExitAlert from '../ExitAlert';
import Video from 'react-native-video';


let myProfile = ''
let UserObject = []
let UserList = []
let myUId = ''
let PostData_arr = []
let contImg = 1
let animating
console.disableYellowBox = true;
let unsubscribe
let userStatus = ""
let selected_sport = []

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class HomeScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      isSignUpModalVisible: false,
      setResponse: [],
      PostData_list: [],
      upload_post_id: '',
      islike: false,
      isModalVisible: false,
      sharePost_id: '',
      textcaption: '',
      isSelected: false,
      saveIndex: null,
      sharedId: '',
      isShared: '',
      UserList: [],
      UserListInfo: [],
      count: 0,
      globalTotalcount: 0,
      PageNo: 1,
      ishomeselected: true,
      loading: false,
      textShown: false,
      lengthMore: false,
      theamColor: '',
      openModal: false,
      notificationList: '',
      notifiaction_count: '',
      Alert_Visibility: false,
      alert_msg: '',
      exitAlert_Visibility: false,
      paused: false,
      videoIndex: 0,
      sportCategoryList: [],
      isSelectedCategory: false,
      isSelectedSubCategory: false,
      isMute: false,
      imageid: '',
      scrollStatus: false
    };
  }

  componentDidMount = async () => {
    this.setState({ PostData_list: [] })
    selected_sport = []
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    this.CheckConnectivity();
    myProfile = await getAsyncStorage("profile_pic");
    myUId = await getAsyncStorage('user_id');
    userStatus = await getAsyncStorage('status');
    this.getfitnessCategoryList();
    let theamColor = await getAsyncStorage('theamColor')
    this.setState({ theamColor: theamColor });
    this.getTheam();

    unsubscribe = this.props.navigation.addListener('focus', () => {
      selected_sport = []
      this.notificationList();
    });
  };

  getfitnessCategoryList = async (sportsId) => {
    const body = {};

    const { responseJson, err } = await requestGetApi(sports, body, 'GET')
    console.log('customerlist::', responseJson);
    if (responseJson.status == true) {
      console.log('customerlist::', responseJson.data);
      let sportCategoryList = responseJson.data;
      this.setState({ sportCategoryList: sportCategoryList })
      console.log("data", this.state.sportCategoryList)

    }
  };



  openAlert = () => {
    this.setState({ Alert_Visibility: false })
  }
  closeAlert = () => {
    this.setState({ Alert_Visibility: false })
  }
  openExitAlert = () => {
    this.setState({ exitAlert_Visibility: false });
    BackHandler.exitApp()
  }
  closeExitAlert = () => {
    this.setState({ exitAlert_Visibility: false })
  }
  getTheam = async () => {
    this.setState({ loading: true })
    const body = {
    }
    let token_value = await getAsyncStorage('tokenkey');
    const { responseJson, err } = await requestGetApi(getcolor, body, 'GET');
    console.log("getcolor=>", responseJson.data)
    theamColor = responseJson.data.color
    this.setState({ theamColor: responseJson.data.color })
    this.notificationList();
  }

  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{ color: '#D3D3D5', fontSize: 12, fontFamily: 'Raleway-Regular' }} onPress={handlePress}>
        Read more
      </Text>
    );
  };
  _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{ color: '#D3D3D5', fontSize: 12, fontFamily: 'Raleway-Regular' }} onPress={handlePress}>
        Read less
      </Text>
    );
  };

  notificationList = async () => {
    const body = {
    }
    let token_value = await getAsyncStorage('tokenkey');
    console.log("token", token_value);
    const { responseJson, err } = await requestGetApi(bell_notification, body, 'GET', token_value)
    console.log("notification list=>", responseJson);
    this.setState({ notifiaction_count: responseJson.data.total_message })
    this.getUploadPostList(selected_sport);
    if (responseJson.status == true) {
      this.setState({ notificationList: responseJson.data.records })
      this.setState({ notifiaction_count: responseJson.data.total_message })
    }

  }
  CheckConnectivity = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
      } else {
        this.setState({ Alert_Visibility: true })
        this.setState({ alert_msg: "Internet is not connected." })
      }
    });

    NetInfo.addEventListener((state) => {
      if (state.isConnected == true) {
      } else {
        this.setState({ Alert_Visibility: true })
        this.setState({ alert_msg: "Internet is not connected." })
      }
    });
  };

  _handleTextReady = () => {
  };


  onscrollView() {
    this.setState({ scrollStatus: true })
  }


  renderItems(data, outerindex, outeritem) {
    const { item, index } = data;

    const onplay = async (id, index) => {
      console.log("outer :::::")
      this.setState({ videoIndex: outerindex });
      this.setState({ imageid: id });

      this.setState({ scrollStatus: false });
    }

    const onpause = (id, index) => {
      console.log("clickashgdgiu")
      if (outerindex == this.state.videoIndex && this.state.imageid == item.image_id) {
        this.setState({ paused: false });
      } else {
        this.setState({ paused: true });
      }

    }

    return (
      <View style={{}}>
        {item.image_url.split('.').pop() == 'mp4' ? (
          <View style={{ width: '93%', }}>

            <VideoPlayer
              style={{ width: '100%', height: 300, alignSelf: 'center' }}
              video={{ uri: item.image_url }}
              muted={this.state.isMute}
              resizeMode={"cover"}
              onStart={() => onplay(item.image_id)}
              onStartPress={() => onplay(item.image_id)}
              paused={this.state.scrollStatus ? true : outerindex == this.state.videoIndex && this.state.imageid == item.image_id ? false : true}
              disableFullscreen={true}
              pauseOnPress={true}
              onPlayPress={() => onplay(item.image_id)}
              thumbnail={{ uri: item.thumbnail_image_url }}
            />


            <Text style={{
              right: '10%',
              color: "#fff",
              alignSelf: 'flex-end',
              fontSize: 15,
              position: 'absolute', fontFamily: 'Raleway-Regular',
              top: 5
            }}>{index + 1 + "/" + item.total_images}</Text>
          </View>

        ) : (
          <View>
            <Image
              style={{ width: '93%', height: 300 }}
              source={{ uri: item.image_url }}
            />
            <Text style={{
              right: '10%',
              color: "#fff",
              alignSelf: 'flex-end', fontSize: 15,
              position: 'absolute', top: 5, fontFamily: 'Raleway-Regular'
            }}>{index + 1 + "/" + item.total_images}</Text>
          </View>
        )}
      </View>
    );
  }

  handleBackButton() {
    this.setState({ exitAlert_Visibility: true })
    return true;
  }

  getUploadPostList = async (selected_sport) => {
    console.log("selected_sport:::", selected_sport);

    const body = {
      'per_page': 20,
      'page_no': this.state.PageNo,
      'sports_id': selected_sport,

    }
    let token_value = await getAsyncStorage('tokenkey');
    const { responseJson, err } = await requestGetApi(uploadPost, body, 'GET', token_value);

    console.log("upload post data=>", responseJson.data.records)

    this.setState({ loading: false })
    this.searchDataList();
    if (responseJson.status == true) {
      PostData_arr = responseJson.data.records;
      if (this.state.PageNo == 1) {
        this.setState({ PostData_list: PostData_arr })
      } else {
        this.setState({ PostData_list: this.state.PostData_list.concat(PostData_arr) })
      }

    } else {
      this.setState({ Alert_Visibility: true })
      this.setState({ alert_msg: responseJson.message })
    }
  };

  async searchDataList() {
    let token_value = await getAsyncStorage('tokenkey');
    const body = {
      'keyword': ''
    };
    const { responseJson, err } = await requestGetApi(userSearch, body, 'GET', token_value);
    this.setState({ UserListInfo: responseJson.data });
    this.setState({ loading: false })
    this.getChatUserList();

  }
  getChatUserList() {
    UserList = []
    let globalTotalcount = 0
    let dbRef = firebase.database().ref("chat/");
    dbRef.on("value", snapshot => {
      if (snapshot.val()) {

        UserObject = snapshot.val();
        const allchatIds = Object.entries(UserObject).map((item, index) => {
          return item[0];
        });
        const mychatsUserId = allchatIds.filter(function (item) { return item.indexOf(myUId) > -1; });
        for (c of mychatsUserId) {
          let otheruserId = c.replace(myUId, "");
          let userInfo = this.state.UserListInfo.filter(function (item) { return item.id == otheruserId; });
          let userChatWithProfile = userInfo.length > 0 ? userInfo[0] : {};
          let chatsData = Object.entries(UserObject[c]).map((item, index) => {
            return item[0];
          });
          let count = 0
          for (let key in UserObject[c]) {
            if (UserObject[c][key].isRead == 0 && myUId != UserObject[c][key].userid) {
              count++;
              globalTotalcount++;
            }
          }
          this.setState({ count: count })
          console.log("count=>", globalTotalcount)
          userChatWithProfile.totalUnread = count;
          userChatWithProfile.chats = chatsData.length > 0 ? UserObject[c][chatsData[chatsData.length - 1]] : {};
          UserList.push(userChatWithProfile);
        }
        this.setState({ UserList: UserList, globalTotalcount });

      }
    }

    )
  }

  likePostData = async (post_id) => {
    this.setState({ islike: !this.state.islike });
    this.setState({ upload_post_id: post_id });
    let token = await getAsyncStorage('tokenkey');
    console.log("token==", token)
    const formData = new FormData();
    formData.append('post_id', this.state.upload_post_id);
    const { responseJson, err } = await requestPostApiMedia(likePost, formData, 'POST', token);
    if (responseJson.status == true) {
      this.getUploadPostList(selected_sport);
    } else {
      this.setState({ Alert_Visibility: true })
      this.setState({ alert_msg: responseJson.message })
    }
  };

  unlikePostData = async (post_id) => {
    this.setState({ islike: !this.state.islike });
    this.setState({ upload_post_id: post_id });
    let token = await getAsyncStorage('tokenkey');
    const formData = new FormData();
    formData.append('post_id', this.state.upload_post_id);
    const { responseJson, err } = await requestPostApiMedia(unlikePost, formData, 'POST', token);
    if (responseJson.status == true) {
      this.getUploadPostList(selected_sport);
    } else {
      this.setState({ Alert_Visibility: true })
      this.setState({ alert_msg: responseJson.message })
    }
  };

  CommentsScreen = (postId, userId, post_comments) => {
    this.props.navigation.navigate('CommentScreen', {
      postId: postId,
      userId: userId,
      post_comments: post_comments,
    });
  };


  GetdateTime = (created_date) => {
    return moment(created_date).fromNow();
  };

  toggleModal = (post_id, sharedId, isShared) => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      sharePost_id: post_id,
      sharedId: sharedId,
      isShared: isShared
    });
  };

  NoClick() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  SharedPostScreen = async () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    let token = await getAsyncStorage('tokenkey');

    const formData = new FormData();

    if (this.state.isShared == true) {
      formData.append('post_id', this.state.sharedId);
    } else {
      formData.append('post_id', this.state.sharePost_id);
    }
    formData.append('description', this.state.textcaption);
    console.log("formData", formData)
    const { responseJson, err } = await requestPostApiMedia(shared_post, formData, 'POST', token);
    if (responseJson.status == true) {
      this.refs.customToast.showToast('Post shared.', 5000);
      this.getUploadPostList(selected_sport);
    } else {
      this.setState({ Alert_Visibility: true })
      this.setState({ alert_msg: responseJson.message })
    }
  };
  AddToFavourite = async (postId, index) => {
    let arr = [...this.state.PostData_list];
    for (let i = 0; i < arr.length; i++) {
      if (i == index) {
        arr[i].isSelected = true;
        this.setState(arr);
      }
    }
    console.log("id", postId)

    let token = await getAsyncStorage('tokenkey');
    const formData = new FormData();
    formData.append('post_id', postId);

    const { responseJson, err } = await requestPostApiMedia(favourite_post, formData, 'POST', token);
    if (responseJson.status == true) {
      this.getUploadPostList(selected_sport);
    } else {
      this.setState({ Alert_Visibility: true })
      this.setState({ alert_msg: responseJson.message })
    }
  };


  RemovefromFavourite = async (postId, index) => {
    let arr = [...this.state.PostData_list];
    for (let i = 0; i < arr.length; i++) {
      if (i == index) {
        arr[i].isSelected = false;
        this.setState(arr);
      }
    }

    let token = await getAsyncStorage('tokenkey');
    const formData = new FormData();
    formData.append('post_id', postId);
    const { responseJson, err } = await requestPostApiMedia(post_unfavourite, formData, 'POST', token);
    if (responseJson.status == true) {
      this.getUploadPostList(selected_sport);
    } else {
      this.setState({ Alert_Visibility: true })
      this.setState({ alert_msg: responseJson.message })
    }

  }
  PublicProfileScreen = async (userId) => {
    await setAsyncStorage('UserPostId', userId)
    this.props.navigation.navigate('PublicProfile', {
      userId: userId
    });
  };

  chatScreen = () => {
    this.props.navigation.navigate("ChatScreen", {
      UserList: this.state.UserList
    });
  }
  notifiaction = () => {
    this.props.navigation.navigate("NotificationList", {
      notificationList: this.state.notificationList

    })
  }
  GoChatBox(userid, profile_pic, fName, lName) {
    console.log("userDetails=>", userid, profile_pic, fName, lName)
    let name = fName + " " + lName
    if (profile_pic == null || profile_pic == '') {
      this.props.navigation.navigate('ChatBox', {
        OtherUserId: userid,
        profile_pic: '',
        name: name,
      });
    } else {
      this.props.navigation.navigate('ChatBox', {
        OtherUserId: userid,
        profile_pic: profile_pic,
        name: name,
      });
    }
    console.log("userId::::", userid, profile_pic)

  }
  footerList = () => {
    if (PostData_arr.length > 20) {
      return (
        <View>
          <Loader isLoader={this.state.loading}></Loader>
        </View>
      )
    } else {
      return null;
    }

  }
  handleLoadMore = async () => {
    console.log("handleLoadMore")
    {
      PostData_arr.length > 20 ?
        await this.setState({ PageNo: this.state.PageNo + 1 }) :
        null
    }

    this.getUploadPostList(selected_sport);
  }

  userLikeList = (post_likes) => {
    this.props.navigation.navigate("UserLike", {
      post_likes: post_likes
    })
  }

  categoryFilter = (sports_id, index) => {
    console.log('okkkk', index);
    this.setState({ sportsId: sports_id });
    let arr = [...this.state.sportCategoryList];
    for (let i = 0; i < arr.length; i++) {
      if (i == index) {
        arr[i].isSelectedCategory = true;
        this.setState(arr);
        selected_sport = selected_sport.filter(function (e) { return e !== sports_id })
        console.log("selected_sport:::", selected_sport)
      }
    }
    this.setState({ PageNo: 1 })
    this.getUploadPostList(selected_sport);

  }


  categoryFilter2 = (sports_id, index) => {
    console.log('sportsId', index);
    this.setState({ sportsId: sports_id });
    let arr = [...this.state.sportCategoryList];
    for (let i = 0; i < arr.length; i++) {
      if (i == index) {
        arr[i].isSelectedCategory = false;
        this.setState(arr);
        selected_sport.push(sports_id);

        console.log("selected_sport: remove ::", selected_sport)
      }
    }
    this.setState({ PageNo: 1 })
    this.getUploadPostList(selected_sport);

  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={{ height: '100%', backgroundColor: '#15141A' }}>
        {this.state.theamColor == "WHITE" ?
          <View style={styles.homeheader}>
            <TouchableOpacity style={styles.Top_camera} onPress={this.UploadImg}>
              <Image style={styles.camera_image}
                source={require('../../Images/ic-video-live.png')} />
            </TouchableOpacity>
            <Image style={styles.logo_timeline}
              source={require('../../Images/app-ic-b.png')} />
            <View>
              {this.state.notifiaction_count > 0 ?
                <View style={styles.notificationCount}>
                  <Text style={styles.count2}>{this.state.notifiaction_count}</Text>
                </View>
                : null}
              {userStatus != "4" ?
                <TouchableOpacity onPress={this.notifiaction}>
                  <Image style={styles.notifiaction}
                    source={require('../../Images/notification-bg-white.png')} />
                </TouchableOpacity> :
                <Image style={styles.notifiaction}
                  source={require('../../Images/notification-bg-white.png')} />
              }
            </View>
            <View style={styles.chat}>
              {this.state.globalTotalcount > 0 ?
                <View style={styles.chatCount3}>
                  <Text style={styles.msgcount2}>{this.state.globalTotalcount}</Text>
                </View>
                : null}
              {userStatus != "4" ?
                <TouchableOpacity onPress={this.chatScreen}>
                  <Image style={styles.chat_icon}
                    source={require('../../Images/ic_message_black.png')} />
                </TouchableOpacity> :
                <Image style={styles.chat_icon}
                  source={require('../../Images/ic_message_black.png')} />
              }
            </View>
          </View>
          :
          <View
            style={styles.homeheader2}>
            <TouchableOpacity style={styles.Top_camera} onPress={this.UploadImg}>
              <Image style={styles.camera_image}
                source={require('../../Images/ic-video-live.png')} />
            </TouchableOpacity>
            <Image style={styles.logo_timeline}
              source={require('../../Images/newapplogo.png')} />
            <View>
              {this.state.notifiaction_count > 0 ?
                <View style={styles.chatCount2}>
                  <Text style={styles.count}>{this.state.notifiaction_count}</Text>
                </View>
                : null}
              {userStatus != "4" ?
                <TouchableOpacity onPress={this.notifiaction}>
                  <Image style={styles.notifiaction}
                    source={require('../../Images/ic_notification.png')} />
                </TouchableOpacity> :
                <Image style={styles.notifiaction}
                  source={require('../../Images/ic_notification.png')} />
              }
            </View>
            <View style={styles.chat}>
              {this.state.globalTotalcount > 0 ?
                <View style={styles.chatCount}>
                  <Text style={styles.count}>{this.state.globalTotalcount}</Text>
                </View>
                : null}
              {userStatus != "4" ?
                <TouchableOpacity onPress={this.chatScreen}>
                  <Image style={styles.chat_icon}
                    source={require('../../Images/ic_message.png')} />
                </TouchableOpacity> :
                <Image style={styles.chat_icon}
                  source={require('../../Images/ic_message.png')} />
              }
            </View>
          </View>
        }


        <View style={{ marginTop: 10 }}>
          <FlatList
            horizontal={true}
            data={this.state.sportCategoryList}
            renderItem={({ item, index }) => (
              <View style={{ margin: 8, flexDirection: 'row', }}>
                {item.isSelectedCategory == false ?
                  <TouchableOpacity style={styles.categoryitemList2}
                    onPress={() => this.categoryFilter(item.sports_id, index)}>
                    <Text style={styles.category2}>{item.sports_name}</Text>
                  </TouchableOpacity> :
                  <TouchableOpacity style={styles.categoryitemList}
                    onPress={() => this.categoryFilter2(item.sports_id, index)}>
                    <Text style={styles.category}>{item.sports_name}</Text>
                  </TouchableOpacity>
                }
              </View>
            )}
            keyExtractor={(_, index) => index.toString()} />
        </View>



        <View style={{ flex: 3, backgroundColor: '#15141A', marginTop: 10 }}>
          <FlatList
            data={this.state.PostData_list}
            removeClippedSubviews={false}
            onScroll={(info) => this.onscrollView(info)}
            renderItem={({ item, index }) => (
              <View>
                {userStatus != "4" ? <View style={styles.CardView}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: '3%',
                      marginBottom: '2%',
                    }}>
                    <View style={{ flexDirection: 'row', }} onStartShouldSetResponder={() =>
                      this.PublicProfileScreen(
                        item.user_id,
                        item.user_first_name,
                        item.sport_name,
                        item.sub_sports_name,
                        item.user_last_name,
                        item.user_group_name
                      )
                    }>
                      <View style={{ marginLeft: 10 }}  >
                        <TouchableOpacity
                          onPress={() =>
                            this.PublicProfileScreen(
                              item.user_id,
                              item.user_first_name,
                              item.sport_name,
                              item.sub_sports_name,
                              item.user_last_name,
                              item.user_group_name
                            )
                          }>

                          {item.profile_pic == '' ? (
                            <Image
                              style={styles.profilepicBg}
                              source={require('../../Images/app-ic-b.png')}
                            />
                          ) : (
                            <Image
                              style={styles.profilepicBg}
                              source={{ uri: item.profile_pic }}
                            />
                          )}
                        </TouchableOpacity>
                      </View>

                      <View style={{ marginLeft: 5, marginTop: 5 }}>
                        {item.user_last_name == null ?
                          <Text style={styles.user_name}>
                            {item.user_first_name}
                          </Text>
                          :
                          <Text style={styles.user_name}>
                            {item.user_first_name + " " + item.user_last_name}
                          </Text>
                        }

                        <Text style={styles.userType}>
                          {item.user_group_name}
                        </Text>
                      </View>

                    </View>

                    <View style={{ flexDirection: 'row', position: 'absolute', right: '5%' }}>
                      <TouchableOpacity
                        style={styles.share_icon}
                        onPress={() => this.toggleModal(item.post_id, item.shared_post_id, item.isShared)}>
                        <Image
                          style={styles.shareImg}
                          source={require('../../Images/ic_share.png')}
                        />
                      </TouchableOpacity>

                      {item.isFavourite == true ? (
                        <TouchableOpacity style={styles.fav_icon}
                          style={styles.fav_icon}
                          onPress={() =>
                            this.RemovefromFavourite(item.post_id, index)
                          }>
                          <Image
                            style={styles.febImg}
                            source={require('../../Images/ic_favourite.png')}
                          />
                        </TouchableOpacity>

                      ) : (
                        <TouchableOpacity
                          style={styles.fav_icon}
                          onPress={() =>
                            this.AddToFavourite(item.post_id, index)
                          }>
                          <Image
                            style={styles.febImg}
                            source={require('../../Images/diselected_btn.png')}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  <View style={{ height: 300, }}>
                    {item.post_images.map(item2 => { item2.total_images = item.total_images; })}
                    {item.post_images == 0 ? (
                      <Image style={{ height: 300 }} source={require('../../Images/homeImg.png')} />
                    ) : (

                      <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={item.post_images}
                        renderItem={(item2) => this.renderItems(item2, index,)}
                        sliderWidth={Dimensions.get("window").width}
                        itemWidth={Dimensions.get("window").width}
                        scrollEndDragDebounceValue={0}
                        activeSlideOffset={0}
                        apparitionDelay={10}
                        lockScrollWhileSnapping={true}
                        inactiveSlideOpacity={1}
                        inactiveSlideScale={1}
                      />
                    )}
                  </View>

                  <View style={{ flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-between' }}>
                    {item.isLiked == false ? (
                      <TouchableOpacity
                        style={styles.like_bg}
                        onPress={() => {
                          this.likePostData(item.post_id);
                        }}>
                        <Image
                          style={styles.like}
                          source={require('../../Images/ic_like.png')}
                        />
                        <Text style={styles.textStyle}>Like</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.like_bg}
                        onPress={() => {
                          this.unlikePostData(item.post_id);
                        }}>
                        <Image
                          style={styles.like}
                          source={require('../../Images/ic_like.png')}
                        />
                        <Text style={styles.textStyle}>Like</Text>
                      </TouchableOpacity>
                    )}
                    {item.post_comments_count != "0" ?
                      <TouchableOpacity
                        style={styles.comments_bg2}
                        onPress={() => {
                          this.CommentsScreen(
                            item.post_id,
                            item.user_id,
                            item.post_comments,
                          );
                        }}>
                        <Image
                          style={styles.like}
                          source={require('../../Images/ic_comment.png')}
                        />
                        <Text style={styles.textStyle}>Comment</Text>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity
                        style={styles.comments_bg}
                        onPress={() => {
                          this.CommentsScreen(
                            item.post_id,
                            item.user_id,
                            item.post_comments,
                          );
                        }}>
                        <Image
                          style={styles.like}
                          source={require('../../Images/ic_comment.png')}
                        />
                        <Text style={styles.textStyle}>Comment</Text>
                      </TouchableOpacity>}
                    <TouchableOpacity style={styles.msg_bg} onPress={this.chatScreen}>
                      <Image
                        style={styles.like}
                        source={require('../../Images/ic_message.png')}
                      />
                      <Text style={styles.textStyle}>Message</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.userType2}>
                    {item.sport_name + ' - ' + item.sub_sports_name}
                  </Text>
                  <View style={{ width: '90%', height: 1, backgroundColor: '#343339', marginTop: 8, marginHorizontal: 20 }}></View>

                  {item.description == '' ? null :
                    <View
                      style={{
                        width: "80%",
                        marginTop: '2%',
                        alignSelf: 'flex-start',
                        marginLeft: 25,
                      }}>

                      <ReadMore
                        numberOfLines={4}
                        key={index.toString()}
                        renderTruncatedFooter={this._renderTruncatedFooter}
                        renderRevealedFooter={this._renderRevealedFooter}
                        onReady={this._handleTextReady}>
                        <Text style={styles.read_more}>{item.description}</Text>
                      </ReadMore>

                    </View>
                  }
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: "2%",
                      alignSelf: 'flex-start',
                      marginLeft: "6%"
                    }}>
                    <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() => this.userLikeList(item.post_likes)}>
                      <Text style={styles.counts_likes}>
                        {item.post_likes_count}
                      </Text>
                      <Text style={styles.text_likes}>Likes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginLeft: 10 }}
                      onPress={() => {
                        this.CommentsScreen(
                          item.post_id,
                          item.user_id,
                          item.post_comments,
                        );
                      }}>
                      <Text style={styles.view_all2}>
                        {item.post_comments_count + ' comments'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      marginTop: "2%", alignSelf: 'flex-start',
                      marginLeft: "6%",
                      marginBottom: "3%"
                    }}>
                    <Text style={styles.uploadedTime}>
                      {this.GetdateTime(item.created_date)}
                    </Text>
                  </View>
                </View>

                  :
                  <View style={styles.CardView}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: '3%',
                        marginBottom: '2%',
                      }}>
                      <View style={{ flexDirection: 'row', }} onStartShouldSetResponder={() =>
                        this.PublicProfileScreen(
                          item.user_id,
                          item.user_first_name,
                          item.sport_name,
                          item.sub_sports_name,
                          item.user_last_name,
                          item.user_group_name
                        )
                      }>
                        <View style={{ marginLeft: 10 }}  >
                          <View>

                            {item.profile_pic == '' ? (
                              <Image
                                style={styles.profilepicBg}
                                source={require('../../Images/ic_profile.png')}
                              />
                            ) : (
                              <Image
                                style={styles.profilepicBg}
                                source={{ uri: item.profile_pic }}
                              />
                            )}
                          </View>
                        </View>

                        <View style={{ marginLeft: 5, marginTop: 5 }}>
                          <Text style={styles.user_name}>
                            {item.user_first_name + " " + item.user_last_name}
                          </Text>
                          <Text style={styles.userType}>
                            {item.user_group_name}
                          </Text>
                        </View>

                      </View>

                      <View style={{ flexDirection: 'row', position: 'absolute', right: '5%' }}>
                        <View
                          style={styles.share_icon}
                        >
                          <Image
                            style={styles.shareImg}
                            source={require('../../Images/ic_share.png')}
                          />
                        </View>

                        {item.isFavourite == true ? (
                          <View style={styles.fav_icon}
                          >
                            <Image
                              style={styles.febImg}
                              source={require('../../Images/ic_favourite.png')}
                            />
                          </View>

                        ) : (
                          <View
                            style={styles.fav_icon}
                          >
                            <Image
                              style={styles.febImg}
                              source={require('../../Images/diselected_btn.png')}
                            />
                          </View>
                        )}
                      </View>
                    </View>
                    <View style={{ height: 250, }}>
                      {item.post_images.map(item2 => { item2.total_images = item.total_images; })}
                      {item.post_images == 0 ? (
                        <Image style={{ height: 250 }} source={require('../../Images/homeImg.png')} />
                      ) : (
                        <Carousel
                          ref={(c) => { this._carousel = c; }}
                          data={item.post_images}
                          renderItem={(item) => this.renderItems(item)}
                          sliderWidth={Dimensions.get("window").width}
                          itemWidth={Dimensions.get("window").width}
                          scrollEndDragDebounceValue={0}
                          activeSlideOffset={0}
                          apparitionDelay={10}
                          lockScrollWhileSnapping={true}
                          inactiveSlideOpacity={1}
                          inactiveSlideScale={1}
                        />
                      )}
                    </View>

                    <View style={{ flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-between' }}>
                      {item.isLiked == false ? (
                        <View
                          style={styles.like_bg}
                        >
                          <Image
                            style={styles.like}
                            source={require('../../Images/ic_like.png')}
                          />
                          <Text style={styles.textStyle}>Like</Text>
                        </View>
                      ) : (
                        <View
                          style={styles.like_bg}
                        >
                          <Image
                            style={styles.like}
                            source={require('../../Images/ic_like.png')}
                          />
                          <Text style={styles.textStyle}>Like</Text>
                        </View>
                      )}
                      {item.post_comments_count != "0" ?
                        <View
                          style={styles.comments_bg3}
                        >
                          <Image
                            style={styles.like}
                            source={require('../../Images/ic_comment.png')}
                          />
                          <Text style={styles.textStyle}>Comment</Text>
                        </View>
                        :
                        <View
                          style={styles.comments_bg3}
                        >
                          <Image
                            style={styles.like}
                            source={require('../../Images/ic_comment.png')}
                          />
                          <Text style={styles.textStyle}>Comment</Text>
                        </View>}
                      <View style={styles.msg_bg2}>
                        <Image
                          style={styles.like}
                          source={require('../../Images/ic_message.png')}
                        />
                        <Text style={styles.textStyle}>Message</Text>
                      </View>


                    </View>
                    <Text style={styles.userType2}>
                      {item.sport_name + ' - ' + item.sub_sports_name}
                    </Text>
                    <View style={{ width: '90%', height: 1, backgroundColor: '#343339', marginTop: 8, marginHorizontal: 20 }}></View>

                    {item.description == '' ? null :
                      <View
                        style={{
                          width: "80%",
                          marginTop: '2%',
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                        }}>

                        <ReadMore
                          numberOfLines={4}
                          key={index.toString()}
                          renderTruncatedFooter={this._renderTruncatedFooter}
                          renderRevealedFooter={this._renderRevealedFooter}
                          onReady={this._handleTextReady}>
                          <Text style={styles.read_more}>{item.description}</Text>
                        </ReadMore>

                      </View>
                    }
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: "2%",
                        alignSelf: 'flex-start',
                        marginLeft: "6%"
                      }}>
                      <View style={{ flexDirection: 'row', }} >
                        <Text style={styles.counts_likes}>
                          {item.post_likes_count}
                        </Text>
                        <Text style={styles.text_likes}>Likes</Text>
                      </View>
                      <View
                        style={{ marginLeft: 10 }}
                      >
                        <Text style={styles.view_all2}>
                          {item.post_comments_count + ' comments'}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: "2%", alignSelf: 'flex-start',
                        marginLeft: "6%",
                        marginBottom: "3%"
                      }}>
                      <Text style={styles.uploadedTime}>
                        {this.GetdateTime(item.created_date)}
                      </Text>
                    </View>
                  </View>


                }
              </View>

            )}

            keyExtractor={(_, index) => index.toString()}
            onEndReached={this.handleLoadMore}
            ListFooterComponent={this.footerList}
            onEndReachedThreshold={0.8}
          />
          <View style={styles.NextButton_2}>
            <Toast
              ref="customToast"
              backgroundColor="#fff"
              textColor="black"
            />
          </View>

        </View>

        <Modal
          backdropOpacity={0.4}
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.toggleModal()}
          style={{ width: '100%', alignSelf: 'center' }}
          onRequestClose={() => {
            this.setState({ isModalVisible: false });
          }}>
          <KeyboardAwareScrollView contentContainerStyle={{ height: '100%', width: '100%' }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => this.setState({ isModalVisible: false })} style={{ height: '100%', width: '100%' }}></TouchableOpacity>
            </View>
            <View style={styles.JonMarked_Completed_Modal}>
              <View style={styles.DeletePost_view}>
                <Text style={styles.DeletePost_1}>Share Post</Text>
              </View>
              <TextInput
                style={styles.inputStyle}
                underlineColorAndroid="#F6F6F7"
                placeholder="Write a caption..."
                placeholderTextColor="#9B9B9D"
                keyboardType="default"
                // returnKeyType="return"
                onChangeText={(textcaption) => this.setState({ textcaption })}
                // onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                multiline={true}
              />

              <View
                style={styles.NoBtn}
                onStartShouldSetResponder={() => this.SharedPostScreen()}>
                <Text style={styles.DeletePost_2}>Share</Text>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </Modal>

        <Loader isLoader={this.state.loading}></Loader>

        <Modal
          style={{}}
          isVisible={this.state.openModal}
          hasBackdrop={true}
          activeOpacity={.1}
          onBackdropPress={() => this.setState({ openModal: false })}
          onRequestClose={() => {
            this.setState({ openModal: false })
          }}
        >

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

              style={{ flexDirection: 'row', marginTop: '5%', marginLeft: "25%" }}>
              <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require("../../Images/ic-camera.png")}></Image>
              <Text style={{
                color: "#fff", fontSize: 16,
                fontFamily: 'Raleway-Regular'
              }}> Take image</Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 0.5,
                backgroundColor: '#98989B',
                marginTop: 10
              }}></View>
            <View style={{ flexDirection: 'row', marginTop: '5%', marginLeft: "25%" }}
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
              <Text style={{
                color: "#fff", fontSize: 16,
                fontFamily: 'Raleway-Regular'
              }}>Gallery</Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 0.5,
                backgroundColor: '#98989B',
                marginTop: 10
              }}></View>
            <View style={{ flexDirection: 'row', marginTop: '5%', marginLeft: "25%" }}
              onStartShouldSetResponder={() => {
                ImagePicker.openCamera(
                  {
                    mediaType: 'video',
                    includeBase64: false,
                    maxWidth: 1200,
                    maxHeight: 1200,
                    quality: 0.8,
                  }).then(image => {
                    console.log(image);
                    this.setState({ setResponse: image });
                    this.GotToUploadScreen();
                  },
                  );
              }}>
              <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require("../../Images/ic_video.png")}></Image>
              <Text style={{
                color: "#fff", fontSize: 16,
                fontFamily: 'Raleway-Regular'
              }}>Take video</Text>
            </View>
          </View>

        </Modal>
        <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
        <ExitAlert exitAlert_Visibility={this.state.exitAlert_Visibility} onPress={this.openExitAlert} closeModal={this.closeExitAlert} />
      </SafeAreaView>

    );
  }

  GotToUploadScreen = () => {
    this.setState({ openModal: !this.state.openModal });

    if (this.state.setResponse.length > 10) {
      this.setState({ Alert_Visibility: true })
      this.setState({ alert_msg: 'You are exceeding the maximum limit of upload files. Please reduce the selection upto 10 files.' })
    } else {
      console.log("agfgfdgsfd")
      this.setState({ openModal: false })
      this.props.navigation.navigate('UploadPost', {
        uploadUrl: this.state.setResponse,
      });
    }
  };
  UploadImg = () => {
    this.setState({ Alert_Visibility: true });
    this.setState({ alert_msg: '"Coming Soon"' })
  };

}

export default HomeScreen;
