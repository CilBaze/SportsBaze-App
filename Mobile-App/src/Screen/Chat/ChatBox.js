import * as React from 'react';
import { View, Text, Image, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../Screen/Comments/commnts_styles'
import { requestPostApiMedia, chat_pushnotification } from '../../NetworkCall/Service';
import { getAsyncStorage, setAsyncStorage } from '../../Routes/AsynstorageClass';
import Toast from 'react-native-custom-toast';
import moment from 'moment';
import { requestDeleteApiMedia, delete_comments } from '../../NetworkCall/Service';
import NetInfo from "@react-native-community/netinfo";
import AppLoader, { loaderRef } from '../AppLoader';
import { showLoader, hideLoader } from '../AppLoader';
import firebaseSDK from '../../Firebase/config/firebaseSDK';
import firebase from 'firebase'
import User from '../../Firebase/config/User'
import { AddUser, Chat, UpdateUser } from '../../NetworkCall/LoginRequest/AddUser';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomAlert from '../CustomAlert';

let OtherUId = '';
let UserList = []

let MyUId = ''
let chat_id = ''
let profile_pic = ''
let name = ''
let id=''
var _keyboardWillShowSubscription;


class ChatBox extends React.Component {

    constructor() {
        super()
        this.videoRefs = [];
        this.state = {
            message: '',
            comments_list: [],
            setCurrentDate: '',
            comment_by: '',
            profileImage: '',
            user: [],
            UserListData: [],
            isRead: 0,
            bottom: 80,
            theamColor: '',
            Alert_Visibility: false,
            alert_msg: ''

        }
    }
    // async componentDidMount() {
    //     UserList = [];
    //     MyUId = await getAsyncStorage('user_id');
    //     this.CheckConnectivity();
    // }
    componentWillUnmount() {
        firebaseSDK.off();
        this.setState({ UserListData: [] });
    }

    dismiss() {
        this.setState({ bottom: 80 })
        Keyboard.dismiss()
    }
    async componentDidMount() {
        let theamColor = await getAsyncStorage('theamColor')
        this.setState({ theamColor: theamColor })
        showLoader();
        this.setState({ UserListData: [] });
        MyUId = await getAsyncStorage('user_id');
        this.CheckConnectivity();
        { chat_id = MyUId < OtherUId ? 'abc' + MyUId.concat('abc' + OtherUId) : 'abc' + OtherUId.concat('abc' + MyUId) }
        let dbRef = firebase.database().ref("chat/" + chat_id + '/')
        dbRef.on("value", snapshot => {
            let userUserListData = [];
            if (snapshot.val()) {
                let UserObject = snapshot.val();
                for (let key in UserObject) {
                    userUserListData.push(UserObject[key]);
                    this.setState({ isReadStatus: 1 })
                    let chatInfo = UserObject[key];
                    console.log("UserList::: => ", userUserListData);
                    if (chatInfo.userid != MyUId)
                        UpdateUser(chat_id, key, chatInfo);
                }
                this.setState({ UserListData: userUserListData.reverse() });
            } else {

                console.log("error")
            }
        });
        hideLoader()
        _keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e));

    }

    _keyboardWillShow(e) {

        if (Platform.OS == "ios") {
            setTimeout(() => {
            }, 500);
        }
    }

    GoBack = () => {
        this.props.navigation.goBack();
    }
    CheckConnectivity = () => {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            if (state.isConnected == true) {
            } else {
                this.setState({ Alert_Visibility: true })
                this.setState({ alert_msg: 'Internet not connected'})
            }
            console.log("Is connected?", state.isConnected);
        });

        NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected == true) {
            } else {
                this.setState({ Alert_Visibility: true })
                this.setState({ alert_msg: 'Internet not connected'})
            }
        });
    }
    openAlert = () => {
        this.setState({ Alert_Visibility: false })
      }
      closeAlert = () => {
        this.setState({ Alert_Visibility: false })
      }
    PostMessage = async () => {
      
            this.textInput.clear();
        console.log("message==>>>Ashish", this.state.message)
        var dateTime = moment()
            .utcOffset('+05:30')
            .format('YYYY-MM-DD HH:mm:ss');

        console.log("time---", dateTime)
        var date = moment()
            .utcOffset('+05:30')
            .format('DD-MM-YYYY');
        if (this.state.message != "") {
            Chat(MyUId, OtherUId, this.state.message, dateTime, this.state.isRead)
        }
        this.chat_pushnotification();
        
        
        
    }
    chat_pushnotification = async () => {
        let token = await getAsyncStorage('tokenkey');
        console.log("token==", token)
        const formData = new FormData();
        formData.append('user_id', OtherUId);
        formData.append('message', this.state.message);
        console.log("form data", formData)
        const { responseJson, err } = await requestPostApiMedia(chat_pushnotification, formData, 'POST', token);
        console.log("chat_pushnotification response==", responseJson)
        this.setState({message:''})
    }
    getValue = (item, index) => {
        console.log("item message", item.message)
        return (
            <View style={{
                marginBottom: 20, flex: 1
             }}>
                {item.userid == MyUId ?
                    <View style={{
                        alignSelf: 'flex-end', marginRight: 20,
                        justifyContent: 'flex-end', flexDirection: 'row',
                        backgroundColor: '#fff', padding: 10, borderRadius: 5
                    }}>
                        <Text style={styles.WriteComments2}
                        >{item.message}</Text>
                        <Text style={styles.TextTime}>{item.dateTime.slice(11)}</Text>
                    </View>

                    :
                    <View style={{
                        flexDirection: 'row', alignContent: 'flex-start', alignSelf: 'flex-start',
                        justifyContent: 'flex-start', marginLeft: 20,
                        backgroundColor: '#fff', padding: 8, borderRadius: 5
                    }}>
                        <Text style={styles.WriteComments3}>{item.message}</Text>
                        <Text style={styles.TextTime}>{item.dateTime.slice(11)}</Text>
                        <Text></Text>
                    </View>

                }
            </View>

        )
    }

    PublicProfileScreen = async (userId) => {
        console.log("userid::",userId)
        await setAsyncStorage('UserPostId', userId)
        this.props.navigation.navigate('PublicProfile', {
          userId: userId
        });
      };
    render() {
        OtherUId = this.props.route.params.OtherUserId;
        profile_pic = this.props.route.params.profile_pic;
        name = this.props.route.params.name;
        id=this.props.route.params.id;
        console.log("OtherUId", OtherUId, profile_pic)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>
                <KeyboardAvoidingView enabled behavior='padding' keyboardVerticalOffset={Platform.OS == 'android' ? -300 : 20} style={{ flex: 1 }}>

                    {this.state.theamColor == 'BLACK' ?
                        <View style={styles.msgHeader}>
                            <TouchableOpacity style={styles.backBtn} onPress={this.GoBack}>
                                <Image style={{ width: 20, height: 20, borderRadius: 20 / 2 }} source={require("../../Images/back.png")} ></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.Profileimgbg} onPress={() =>
                      this.PublicProfileScreen(id)} >
                                {profile_pic == '' ? <Image style={styles.profile_img_2}
                                    source={require('../../Images/ic_profile.png')} /> :
                                    <Image style={styles.profile_img_2}
                                        source={{ uri: profile_pic }} />
                                }
                                <Text style={styles.comments4}>{name}</Text>

                            </TouchableOpacity>

                        </View>
                        :
                        <View style={styles.msgHeader2}>
                            <TouchableOpacity style={styles.backBtn} onPress={this.GoBack}>
                                <Image style={{ width: 20, height: 20, borderRadius: 20 / 2 }} source={require("../../Images/back_black.png")} ></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.Profileimgbg} onPress={() =>
                      this.PublicProfileScreen(id)} >
                                {profile_pic == '' ? <Image style={styles.profile_img_2}
                                    source={require('../../Images/ic_app.png')} /> :
                                    <Image style={styles.profile_img_2}
                                        source={{ uri: profile_pic }} />
                                }
                                <Text style={styles.comments42}>{name}</Text>

                            </TouchableOpacity>

                        </View>
                    }


                    <View style={styles.CommentInput_2}>
                        <View>
                            <AppLoader ref={loaderRef} />
                        </View>
                        {this.state.UserListData.length != 0 ?
                            <FlatList
                                data={this.state.UserListData}
                                inverted={true}
                                renderItem={({ item, index }) =>
                                    this.getValue(item, index)
                                }
                                keyExtractor={(_, index) => index.toString()}
                            />
                            :
                            <View style={{
                                height: 50
                            }}></View>
                        }
                    </View>


                    <View style={{
                        backgroundColor: '#000',
                        flexDirection: 'row',
                        height: 80,
                    }}>

                        <TextInput
                            style={styles.inputStyle}
                            underlineColorAndroid="#F6F6F7"
                            placeholder="Type a message"
                            placeholderTextColor="#9B9B9D"
                            keyboardType='default'
                            returnKeyType="next"
                            onChangeText={(message) => this.setState({ message })}
                            // underlineColorAndroid='transparent'
                            // returnKeyType="done"
                            multiline={true}
                            blurOnSubmit={true}
                            onEndEditing={() => this.dismiss()}
                            onSubmitEditing={() => { Keyboard.dismiss() }}
                            ref={input => { this.textInput = input }} />

                        <TouchableOpacity style={styles.PostBg} onPress={this.PostMessage}>
                            <Text style={styles.textPost}>Send</Text>
                        </TouchableOpacity>

                    </View>

                </KeyboardAvoidingView>

                <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
            </SafeAreaView>
        )
    }

}
export default ChatBox;