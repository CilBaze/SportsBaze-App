
import * as React from 'react';
import { View, Text, Image, SafeAreaView, Keyboard, BackHandler, Alert, Platform } from 'react-native';
import { ScrollView, State, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../Login/SignIn/SignIn_styles'
import Toast from 'react-native-custom-toast';
import { requestPostApiMedia, savesession } from '../../NetworkCall/Service'
import { getAsyncStorage, setAsyncStorage } from '../../Routes/AsynstorageClass'
import NetInfo from "@react-native-community/netinfo";
import HeaderScreen from '../header';
import Loader from '../CustomComponent/Loader';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomAlert from '../CustomAlert';


let Sports_name_arr = []
let email = ''
let event_id = ''
let id = ''
let oneTimeSelected_date = ''
let oneTimeSelected_time = ""

class BookSession extends React.Component {
    constructor() {
        super();
        this.state = {
            Fname: '',
            stype: '',
            stime: '',
            sdate: '',
            loading: false,
            meetinglink: '',
            pname: '',
            isDatePickerVisible: false,
            oneTimeSelected_date: '',
            isTimePickerVisible: false,
            oneTimeSelected_time: "",
            zoomlink: '',
            skypelink: '',
            Alert_Visibility: false,
            alert_msg: '',
            slected_time: ''
        }
    }


    async componentDidMount() {
        let userFname = await getAsyncStorage("FisrtName");
        let userLname = await getAsyncStorage("LastName");
        this.setState({ pname: userFname + " " + userLname })
        this.CheckConnectivity();
    }

    openAlert = () => {
        if (this.state.alert_msg == "Successfully submitted") {
            this.setState({ Alert_Visibility: false })
            this.props.navigation.navigate('PersonalTrainer')
        } else {
            this.setState({ Alert_Visibility: false })
        }

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
    onBack = () => {
        this.props.navigation.goBack();
    }
    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };
    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false })
    }
    showTimePicker = () => {
        this.setState({ isTimePickerVisible: true })
    };

    handleDatePicked = (date) => {
        console.log("lemth===", (date.getMonth() + 1).length)
        if ((date.getMonth() + 1) < 10) {
            oneTimeSelected_date = date.getFullYear() + "-" + "0" + (date.getMonth() + 1) + "-" + date.getDate();
            this.setState({ oneTimeSelected_date })
        } else {
            oneTimeSelected_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            this.setState({ oneTimeSelected_date })
        }

        this.hideDatePicker();
    };
    hideTimePicker = () => {
        this.setState({ isTimePickerVisible: false })
    }

    handleTimePicked = (time) => {

        var hours = time.getHours();
        var minutes = time.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        this.setState({ slected_time: strTime })
        console.log("time:::;", strTime)
        let AM_PM;
        if (time.getHours() < 12) {
            AM_PM = "AM";
            if (time.getHours().toString().length < 2) {
                oneTimeSelected_time = "0" + time.getHours() + ':' + time.getMinutes()
            } else {
                oneTimeSelected_time = time.getHours() + ':' + time.getMinutes()
            }

        } else {
            AM_PM = "PM";
            oneTimeSelected_time = time.getHours() + ':' + time.getMinutes()
        }

        this.setState({ oneTimeSelected_time })
        this.hideTimePicker();
    };
    CreateBookSession = async () => {


        if (this.state.oneTimeSelected_date == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please Enter Session Date." })
            return;
        }
        if (this.state.oneTimeSelected_time == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please Enter Session Time." })
            return;
        }
        if (this.state.stype == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please Enter Session Type." })
            return;
        }
        if (this.state.meetinglink == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please Enter Session Meeting Link." })
            return;
        }
        this.setState({ loading: true })
        let token = await getAsyncStorage('tokenkey');
        const formData = new FormData()
        formData.append('trainee_id', id);
        formData.append('name', this.state.Fname);
        formData.append('date', this.state.oneTimeSelected_date);
        formData.append('time', this.state.oneTimeSelected_time);
        formData.append('type', this.state.stype);
        formData.append('meeting_link', this.state.meetinglink);
        formData.append('profile_name', this.state.pname);
        console.log('form data', formData)
        const { responseJson, err } = await requestPostApiMedia(savesession, formData, 'POST', token);
        console.log("Response==", responseJson);
        this.setState({ loading: false })
        if (responseJson.status) {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Successfully submitted" })
        } else {

            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
        }

    }
    render() {
        id = this.props.route.params.id;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>
                <HeaderScreen title='Book Session' navigation={this.props.navigation} />
                <View style={styles.LoginInputs}>
                    <ScrollView>
                        <View style={{ marginTop: "10%" }}>

                            <View style={styles.ForgetEmail}>
                                <TextInput
                                    style={styles.forgetinputStyle}
                                    placeholder="Profile Name"
                                    placeholderTextColor="#9B9B9D"
                                    placeholderTextColor="#9B9B9D"
                                    keyboardType='default'
                                    returnKeyType="next"
                                    onChangeText={(pname) => this.setState({ pname })}
                                    underlineColorAndroid='transparent'
                                    onSubmitEditing={() =>
                                        this.meetinglink && this.meetinglink.focus()
                                    }
                                    ref={ref => {
                                        this.pname = ref;
                                    }}
                                    value={this.state.pname}
                                    editable={false}
                                />
                            </View>
                           
                            <View style={styles.datePicker}>
                                <TextInput editable={false}
                                    placeholderTextColor="#9B9B9D"
                                    placeholder="Session Date"
                                    style={{
                                        alignSelf: 'center',
                                        marginLeft: "5%",
                                        color: '#fff',
                                        fontSize: 14, fontFamily: 'Raleway-Regular', width: '45%'
                                    }}
                                    value={this.state.oneTimeSelected_date} ></TextInput>
                                <DateTimePickerModal
                                    isVisible={this.state.isDatePickerVisible}
                                    mode="date"
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDatePicker}
                                    forment="dd-MM-y" />
                                <TouchableOpacity style={{ marginRight: 20 }} onPress={this.showDatePicker}>
                                    <Image style={{ alignSelf: 'center', width: 18, height: 18, }} source={require('../../Images/calender.png')} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.datePicker}>
                                <TextInput editable={false}
                                    placeholderTextColor="#9B9B9D"
                                    placeholder="Session time"
                                    style={{
                                        alignSelf: 'center',
                                        marginLeft: "5%",
                                        color: '#fff',
                                        fontSize: 14, fontFamily: 'Raleway-Regular', width: '45%'
                                    }}
                                    value={this.state.slected_time} ></TextInput>
                                <DateTimePickerModal
                                    isVisible={this.state.isTimePickerVisible}
                                    mode="time"
                                    headerTextIOS=""
                                    onConfirm={this.handleTimePicked}
                                    onCancel={this.hideTimePicker}
                                    forment="dd-MM-y"
                                    amPmAriaLabel="Select AM/PM"
                                    is24Hour={false} />
                                <TouchableOpacity style={{ marginRight: 20 }} onPress={this.showTimePicker}>
                                    <Image style={{ alignSelf: 'center', width: 18, height: 18, }} source={require('../../Images/calender.png')} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.ForgetEmail}>
                                <TextInput
                                    style={styles.forgetinputStyle}
                                    placeholder="Session Type"
                                    placeholderTextColor="#9B9B9D"
                                    keyboardType='default'
                                    returnKeyType="next"
                                    onChangeText={(stype) => this.setState({ stype })}
                                    underlineColorAndroid='transparent'
                                    onSubmitEditing={() =>
                                        this.pname && this.pname.focus()
                                    }
                                    ref={ref => {
                                        this.stype = ref;
                                    }}
                                    blurOnSubmit={false}
                                />
                            </View>


                            <View style={styles.ForgetEmail}>
                                <TextInput
                                    style={styles.forgetinputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Meeting: Skype id or Zoom id"
                                    placeholderTextColor="#9B9B9D"
                                    keyboardType='default'
                                    onChangeText={(meetinglink) => this.setState({ meetinglink })}
                                    underlineColorAndroid='transparent'
                                    ref={ref => {
                                        this.skypelink = ref;
                                    }}
                                    ref={ref => {
                                        this.meetinglink = ref;
                                    }}

                                    blurOnSubmit={false}
                                />
                            </View>
                         
                            <TouchableOpacity style={styles.registerBoder} onPress={this.CreateBookSession} >
                                <Text style={styles.text_5}>Submit</Text>
                            </TouchableOpacity>
                            <View style={styles.NextButton}>
                                <Toast ref="customToast" backgroundColor="#fff" textColor='black' />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <Loader isLoader={this.state.loading}></Loader>
                <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
            </SafeAreaView>


        );
    }

}


export default BookSession;