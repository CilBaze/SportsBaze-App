
import * as React from 'react';
import { View, Text, Image, StatusBar, Keyboard, BackHandler, Alert, Platform, SafeAreaView } from 'react-native';
import { ScrollView, State, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../Login/SignIn/SignIn_styles'
import Toast from 'react-native-custom-toast';
import { requestPostApiMedia, book_appointment } from '../../NetworkCall/Service'
import { getAsyncStorage, setAsyncStorage } from '../../Routes/AsynstorageClass'
import NetInfo from "@react-native-community/netinfo";
import HeaderScreen from '../header';
import Loader from '../CustomComponent/Loader';
import CustomAlert from '../CustomAlert';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import moment from 'moment';
let Sports_name_arr = []
let email = ''
let post_id = ''
let oneTimeSelected_date = ''
let oneTimeSelected_time = ""
class Bookappointment extends React.Component {
    constructor() {
        super();
        this.state = {
            Fname: '',
            phoneNumber: '',
            email: '',
            Lname: '',
            meassage: '',
            post_id: '',
            Alert_Visibility: false,
            alert_msg: '',
            isDatePickerVisible: false,
            oneTimeSelected_date: '',
            oneTimeSelected_date: '',
            isTimePickerVisible: false,
            oneTimeSelected_time: '',
            slected_time: ''
        }
    }


    componentDidMount() {
        this.setState({ post_id: post_id });
        this.CheckConnectivity();
    }
    openAlert = () => {
        if (this.state.alert_msg == "Appointment has been booked successfully") {
            this.props.navigation.navigate('SportsCenterScreen');
            this.setState({ Alert_Visibility: false })
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
    CreatePassword = async () => {
        console.log("email", this.state.email);

        if (this.state.Fname == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please Enter First Name." })
            return;
        }
        if (this.state.Lname == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please Enter Last Name." })
            return;
        }
        if (this.state.email == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please Enter Email." })
            return;
        }
        if (this.state.phoneNumber == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please Enter Phonenumber." })
            return;
        }
        if (this.state.oneTimeSelected_date == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please Enter Date." })
            return;
        }
        if (this.state.oneTimeSelected_time == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please Enter Time." })
            return;
        }
        if (this.state.meassage == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please Enter Message." })
            return;
        }
        this.setState({ loading: true, })
        let token = await getAsyncStorage('tokenkey');
        const formData = new FormData()
        formData.append('email', this.state.email);
        formData.append('first_name', this.state.Fname);
        formData.append('last_name', this.state.Lname);
        formData.append('phone_number', this.state.phoneNumber);
        formData.append('message', this.state.meassage);
        formData.append('post_id', this.state.post_id);
        formData.append('date', this.state.oneTimeSelected_date);
        formData.append('time', this.state.oneTimeSelected_time);
        console.log('form data', formData)
        const { responseJson, err } = await requestPostApiMedia(book_appointment, formData, 'POST', token);
        console.log("reset Response", responseJson);
        this.setState({ loading: false, })
        if (responseJson.status) {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })


        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
        }

    }
    render() {
        post_id = this.props.route.params.post_id;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>
                <HeaderScreen title='Book appointment' navigation={this.props.navigation} />
                <View style={styles.LoginInputs}>
                    <ScrollView>
                        <View style={{ marginTop: "10%" }}>
                            <View style={styles.ForgetEmail}>
                                <TextInput
                                    style={styles.forgetinputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="First Name"
                                    placeholderTextColor="#9B9B9D"
                                    keyboardType='default'
                                    returnKeyType="next"
                                    onChangeText={(Fname) => this.setState({ Fname })}
                                    underlineColorAndroid='transparent'
                                    onSubmitEditing={() =>
                                        this.lname && this.lname.focus()
                                    }
                                    blurOnSubmit={false} />
                            </View>

                            <View style={styles.ForgetEmail}>
                                <TextInput
                                    style={styles.forgetinputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Last Name"
                                    placeholderTextColor="#9B9B9D"
                                    keyboardType='default'
                                    returnKeyType="next"
                                    onChangeText={(Lname) => this.setState({ Lname })}
                                    underlineColorAndroid='transparent'
                                    onSubmitEditing={() =>
                                        this.email && this.email.focus()
                                    }
                                    ref={ref => {
                                        this.lname = ref;
                                    }}
                                    blurOnSubmit={false} />
                            </View>
                            <View style={styles.ForgetEmail}>
                                <TextInput
                                    style={styles.forgetinputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Email"
                                    placeholderTextColor="#9B9B9D"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    onChangeText={(email) => this.setState({ email })}
                                    underlineColorAndroid='transparent'
                                    ref={ref => {
                                        this.email = ref;
                                    }}
                                    onSubmitEditing={() =>
                                        this.phoneNo && this.phoneNo.focus()
                                    }
                                    blurOnSubmit={false}
                                />
                            </View>

                            <View style={styles.ForgetEmail}>
                                <TextInput
                                    style={styles.forgetinputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Phone Number"
                                    placeholderTextColor="#9B9B9D"
                                    keyboardType='number-pad'
                                    returnKeyType="next"
                                    maxLength={10}
                                    onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                                    underlineColorAndroid='transparent'
                                    ref={ref => {
                                        this.phoneNo = ref;
                                    }}
                                    onSubmitEditing={() =>
                                        this.message && this.message.focus()
                                    }
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={styles.backgroundLogin_2}  >
                                <TextInput editable={false}
                                    placeholderTextColor="#9B9B9D"
                                    placeholder="Select Date"
                                    style={{
                                        alignSelf: 'center',
                                        marginLeft: "5%",
                                        color: '#fff',
                                        fontSize: 14, fontFamily: 'Raleway-Regular', width: '58%'
                                    }}
                                    value={this.state.oneTimeSelected_date} ></TextInput>
                                <DateTimePickerModal
                                    isVisible={this.state.isDatePickerVisible}
                                    mode="date"
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDatePicker}
                                    forment="dd-MM-y" />
                                <TouchableOpacity style={{ marginLeft: "30%", }} onPress={this.showDatePicker}>
                                    <Image style={{ alignSelf: 'center', width: 18, height: 18, }} source={require('../../Images/calender.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.backgroundLogin_2}  >
                                <TextInput editable={false}
                                    placeholderTextColor="#9B9B9D"
                                    placeholder="Select Time"
                                    style={{
                                        alignSelf: 'center',
                                        marginLeft: "5%",
                                        color: '#fff',
                                        fontSize: 14, fontFamily: 'Raleway-Regular', width: '78%'
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
                            <View style={styles.meassage}>
                                <TextInput
                                    style={styles.msginputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Enter Message"
                                    placeholderTextColor="#9B9B9D"
                                    keyboardType='default'
                                    returnKeyType="next"
                                    onChangeText={(meassage) => this.setState({ meassage })}
                                    underlineColorAndroid='transparent'
                                    ref={ref => {
                                        this.message = ref;
                                    }}
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                    multiline={true}
                                />
                            </View>

                            <TouchableOpacity style={styles.registerBoder} onPress={this.CreatePassword} >
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
    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };
    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false })
    }

    handleDatePicked = (date) => {
        oneTimeSelected_date = moment(date).format('YYYY-MM-DD');
        this.setState({ oneTimeSelected_date })
        this.hideDatePicker();
    };

    hideTimePicker = () => {
        this.setState({ isTimePickerVisible: false })
    }

    showTimePicker = () => {
        this.setState({ isTimePickerVisible: true })
    };
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
        oneTimeSelected_time = moment(time, "h:mm:ss A").format("HH:mm:ss");
        console.log("momonet time:", oneTimeSelected_time)

        this.setState({ oneTimeSelected_time })
        this.hideTimePicker();
    };
}


export default Bookappointment;