import React from 'react'
import { View, Text, Image, Alert } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './following_styles';
import { setAsyncStorage } from '../../Routes/AsynstorageClass';
import Modal from 'react-native-modal';
import { requestGetApi, getpublic_folloing } from '../../NetworkCall/Service';
import { getAsyncStorage } from '../../Routes/AsynstorageClass';
import Toast from 'react-native-custom-toast';
import { requestPostApiUrlEncodedform, follow_user, unfollow_user } from '../../NetworkCall/Service';
import HeaderScreen from '../header';
import Loader from '../CustomComponent/Loader';
import CustomAlert from '../CustomAlert';
import NetInfo from '@react-native-community/netinfo';

let SportList_Data = []
let PostData_arr = []
let first_name = ''
let user_id = ''
let screen_2 = 'mycommentscreen'
_menu = null;
let sports_name = ''
let subsports_name = ''

class PublicFollowing extends React.Component {

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
            selectedUserId: '',
            PageNo: 1,
            loading: false,
            Alert_Visibility: false,
            alert_msg: ''
        }
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ color: '#fff', marginTop: 5 }} onPress={handlePress}>
                Read more
            </Text>
        );
    }

    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ color: '#fff', marginTop: 5 }} onPress={handlePress}>
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
        this.getPublicPostList();
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
    getPublicPostList = async () => {
        this.setState({ loading: true })
        const body = {
            'per_page': 20,
            'page_no': this.state.PageNo
        }
        let public_profile = getpublic_folloing + "/" + user_id
        let token_value = await getAsyncStorage('tokenkey');
        const { responseJson, err } = await requestGetApi(public_profile, body, 'GET', token_value)
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
    }

    CommentsScreen = (postId, userId, post_comments) => {
        this.props.navigation.navigate('MyPostComments', {
            postId: postId,
            userId: userId,
            post_comments: post_comments

        })


    }


    GoTobackScreen = () => {
        this.props.navigation.goBack();
    }

    followers = async (user_id) => {
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

        console.log("Response of following", (responseJson))
        if (responseJson.status == true) {
            this.getPublicPostList();
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
        console.log("user_id", this.state.selectedUserId)
        var details = {
            'user_id': this.state.selectedUserId

        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        const { responseJson, err } = await requestPostApiUrlEncodedform(unfollow_user, formBody, 'POST', token)

        console.log("Response of unfallow", (responseJson))
        if (responseJson.status == true) {
            this.getPublicPostList();
        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
        }
    }
    toggleModal(user_id) {
        this.setState({ isModalVisible: !this.state.isModalVisible, selectedUserId: user_id });
    };
    NoClick() {
        this.setState({ isModalVisible: !this.state.isModalVisible });
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
    handleLoadMoreNew = async () => {
        if (PostData_arr.length > 20) {
            await this.setState({ PageNo: this.state.PageNo + 1 })
            this.getPublicPostList();
        }

    }
    PublicProfileScreen = async (userId) => {
        await setAsyncStorage('UserPostId', userId)
        this.props.navigation.navigate('PublicProfile', {
            userId: userId
        });
    };
    render() {
        user_id = this.props.route.params.userId;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>
                <HeaderScreen navigation={this.props.navigation} />
                <View style={{ flex: 3, backgroundColor: '#15141A' }}>
                    <FlatList
                        key={1}
                        data={this.state.PostData_list}
                        renderItem={({ item, index }) => (
                            <View style={styles.fieldBG}>
                                {item.profile_pic == "" ?
                                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.PublicProfileScreen(item.user_id)}>
                                        <Image style={{ marginLeft: "0%", width: 30, height: 30, marginTop: "0%" }}
                                            source={require('../../Images/ic_profile.png')} />
                                        <View style={{ marginLeft: "5%", width: '55%' }}>
                                            <Text style={styles.ProfileText}>{item.user_first_name + " " + item.user_last_name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.PublicProfileScreen(item.user_id)}>
                                        <Image style={{ marginLeft: "0%", width: 30, height: 30, borderRadius: 30 / 2, marginTop: "0%" }}
                                            source={{ uri: item.profile_pic }} />
                                        <View style={{ marginLeft: "5%", width: '55%' }}>
                                            {item.user_last_name == null ?
                                                <Text style={styles.ProfileText}>
                                                    {item.user_first_name}
                                                </Text>
                                                :
                                                <Text style={styles.ProfileText}>
                                                    {item.user_first_name + " " + item.user_last_name}
                                                </Text>
                                            }
                                        </View>
                                    </TouchableOpacity>
                                }

                                {item.isFollowing == 1 ?
                                    <TouchableOpacity style={styles.followingBg} onPress={() => this.toggleModal(item.user_id)} >
                                        <Text style={styles.Following}>Following</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={styles.followingBg} onPress={() => this.followers(item.user_id)} >
                                        <Text style={styles.Following}>Follow</Text>
                                    </TouchableOpacity>
                                }
                            </View>

                        )}
                        keyExtractor={(_, index) => index.toString()}
                        refreshing={false}
                        ListFooterComponent={this.footerList}
                        onEndReachedThreshold={0.5}
                        onEndReached={({ distanceFromEnd }) => {
                            console.log('on end reached ', distanceFromEnd)
                            this.handleLoadMoreNew()
                        }}
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
                                <Text style={styles.DeletePost}>Are you sure you want to unfollow ?</Text>
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

export default PublicFollowing;