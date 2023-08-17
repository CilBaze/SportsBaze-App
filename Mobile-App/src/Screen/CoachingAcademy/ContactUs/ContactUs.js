
import * as React from 'react';
import { View, Text, Image, StatusBar, Keyboard, BackHandler, Alert, Platform } from 'react-native';
import { ScrollView, State, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../Login/SignIn/SignIn_styles'
import Toast from 'react-native-custom-toast';
import { requestPostApiMedia, ConatctUsCoachingAcademy } from '../../../NetworkCall/Service'
import { getAsyncStorage, setAsyncStorage } from '../../../Routes/AsynstorageClass'
import NetInfo from "@react-native-community/netinfo";
import HeaderScreen from '../../header';
import Loader from '../../CustomComponent/Loader';
import CustomAlert from '../../CustomAlert';
let Sports_name_arr = []
let email = ''
let post_id=''

class ContactUs extends React.Component {
    constructor() {
        super();
        this.state = {
            Fname: '',
            phoneNumber: '',
            email: '',
            Lname:'',
            meassage:'',
            post_id:'',
            Alert_Visibility: false,
            alert_msg: ''
        }
    }


    componentDidMount() {
        this.setState({ post_id: post_id });
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
        console.log("email", this.state.email);
        if (this.state.email == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please Enter email." })
            return;
        }
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

        if (this.state.phoneNumber == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please Enter Phonenumber." })
            return;
        }
        if (this.state.meassage == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please Enter Some Message." })
            return;
        }
        this.setState({loading: true,})
        let token = await getAsyncStorage('tokenkey');
        const formData = new FormData()
        formData.append('email', this.state.email);
        formData.append('first_name', this.state.Fname);
        formData.append('last_name', this.state.Lname);
        formData.append('contact_no', this.state.phoneNumber);
        formData.append('message', this.state.meassage);
        formData.append('post_id', this.state.post_id);
        console.log('form data', formData)
        const { responseJson, err } = await requestPostApiMedia(ConatctUsCoachingAcademy, formData, 'POST',token);
        console.log("reset Response", responseJson);
        this.setState({loading: false,})
        if (responseJson.status) {
            this.props.navigation.navigate('CoachingAcademy');
           
        }else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message})
        }

    }
    render() {
        post_id = this.props.route.params.post_id;
        return (
            <View style={{ flex: 1, backgroundColor: '#15141A' }}>
                <HeaderScreen title='Contact Us' navigation={this.props.navigation}/>
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
            </View>


        );
    }

}


export default ContactUs;