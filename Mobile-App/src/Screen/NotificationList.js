import * as React from 'react';
import { View, Text, Image, Keyboard, Platform,TouchableOpacity } from 'react-native'
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../Screen/Comments/commnts_styles'
import { requestPostApiMedia, see_user_notification, see_admin_notification ,clear_all_notification,requestGetApi,bell_notification} from '../NetworkCall/Service';
import { getAsyncStorage } from '../Routes/AsynstorageClass';
import moment from 'moment';
import NetInfo from "@react-native-community/netinfo";
import HeaderScreen from './header';
import Swipeout from 'react-native-swipeout';
import Loader from './CustomComponent/Loader';
import CustomAlert from './CustomAlert';
var _keyboardWillShowSubscription;
let notificationList = ''


class NotificationList extends React.Component {
    constructor() {
        super()
        this.state = {
            post_comments: '',
            comments_list: [],
            setCurrentDate: '',
            comment_by: '',
            profileImage: '',
            bottom: 80,
            notificationList: '',
            rowIndex: '',id:'', loading: false,
            Alert_Visibility: false,
            alert_msg: ''
        }
    }
    async componentDidMount() {
        this.CheckConnectivity();
        this.notificationList();
        _keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e));
    }
    openAlert = () => {
       
        if(this.state.alert_msg=='Are you sure, you want to clear all notifications?'){
            this.setState({ Alert_Visibility: false })
            this.clearAll()
        }else{
            this.setState({ Alert_Visibility: false })
        }
    }
    closeAlert = () => {
        this.setState({ Alert_Visibility: false })
    }

    notificationList = async () => {
        this.setState({ loading: true })
        const body = {
        }
        let token_value = await getAsyncStorage('tokenkey');
        console.log("token", token_value);
        const { responseJson, err } = await requestGetApi(bell_notification, body, 'GET', token_value)
        console.log("notification list=>", responseJson);
        this.setState({notificationList:responseJson.data.records})
        this.setState({ loading: false })
        if (responseJson.status == true) {
          this.setState({notificationList:responseJson.data.records})
        }
    }
    swipeoutBtns = [
        {
            text: 'Remove',
            underlayColor: '#000',
            backgroundColor: 'red',
            onPress: () => {
                this.seeNotification()
            },
            fontFamily: 'Raleway-Bold'
        }
    ]

    swipeoutBtns2 = [
        {
            text: 'Remove',
            underlayColor: '#000',
            backgroundColor: 'red',
            onPress: () => {
                this.seeAdminNotification()
            },
            fontFamily: 'Raleway-Bold'
        }
    ]
    async seeNotification() {
        let token = await getAsyncStorage('tokenkey');
        const formData = new FormData();
        formData.append('id', this.state.id);
        console.log("form data",formData)
        const { responseJson, err } = await requestPostApiMedia(see_admin_notification, formData, 'POST', token);
        if (responseJson.status == true) {
            console.log("response==", responseJson);
            this.notificationList();
          } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg:responseJson.message})
          }
    }

    async seeAdminNotification() {
        let token = await getAsyncStorage('tokenkey');
        const formData = new FormData();
        formData.append('id', this.state.id);
        console.log("form data",formData)
        const { responseJson, err } = await requestPostApiMedia(see_user_notification, formData, 'POST', token);
        if (responseJson.status == true) {
            console.log("response==", responseJson);
            this.notificationList();
          } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message})
          }
    }

     clear_all_notification=async()=>{
        this.setState({ Alert_Visibility: true })
        this.setState({ alert_msg:'Are you sure, you want to clear all notifications?'}) 
    }
    async  clearAll(){
        let token = await getAsyncStorage('tokenkey');
        const formData = new FormData();
        formData.append('id',"");
        console.log("form data",formData)
        const { responseJson, err } = await requestPostApiMedia(clear_all_notification, formData, 'POST', token); 
        this.setState({notificationList:[]})
        this.notificationList(); 
        if (responseJson.status == true) {
            console.log("response clear all==", responseJson);
          
          } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg:responseJson.message})
          }
    }
    _keyboardWillShow(e) {
        if (Platform.OS == "ios") {
            this.setState({ bottom: e.endCoordinates.height + 80 });
            setTimeout(() => { }, 500);
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
    onSwipeOpen(rowIndex,id) {
        this.setState({
            rowIndex: rowIndex
        })
        this.setState({id:id})
    }
    onSwipeClose(rowIndex) {
        if (rowIndex === this.state.rowIndex) {
            this.setState({ rowIndex: null });
        }
        //this.setState({id:id})
    }
    getValue = (item, index) => {
        return (
            <View>
                {item.flag != "1" ?
                    <Swipeout right={this.swipeoutBtns} backgroundColor='#201F27'
                        autoClose={true}
                        onOpen={() => (this.onSwipeOpen(index,item.id))}
                        close={this.state.rowIndex !== index}
                        onClose={() => (this.onSwipeClose(index))}
                        rowIndex={index}
                        sectionId={0}
                        autoClose={true}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.Profileimgbg_2} >
                                {item.profile_pic == '' || item.profile_pic == null ? <Image style={styles.profile_img}
                                    source={require('../Images/ic_profile.png')} /> :
                                    <Image style={styles.profile_img}
                                        source={{ uri: item.profile_pic }} />
                                }
                            </View>
                            <View style={{ marginTop: "5%", marginLeft: "2%" }}>
                                <Text style={styles.WriteComments}>{item.following_name}</Text>
                                <Text style={styles.postDay}>{item.message}</Text>
                            </View>
                            <Text style={styles.WriteComments_2}>{this.GetdateTime(item.created_date)}</Text>
                        </View>
                        <View style={styles.bottom_Underline}></View>
                    </Swipeout>
                    :
                    <Swipeout right={this.swipeoutBtns2} backgroundColor='#201F27'
                        autoClose={true}
                        onOpen={() => (this.onSwipeOpen(index,item.id))}
                        close={this.state.rowIndex !== index}
                        onClose={() => (this.onSwipeClose(index,))}
                        rowIndex={index}
                        sectionId={0}
                        autoClose={true}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.Profileimgbg_2} >
                                {item.profile_pic == '' || item.profile_pic == null ? <Image style={styles.profile_img}
                                    source={require('../Images/ic_profile.png')} /> :
                                    <Image style={styles.profile_img}
                                        source={{ uri: item.profile_pic }} />
                                }
                            </View>
                            <View style={{ marginTop: "5%", marginLeft: "2%" }}>
                                <Text style={styles.WriteComments}>Admin</Text>
                                <Text style={styles.postDay}>{item.message}</Text>
                            </View>
                            <Text style={styles.WriteComments_2}>{this.GetdateTime(item.created_date)}</Text>
                        </View>
                        <View style={styles.bottom_Underline}></View>
                    </Swipeout>
                }

            </View>
        )
    }


    render() {
        const { navigate } = this.props.navigation;
       
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>
                <HeaderScreen title='Notifications' navigation={this.props.navigation} />

                <View style={styles.CommentInput_2}>

                    {this.state.notificationList.length > 0 ?
                        <FlatList data={this.state.notificationList}
                            renderItem={({ item, index }) =>
                                this.getValue(item, index)
                            }
                            keyExtractor={(_, index) => index.toString()}
                        />
                        :
                        <Text style={{ color: '#fff', alignSelf: 'center', marginTop: "20%", fontSize: 18, fontFamily: 'Raleway-Regular' }}>No Notification found</Text>


                    }


                </View>

                <View style={{ position: 'absolute', bottom: "1%", left: "30%", }}>
                    <TouchableOpacity style={styles.createEventBoder} onPress={this.clear_all_notification}>
                        <Text style={styles.text_6}>Clear all</Text>
                    </TouchableOpacity>
                </View>
                <Loader isLoader={this.state.loading}></Loader>
                <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
            </SafeAreaView>
        )
    }

}
export default NotificationList;