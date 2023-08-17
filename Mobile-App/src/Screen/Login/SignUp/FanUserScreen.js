import * as React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Keyboard, PermissionsAndroid, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './athlete_styles';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-custom-toast';
import NetInfo from "@react-native-community/netinfo";
import { setAsyncStorage } from '../../../Routes/AsynstorageClass';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomAlert from '../../CustomAlert';

let SportList_Data = []
class FanUserScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            value: false,
            isChecked: false,
            filePath: '',
            userfirst_name: '',
            userLast_name: '',
            email: '',
            password: '',
            parent_fname: '',
            parent_Lname: '',
            parent_email: '',
            parent_no: '',
            captureImage: "",
            Alert_Visibility: false,
            alert_msg: ''
        }
    }

    componentDidMount() {
        this.CheckConnectivity();
    }

    CheckConnectivity = () => {
        NetInfo.fetch().then(state => {
            if (state.isConnected == true) {
            } else {
                alert("internet not connected")
            }
        });
        NetInfo.addEventListener(state => {
            if (state.isConnected == true) {
            } else {
                alert("internet not connected")
            }
        });
    }

    CheckedDetails = () => {

        this.setState({ isChecked: !this.state.isChecked })
    }

    openAlert = () => {
        this.setState({ Alert_Visibility: false })
    }
    closeAlert = () => {
        this.setState({ Alert_Visibility: false })
    }
    chooseFile = async () => {
        const options = {
            title: 'Select Image',
            mediaType: 'photo',
            maxHeight: 100,
            maxWight: 100,
            quality: 0.8,
            allowsEditing: true,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                this.setState({ captureImage: response })
                const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({ filePath: source.uri })
            }
        });
       
    }


    NextScreen = async () => {
        if (this.state.userfirst_name == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please enter first name." })
            return;
        }
        if (this.state.email == '') {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please Enter email." })
            return;
        }
        if (this.state.password <= 6) {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please enter password" })
            return;
        }
        try {
            await AsyncStorage.setItem('ProfilePic', this.state.filePath);
            await setAsyncStorage('email', this.state.email);
            await AsyncStorage.setItem('firstName', this.state.userfirst_name);
            await AsyncStorage.setItem('LastName', this.state.userLast_name);
        } catch (error) {
        }
        this.props.navigation.navigate('NextFanUserScreen', {
            athelte_Fname: this.state.userfirst_name,
            athelte_Lname: this.state.userLast_name,
            athelte_email: this.state.email,
            athelte_password: this.state.password,
            athelte_parent_fname: this.state.parent_fname,
            athelte_parent_Lname: this.state.parent_Lname,
            athelte_parent_email: this.state.parent_email,
            athelte_parent_no: this.state.parent_no,
            imageUrl: this.state.captureImage,
            SportList: SportList_Data,
        })

    }
    GoBack = () => {
        this.props.navigation.goBack()
    }
    render() {

        const { navigate } = this.props.navigation;
        SportList_Data = this.props.route.params.SportList
        return (
            <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#000' }}>
                <View style={{ flex: 1, }}>
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', }}>
                            <TouchableOpacity style={{ marginTop: "11%", right: 120 }} onPress={this.GoBack}>
                                <Image style={{ width: 20, height: 20 }} source={require('../../../Images/back.png')} />
                            </TouchableOpacity>
                            <Text style={styles.headerText2}>FAN</Text>
                        </View>
                        <TouchableOpacity style={styles.imgBg} onPress={this.chooseFile}>
                            {this.state.filePath != '' ? <Image
                                source={{ uri: this.state.filePath }} style={styles.img}
                            /> :
                                <Image style={styles.img} source={require('../../../Images/profile.png')} />
                            }
                            <Image style={styles.camera} source={require('../../../Images/camera.png')}></Image>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', }}>
                            <View style={styles.navigation_dot_1}></View>
                            <View style={styles.navigation_line_1}></View>
                            <View style={styles.navigation_dot_2}></View>

                        </View>
                    </View>

                    <View style={{ flex: 1.5, marginTop: "5%" }}>

                        <ScrollView>
                            <Text style={styles.account_details}>Account Details</Text>

                            <View style={styles.backgroundLogin}>
                                <TextInput
                                    style={styles.inputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="First name"
                                    placeholderTextColor="#D2D2D3"
                                    keyboardType='default'
                                    returnKeyType="next"
                                    onChangeText={(userfirst_name) => this.setState({ userfirst_name })}
                                    underlineColorAndroid='transparent'
                                    onSubmitEditing={() =>
                                        this._lastname_input && this._lastname_input.focus()
                                    }
                                    blurOnSubmit={false} />
                            </View>
                            <View style={styles.backgroundLogin_2}>
                                <TextInput
                                    style={styles.inputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Last Name"
                                    placeholderTextColor="#D2D2D3"
                                    keyboardType='default'
                                    returnKeyType="next"
                                    onChangeText={(userLast_name) => this.setState({ userLast_name })}
                                    underlineColorAndroid='transparent'
                                    ref={ref => {
                                        this._lastname_input = ref;
                                    }}
                                    onSubmitEditing={() =>
                                        this._emailinput && this._emailinput.focus()
                                    }
                                    blurOnSubmit={false} />
                            </View>
                            <View style={styles.backgroundLogin_2}>
                                <TextInput
                                    style={styles.inputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Email"
                                    placeholderTextColor="#D2D2D3"
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    onChangeText={(email) => this.setState({ email })}
                                    underlineColorAndroid='transparent'
                                    ref={ref => {
                                        this._emailinput = ref;
                                    }}
                                    onSubmitEditing={() =>
                                        this._passwordinput && this._passwordinput.focus()
                                    }
                                    blurOnSubmit={false} />
                            </View>
                            <View style={styles.backgroundLogin_2}>
                                <TextInput
                                    style={styles.inputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Password"
                                    placeholderTextColor="#D2D2D3"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    onChangeText={(password) => this.setState({ password })}
                                    underlineColorAndroid='transparent'
                                    ref={ref => {
                                        this._passwordinput = ref;
                                    }}
                                    onSubmitEditing={() =>
                                        this._passwordinput && this._passwordinput.focus()
                                    }
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                    secureTextEntry={true} />
                            </View>
                            {
                                this.state.isChecked && (
                                    <View>
                                        <Text style={styles.patent}>Parent/Guardian</Text>
                                        <View style={styles.backgroundLogin}>
                                            <TextInput
                                                style={styles.inputStyle}
                                                underlineColorAndroid="#F6F6F7"
                                                placeholder="First Name"
                                                placeholderTextColor="#D2D2D3"
                                                keyboardType="default"
                                                returnKeyType="next"
                                                onChangeText={(parent_fname) => this.setState({ parent_fname })}
                                                underlineColorAndroid='transparent'
                                                onSubmitEditing={() =>
                                                    this._parentlastname_input && this._parentlastname_input.focus()
                                                }
                                                blurOnSubmit={false} />
                                        </View>
                                        <View style={styles.backgroundLogin_2}>
                                            <TextInput
                                                style={styles.inputStyle}
                                                underlineColorAndroid="#F6F6F7"
                                                placeholder="Last Name"
                                                placeholderTextColor="#D2D2D3"
                                                keyboardType="default"
                                                returnKeyType="next"
                                                onChangeText={(parent_Lname) => this.setState({ parent_Lname })}
                                                underlineColorAndroid='transparent'
                                                ref={ref => {
                                                    this._parentlastname_input = ref;
                                                }}
                                                onSubmitEditing={() =>
                                                    this._parent_emailinput && this._parent_emailinput.focus()
                                                }
                                                blurOnSubmit={false} />
                                        </View>
                                        <View style={styles.backgroundLogin_2}>
                                            <TextInput
                                                style={styles.inputStyle}
                                                underlineColorAndroid="#F6F6F7"
                                                placeholder="Email"
                                                placeholderTextColor="#D2D2D3"
                                                keyboardType="email-address"
                                                returnKeyType="next"
                                                onChangeText={(parent_email) => this.setState({ parent_email })}
                                                underlineColorAndroid='transparent'
                                                ref={ref => {
                                                    this._parent_emailinput = ref;
                                                }}
                                                onSubmitEditing={() =>
                                                    this._phoneNumberinput && this._phoneNumberinput.focus()
                                                }
                                                blurOnSubmit={false} />
                                        </View>
                                        <View style={styles.backgroundLogin_2}>
                                            <TextInput
                                                style={styles.inputStyle}
                                                underlineColorAndroid="#F6F6F7"
                                                placeholder="Phone Number"
                                                placeholderTextColor="#D2D2D3"
                                                keyboardType="number-pad"
                                                returnKeyType="next"
                                                onChangeText={(parent_no) => this.setState({ parent_no })}
                                                ref={ref => {
                                                    this._phoneNumberinput = ref;
                                                }}
                                                underlineColorAndroid='transparent'
                                                onSubmitEditing={Keyboard.dismiss}
                                                blurOnSubmit={false} />
                                        </View>
                                    </View>)}
                            <View style={{ flexDirection: 'row', marginTop: "8%", marginLeft: "10%", }}>

                                <TouchableOpacity style={styles.CheckedBox} onPress={this.CheckedDetails}>
                                    {this.state.isChecked == true ? <Image source={require('../../../Images/checked.png')} /> :
                                        <Image source={require('../../../Images/unchecked.png')} />}

                                </TouchableOpacity>
                                <Text style={styles.ticBox}>Tick box to confirm if you are not 16 or above</Text>
                            </View>
                            <TouchableOpacity style={styles.NextButton} onPress={this.NextScreen}>
                                <Text style={{ color: '#fff', fontFamily: 'Raleway-Bold', fontSize: 14 }}>Next</Text>

                            </TouchableOpacity>
                            <View style={styles.NextButton_2}>
                                <Toast ref="customToast" backgroundColor="#fff" textColor='black' />
                            </View>
                        </ScrollView>
                    </View>
                </View>
                <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
            </KeyboardAwareScrollView>
        )
    }


}

export default FanUserScreen