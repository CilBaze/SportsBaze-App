import * as React from 'react';
import { View, Text, Image, Keyboard } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../Screen/Comments/commnts_styles'
import { requestPostApiMedia, commentsPost } from '../../NetworkCall/Service';
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
import { AddUser } from '../../NetworkCall/LoginRequest/AddUser';
import { requestGetApi, userSearch } from '../../NetworkCall/Service'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import HeaderScreen from '../header';


let person;
let UserList = []
let myUId = ''
let chat_id = ''
let OtherUId = ''
let searchName = ''
let text = ''
let UserObject = []
let UId = ''
let OUId = ''
class ChatScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            post_comments: '',
            comments_list: [],
            setCurrentDate: '',
            comment_by: '',
            profileImage: '',
            user: [],
            UserList: [],
            SerachUserList: [],
            chtaInfoList: [],
            UserListInfo: [],
        }
    }
    async componentDidMount() {
        myUId = await getAsyncStorage('user_id');
        this.searchData(text);
        this.CheckConnectivity();
        let unsubscribe = this.props.navigation.addListener('focus', () => {
            console.log("text value", text)
            let value = []
            this.setState({ SerachUserList: value })
            this.searchData(text);
        });

    }
    componentWillUnmount() {
        firebaseSDK.off();
    }
    get user() {
        return {
            _id: firebaseSDK.uid,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
        }
    }

    async UNSAFE_componentWillMount() {
        console.log("kirti>>>.>....")
        UserList = []
        this.searchData(text);
    }

    GoBack = () => {
        this.props.navigation.goBack();
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
    ChatBox(userid, profile_pic, name) {
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
    GoChatBox(userid, profile_pic, fName, lName, id) {
        let name = fName + " " + lName
        if (profile_pic == null || profile_pic == '') {
            this.props.navigation.navigate('ChatBox', {
                OtherUserId: userid,
                profile_pic: '',
                name: name,
                id: id
            });
        } else {
            this.props.navigation.navigate('ChatBox', {
                OtherUserId: userid,
                profile_pic: profile_pic,
                name: name,
                id: id
            });
        }
        console.log("userId::::", userid, profile_pic)

    }
    PublicProfileScreen = async (userId) => {
        console.log("userid::", userId)
        await setAsyncStorage('UserPostId', userId)
        this.props.navigation.navigate('PublicProfile', {
            userId: userId
        });
    };
    getValue = (item, index) => {
        console.log("myUId=>", myUId)
        return (
            <View>
                {item.first_name == undefined ? null :

                    <View>

                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={styles.Profileimgbg_2} onStartShouldSetResponder={() =>
                                this.PublicProfileScreen(item.id)}>
                                {item.profile_pic == '' || item.profile_pic == null ? <Image style={styles.profile_img}
                                    source={require('../../Images/ic_profile.png')} /> :
                                    <Image style={styles.profile_img}
                                        source={{ uri: item.profile_pic }} />
                                }
                            </View>

                            <View style={{ marginTop: "6%", marginLeft: "2%" }} >
                                <TouchableOpacity onPress={() => this.GoChatBox(item.id, item.profile_pic, item.first_name, item.last_name, item.id)}>
                                    <Text style={styles.WriteComments}>{item.first_name + " " + item.last_name}</Text>
                                    <Text numberOfLines={1} style={styles.msText}>{item.chats.message}</Text>
                                </TouchableOpacity>
                            </View>
                            {item.totalUnread > 0 ?
                                <View style={styles.chatCount}>
                                    <Text style={styles.count}>{item.totalUnread}</Text>
                                </View> :
                                null
                            }


                        </View>
                        <View style={styles.bottom_Underline}></View>
                    </View>
                }
            </View>


        )
    }

    async searchData(text) {
        this.getData(text);
        if (text == "") {
            this.getData(text);

        } else {
            this.typingTimer = setTimeout(() => {
                this.setState({ text: text });
                this.getData(text);
            }, 2000);
        }
    }

    async getData(text) {
        let token_value = await getAsyncStorage('tokenkey');
        console.warn("text", text);
        console.log("token", token_value)
        if (text == '') {
            const body = {
                'keyword': text
            };

            showLoader();
            const { responseJson, err } = await requestGetApi(userSearch, body, 'GET', token_value);
            console.log(" search Response", (responseJson.data));
            this.setState({ UserListInfo: responseJson.data });
            console.log("UserListInfo==>", this.state.UserListInfo);
            hideLoader();
            getAsyncStorage('user_id').then((value) => {
                UserList = []
                if (value !== null) {
                    User.userId = value
                    let dbRef = firebase.database().ref("chat/");
                    dbRef.on("value", async snapshot => {
                        if (snapshot.val()) {
                            UserObject = snapshot.val();
                            console.log("chat id =>", UserObject);
                            const allchatIds = Object.entries(UserObject).map((item, index) => {
                                return item[0];
                            });
                            const mychatsUserId = allchatIds.filter(function (item) {
                                let splituserid = item.split("abc");
                                if (splituserid.includes(myUId))
                                    return true;
                                else
                                    return false;
                            });
                            UserList = []
                            let newUserList = []
                            for (c of mychatsUserId) {
                                console.log("chchhc" + JSON.stringify(UserObject[c]));
                                console.log("myUId::::=>", myUId);
                                let otheruserId = c.replace('abc' + myUId + 'abc', "");
                                otheruserId = otheruserId.replace('abc', "");
                                otheruserId = otheruserId.replace('abc', "");
                                otheruserId = otheruserId.replace(myUId, "");
                                console.log("otheruserId::::=>", otheruserId);
                                console.log("UserListInfo::::=>", this.state.UserListInfo);
                                let userInfo = this.state.UserListInfo.filter(function (item) { return item.id == otheruserId; });
                                console.log("User Profile=>" + JSON.stringify(userInfo));
                                let userChatWithProfile = userInfo.length > 0 ? userInfo[0] : {};
                                let chatsData = Object.entries(UserObject[c]).map((item, index) => {
                                    return item[0];
                                });
                                let count = 0;
                                for (let key in UserObject[c]) {
                                    if (UserObject[c][key].isRead == 0 && myUId != UserObject[c][key].userid)
                                        count++;
                                }
                                userChatWithProfile.totalUnread = count;
                                userChatWithProfile.chats = chatsData.length > 0 ? UserObject[c][chatsData[chatsData.length - 1]] : {};
                                newUserList.push(userChatWithProfile);
                                console.log("newUserList::::=>", userChatWithProfile);
                            }
                            UserList = await newUserList.sort(function (a, b) {
                                console.log(a.chats.dateTime + "ddddddd" + b.chats.dateTime);
                                console.log("sorting::::=>", moment(a.chats.dateTime) + " " + moment(b.chats.dateTime));
                                return moment(b.chats.dateTime) - moment(a.chats.dateTime);
                            });

                            this.setState({ UserList: UserList });

                            console.log("UserList::::=>", this.state.UserList);

                        }
                    }

                    )
                }
            })
        } else {
            const body = {
                'keyword': text
            };
            const { responseJson, err } = await requestGetApi(userSearch, body, 'GET', token_value);
            this.setState({ SerachUserList: responseJson.data });
            this.state.SerachUserList.map((item, index) => {
                OtherUId = item.id
                searchName = item.first_name
                let myUId = "abc" + myUId;
                { chat_id = myUId < OtherUId ? myUId.concat("abc" + OtherUId) : "abc" + OtherUId.concat(myUId) }
                if (searchName == text) {
                    let dbRef = firebase.database().ref("chat/" + chat_id + '/')
                    dbRef.on("value", snapshot => {
                        if (snapshot.val()) {
                        }
                    })
                }
            })
        }


    }
    render() {
        return (
            <View style={{ height: "100%", backgroundColor: '#15141A' }}>
                <HeaderScreen title='Messages' navigation={this.props.navigation} />
                <KeyboardAwareScrollView>
                    <View style={styles.searchView}>
                        <Image style={{ width: 15, height: 15, marginLeft: 15 }} source={require('../../Images/ic_search.png')}></Image>
                        <TextInput
                            style={{ padding: 15, color: '#808084', height: 50, flex: 1, fontFamily: 'Raleway-Regular' }}
                            placeholder="Search"
                            onChangeText={(text) => this.searchData(text)}
                            keyboardType='default'
                            blurOnSubmit={false}
                            placeholderTextColor='#808084'
                        />
                    </View>

                    <FlatList
                        style={styles.searhList}
                        data={this.state.SerachUserList}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={() => this.GoChatBox(item.id, item.profile_pic, item.first_name, item.last_name, item.id)} style={{ marginTop: 5, width: "100%" }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        {item.profile_pic == '' || item.profile_pic == null ? <Image style={styles.profile_img}
                                            source={require('../../Images/ic_profile.png')} /> :
                                            <Image style={styles.profile_img}
                                                source={{ uri: item.profile_pic }} />
                                        }
                                    </View>
                                    <View>
                                        <Text style={{ color: '#fff', marginLeft: 10, fontFamily: 'Raleway-Regular' }}>{item.first_name + " " + item.last_name}</Text>
                                    </View>
                                </View>
                                <View style={styles.underline}></View>
                            </TouchableOpacity>
                        }
                        keyExtractor={(_, index) => index.toString()}
                    />

                    <View style={styles.CommentInput_2}>
                        <View>
                            <AppLoader ref={loaderRef} />
                        </View>
                        <FlatList data={this.state.UserList}
                            renderItem={({ item, index }) =>
                                this.getValue(item, index)
                            }
                            keyExtractor={(_, index) => index.toString()}
                        />
                    </View>
                    <View style={styles.NextButton_2}>
                        <Toast ref="customToast" backgroundColor="#fff" textColor='black' />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }

}
export default ChatScreen;