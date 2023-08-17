import * as React from 'react';
import { View, Text, Image, Button, SafeAreaView, Alert } from 'react-native'
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../Screen/Comments/commnts_styles'
import { getAsyncStorage, setAsyncStorage } from '../../Routes/AsynstorageClass';
import NetInfo from "@react-native-community/netinfo";
import { requestGetApi, userSearch } from '../../NetworkCall/Service'

let myUId = ''
let myProfile = ''
let theamcolor = ''
class SearchUserScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            UserListInfo: [],
            isSignUpModalVisible: false,
            setResponse: [],
            isselected: true,
            allUserList: [],
            theamColor: ''
        }
    }
    async componentDidMount() {
        myUId = await getAsyncStorage('user_id');
        myProfile = await getAsyncStorage("profile_pic");
        let theamColor = await getAsyncStorage('theamColor')
        this.setState({ theamColor: theamColor })
        this.CheckConnectivity();

        this.getUserList();
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

    GoChatBox(userid, profile_pic, fName, lName) {
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
    }

    getUserList = async () => {
        let token_value = await getAsyncStorage('tokenkey');
        const body = {
            'keyword': ''
        };
        const { responseJson, err } = await requestGetApi(userSearch, body, 'GET', token_value);
        console.log("Response", (responseJson.data));
        this.setState({ allUserList: responseJson.data });
        console.log("UserListInfo==>", this.state.allUserList);

    }
    getValue = (item, index) => {
        console.log("myUId=>", myUId)
        return (
            <View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={styles.Profileimgbg_2} >
                        {item.profile_pic == '' || item.profile_pic == null ? <Image style={styles.profile_img}
                            source={require('../../Images/ic_profile.png')} /> :
                            <Image style={styles.profile_img}
                                source={{ uri: item.profile_pic }} />
                        }
                    </View>
                    <View style={{ marginTop: "6%", marginLeft: "2%" }}>
                        <TouchableOpacity onPress={() => this.GoChatBox(item.id, item.profile_pic, item.first_name, item.last_name)}>
                            <Text style={styles.WriteComments}>{item.first_name + " " + item.last_name}</Text>
                            <Text style={styles.msText}>{item.chats.message}</Text>
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

        )
    }

    async searchData(text) {
        this.typingTimer = setTimeout(() => {
            this.searchDataApi(text);
        }, 1000);
    }
    async searchDataApi(text) {
        let token_value = await getAsyncStorage('tokenkey');
        console.log('text....', text)
        if (text != '') {
            const body = {
                'keyword': text
            };
            const { responseJson, err } = await requestGetApi(userSearch, body, 'GET', token_value);
            console.log("Response", (responseJson.data));
            this.setState({ UserListInfo: responseJson.data });
            console.log("UserListInfo==>", this.state.UserListInfo);
        }
    }

    PublicProfileScreen = async (userId) => {
        await setAsyncStorage('UserPostId', userId)
        this.props.navigation.navigate('PublicProfile', {
            userId: userId
        });
    };
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>
                {this.state.theamColor == 'BLACK' ?
                    <View style={styles.Header_Bg}>
                        <View style={{ flexDirection: 'row', marginLeft: 25, }}>
                            <Image style={{ width: 20, height: 20, marginTop: 5, tintColor: 'white' }} source={require('../../Images/ic_search.png')}></Image>
                            <Text style={styles.headerText}>Search</Text>
                        </View>

                    </View> :
                    <View style={styles.Header_Bg2}>
                        <View style={{ flexDirection: 'row', marginLeft: 25, }}>
                            <Image style={{ width: 20, height: 20, marginTop: 5, tintColor: 'black' }} source={require('../../Images/ic_search.png')}></Image>
                            <Text style={styles.headerText2}>Search</Text>
                        </View>
                    </View>
                }

                <View style={{ flex: 2.0, marginTop: 20 }}>
                    <View style={styles.searchView}>
                        <Image style={{ width: 15, height: 15, marginLeft: 15 }} source={require('../../Images/ic_search.png')}></Image>
                        <TextInput
                            style={{ padding: 15, color: '#808084', flex: 1, fontFamily: 'Raleway-Regular', fontSize: 12 }}
                            placeholder="Search By User Name"
                            onChangeText={(text) => this.searchData(text)}
                            keyboardType='default'
                            blurOnSubmit={false}
                            placeholderTextColor='#808084'
                        />
                    </View>
                    <ScrollView>

                        <FlatList
                            style={styles.searhList}
                            data={this.state.UserListInfo}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity onPress={() =>
                                    this.PublicProfileScreen(
                                        item.id)} style={{ marginTop: 5, width: "100%" }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            {item.profile_pic == '' || item.profile_pic == null ? <Image style={styles.profile_img}
                                                source={require('../../Images/ic_profile.png')} /> :
                                                <Image style={styles.profile_img}
                                                    source={{ uri: item.profile_pic }} />
                                            }
                                        </View>
                                        <View>
                                            <Text style={{ color: '#fff', marginLeft: 10, fontFamily: 'Raleway-Regular', fontSize: 12 }}>{item.first_name + " " + item.last_name}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.underline}></View>
                                </TouchableOpacity>
                            }
                            keyExtractor={(_, index) => index.toString()}
                        />

                        <FlatList
                            style={styles.searhList2}
                            data={this.state.allUserList}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity onPress={() =>
                                    this.PublicProfileScreen(
                                        item.id)} style={{ marginTop: 5, width: "100%" }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            {item.profile_pic == '' || item.profile_pic == null ? <Image style={styles.profile_img}
                                                source={require('../../Images/ic_profile.png')} /> :
                                                <Image style={styles.profile_img}
                                                    source={{ uri: item.profile_pic }} />
                                            }
                                        </View>
                                        <View>
                                            <Text style={{ color: '#fff', marginLeft: 10, fontFamily: 'Raleway-Regular', fontSize: 12 }}>{item.first_name + " " + item.last_name}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.underline}></View>
                                </TouchableOpacity>
                            }
                            keyExtractor={(_, index) => index.toString()}
                        />
                    </ScrollView>

                    {/* <BottomTabBar isselected={this.state.isselected} navigation={this.props.navigation} /> */}
                </View>
            </SafeAreaView>
        )
    }

}
export default SearchUserScreen;