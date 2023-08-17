import * as React from 'react';
import { View, Text, Image, Keyboard, Alert, Platform } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './commnts_styles'
import { requestPostApiMedia, commentsPost } from '../../NetworkCall/Service';
import { getAsyncStorage, setAsyncStorage } from '../../Routes/AsynstorageClass';
import Toast from 'react-native-custom-toast';
import moment from 'moment';
import { requestDeleteApiMedia, delete_comments } from '../../NetworkCall/Service';
import NetInfo from "@react-native-community/netinfo";
import AppLoader, { loaderRef } from '../AppLoader';
import { showLoader, hideLoader } from '../AppLoader';
import HeaderScreen from '../header';
import CustomAlert from '../CustomAlert';

let postId = ''
let PostData_arr = []
let user_profile_pic = ''
var _keyboardWillShowSubscription;

class CommentScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            post_comments: '',
            comments_list: [],
            setCurrentDate: '',
            comment_by: '',
            profileImage: '',
            bottom: 80,
            Alert_Visibility: false,
            alert_msg: ''
        }
    }
    async componentDidMount() {
        this.CheckConnectivity();
        this.setState({ comments_list: PostData_arr })
        user_profile_pic = await getAsyncStorage('profile_pic');
        let first_name = await getAsyncStorage('FisrtName');
        let last_name = await getAsyncStorage('LastName');
        if (last_name != null) {
            this.setState({ comment_by: first_name + " " + last_name });
        } else {
            this.setState({ comment_by: first_name });
        }

        console.log("comment_by==", this.state.comment_by)
        this.setState({ profileImage: user_profile_pic })
        console.log("profileImage", this.state.profileImage);

        _keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e));
    }

    openAlert = () => {
        this.setState({ Alert_Visibility: false })
    }
    closeAlert = () => {
        this.setState({ Alert_Visibility: false })
    }
    _keyboardWillShow(e) {

        if (Platform.OS == "ios") {
            this.setState({ bottom: e.endCoordinates.height + 80 });
            setTimeout(() => { }, 500);
        }
    }
    GoBack = () => {
        hideLoader();
        this.props.navigation.goBack();
    }
    onPostComments = async () => {
        this.textInput.clear()
        let token = await getAsyncStorage('tokenkey');
        if (this.state.post_comments == '') {
            this.refs.customToast.showToast("Please enter comment", 5000);
            return;
        }
        const formData = new FormData()
        formData.append('post_id', postId)
        formData.append('comments', this.state.post_comments)
        const { responseJson, err } = await requestPostApiMedia(commentsPost, formData, 'POST', token)
        console.log("form data++++", formData)
        console.log("Response++++", JSON.stringify(responseJson))
        if (responseJson.status == true) {
            if (this.state.profileImage == null) {
                this.state.comments_list.splice(0, 0, { "comments": this.state.post_comments, "comment_by": this.state.comment_by, "profile_pic": this.state.profileImage })
            } else {
                this.state.comments_list.splice(0, 0, { "comments": this.state.post_comments, "comment_by": this.state.comment_by, "profile_pic": this.state.profileImage })
            }
            console.log('image', this.state.profileImage)
            this.setState({ post_comments: '' });
            this.textInput.clear()
        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
        }
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
    GetdateTime = (created_date) => {
        return moment(created_date).fromNow();
    }
    PublicProfileScreen = async (userId) => {
        await setAsyncStorage('UserPostId', userId)
        this.props.navigation.navigate('PublicProfile', {
            userId: userId
        });
    };

    getValue = (item, index) => {
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.PublicProfileScreen(item.user_id)}>
                        <View style={styles.Profileimgbg_2} >

                            {item.profile_pic == '' || item.profile_pic == null ? <Image style={styles.profile_img}
                                source={require('../../Images/ic_profile.png')} /> :
                                <Image style={styles.profile_img}
                                    source={{ uri: item.profile_pic }} />
                            }
                        </View>
                        <View style={{ marginTop: "5%", marginLeft: "2%" }}>
                            <Text style={styles.WriteComments}>{item.comment_by}</Text>
                            <Text style={styles.postDay}>{item.comments}</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.WriteComments_2}>{this.GetdateTime(item.created_date)}</Text>
                </View>
                <View style={styles.bottom_Underline}></View>
            </View>
        )
    }


    render() {
        const { navigate } = this.props.navigation;
        postId = this.props.route.params.postId;
        PostData_arr = this.props.route.params.post_comments;
        profile_pic = this.props.route.params.profile_pic;
        console.log("post_comments:::::::", PostData_arr)

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>
                <HeaderScreen title='Comments' navigation={this.props.navigation} />

                <View style={styles.CommentInput_2}>
                    <View>
                        <AppLoader ref={loaderRef} />
                    </View>
                    {this.state.comments_list.length > 0 ?
                        <FlatList data={this.state.comments_list}
                            renderItem={({ item, index }) =>
                                this.getValue(item, index)
                            }
                            keyExtractor={(_, index) => index.toString()}
                        />
                        :
                        <Text style={{ color: '#fff', alignSelf: 'center', marginTop: "20%", fontSize: 18, fontFamily: 'Raleway-Regular' }}>No comments</Text>


                    }


                </View>

                <View style={styles.NextButton_2}>
                    <Toast ref="customToast" backgroundColor="#fff" textColor='black' />
                </View>
                <View style={{
                    backgroundColor: '#000',
                    flexDirection: 'row',
                    height: this.state.bottom,
                    justifyContent: 'space-between',
                }}>
                    <View style={styles.Profileimgbg} >

                        {this.state.profileImage == null ? <Image style={styles.profile_img_2}
                            source={require('../../Images/ic_profile.png')} /> :
                            <Image style={styles.profile_img_2}
                                source={{ uri: this.state.profileImage }} />
                        }


                    </View>

                    <TextInput
                        style={styles.inputStyle}
                        underlineColorAndroid="#F6F6F7"
                        placeholder="Add a comment..."
                        placeholderTextColor="#9B9B9D"
                        keyboardType='default'
                        returnKeyType="next"
                        onChangeText={(post_comments) => this.setState({ post_comments })}
                        underlineColorAndroid='transparent'
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        multiline={true}
                        ref={input => { this.textInput = input }} />

                    <TouchableOpacity style={styles.PostBg} onPress={this.onPostComments}>
                        <Text style={styles.textPost}>Post</Text>
                    </TouchableOpacity>

                </View>
                <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
            </SafeAreaView>
        )
    }

}
export default CommentScreen;