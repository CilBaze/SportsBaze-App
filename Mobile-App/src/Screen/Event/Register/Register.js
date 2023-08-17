
import * as React from 'react';
import { View, Text, Image, StatusBar, Keyboard, BackHandler, Alert, Platform, SafeAreaView } from 'react-native';
import { ScrollView, State, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../Login/SignIn/SignIn_styles'
import Toast from 'react-native-custom-toast';
import { requestPostApiMedia, eventsParticipate } from '../../../NetworkCall/Service'
import { getAsyncStorage, setAsyncStorage } from '../../../Routes/AsynstorageClass'
import NetInfo from "@react-native-community/netinfo";
import HeaderScreen from '../../header';
import Loader from '../../CustomComponent/Loader';
import CustomAlert from '../../CustomAlert';
let Sports_name_arr = []
let email = ''
let event_id = ''

class RegisterScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            Fname: '',
            phoneNumber: '',
            email: '',
            Lname: '',
            meassage: '',
            event_id: '',
            loading: false,
            Alert_Visibility: false,
            alert_msg: ''
        }
    }


    componentDidMount() {
        this.setState({ event_id: event_id });
        this.CheckConnectivity();
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
    onBack = () => {
        this.props.navigation.goBack();
    }
    CreatePassword = async () => {

        if (this.state.Fname == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please enter first name." })
            return;
        }
        if (this.state.email == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please enter email." })
            return;
        }

        if (this.state.phoneNumber == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please enter phone number." })
            return;
        }
        if (this.state.meassage == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please enter message." })
            return;
        }
        this.setState({ loading: true })
        let token = await getAsyncStorage('tokenkey');
        const formData = new FormData()
        formData.append('event_id', this.state.event_id);
        formData.append('email', this.state.email);
        formData.append('first_name', this.state.Fname);
        formData.append('last_name', this.state.Lname);
        formData.append('contact_no', this.state.phoneNumber);
        formData.append('message', this.state.meassage);
        console.log('form data', formData)
        const { responseJson, err } = await requestPostApiMedia(eventsParticipate, formData, 'POST', token);
        console.log("Response==", responseJson);
        this.setState({ loading: false })
        if (responseJson.status) {
            this.props.navigation.navigate('EventScreen');
        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message})
        }

    }
    render() {
        event_id = this.props.route.params.event_id;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>
                <HeaderScreen title='Register' navigation={this.props.navigation} />
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

}


export default RegisterScreen;