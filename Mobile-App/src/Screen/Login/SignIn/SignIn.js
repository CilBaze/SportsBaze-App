
import * as React from 'react';
import { View, Text, Image, StatusBar, Keyboard, BackHandler, Alert, Platform, PermissionsAndroid } from 'react-native';
import { ScrollView, State, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './SignIn_styles'
import Modal from 'react-native-modal';
import { requestGetApi, sports } from '../../../NetworkCall/Service'
import Toast from 'react-native-custom-toast';
import { requestPostApiMedia, login } from '../../../NetworkCall/Service'
import { getAsyncStorage, setAsyncStorage } from '../../../Routes/AsynstorageClass'
import NetInfo from "@react-native-community/netinfo";
import { AddUser } from '../../../NetworkCall/LoginRequest/AddUser';
import Loader from '../../CustomComponent/Loader';
import CustomAlert from '../../CustomAlert';
import ExitAlert from '../../ExitAlert';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
let Sports_name_arr = []
let fcm_token = ''

class SignInScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            isSignUpModalVisible: false,
            isFanVisible: false,
            isCoachVisible: false,
            isScoutVisible: false,
            isAthleteVisible: false,
            email: '',
            password: '',
            sportsList_name: [],
            connection_Status: "",
            loading: false,
            Alert_Visibility: false,
            alert_msg: '',
            exitAlert_Visibility: false,
            fcm_token: '',
            newlocationLat: '',
            newlocationLong: '',
            input_location: '',
        }
    }


    async componentDidMount() {
        Geocoder.init("AIzaSyB4O2q844JvXcOpT0J6wreFNT0pP7qfZy4");
        StatusBar.setBarStyle('light-content', true)
        StatusBar.setBackgroundColor("#EBECEC")
        this.CheckConnectivity();
        this.getSportsList();
        fcm_token = await getAsyncStorage('FCMId');
        this.setState({ fcm_token: await getAsyncStorage('FCMId') })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
        this.requestLocationPermission();
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


    getSportsList = async () => {
        const body = {
        }
        const { responseJson, err } = await requestGetApi(sports, body, 'GET')
        console.log("sports_categorylist Response------------", responseJson)

        if (responseJson.status == true) {
            console.log('customerlist--------:::::::::::::', responseJson.data);
            Sports_name_arr = responseJson.data;

            this.setState({ sportsList_name: Sports_name_arr })
            console.log("data::::::::::============", this.state.sportsList_name)

        }


    }
    handleBackButton() {
        this.setState({ exitAlert_Visibility: true })
        return true;
    }




    athleteScreen = () => {
        this.setState({ isSignUpModalVisible: false }) 
        this.setState({ isAthleteVisible: !this.state.isAthleteVisible })
        this.setState({ isCoachVisible: false })
        this.setState({ isFanVisible: false })
        this.setState({ isScoutVisible: false })


        this.props.navigation.navigate('AthleteScreen', {
            SportList: this.state.sportsList_name,
        })
    }
    CoachTrainerScreen = () => {
        this.setState({ isCoachVisible: !this.state.isCoachVisible })
        this.setState({ isSignUpModalVisible: false })
        this.props.navigation.navigate('CoachTrainerScreen', {
            SportList: this.state.sportsList_name,
        })
        this.setState({ isFanVisible: false })
        this.setState({ isScoutVisible: false })
        this.setState({ isAthleteVisible: false })
    }
    SignUptoggle = () => {
        this.setState({ isSignUpModalVisible: !this.state.isSignUpModalVisible })
    }

    ScoutScreen = () => {

        this.setState({ isScoutVisible: !this.state.isScoutVisible })
        this.setState({ isSignUpModalVisible: false })
        this.setState({ isCoachVisible: false })
        this.setState({ isFanVisible: false })
        this.setState({ isAthleteVisible: false })

        this.props.navigation.navigate('ScoutClubScreen', {
            SportList: this.state.sportsList_name,
        })

    }
    FanUserScreen = () => {

        this.setState({ isFanVisible: !this.state.isFanVisible })
        this.setState({ isSignUpModalVisible: false })
        this.setState({ isCoachVisible: false })
        this.setState({ isScoutVisible: false })
        this.setState({ isAthleteVisible: false })

        this.props.navigation.navigate('FanUserScreen', {
            SportList: this.state.sportsList_name,
        })

    }

    openAlert = () => {
        this.setState({ Alert_Visibility: false })
    }
    closeAlert = () => {
        this.setState({ Alert_Visibility: false })
    }
    openExitAlert = () => {
        this.setState({ exitAlert_Visibility: false });
        BackHandler.exitApp()
    }
    closeExitAlert = () => {
        this.setState({ exitAlert_Visibility: false })
    }
    HomeScreen = async () => {
        if (this.state.email == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please Enter email." })
            return;
        }
        if (this.state.password == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please Enter Password." })
            return;
        }
        this.setState({ loading: true })
        const formData = new FormData()
        formData.append('email', this.state.email)
        formData.append('password', this.state.password)
        formData.append('fcm_token', await getAsyncStorage('FCMId'));
        console.log("formData++++", formData)
        const { responseJson, err } = await requestPostApiMedia(login, formData, 'POST')
        console.log("Response of login ++++", responseJson)
        this.setState({ loading: false })
        if (responseJson.status == true && responseJson.data.user_group == 1) {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "You are not authorized to login with this account." })
        }
        else if (responseJson.status == true && responseJson.data.user_group != 1) {
            console.log('token key', responseJson.token);
            await setAsyncStorage("status", responseJson.data.status);
            await setAsyncStorage('tokenkey', responseJson.token);
            await setAsyncStorage('email', responseJson.data.email);
            await setAsyncStorage('FisrtName', responseJson.data.first_name);
            await setAsyncStorage('LastName', responseJson.data.last_name);
            await setAsyncStorage('profile_pic', responseJson.data.profile_pic);
            await setAsyncStorage('user_id', responseJson.data.id);
            await setAsyncStorage('contact_no', responseJson.data.contact_no);

            AddUser(responseJson.data.first_name + " " + responseJson.data.last_name,
                responseJson.data.id, responseJson.data.profile_pic);
            this.props.navigation.navigate('Tab', {
                SportList: this.state.sportsList_name,
            })
        }
        else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
        }


    }
    OTpScreen = () => {
        this.props.navigation.navigate('SendOtp')
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#15141A' }}>
                <View style={{ height: 300 }}>
                    <Image style={styles.LoginHeader} source={require('../../../Images/Login.png')}></Image>
                </View>
                <View style={styles.LoginInputs}>
                    <View>
                        <Loader isLoader={this.state.loading}></Loader>
                    </View>
                    <ScrollView>
                        <View>
                            <Text style={styles.LoginText}>Email</Text>
                            <View style={styles.backgroundLogin}>
                                <TextInput
                                    style={styles.inputStyle}
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
                                    autoCorrect={true}
                                    blurOnSubmit={false} />
                            </View>

                            <Text style={styles.PasswordText}>Password</Text>
                            <View style={styles.backgroundLogin}>
                                <TextInput
                                    style={styles.inputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Enter Password"
                                    placeholderTextColor="#9B9B9D"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    autoCorrect={true}
                                    onChangeText={(password) => this.setState({ password })}
                                    underlineColorAndroid='transparent'
                                    ref={ref => {
                                        this._emailinput = ref;
                                    }}
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                    secureTextEntry={true} />
                            </View>
                            <View style={styles.forgetBackGround}>
                                <TouchableOpacity onPress={this.OTpScreen}>
                                    <Text style={styles.ForgetText2}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.SignIn_BtnBG} >
                                <TouchableOpacity style={styles.SignIn_Btn} onPress={this.HomeScreen} >
                                    <Text style={styles.SignInText}>Sign In</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.NextButton_2}>
                                <Toast ref="customToast" backgroundColor="#fff" textColor='black' />
                            </View>
                            <View style={styles.SignUpText}  >
                                <Text style={styles.ForgetText2}>Don't have an account?</Text>
                                <TouchableOpacity onPress={this.SignUptoggle}>
                                    <Text style={styles.SignUp}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>

                </View>

                <Modal isVisible={this.state.isSignUpModalVisible}
                    backdropColor='#7D7B7C'
                    style={{ width: "100%", alignSelf: 'center' }}
                    onRequestClose={() => { this.setState({ isSignUpModalVisible: false }) }}
                    onBackdropPress={() => this.setState({ isSignUpModalVisible: false })}
                >
                    <View style={styles.SignupModal}>
                        <Text style={styles.text}>You Are ?</Text>
                        {this.state.isAthleteVisible == false ?
                            <View style={styles.UserBg} onStartShouldSetResponder={this.athleteScreen}>
                                <Text style={styles.fontText}>Athlete</Text>
                            </View>
                            :
                            <View style={styles.UserBg2} onStartShouldSetResponder={this.athleteScreen}>
                                <Image style={{ width: 20, height: 20 }} source={require('../../../Images/ok.png')}></Image>
                                <Text style={styles.fontText_2}>Athlete</Text>
                            </View>
                        }
                        {this.state.isScoutVisible == false ?
                            <View style={styles.UserBg} onStartShouldSetResponder={this.ScoutScreen} >
                                <Text style={styles.fontText}>Scout/Club</Text>
                            </View>
                            :
                            <View style={styles.UserBg2} onStartShouldSetResponder={this.ScoutScreen}>
                                <Image style={{ width: 20, height: 20 }} source={require('../../../Images/ok.png')}></Image>
                                <Text style={styles.fontText_2}>Scout/Club</Text>
                            </View>
                        }
                        {this.state.isCoachVisible == false ?
                            <View style={styles.UserBg} onStartShouldSetResponder={this.CoachTrainerScreen}>
                                <Text style={styles.fontText} >Coach/Trainer</Text>
                            </View>
                            :
                            <View style={styles.UserBg2} onStartShouldSetResponder={this.CoachTrainerScreen}>
                                <Image style={{ width: 20, height: 20 }} source={require('../../../Images/ok.png')}></Image>
                                <Text style={styles.fontText_2}>Coach/Trainer</Text>
                            </View>
                        }

                        {this.state.isFanVisible == false ?
                            <View style={styles.UserBg4} onStartShouldSetResponder={this.FanUserScreen}>
                                <Text style={styles.fontText} >Fan</Text>
                            </View> :
                            <View style={styles.UserBg3} onStartShouldSetResponder={this.FanUserScreen}>
                                <Image style={{ width: 20, height: 20 }} source={require('../../../Images/ok.png')}></Image>
                                <Text style={styles.fontText_2}>Fan</Text>
                            </View>
                        }
                    </View>
                </Modal>
                <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
                <ExitAlert exitAlert_Visibility={this.state.exitAlert_Visibility} onPress={this.openExitAlert} closeModal={this.closeExitAlert} />
            </View>


        );
    }


    requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            this.getOneTimeLocation();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Access Required',
                        message: 'This App needs to Access your location',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("PermissionsAndroid granted:::")
                    this.getOneTimeLocation();

                } else {
                    console.log("PermissionsAndroid  not granted:::")
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };


    getOneTimeLocation = () => {

        Geolocation.getCurrentPosition(
            (position) => {
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);
                this.setState({ newlocationLong: currentLongitude })
                this.setState({ newlocationLat: currentLatitude })

                console.log("newlocationLat:::", this.state.newlocationLat)

                Geocoder.from(currentLatitude, currentLongitude)
                    .then(json => {
                        var addressComponent = json.results[0].formatted_address;
                        console.log("addressComponent", addressComponent);
                        this.setState({ input_location: addressComponent })
                    })
                    .catch(error => console.log(error));
                console.log("input_location=>", this.state.input_location)
            },
            (error) => {
                console.log("error===", error.message)
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };


}


export default SignInScreen;