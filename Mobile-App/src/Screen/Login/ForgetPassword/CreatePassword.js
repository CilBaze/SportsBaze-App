
import * as React from 'react';
import { View, Text, Image, StatusBar, Keyboard, BackHandler, Alert, Platform } from 'react-native';
import { ScrollView, State, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../SignIn/SignIn_styles'
import Modal from 'react-native-modal';
import { requestGetApi, sports } from '../../../NetworkCall/Service'
import Toast from 'react-native-custom-toast';
import { requestPostApiMedia, resetPassword } from '../../../NetworkCall/Service'
import { setAsyncStorage } from '../../../Routes/AsynstorageClass'
import AppLoader, { loaderRef } from '../../AppLoader';
import { showLoader, hideLoader } from '../../AppLoader';
import NetInfo from "@react-native-community/netinfo";
import HeaderScreen from '../../header';
import CustomAlert from '../../CustomAlert';
let Sports_name_arr = []
let email = ''

class CreatePassword extends React.Component {
    constructor() {
        super();
        this.state = {
            code: '',
            newPassword: '',
            confirm_password: '',
            email: '',
            Alert_Visibility: false,
            alert_msg:''
        }
    }


    componentDidMount() {
        this.setState({ email: email });
        this.CheckConnectivity();
    }
    openAlert = () => {
        if(this.state.msg=="Password changed successfully."){
            this.props.navigation.navigate('SignInScreen')
            this.setState({Alert_Visibility:false})
        }else{
            this.setState({Alert_Visibility:false})
        }
    }
    closeAlert=()=>{
        this.setState({Alert_Visibility:false})
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
    onBack = () => {
        this.props.navigation.goBack();
    }
    CreatePassword = async () => {
        console.log("email", this.state.email);
        if (this.state.code == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg:"Please enter  verification code." });
            return;
        }
        if (this.state.newPassword == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg:"Please enter new password." });
            return;
        }
        if (this.state.newPassword.length < 6) {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg:"Please enter at least 6 digit password." });
            return;
        }

        if (this.state.confirm_password == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg:"Please enter confirm password." });
            return;
        }
        if (this.state.newPassword != this.state.confirm_password) {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg:"Entered passwords does not match." });
            return;
        }

        showLoader();
        const formData = new FormData()
        formData.append('email', this.state.email);
        formData.append('otp', this.state.code);
        formData.append('password', this.state.newPassword);
        console.log('form data', formData)
        const { responseJson, err } = await requestPostApiMedia(resetPassword, formData, 'POST');
        console.log("reset Response", responseJson);
        hideLoader();
        if (responseJson.status == true) {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg:"Password changed successfully."});
            this.props.navigation.navigate('SignInScreen')
        } else if (responseJson.message == 'Otp don not match') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg:"Entered Code does not match."});
      
        } else {
        }

    }
    render() {
        email = this.props.route.params.email;
        return (
            <View style={{ flex: 1, backgroundColor: '#15141A' }}>
                <HeaderScreen title='Password Recovery' navigation={this.props.navigation}/>
                <View style={styles.LoginInputs}>

                    <View>
                        <AppLoader ref={loaderRef} />

                    </View>
                    <ScrollView>

                        <View style={{ marginTop: "10%" }}>
                            <View style={styles.ForgetEmail}>
                                <TextInput
                                    style={styles.forgetinputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Enter Verification Code"
                                    placeholderTextColor="#9B9B9D"
                                    keyboardType='default'
                                    returnKeyType="next"
                                    onChangeText={(code) => this.setState({ code })}
                                    underlineColorAndroid='transparent'
                                    onSubmitEditing={() =>
                                        this.pass && this.pass.focus()
                                    }
                                    blurOnSubmit={false} />
                            </View>
                            <Text style={styles.createPasswordText}>(Enter code you have received on registered email)</Text>
                            <View style={styles.ForgetEmail}>
                                <TextInput
                                    style={styles.forgetinputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Enter New Password"
                                    placeholderTextColor="#9B9B9D"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    onChangeText={(newPassword) => this.setState({ newPassword })}
                                    underlineColorAndroid='transparent'
                                    ref={ref => {
                                        this.pass = ref;
                                    }}
                                    onSubmitEditing={() =>
                                        this.confirmpass && this.confirmpass.focus()
                                    }
                                    blurOnSubmit={false}
                                    secureTextEntry={true} />
                            </View>

                            <View style={styles.ForgetEmail}>
                                <TextInput
                                    style={styles.forgetinputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Confirm New Password"
                                    placeholderTextColor="#9B9B9D"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    onChangeText={(confirm_password) => this.setState({ confirm_password })}
                                    underlineColorAndroid='transparent'
                                    ref={ref => {
                                        this.confirmpass = ref;
                                    }}
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                    secureTextEntry={true} />
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
                <CustomAlert  Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
            </View>


        );
    }

}


export default CreatePassword;