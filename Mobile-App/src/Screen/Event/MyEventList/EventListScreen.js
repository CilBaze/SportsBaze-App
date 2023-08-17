import React from 'react'
import { View, Text, Image, Colors, Button, BackHandler, Alert, Platform, Linking } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './event_list_styles';
import { clearAsyncStorage } from '../../../Routes/AsynstorageClass';
import ReadMore from 'react-native-read-more-text';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-picker';
import { requestGetApi, get_event_list } from '../../../NetworkCall/Service';
import { getAsyncStorage } from '../../../Routes/AsynstorageClass';
import { requestPostApiMedia, likePost, unlikePost } from '../../../NetworkCall/Service';
import Toast from 'react-native-custom-toast';
import moment from 'moment';
import { requestDeleteApiMedia, delete_events } from '../../../NetworkCall/Service';
import NetInfo from "@react-native-community/netinfo";
import HeaderScreen from '../../header';
import Loader from '../../CustomComponent/Loader';
import CustomAlert from '../../CustomAlert';


let SportList_Data = []
let eventList = []
let deleted_post_id = ''
let screen = ''
let screen_2 = 'mycommentscreen'
_menu = null;

class EventListScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            isSignUpModalVisible: false,
            setResponse: '',
            EventData_list: [],
            upload_post_id: '',
            islike: false,
            isModalVisible: false,
            selectedItemIndex: 0,
            item_selected: '',
            PageNo: 1,
            loading: false,
            value: '',
            Alert_Visibility: false,
            alert_msg: ''
        }
    }
    componentDidMount() {

        this.setState({ EventData_list: [] })
        this.CheckConnectivity();
        this.geteventList();
    }
    openAlert = () => {
        this.setState({ Alert_Visibility: false })
    }
    closeAlert = () => {
        this.setState({ Alert_Visibility: false })
    }
    componentWillMount = async () => {
        await this.geteventList();
    };
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
    GoTobackScreen = () => {
        this.props.navigation.goBack()
    }
    geteventList = async () => {
        this.setState({ loading: true });
        const body = {
            'per_page': 20,
            'page_no': this.state.PageNo,
        }
        let token_value = await getAsyncStorage('tokenkey');
        console.log("token:::", token_value);
        const { responseJson, err } = await requestGetApi(get_event_list, body, 'GET', token_value)
        console.log("event list=>", responseJson)
        this.setState({ loading: false });
        if (responseJson.status == true) {
            eventList = responseJson.data.records;
            if (this.state.PageNo == 1) {
                this.setState({ EventData_list: responseJson.data.records })
            } else {
                this.setState({ EventData_list: this.state.EventData_list.concat(responseJson.data.records) })
            }
        } else {
        }
    }

    editEvent(event_name, event_description, location, event_id,postal_code) {
        this.props.navigation.navigate('EditEvent', {
            event_name: event_name,
            event_description: event_description,
            location: location,
            event_id: event_id,
            postal_code:postal_code
        })
    }
    viewAttendeesEvent(event_id) {
        console.log(";;;", event_id)
        this.props.navigation.navigate('ViewAttendees', {
            event_id: event_id
        })

    }
    toggleModal(event_id, index) {
        this.setState({
            isModalVisible: !this.state.isModalVisible, item_selected: event_id

        });
    };

    NoClick() {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    deleteEvent = async () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        let token = await getAsyncStorage('tokenkey');
        console.log("token", token)
        var details = {
            'event_id': this.state.item_selected
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        const { responseJson, err } = await requestDeleteApiMedia(delete_events, formBody, 'DELETE', token)
        this.setState({ PageNo: 1 })
        this.geteventList();
        if (responseJson.status == true) {
        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message})
        }
    }
    footerList = () => {
        if (eventList.length > 20) {
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
        if (eventList.length > 10) {
            await this.setState({ PageNo: this.state.PageNo + 1 })
            this.geteventList();
        }
    }
    addressLink = (lat, long) => {
        const daddr = `${lat},${long}`;
        const company = Platform.OS === "ios" ? "apple" : "google";
        Linking.openURL(`http://maps.${company}.com/maps?daddr=${daddr}`);

    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>
                <HeaderScreen title='My Events' navigation={this.props.navigation} />
                <View style={{ flex: 4, backgroundColor: '#15141A' }}>
                    <FlatList data={this.state.EventData_list}
                        renderItem={({ item, index }) =>
                            <View style={styles.CardView}>
                                <View style={{ marginHorizontal: "5%", marginVertical: "5%" }}>
                                    <Text style={styles.tex1}>{item.event_name}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.text_3}>Description : </Text>
                                        <Text style={styles.text_4}>{item.event_description}</Text>
                                    </View>
                                    {item.event_date != null ?
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.text_3}>Event date : </Text>
                                            <Text style={styles.text_4}>{item.event_date.slice(0, -9)}</Text>
                                        </View> :
                                        null
                                    }

                                    <View style={styles.underline}></View>
                                    <View style={{ flexDirection: 'row', marginTop: "3%", }}>
                                        <Image style={styles.location} source={require('../../../Images/ic_location.png')}></Image>
                                        <TouchableOpacity onPress={() => this.addressLink(item.latitude, item.longitude)}>
                                        <Text style={styles.text_2}>{item.location +", "+ item.postal_code}</Text>
                                    </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 30, }}>
                                        <TouchableOpacity style={styles.registerBoder} onPress={() => this.toggleModal(item.event_id, index)}>
                                            <Text style={styles.text_5}>Delete</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.registerBoder} onPress={() => this.editEvent(item.event_name, item.event_description, item.location, item.event_id,item.postal_code)}>
                                            <Text style={styles.text_5}>Edit</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.ViewAttendees} onPress={() => this.viewAttendeesEvent(item.event_id)}>
                                            <Text style={styles.text_5}>View Attendees</Text>
                                        </TouchableOpacity>
                                    </View>
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
                            backdropColor="transparent"
                            isVisible={this.state.isModalVisible}
                            style={{ width: "100%", alignSelf: 'center' }}
                            onRequestClose={() => { this.setState({ isModalVisible: false }) }}>
                            <View style={styles.JonMarked_Completed_Modal}>
                                <Text style={styles.DeletePost}>Are you sure you want to delete
                                        </Text>
                                <Text style={styles.DeletePost_3}>event?</Text>
                                <View style={styles.BtnView}>
                                    <View style={styles.NoBtn} onStartShouldSetResponder={() => this.NoClick()}>
                                        <Text style={styles.DeletePost_2}>No</Text>
                                    </View>

                                    <View style={styles.NoBtn} onStartShouldSetResponder={() => this.deleteEvent()}>
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
        )
    }

}

export default EventListScreen;