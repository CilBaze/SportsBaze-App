
import * as React from 'react';
import { View, Text, Image, StatusBar, Keyboard, BackHandler, Alert, Platform } from 'react-native';
import { ScrollView, State, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../SignIn/SignIn_styles'
import Toast from 'react-native-custom-toast';
import NetInfo from "@react-native-community/netinfo";
import AppLoader, { showLoader, hideLoader, loaderRef } from '../../AppLoader'
import Modal from 'react-native-modal';
import { requestPostApiMedia, forgotPassword } from '../../../NetworkCall/Service'
import HeaderScreen from '../../header';
import CustomAlert from '../../CustomAlert';

class SendOtp extends React.Component {



    constructor() {
        super();
        this.state = {
            email: '',
            isModal: false,
            Alert_Visibility: false,
            alert_msg:''
        }
    }


    componentDidMount() {
        this.CheckConnectivity();
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
    handleBackButton() {
        BackHandler.exitApp()
    }
    onBack = () => {
        this.props.navigation.goBack();
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
    verificationEmail = async () => {
        if (this.state.email == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg:"Please Enter email." });
            return;
        }
        showLoader();
        const formData = new FormData()
        formData.append('email', this.state.email)
        const { responseJson, err } = await requestPostApiMedia(forgotPassword, formData, 'POST');
        console.log("forget Response", responseJson)
        hideLoader();
        if (responseJson.status == true) {
            this.setState({ isModal: !this.state.isModal });
        }
        else if (responseJson.message == 'Email is not registered with us.') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg:"Email is not registered with us." });
        } else {

        }
    }

    Success = () => {
        console.log("vhsdfhfg")
        this.setState({ isModal: false });
        this.props.navigation.navigate('CreatePassword',{
            email :this.state.email
        })
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#15141A' }}>
                <HeaderScreen title='Forgot Password'navigation={this.props.navigation}/>
                <View style={styles.LoginInputs}>
                    <View>
                        <AppLoader ref={loaderRef} />
                    </View>
                    <ScrollView>
                        <View>
                            <Text style={styles.LoginText}>Email</Text>
                            <View style={styles.ForgetEmail}>
                                <TextInput
                                    style={styles.forgetinputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Enter Email"
                                    placeholderTextColor="#9B9B9D"
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    onChangeText={(email) => this.setState({ email })}
                                    underlineColorAndroid='transparent'
                                    onSubmitEditing={() =>
                                        this._emailinput && this._emailinput.focus()
                                    }
                                    blurOnSubmit={false} />
                            </View>

                            <View style={styles.registerBoder}>
                                <TouchableOpacity onPress={this.verificationEmail}>
                                    <Text style={styles.text_5}>Next</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={styles.NextButton}>
                            <Toast ref="customToast" backgroundColor="#fff" textColor='black' />
                        </View>

                        <Modal isVisible={this.state.isModal}
                            onRequestClose={() => { this.setState({ isModal: false }) }}>
                            <View style={styles.ModalSuccess}>
                                <Text style={{ marginTop: "5%", fontFamily:'Raleway-Bold',fontSize:14 }}>Success</Text>
                                <Text style={{ alignSelf: 'center', marginTop: "5%",fontFamily:'Raleway-Regular',fontSize:14 }}>Verification code has been sent </Text>
                                <Text style={{ alignSelf: 'center',fontFamily:'Raleway-Regular',fontSize:14 }}> {"to "+ this.state.email} </Text>
                                <View style={{ marginTop: "10%", marginBottom: 20, width: 90, height: 30, alignItems: 'center', justifyContent: 'center' }}
                                    onStartShouldSetResponder={this.Success}>
                                    <Text style={{ fontFamily:'Raleway-Bold',fontSize:14 }}>OK</Text>
                                </View>
                            </View>
                        </Modal>
                    </ScrollView>
                </View>
                <CustomAlert  Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
            </View>


        );
    }

}


export default SendOtp;