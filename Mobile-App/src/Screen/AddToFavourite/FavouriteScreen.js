import * as React from 'react';
import { View, Text, Image, Colors, Button, Dimensions, ImageBackground } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './favourite_styles'
import ReadMore from 'react-native-read-more-text';
import Modal from 'react-native-modal';
import { requestGetApi, get_favourite } from '../../NetworkCall/Service';
import { getAsyncStorage } from '../../Routes/AsynstorageClass';
import { requestPostApiMedia, likePost, unlikePost } from '../../NetworkCall/Service';
import { requestDeleteApiMedia, delete_posts, post_unfavourite } from '../../NetworkCall/Service';
import NetInfo from "@react-native-community/netinfo";
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
import moment from 'moment';
import HeaderScreen from '../header';
import Loader from '../CustomComponent/Loader';
import Carousel from 'react-native-snap-carousel';
import CustomAlert from '../CustomAlert';
let SportList_Data = []
let PostData_arr = []
let unsubscribe
class FavouriteScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            isSignUpModalVisible: false,
            setResponse: '',
            PostData_list: [],
            upload_post_id: '',
            islike: false,
            isModalVisible: false,
            selectedItemIndex: 0,
            item_selected: '',
            PageNo: 1,
            loading: false,
            Alert_Visibility: false,
            alert_msg: '',
            paused: true,
            videoIndex: 0,
            isMute: false,
            scrollStatus: false,
            imageid: ''
        }
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ color: '#fff', marginTop: 5, fontSize: 12, fontFamily: 'Raleway-Regular' }} onPress={handlePress}>
                Read more
            </Text>
        );
    }

    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ color: '#fff', marginTop: 5, fontSize: 12, fontFamily: 'Raleway-Regular' }} onPress={handlePress}>
                Read less
            </Text>
        );
    }

    _handleTextReady = () => {
        // ...
    }

    UploadImg = () => {
        this.setState({ isSignUpModalVisible: !this.state.isSignUpModalVisible })
    }

    GotToUploadScreen = () => {
        this.props.navigation.navigate('UploadPost', {
            uploadUrl: this.state.setResponse,
            SportList: SportList_Data,

        })
        this.setState({ isSignUpModalVisible: !this.state.isSignUpModalVisible })
    }

    componentDidMount = () => {
        this.CheckConnectivity();
        unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getUploadPostList();
        });
    }

    openAlert = () => {
        this.setState({ Alert_Visibility: false })
    }
    closeAlert = () => {
        this.setState({ Alert_Visibility: false })
    }
    componentWillUnmount() {
        //unsubscribe.remove();
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
    getUploadPostList = async () => {
        this.setState({ loading: true });
        const body = {
            'per_page': 20,
            'page_no': this.state.PageNo
        }
        let token_value = await getAsyncStorage('tokenkey');
        console.log("token:::", token_value);
        const { responseJson, err } = await requestGetApi(get_favourite, body, 'GET', token_value)
        console.log("uploadPost Response------------", responseJson)
        this.setState({ loading: false });
        if (responseJson.status == true) {
            PostData_arr = responseJson.data.records;
            if (this.state.PageNo == 1) {
                this.setState({ PostData_list: responseJson.data.records })
            } else {
                this.setState({ PostData_list: this.state.PostData_list.concat(responseJson.data.records) })
            }
        } else {
        }
    }

    likePostData = async (post_id) => {
        this.setState({ islike: !this.state.islike })
        this.setState({ upload_post_id: post_id })
        let token = await getAsyncStorage('tokenkey');
        const formData = new FormData()
        formData.append('post_id', this.state.upload_post_id)
        const { responseJson, err } = await requestPostApiMedia(likePost, formData, 'POST', token)
        if (responseJson.status == true) {
            this.setState({ PageNo: 1 });
            this.getUploadPostList();
        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
        }
    }


    unlikePostData = async (post_id) => {
        this.setState({ islike: !this.state.islike })
        this.setState({ upload_post_id: post_id })
        let token = await getAsyncStorage('tokenkey');
        const formData = new FormData()
        formData.append('post_id', this.state.upload_post_id)
        const { responseJson, err } = await requestPostApiMedia(unlikePost, formData, 'POST', token)
        if (responseJson.status == true) {
            this.setState({ PageNo: 1 });
            this.getUploadPostList();
        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
        }
    }

    CommentsScreen = (postId, userId, post_comments) => {
        this.props.navigation.navigate('MyPostComments', {
            postId: postId,
            userId: userId,
            post_comments: post_comments
        })
    }

    GetdateTime = (created_date) => {
        created_date.slice(0, 10);
        created_date.slice(11, 21);

        return moment(created_date).fromNow();
    }

    toggleModal(post_id, index) {
        this.setState({
            isModalVisible: !this.state.isModalVisible, selectedItemIndex: index, item_selected: post_id

        });
    };

    NoClick() {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    deletePost = async () => {
        console.log("shhgdh")
        let arr = []
        this.state.PostData_list.map((item, index) => {
        })
        this.setState({ isModalVisible: !this.state.isModalVisible });
        let token = await getAsyncStorage('tokenkey');
        console.log("token", token)
        var details = {
            'post_id': this.state.item_selected

        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        const formData = new FormData()
        formData.append('post_id', this.state.item_selected)
        const { responseJson, err } = await requestDeleteApiMedia(delete_posts, formBody, 'DELETE', token)
        if (responseJson.status == true) {
            this.setState({ PageNo: 1 });
            this.getUploadPostList();
        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
        }
    }


    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };
    EditPost = (post_id) => {
        this.props.navigation.navigate('EditPostScreen', {
            uploadUrl: this.state.setResponse,
            SportList: SportList_Data,
            post_id: post_id,

        })
    }
    onscrollView() {
        this.setState({ scrollStatus: true })
    }
    renderItems(data, outerindex) {
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
                        <Text style={{ fontFamily: 'Raleway-Regular', right: '10%', color: "#fff", alignSelf: 'flex-end', fontSize: 15, marginRight: 10, position: 'absolute', top: 5 }}>{index + 1 + "/" + item.total_images}</Text>
                    </View>
                )}
            </View>
        );
    }
    GoTobackScreen = () => {
        this.props.navigation.goBack()
    }

    RemovefromFavourite = async (postId, index) => {
        let token = await getAsyncStorage('tokenkey');
        const formData = new FormData();
        formData.append('post_id', postId);
        const { responseJson, err } = await requestPostApiMedia(post_unfavourite, formData, 'POST', token);
        if (responseJson.status == true) {
            this.setState({ PageNo: 1 });
            this.getUploadPostList();
        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
        }
    }

    handleLoadMore = async () => {
        await this.setState({ PageNo: this.state.PageNo + 1 })
        this.getUploadPostList();
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
    userLikeList = (post_likes) => {
        this.props.navigation.navigate("UserLike", {
            post_likes: post_likes
        })
    }
    render() {
        const { navigate } = this.props.navigation;
        SportList_Data = this.props.route.params;
        console.log("::::::::::::SportList::::::", SportList_Data)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }} >
                <HeaderScreen title='My Saved' navigation={this.props.navigation} />
                <View style={{ flex: 1.7, backgroundColor: '#15141A' }}>
                    <FlatList data={this.state.PostData_list}
                        removeClippedSubviews={false}
                        onScroll={(info) => this.onscrollView(info)}
                        renderItem={({ item, index }) =>
                            <View style={styles.CardView}>
                                <View style={{ flexDirection: 'row', marginTop: "5%", marginBottom: "5%", marginLeft: '4%' }}>
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

                                    <View style={{ position: 'absolute', right: "10%" }}>
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
                                    </View>

                                </View>

                                <View style={{ height: 300, }}>
                                    {item.post_images.map(item2 => { item2.total_images = item.total_images; return item2, console.log("item----", item2) })}
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
                                <Text style={styles.userType2}>
                                    {item.sport_name + ' - ' + item.sub_sports_name}
                                </Text>
                                <View style={{ width: '90%', height: 1, backgroundColor: '#343339', marginTop: 8, marginHorizontal: 20 }}></View>
                                {item.description != '' ? (
                                    <View style={{
                                        width: "80%",
                                        marginTop: "2%",
                                        alignSelf: 'flex-start',
                                        marginLeft: "6%",
                                    }}>

                                        <ReadMore
                                            numberOfLines={4}
                                            renderTruncatedFooter={this._renderTruncatedFooter}
                                            renderRevealedFooter={this._renderRevealedFooter}
                                            onReady={this._handleTextReady}>
                                            <Text style={styles.read_more}>
                                                {item.description}
                                            </Text>
                                        </ReadMore>

                                    </View>) : null
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
                        }
                        keyExtractor={(_, index) => index.toString()}
                        onEndReached={this.handleLoadMore}
                        ListFooterComponent={this.footerList}
                        onEndReachedThreshold={0.8}
                    />
                </View>

                {
                    this.state.isModalVisible

                        ?

                        <Modal
                            activeOpacity={1}
                            backdropColor="transparent"
                            isVisible={this.state.isModalVisible}
                            style={{ width: "100%", alignSelf: 'center' }}
                            onRequestClose={() => { this.setState({ isModalVisible: false }) }}>
                            <View style={styles.JonMarked_Completed_Modal}>
                                <View style={styles.DeletePost_view}>
                                    <Image style={styles.video_icon} source={require('../../Images/ic_video.png')}></Image>
                                    <Text style={styles.DeletePost_1}>Delete Post</Text>
                                </View>
                                <Text style={styles.DeletePost}>Are You sure you want to delete post?</Text>
                                <View style={styles.BtnView}>
                                    <View style={styles.NoBtn} onStartShouldSetResponder={() => this.NoClick()}>
                                        <Text style={styles.DeletePost_2}>No</Text>
                                    </View>

                                    <View style={styles.NoBtn} onStartShouldSetResponder={() => this.deletePost()}>
                                        <Text style={styles.DeletePost_2}>Yes</Text>
                                    </View>

                                </View>
                            </View>
                        </Modal>
                        :
                        null
                }
                <Loader isLoader={this.state.loading}></Loader>
                <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
            </SafeAreaView>
        );
    }

}





export default FavouriteScreen;