import React from 'react'
import { View, Text, Image, ImageBackground, Button, BackHandler, Alert, Dimensions } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './userprofile_styles';
import { clearAsyncStorage } from '../../Routes/AsynstorageClass';
import ReadMore from 'react-native-read-more-text';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-picker';
import { requestGetApi, get_public_profile, get_public_details } from '../../NetworkCall/Service';
import { getAsyncStorage } from '../../Routes/AsynstorageClass';
import { requestPostApiMedia, likePost, unlikePost } from '../../NetworkCall/Service';
import Toast from 'react-native-custom-toast';
import { requestPostApiUrlEncodedform, follow_user, unfollow_user } from '../../NetworkCall/Service';
import NetInfo from "@react-native-community/netinfo";
import moment from 'moment';
import VideoPlayer from 'react-native-video-player';
import Loader from '../CustomComponent/Loader';
import Carousel from 'react-native-snap-carousel';
import CustomAlert from '../CustomAlert';

let SportList_Data = []
let PostData_arr = []
let first_name = ''
let user_id = ''
_menu = null;
let PublicDetails = ''
let lastName = ''
let myUserId = ''
let unsubscribe
class PublicProfile extends React.Component {

    constructor() {
        super();
        this.state = {
            isSignUpModalVisible: false,
            setResponse: '',
            PostData_list: [],
            upload_post_id: '',
            islike: false,
            isModalVisible: false,
            selectedItemIndex: 0,
            item_selected: '',
            isFollowers: false,
            animating: true,
            PageNo: 1,
            loading: false,
            theamColo: '',
            Alert_Visibility: false,
            alert_msg: '',
            paused: true,
            videoIndex: 0,
            scrollStatus: false,
            imageid: ''
        }
    }

    componentDidMount = async () => {
        myUserId = await getAsyncStorage('user_id');
        console.log("userid", user_id, myUserId);
        this.CheckConnectivity();
        this.getPublicDetailsList();
        unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getPublicDetailsList();
        });
        let theamColor = await getAsyncStorage('theamColor')
        this.setState({ theamColor: theamColor })
    }
    openAlert = () => {
        this.setState({ Alert_Visibility: false })
    }
    closeAlert = () => {
        this.setState({ Alert_Visibility: false })
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



    CheckConnectivity = () => {

        NetInfo.fetch().then(state => {
            if (state.isConnected == true) {
            } else {
                this.setState({ Alert_Visibility: true })
                this.setState({ alert_msg: "Internet is not connected." })
            }
        });

        NetInfo.addEventListener(state => {
            if (state.isConnected == true) {
            } else {
                this.setState({ Alert_Visibility: true })
                this.setState({ alert_msg: "Internet is not connected." })
            }
        });
    }
    getPublicDetailsList = async () => {
        this.setState({ loading: true })
        const body = {

        }
        let public_details = get_public_details + "/" + user_id
        let token_value = await getAsyncStorage('tokenkey');
        const { responseJson, err } = await requestGetApi(public_details, body, 'GET', token_value)
        console.log("public details::", responseJson);
        this.setState({ loading: false })
        if (responseJson.status == true) {
            this.getPublicPostList();
            PublicDetails = responseJson.data;
        } else {
        }
    }


    getPublicPostList = async () => {
        const body = {
            'per_page': 20,
            'page_no': this.state.PageNo
        }
        let public_profile = get_public_profile + "/" + user_id
        let token_value = await getAsyncStorage('tokenkey');
        console.log('asdfghjk==>>',token_value);
        const { responseJson, err } = await requestGetApi(public_profile, body, 'GET', token_value)
        this.setState({ loading: false })
        if (responseJson.status == true) {
            PostData_arr = responseJson.data.records;
            if (this.state.PageNo == 1) {
                console.log('Ashihs kumar verma===>>',responseJson.data.records);
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
        formData.append('post_id', post_id)

        const { responseJson, err } = await requestPostApiMedia(likePost, formData, 'POST', token)
        console.log("formData++++", formData)
        console.log("token", token)
        console.log("Response+++", responseJson)
        if (responseJson.status == true) {
            this.setState({ PageNo: 1 })
            this.getPublicPostList();
        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
        }
    }


    unlikePostData = async (post_id) => {
        this.setState({ upload_post_id: post_id })
        let token = await getAsyncStorage('tokenkey');
        const formData = new FormData()
        formData.append('post_id', post_id)
        console.log("unlikePostData formData++++", formData)
        console.log("unlikePostData Response+++", JSON.stringify(responseJson))
        const { responseJson, err } = await requestPostApiMedia(unlikePost, formData, 'POST', token)
        if (responseJson.status == true) {
            this.setState({ PageNo: 1 })
            this.getPublicPostList();
        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
        }
    }
    CommentsScreen = (postId, userId, post_comments) => {
        this.props.navigation.navigate('MyPostComments', {
            postId: postId,
            userId: userId,
            post_comments: post_comments,
            publicProfile: "publicProfile"

        })
    }
    GetdateTime = (created_date) => {
        return moment(created_date).fromNow();
    }
    GoTobackScreen = () => {
        this.props.navigation.goBack()
    }

    followers = async () => {
        this.setState({ isFollowers: !this.state.isFollowers })
        let token = await getAsyncStorage('tokenkey');
        console.log("user_id", user_id)
        var details = {
            'user_id': user_id

        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        const { responseJson, err } = await requestPostApiUrlEncodedform(follow_user, formBody, 'POST', token)
        if (responseJson.status == true) {
            this.setState({ PageNo: 1 })
            this.getPublicDetailsList();
        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
        }
    }

    Unfollowers = async () => {
        this.setState({ isFollowers: !this.state.isFollowers })
        this.setState({
            isModalVisible: !this.state.isModalVisible
        });
        let token = await getAsyncStorage('tokenkey');
        console.log("user_id", user_id)
        var details = {
            'user_id': user_id

        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        const { responseJson, err } = await requestPostApiUrlEncodedform(unfollow_user, formBody, 'POST', token)
        if (responseJson.status == true) {
            this.setState({ PageNo: 1 })
            this.getPublicDetailsList();
        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
        }
    }
    toggleModal() {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        });
    };
    NoClick() {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }
    followersList = () => {
        this.props.navigation.navigate('PublicFallowers', {
            userId: user_id,
        })

    }
    followingList = () => {
        this.props.navigation.navigate('PublicFollowing', {
            userId: user_id,
        })
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
        await this.setState({ PageNo: this.state.PageNo + 1 })
        this.getPublicPostList();
    }

    userLikeList = (post_likes) => {
        this.props.navigation.navigate("UserLike", {
            post_likes: post_likes
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
            <View style={{ height: 300 }}>

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
                        <Text style={{
                            right: '10%', color: "#fff",
                            alignSelf: 'flex-end',
                            fontSize: 15,
                            marginRight: 10,
                            position: 'absolute', top: 5, fontFamily: 'Raleway-Regular'
                        }}>{index + 1 + "/" + item.total_images}</Text>
                    </View>
                )}
            </View>
        );
    }

    render() {
        user_id = this.props.route.params.userId;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>
                {this.state.theamColor == 'BLACK' ?
                    <View style={styles.Header_Bg}>
                        <TouchableOpacity onPress={this.GoTobackScreen} style={{ marginLeft: "20%", }}>
                            <Image style={{ width: 20, height: 20 }} source={require('../../Images/back.png')} ></Image>
                        </TouchableOpacity>
                        <Text style={styles.headerText}>{first_name + " " + lastName}</Text>
                    </View> :
                    <View style={styles.Header_Bg2}>
                        <TouchableOpacity onPress={this.GoTobackScreen} style={{ marginLeft: "20%", }}>
                            <Image style={{ width: 20, height: 20 }} source={require('../../Images/back_black.png')} ></Image>
                        </TouchableOpacity>
                        <Text style={styles.headerText2}>{first_name + " " + lastName}</Text>
                    </View>
                }

                <View style={styles.fieldBG}>
                    {PublicDetails.profile_pic == '' ? (
                        <Image
                            style={{ marginLeft: '0%', width: 60, height: 60 }}
                            source={require('../../Images/ic_profile.png')} />
                    ) : (
                        <Image
                            style={{
                                marginLeft: '0%',
                                width: 60,
                                height: 60,
                                borderRadius: 60 / 2,
                            }}
                            source={{ uri: PublicDetails.profile_pic }}
                        />
                    )}
                    <View style={{ marginLeft: "5%" }}>
                        {PublicDetails.last_name == null ?
                            <Text style={styles.ProfileText}>{PublicDetails.first_name}</Text>
                            :
                            <Text style={styles.ProfileText}>{PublicDetails.first_name + " " + PublicDetails.last_name}</Text>
                        }

                        <Text style={styles.userGN}>{PublicDetails.user_group_name}</Text>
                        {PublicDetails.profession == "" ?
                            null
                            :
                            <Text style={styles.userGN}>{PublicDetails.profession}</Text>
                        }
                        <Text style={styles.userGN}>{PublicDetails.sport_name}</Text>
                    </View>
                    {user_id == myUserId ? null :
                        <View style={{ marginLeft: '1%' }}>
                            {this.state.isFollowers || PublicDetails.isFollow == true ?
                                <TouchableOpacity style={styles.followingBg} onPress={() => this.toggleModal()} >
                                    <Text style={styles.Following}>Following</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.followingBg} onPress={() => this.followers()} >
                                    <Text style={styles.Following}>Follow</Text>
                                </TouchableOpacity>

                            }

                        </View>
                    }


                </View>
                <View style={styles.followersBg}>
                    <TouchableOpacity style={{ marginTop: "5%", marginLeft: "9%" }} >
                        <Text style={styles.Text_2}>{PublicDetails.total_posts}</Text>
                        <Text style={styles.Text_1}>Post</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: "5%", marginLeft: "5%" }} onPress={() => this.followersList()}>
                        <Text style={styles.Text_2}>{PublicDetails.total_follower}</Text>
                        <Text style={styles.Text_1}>Followers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: "5%", marginLeft: "5%" }} onPress={() => this.followingList()}>
                        <Text style={styles.Text_2}>{PublicDetails.total_following}</Text>
                        <Text style={styles.Text_1}>Following</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 3, backgroundColor: '#15141A' }}>


                    <FlatList data={this.state.PostData_list}
                        removeClippedSubviews={false}
                        onScroll={(info) => this.onscrollView(info)}
                        renderItem={({ item, index }) =>
                            <View style={styles.CardView}>

                                <View style={{ flexDirection: 'row', marginTop: "5%", marginBottom: "5%", marginLeft: "3%" }}>
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
                                </View>

                                <View style={{ height: 300, }}>
                                    {item.post_images.map(item2 => { item2.total_images = item.total_images })}
                                    {item.post_images == 0 ? (
                                        <Image style={{ height: 250, width: '100%' }} source={require('../../Images/homeImg.png')} />
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
                                {item.sport_name == null && item.sub_sports_name == null ?
                                    null :
                                    <Text style={styles.userType2}>
                                        {item.sport_name + ' - ' + item.sub_sports_name}
                                    </Text>
                                }

                                <View style={{ width: '90%', height: 1, backgroundColor: '#343339', marginTop: 8, marginHorizontal: 20 }}></View>


                                {item.description == "" ? null :
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
                        }
                        keyExtractor={(_, index) => index.toString()}
                        onEndReached={this.handleLoadMore}
                        ListFooterComponent={this.footerList}
                        onEndReachedThreshold={0.8}
                    />
                    <View style={styles.NextButton_2}>
                        <Toast ref="customToast" backgroundColor="#fff" textColor='black' />
                    </View>

                </View>
                {
                    this.state.isModalVisible

                        ?

                        <Modal
                            activeOpacity={1}
                            isVisible={this.state.isModalVisible}
                            style={{ width: "100%", alignSelf: 'center' }}
                            onRequestClose={() => { this.setState({ isModalVisible: false }) }}>
                            <View style={styles.JonMarked_Completed_Modal}>
                                <Text style={styles.DeletePost}>Are you sure you want to unfollow</Text>
                                <Text style={styles.DeletePost_2}>{PublicDetails.first_name + " " + PublicDetails.last_name + " ?"}</Text>
                                <View style={styles.BtnView}>
                                    <View style={styles.NoBtn} onStartShouldSetResponder={() => this.NoClick()}>
                                        <Text style={styles.DeletePost_3}>No Thanks</Text>
                                    </View>
                                    <View style={styles.NoBtn} onStartShouldSetResponder={() => this.Unfollowers()}>
                                        <Text style={styles.DeletePost_3}>Unfollow</Text>
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
        )
    }

}

export default PublicProfile;