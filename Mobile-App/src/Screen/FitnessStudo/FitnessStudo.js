// In App.js in a new project
import * as React from 'react';
import { View, Text, Image, BackHandler, Alert, Dimensions, ImageBackground } from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import ReadMore from 'react-native-read-more-text';
import { requestGetApi, GetFitnessStudoList, GetfitnessCategoryList } from '../../NetworkCall/Service';
import { getAsyncStorage, setAsyncStorage } from '../../Routes/AsynstorageClass';
import AppLoader, { loaderRef } from '../AppLoader';
import { showLoader, hideLoader } from '../AppLoader';
import { requestPostApiMedia, fitnessStudio_like, fitnessStudio_unlike, save_my_post, unsavefrommypost, } from '../../NetworkCall/Service';
import moment from 'moment';
import Toast from 'react-native-custom-toast';
import NetInfo from '@react-native-community/netinfo';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
import HeaderScreen from '../header';
import Loader from '../CustomComponent/Loader';
import Carousel from 'react-native-snap-carousel';
import CustomAlert from '../CustomAlert';
import ExitAlert from '../ExitAlert';
import FitnessHeaderScreen from './FitnessHeaderScreen';

let PostData_arr = [];
let myProfile = '';
let fitnessCategory = [];
let fitnessSubCategory = [];
let sportsId = ''
let subSportsId = ''
class FitnessStudo extends React.Component {
    constructor() {
        super();
        this.state = {
            isSignUpModalVisible: false,
            setResponse: '',
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
            fitnessCategoryList: [],
            fitnessSubCategoryList: [],
            data: [
                { customer_name: 'Riya', job_name: 'Gardening', },
                { customer_name: 'Akash', job_name: 'Cleaning', },
                { customer_name: 'kirti', job_name: 'HouseKeeping', },
                { customer_name: 'Neah', job_name: 'Gardening', },
                { customer_name: 'Radheshyam', job_name: 'Cleaning', },
                { customer_name: 'Shiwa', job_name: 'HouseKeeping', },
            ],
            sportsId: '',
            subSportsId: '',
            isSelectedCategory: false,
            isSelectedSubCategory: false,
            PageNo: 1,
            loading: false,
            Alert_Visibility: false,
            alert_msg: '',
            exitAlert_Visibility: false,
            paused: true,
            videoIndex: 0,
            isMute: false,
            scrollStatus: false,
            imageid: ''

        };
    }
    componentDidMount = async () => {
        this.getUploadPostList(sportsId, subSportsId);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
        this.CheckConnectivity();
        myProfile = await getAsyncStorage("ProfilePic");

        let unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getUploadPostList(sportsId, subSportsId);
        });
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
    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ color: '#fff', marginTop: "5%", fontSize: 12, fontFamily: 'Raleway-Regular' }} onPress={handlePress}>
                Read more
            </Text>
        );
    };

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
    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ color: '#fff', marginTop: "5%", fontSize: 12, fontFamily: 'Raleway-Regular' }} onPress={handlePress}>
                Read less
            </Text>
        );
    };

    _handleTextReady = () => {
        // ...
    };
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
                        <View style={{ width: '100%', height: '100%'  }}>
                            <VideoPlayer
                                style={{width: '100%',  height: '100%' }}
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

    getUploadPostList = async (sportsId, subSportsId) => {
        this.setState({ loading: true });
        const body = {
            'per_page': 20,
            'page_no': this.state.PageNo,
            'sports_id': sportsId,
            'sub_sports_id': subSportsId
        }
        let token_value = await getAsyncStorage('tokenkey');
        const { responseJson, err } = await requestGetApi(GetFitnessStudoList, body, 'GET', token_value);
        this.getfitnessCategoryList(this.state.sportsId);
        this.setState({ loading: false })
        if (responseJson.status == true) {
            PostData_arr = responseJson.data.records;
            if (this.state.PageNo == 1) {
                this.setState({ PostData_list: responseJson.data.records })
            } else {
                this.setState({ PostData_list: this.state.PostData_list.concat(responseJson.data.records) })
            }
        } else {
        }
    };

    getfitnessCategoryList = async (sportsId) => {
        const body = {};
        let token_value = await getAsyncStorage('tokenkey');
        const { responseJson, err } = await requestGetApi(GetfitnessCategoryList, body, 'GET', token_value);
        console.log("GetfitnessCategoryList", responseJson);
        if (responseJson.status == true) {
            fitnessCategory = responseJson.data;
            this.setState({ fitnessCategoryList: fitnessCategory });
        } else {
            console.log("error", err);
        }
    };

    getfitnessSubCategoryList = async (sports_id) => {
        this.setState({ loading: true })
        let token_value = await getAsyncStorage('tokenkey');
        const body = {};
        let GetfitnessSubCategoryList = ''
        if (sports_id == '') {
            GetfitnessSubCategoryList = GetfitnessCategoryList
        } else {
            GetfitnessSubCategoryList = GetfitnessCategoryList + "/" + sports_id
        }

        const { responseJson, err } = await requestGetApi(GetfitnessSubCategoryList, body, 'GET', token_value);
        this.setState({ loading: false })
        if (responseJson.status == true) {
            fitnessSubCategory = responseJson.data;
            this.setState({ fitnessSubCategoryList: fitnessSubCategory });
        } else {
            console.log("error", err);
        }
    };

    likePostData = async (post_id) => {
        this.setState({ islike: !this.state.islike });
        this.setState({ upload_post_id: post_id });
        let token = await getAsyncStorage('tokenkey');
        const formData = new FormData();
        formData.append('post_id', this.state.upload_post_id);
        const { responseJson, err } = await requestPostApiMedia(fitnessStudio_like, formData, 'POST', token);
        if (responseJson.status == true) {
            this.setState({ PageNo: 1 })
            this.getUploadPostList(sportsId, subSportsId);
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
        const { responseJson, err } = await requestPostApiMedia(fitnessStudio_unlike, formData, 'POST', token);
        if (responseJson.status == true) {
            this.setState({ PageNo: 1 })
            this.getUploadPostList(sportsId, subSportsId);
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
    GoTobackScreen = () => {
        this.props.navigation.goBack();
    }
    toggleModal = (post_id, sharedId, isShared) => {
        console.log("shred id", sharedId)
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
    PublicProfileScreen = async (userId) => {
        await setAsyncStorage('UserPostId', userId)
        this.props.navigation.navigate('PublicProfile', {
            userId: userId
        });
    };
    Separator = () => (
        <View style={styles.seprator} />
    );
    subcategoryfilter = (sports_id, sub_sports_id, index) => {
        console.log('sportsId', sports_id, sub_sports_id);
        this.setState({ PageNo: 1 })
        let arr = [...this.state.fitnessSubCategoryList];
        for (let i = 0; i < arr.length; i++) {
            if (i == index) {
                arr[i].isSelectedSubCategory = false;
                this.setState(arr);
            } else {
                arr[i].isSelectedSubCategory = true;
            }
        }

        this.setState({ sportsId: sports_id });
        this.setState({ subSportsId: sub_sports_id });
        this.getUploadPostList(sports_id, sub_sports_id);
    }
    categoryFilter = (sports_id, index) => {
        console.log('sportsId', sports_id);
        this.setState({ sportsId: sports_id });
        let arr = [...this.state.fitnessCategoryList];
        for (let i = 0; i < arr.length; i++) {
            if (i == index) {
                arr[i].isSelectedCategory = false;
                this.setState(arr);
            } else {
                arr[i].isSelectedCategory = true;
            }
        }
        this.setState({ PageNo: 1 })
        this.getfitnessSubCategoryList(sports_id);
    }
    footerList = () => {
        if (PostData_arr.length > 10) {
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
        if (PostData_arr.length > 10) {
            await this.setState({ PageNo: this.state.PageNo + 1 })
            this.getUploadPostList(sportsId, subSportsId);
        } else {

        }

    }
    userLikeList = (post_likes) => {
        this.props.navigation.navigate("UserLike", {
            post_likes: post_likes
        })
    }
    render() {
        return (
            <SafeAreaView style={{ height: '100%', backgroundColor: '#15141A' }}>
                <FitnessHeaderScreen title='Fitness Studio' navigation={this.props.navigation} />
                <View style={{ marginTop: '1%' }}>
                    <FlatList
                        horizontal={true}
                        data={this.state.fitnessCategoryList}
                        renderItem={({ item, index }) => (
                            <View style={{ margin: 8, flexDirection: 'row' }}>
                                {item.isSelectedCategory == false ?
                                    <TouchableOpacity style={styles.categoryitemList2}
                                        onPress={() => this.categoryFilter(item.sports_id, index)}>
                                        <Text style={styles.category2}>{item.sports_name}</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={styles.categoryitemList}
                                        onPress={() => this.categoryFilter(item.sports_id, index)}>
                                        <Text style={styles.category}>{item.sports_name}</Text>
                                    </TouchableOpacity>
                                }

                                <this.Separator />
                            </View>
                        )}
                        keyExtractor={(_, index) => index.toString()} />
                </View>
                {fitnessSubCategory.length != 0 ?
                    <View style={{ marginTop: '2%', marginBottom: '2%' }}>
                        <FlatList
                            horizontal={true}
                            data={this.state.fitnessSubCategoryList}
                            renderItem={({ item, index }) => (
                                <View style={{ marginLeft: 15, marginRight: 5 }}>
                                    {item.isSelectedSubCategory == false ?
                                        <TouchableOpacity style={styles.subcategoryitem2}
                                            onPress={() => this.subcategoryfilter(item.sports_id, item.sub_sports_id, index)}>
                                            <Text style={styles.subcategory2}>{item.sub_sports_name}</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={styles.subcategoryitem}
                                            onPress={() => this.subcategoryfilter(item.sports_id, item.sub_sports_id, index)}>
                                            <Text style={styles.subcategory}>{item.sub_sports_name}</Text>
                                        </TouchableOpacity>
                                    }
                                </View>

                            )}
                            keyExtractor={(_, index) => index.toString()} />
                    </View>
                    :
                    null}

                <View style={{ flex: 1.7, }}>
                    <FlatList
                        key={1}
                        data={this.state.PostData_list}
                        onScroll={(info) => this.onscrollView(info)}
                        renderItem={({ item, index }) => (
                            <View style={styles.CardView}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: '3%',
                                        marginBottom: '3%',
                                        marginLeft: '1%',
                                    }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={{ marginLeft: 10 }}>
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
                                                        style={{ marginLeft: '2%', width: 60, height: 60, borderRadius: 60 / 2 }}
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
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ marginLeft: 5 }}>
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
                                        {item.isSave == true ? (
                                            <TouchableOpacity style={styles.fav_icon}
                                                style={styles.fav_icon}
                                                onPress={() =>
                                                    this.RemovefromFavourite(item.post_id, index)
                                                }>
                                                <Image
                                                    style={styles.febImg}
                                                    source={require('../../Images/ic-like-fill.png')}
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
                                                    source={require('../../Images/ic-like.png')}
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

                                {item.description == '' ? null :
                                    <View
                                        style={{
                                            width: "80%",
                                            marginTop: '2%',
                                            alignSelf: 'flex-start',
                                            marginLeft: 22,
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

                <Loader isLoader={this.state.loading}></Loader>
                <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
                <ExitAlert exitAlert_Visibility={this.state.exitAlert_Visibility} onPress={this.openExitAlert} closeModal={this.closeExitAlert} />
            </SafeAreaView>
        );
    }

    AddToFavourite = async (postId, index) => {
        let arr = [...this.state.PostData_list];
        for (let i = 0; i < arr.length; i++) {
            if (i == index) {
                arr[i].isSave = true;
                this.setState(arr);
            }
        }
        console.log("id", postId)

        let token = await getAsyncStorage('tokenkey');
        const formData = new FormData();
        formData.append('post_id', postId);
        formData.append('status', 1)

        const { responseJson, err } = await requestPostApiMedia(save_my_post, formData, 'POST', token);

        console.log("formData:::", formData)
        console.log("response:::", responseJson)
        if (responseJson.status == true) {
            this.getUploadPostList(sportsId, subSportsId);
        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
        }
    };


    RemovefromFavourite = async (postId, index) => {
        let arr = [...this.state.PostData_list];
        for (let i = 0; i < arr.length; i++) {
            if (i == index) {
                arr[i].isSave = false;
                this.setState(arr);
            }
        }
        let token = await getAsyncStorage('tokenkey');
        const formData = new FormData();
        formData.append('post_id', postId);
        formData.append('status', 2)

        const { responseJson, err } = await requestPostApiMedia(save_my_post, formData, 'POST', token);
        console.log("formData:::", formData)
        console.log("response:::", responseJson)
        if (responseJson.status == true) {
            this.getUploadPostList(sportsId, subSportsId);
        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
        }
    }

}

export default FitnessStudo;
