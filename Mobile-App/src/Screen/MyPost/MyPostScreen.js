import * as React from 'react';
import {
  View, Text, Image, Button, ImageBackground, Alert, Dimensions
} from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './mypost_styles';
import ReadMore from 'react-native-read-more-text';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-picker';
import { requestGetApi, myPost } from '../../NetworkCall/Service';
import { getAsyncStorage } from '../../Routes/AsynstorageClass';
import { requestPostApiMedia, likePost, unlikePost } from '../../NetworkCall/Service';
import { requestDeleteApiMedia, delete_posts } from '../../NetworkCall/Service';
import Toast from 'react-native-custom-toast';
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';
import VideoPlayer from 'react-native-video-player';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import HeaderScreen from '../header';
import Loader from '../CustomComponent/Loader';
import Carousel from 'react-native-snap-carousel';
import CustomAlert from '../CustomAlert';

let SportList_Data = [];
let PostData_arr = [];
let ImageUrl = '';
let unsubscribe

class MyPostScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isSignUpModalVisible: false,
      setResponse: '',
      newPostData_list: [],
      upload_post_id: '',
      islike: false,
      isModalVisible: false,
      selectedItemIndex: 0,
      item_selected: '',
      PostImaheUrl: '',
      post_id: '',
      description: '',
      sports_name: '',
      subsports_name: '',
      subsportId: '',
      sportId: '',
      PageNo: 1,
      fetchingStatus: false,
      setOnLoad: false,
      loading: false,
      isLoading: false,
      isRefreshing: false,
      Alert_Visibility: false,
      alert_msg: '',
      paused: true,
      videoIndex: 0,
      isMute: false,
      scrollStatus: false,
      imageid:''
      
    };
    this.page = 0;
  }

  componentDidMount = () => {
    this.CheckConnectivity();
    this.getUploadPostList();
    unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getUploadPostList();
    });
  };


  openAlert = () => {
    this.setState({ Alert_Visibility: false })
  }
  closeAlert = () => {
    this.setState({ Alert_Visibility: false })
  }
  componentWillUnmount() {
  }
  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{ color: '#fff', marginTop: 5, fontSize: 12, fontFamily: 'Raleway-Regular' }} onPress={handlePress}>
        Read more
      </Text>
    );
  };

  _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{ color: '#fff', marginTop: 5, fontSize: 12, fontFamily: 'Raleway-Regular' }} onPress={handlePress}>
        Read less
      </Text>
    );
  };

  _handleTextReady = () => {
    // ...
  };

  UploadImg = () => {
    this.setState({ isSignUpModalVisible: !this.state.isSignUpModalVisible });
  };

  GotToUploadScreen = () => {
    this.props.navigation.navigate('UploadPost', {
      uploadUrl: this.state.setResponse,
      SportList: SportList_Data,
    });
    this.setState({ isSignUpModalVisible: !this.state.isSignUpModalVisible });
  };


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
  getUploadPostList = async () => {
    this.setState({ loading: true })
    const body = {
      'per_page': 20,
      'page_no': this.state.PageNo
    }
    let token_value = await getAsyncStorage('tokenkey');
    console.log(token_value)
    const { responseJson, err } = await requestGetApi(myPost, body, 'GET', token_value);
    console.log('uploadPost Response-', responseJson);
    this.setState({ loading: false })
    if (responseJson.status == true) {
      PostData_arr = responseJson.data.records;
      if (this.state.PageNo == 1) {
        this.setState({ newPostData_list: PostData_arr });
      } else {
        this.setState({ newPostData_list: this.state.newPostData_list.concat(PostData_arr) })
      }
    } else {
      this.setState({ Alert_Visibility: true })
      this.setState({ alert_msg: responseJson.message })
      console.error(error);
      that.setState({ setOnLoad: false, fetching_Status: false });
    }
  };

  likePostData = async (post_id) => {
    this.setState({ islike: !this.state.islike });
    this.setState({ upload_post_id: post_id });
    let token = await getAsyncStorage('tokenkey');
    const formData = new FormData();
    formData.append('post_id', this.state.upload_post_id);
    const { responseJson, err } = await requestPostApiMedia(likePost, formData, 'POST', token);
    if (responseJson.status == true) {
      this.getUploadPostList();
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
      this.getUploadPostList();
    } else {
      this.setState({ Alert_Visibility: true })
      this.setState({ alert_msg: responseJson.message })
    }
  };

  CommentsScreen = (postId, userId, post_comments) => {
    this.props.navigation.navigate('MyPostComments', {
      postId: postId,
      userId: userId,
      post_comments: post_comments,
    });
  };

  GetdateTime = (created_date) => {
    return moment(created_date).fromNow();
  };

  toggleModal(post_id, index) {
    console.log("id", post_id)
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      selectedItemIndex: index,
      item_selected: post_id,
    });
  }

  NoClick() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  deletePost = async () => {
    this.state.newPostData_list.map((item, index) => {
    });
    this.setState({ isModalVisible: !this.state.isModalVisible });
    let token = await getAsyncStorage('tokenkey');
    console.log('token', this.state.item_selected);
    var details = {
      post_id: this.state.item_selected,
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    const formData = new FormData();
    formData.append('post_id', this.state.item_selected);
    const { responseJson, err } = await requestDeleteApiMedia(delete_posts, formBody, 'DELETE', token,);
    console.log('response', responseJson);
    if (responseJson.status == true) {
      this.getUploadPostList();
    } else {
      this.setState({ Alert_Visibility: true })
      this.setState({ alert_msg: responseJson.message })
    }
  };

  _menu = null;
  setMenuRef = (ref) => {
    this._menu = ref;
  };
  hideMenu = () => {
    this._menu.hide();
  };
  showMenu = (post_id, description, sports_name, subsports_name,
    item, post_imagesList, sportId, subsportId) => {
    this._menu.show();
    post_imagesList.map(item => {
      ImageUrl = item.image_url
    })
    console.log("item", item)
    this.setState({ post_id: post_id });
    this.setState({ description: description });
    this.setState({ sports_name: sports_name });
    this.setState({ subsports_name: subsports_name });
    this.setState({ sportId: sportId });
    this.setState({ subsportId: subsportId });

  };
  EditPost = (postid, description, sports_name, subsports_name,
    item, post_imagesList, sportId, subsportId) => {
    post_imagesList.map(item => {
      ImageUrl = item.image_url
    })
    console.log("item", postid)
    this.setState({ post_id: postid });
    this.setState({ description: description });
    this.setState({ sports_name: sports_name });
    this.setState({ subsports_name: subsports_name });
    this.setState({ sportId: sportId });
    this.setState({ subsportId: subsportId });

    this.props.navigation.navigate('EditPostScreen', {
      uploadUrl: this.state.setResponse,
      SportList: SportList_Data,
      post_id: postid,
      description: this.state.description,
      sports_name: this.state.sports_name,
      subsports_name: this.state.subsports_name,
      image: ImageUrl,
      sportId: this.state.sportId,
      subsportId: this.state.subsportId,
    });

  };
  GoTobackScreen = () => {
    this.props.navigation.goBack()
  };
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
    console.log("PostData_arr size=>", PostData_arr.length)
    console.log("1111111111")
    await this.setState({ PageNo: this.state.PageNo + 1 })
    this.getUploadPostList();
  }
  userLikeList = (post_likes) => {
    this.props.navigation.navigate("UserLike", {
      post_likes: post_likes
    })
  }

  onscrollView() {
    this.setState({ scrollStatus: true })
  }

  renderItems(data,outerindex) {
    const { item, index } = data;

    const onplay = async (id, index) => {
      console.log("outer :::::")
      this.setState({ videoIndex: outerindex });
      this.setState({ imageid: id });

      this.setState({ scrollStatus: false });
    }

    return (
      <View style={{ height: 300, }}>

        {item.image_url.split('.').pop() == 'mp4' ? (

          <View style={{ alignItems: 'center', height: 300, width: '93%', }}>
            <View style={{ width: '100%', height: 300 }}>
              <VideoPlayer
               style={{ width: '100%', height: 300 }}
               video={{ uri: item.image_url }}
               resizeMode={"cover"}
               muted={this.state.isMute}
               onStart={() => onplay(item.image_id)}
               onStartPress={() => onplay(item.image_id)}
               paused={this.state.scrollStatus ? true : outerindex == this.state.videoIndex && this.state.imageid == item.image_id ? false : true}
               disableFullscreen={true}
               pauseOnPress={true}
               onPlayPress={() => onplay(item.image_id)}
               thumbnail={{ uri: item.thumbnail_image_url }}
              />
            </View>
          
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
              resizeMode={'cover'}
              rate={1.0}
            />
            <Text style={{ right: '10%', color: "#fff", alignSelf: 'flex-end', fontSize: 15, marginRight: 10, position: 'absolute', top: 5, fontFamily: 'Raleway-Regular', }}>{index + 1 + "/" + item.total_images}</Text>
          </View>
        )}
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    SportList_Data = this.props.route.params;
    return (
      <SafeAreaView style={{ height: '100%', backgroundColor: '#15141A' }}>
        <HeaderScreen title='My Post' navigation={this.props.navigation} />
        <View style={{ flex: 1.7, backgroundColor: '#15141A' }}>

          <FlatList
            data={this.state.newPostData_list}
            removeClippedSubviews={false}
            onScroll={(info) => this.onscrollView(info)}
            renderItem={({ item, index }) => (
              <View
                key={index}
                style={styles.CardView}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: '5%',
                    marginBottom: '5%',
                    marginLeft: '3%',
                  }}>
                  {item.profile_pic == '' ? (
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
                      source={{ uri: item.profile_pic }}
                    />
                  )}
                  <View style={{ marginLeft: 10 }}>
                    { item.user_last_name==null ?
                    <Text style={styles.user_name}>
                    {item.user_first_name}
                  </Text>:
                  <Text style={styles.user_name}>
                  {item.user_first_name + " " + item.user_last_name}
                </Text>
                    }
                    
                    <Text style={styles.userType}>
                      {item.user_group_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      position: 'absolute',
                      right: '10%',
                    }}>
                    {item.isShared == true ? null :
                      <Menu >
                        <MenuTrigger width={30} text='' >
                          <Image
                            style={styles.moreImg}
                            source={require('../../Images/ic_more_icon.png')}
                          />
                        </MenuTrigger>
                        <MenuOptions optionsContainerStyle=
                          {{ height: 75, width: 90, backgroundColor: '#000' }} >
                          <MenuOption onSelect={() => this.EditPost(item.post_id, item.description,
                            item.sport_name, item.sub_sports_name,
                            item, item.post_images, item.sports_id, item.sub_sports_id)} >
                            <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'Raleway-Regular' }}>Edit</Text>
                          </MenuOption>
                          <MenuOption onSelect={() => this.toggleModal(item.post_id, index)} >
                            <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'Raleway-Regular' }}>Delete</Text>
                          </MenuOption>
                        </MenuOptions>
                      </Menu>
                    }
                  </View>
                </View>
                <View style={{ height: 300, }}>
                  {item.post_images.map(item2 => { item2.total_images = item.total_images; })}
                  {item.post_images == 0 ? (
                    <Image style={{ height: 300, width: '100%' }} source={require('../../Images/homeImg.png')} />
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
                <View style={{ flexDirection: 'row', marginHorizontal: 20, }}>
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
                </View>
                {item.sport_name==null && item.sub_sports_name==null ?
                null:
                <Text style={styles.userType2}>
                {item.sport_name + ' - ' + item.sub_sports_name}
              </Text>
                }
               
                <View style={{ width: '90%', height: 1, backgroundColor: '#343339', marginTop: 8, marginHorizontal: 20 }}></View>
                {item.description != '' ? (
                  <View
                    style={{
                      width: "80%",
                      marginTop: "1%",
                      alignSelf: 'flex-start',
                      marginLeft: "6%",
                    }}>
                    <ReadMore
                      numberOfLines={4}
                      renderTruncatedFooter={this._renderTruncatedFooter}
                      renderRevealedFooter={this._renderRevealedFooter}
                      onReady={this._handleTextReady}>
                      <Text style={styles.read_more}>{item.description}</Text>
                    </ReadMore>
                  </View>
                ) : null}
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: "2%",
                    alignSelf: 'flex-start',
                    marginLeft: "6%"
                  }}>
                  <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() => this.userLikeList(item.post_likes)} >
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
                    }}
                  >
                    <Text style={styles.view_all}>
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

            )}
            keyExtractor={(_, index) => index.toString()}
            refreshing={false}
            ListFooterComponent={this.footerList}
            onEndReachedThreshold={0.5}
            onEndReached={({ distanceFromEnd }) => {
              console.log('on end reached ', distanceFromEnd)
              this.handleLoadMore()
            }}
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
          isVisible={this.state.isSignUpModalVisible}
          onRequestClose={() => {
            this.setState({ isSignUpModalVisible: false });
          }}>
          <View style={styles.SignupModal}>
            <View style={{ width: '100%', height: 0.5, marginTop: 25 }}></View>
            <Button
              title="Take image"
              color="#15141A"
              onPress={() => {
                ImagePicker.launchCamera(
                  {
                    mediaType: 'photo',
                    includeBase64: false,
                    maxHeight: 200,
                    maxWidth: 200,
                  },
                  (response) => {
                    this.setState({ setResponse: response });
                    console.log(
                      '::::::::response:::::',
                      this.state.setResponse,
                    );
                    this.GotToUploadScreen();
                  },
                );
              }}></Button>
            <View
              style={{
                width: '100%',
                height: 0.5,
                backgroundColor: '#98989B',
              }}></View>
            <Button
              color="#15141A"
              title="Select image"
              onPress={() => {
                ImagePicker.launchImageLibrary(
                  {
                    mediaType: 'photo',
                    includeBase64: false,
                    maxHeight: 200,
                    maxWidth: 200,
                  },
                  (response) => {
                    this.setState({ setResponse: response });
                    console.log(
                      '::::::::response:::::',
                      this.state.setResponse,
                    );
                    this.GotToUploadScreen();
                  },
                );
              }}
            />
            <View
              style={{
                width: '100%',
                height: 0.5,
                backgroundColor: '#98989B',
              }}></View>
            <Button
              color="#15141A"
              title="Take video"
              onPress={() =>
                ImagePicker.launchCamera({ mediaType: 'video' }, (response) => {
                  this.setState({ setResponse: response });
                  console.log('::::::::response:::::', this.state.setResponse);
                  this.GotToUploadScreen();
                })
              }
            />
            <View
              style={{
                width: '100%',
                height: 0.5,
                backgroundColor: '#98989B',
              }}></View>
            <Button
              color="#15141A"
              title="Select video"
              onPress={() =>
                ImagePicker.launchImageLibrary(
                  { mediaType: 'video' },
                  (response) => {
                    this.setState({ setResponse: response });
                    this.GotToUploadScreen();
                  },
                )
              }
            />
          </View>
        </Modal>

        {this.state.isModalVisible ? (
          <Modal
            activeOpacity={1}
            backdropColor="transparent"
            isVisible={this.state.isModalVisible}
            style={{ width: '100%', alignSelf: 'center' }}
            onRequestClose={() => {
              this.setState({ isModalVisible: false });
            }}>
            <View style={styles.JonMarked_Completed_Modal}>
              <Text style={styles.DeletePost}>
                Are you sure you want to delete this post ?
              </Text>
              <View style={styles.BtnView}>
                <View
                  style={styles.NoBtn}
                  onStartShouldSetResponder={() => this.NoClick()}>
                  <Text style={styles.DeletePost_3}>No</Text>
                </View>

                <View
                  style={styles.NoBtn}
                  onStartShouldSetResponder={() => this.deletePost()}>
                  <Text style={styles.DeletePost_3}>Yes</Text>
                </View>
              </View>
            </View>
          </Modal>
        ) : null}
        <Loader isLoader={this.state.loading}></Loader>
        <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
      </SafeAreaView>
    );
  }
}

export default MyPostScreen;
const triggerStyles = {
  triggerText: {
    color: 'white',
  },
  triggerOuterWrapper: {
    backgroundColor: 'black',
    padding: 5,
    flex: 1,
  },
  triggerWrapper: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  triggerTouchable: {
    underlayColor: 'black',
    activeOpacity: 100,
    style: {
      flex: 1,
    },
  }
}
const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'green',
    padding: 5,
  },
  optionsWrapper: {
    backgroundColor: 'purple',
  },
  optionWrapper: {
    backgroundColor: 'yellow',
    margin: 5,
  },
  optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70,
  },
  optionText: {
    color: 'brown',
  },
};



