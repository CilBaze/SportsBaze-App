import * as React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Keyboard } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './athlete_styles';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-community/async-storage';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import NetInfo from "@react-native-community/netinfo";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


let monthNames = ["Jan", "Feb", "March", "April", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];
let filePath = ''
let oneTimeSelected_date

let scoutClub_Fname = ''
let coutClub_Lname = ''
let coutClub_email = ''
let coutClub_password = ''
let parent_fname = ''
let parent_Lname = ''
let parent_email = ''
let parent_no = ''
let ImagePath = ""
let SportList_Data = []
class NextScoutClubScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            value: false,
            data: [
                { job_name: 'lawn maintenance', },
                { job_name: 'Tree and shrub planting', },
                { job_name: 'Claening', },
                { job_name: 'lawn maintenance', },
                { job_name: 'lawn maintenance', },
                { job_name: 'lawn maintenance', },
            ],
            isDatePickerVisible: false,
            oneTimeSelected_date: "",
            image_filePath: '',
            Sports_text: '',
            Gender: [
                { gender_name: 'Male' },
                { gender_name: 'Female' },
                { gender_name: 'Transgender Male' },
                { gender_name: 'Transgender Female' },
                { gender_name: 'Non-Binary' },
                { gender_name: 'Gender-fluid' },
                { gender_name: 'Prefer not to Say' },
            ],
            Gender_Name: '',
            captureImage: '',
            dob: '',
            address: '',
            city: '',
            country: '',
            zip_code: '',
            nationality: '',
            current_club: '',
            favourite_club: '',
            preferred_foot: '',
            height: '',
            contact_no: '',
            clubFname: '',
            coubLname: '',
            club_email: '',
            club_password: '',
            club_parent_fname: '',
            club_parent_Lname: '',
            club_parent_email: '',
            club_parent_no: '',
            clubImahgePath: '',
            Sports_id: '',
            profession:''

        }
    }


    _menu = null;
    _gender_menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    setGenderMenuRef = ref => {
        this._gender_menu = ref;
    }

    hideMenu = () => {
        this._menu.hide();
    };
    hideGenderMenu = () => {
        this._gender_menu.hide();
    };

    reviewAction = (job_name, sports_id) => {
        this.setState({ Sports_text: job_name })
        this.setState({ Sports_id: sports_id })
    }
    gender_Action = (gender_name) => {
        this.setState({ Gender_Name: gender_name })
    }

    showMenu = () => {
        this._menu.show();
        this.setState(this.state.data)
    };

    showGenderMenu = () => {
        this._gender_menu.show();
        this.setState(this.state.Gender)
    };

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };
    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false })
    }

    handleDatePicked = (date) => {
        oneTimeSelected_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        this.setState({ oneTimeSelected_date })
        this.hideDatePicker();
    };

    async componentDidMount() {

        this.CheckConnectivity();
        try {
            filePath = await AsyncStorage.getItem('ProfilePic');
            console.log('ScoutClub_image', filePath);
            this.setState({ image_filePath: filePath })
        } catch (error) {

            console.warn("error", error)

        }

        this.setState({ clubFname: scoutClub_Fname })
        this.setState({ clubLname: coutClub_Lname })
        this.setState({ club_email: coutClub_email })
        this.setState({ club_password: coutClub_password })
        this.setState({ club_parent_fname: parent_fname })
        this.setState({ club_parent_Lname: parent_Lname })
        this.setState({ club_parent_email: parent_email })
        this.setState({ club_parent_no: parent_no })
        this.setState({ clubImahgePath: ImagePath })


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
    GoToNextScreen = () => {
        this.props.navigation.navigate('PFClubScreen', {
            coutClub_Fname: this.state.clubFname,
            coutClub_Lname: this.state.clubLname,
            coutClub_email: this.state.club_email,
            coutClub_password: this.state.club_password,
            acoutClub_parent_fname: this.state.club_parent_fname,
            coutClub_parent_Lname: this.state.club_parent_Lname,
            coutClub_parent_email: this.state.club_parent_fname,
            coutClub_parent_no: this.state.club_parent_no,
            imageUrl: this.state.clubImahgePath,
            Dob: this.state.oneTimeSelected_date,
            Address: this.state.address,
            City: this.state.city,
            Country: this.state.country,
            ZipCode: this.state.zip_code,
            Nationality: this.state.nationality,
            ContactNo: this.state.contact_no,
            SportsId: this.state.Sports_id,
            GenderName: this.state.Gender_Name,
            SportList_Data: SportList_Data,
            profession:this.state.profession


        })
    }


    GoBack = () => {
        this.props.navigation.goBack()

    }
    render() {

        const { navigate } = this.props.navigation;

        scoutClub_Fname = this.props.route.params.athelte_Fname
        coutClub_Lname = this.props.route.params.athelte_Lname
        coutClub_email = this.props.route.params.athelte_email
        coutClub_password = this.props.route.params.athelte_password
        parent_fname = this.props.route.params.athelte_parent_fname
        parent_Lname = this.props.route.params.athelte_parent_Lname
        parent_email = this.props.route.params.athelte_parent_email
        parent_no = this.props.route.params.athelte_parent_no
        ImagePath = this.props.route.params.imageUrl
        SportList_Data = this.props.route.params.SportList

        console.log(":NextScreen:::::::::::::::", this.props.route.params)
        return (
            <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#000' }}>
                <View style={{ flex: 1, }}>
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>

                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <TouchableOpacity style={{right:80, marginTop: "11%", }} onPress={this.GoBack}>
                                <Image style={{ width: 20, height: 20 }} source={require('../../../Images/back.png')} />
                            </TouchableOpacity>

                            <Text style={styles.headerText2}>SCOUT FORM</Text>
                        </View>
                        <TouchableOpacity style={styles.imgBg}>
                            {this.state.image_filePath != null ? <Image
                                source={{ uri: this.state.image_filePath }} style={styles.img}
                            /> :
                                <Image style={styles.img} source={require('../../../Images/profile.png')} />
                            }
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', }}>
                            <View style={styles.navigation_dot_1}></View>
                            <View style={styles.navigation_line_2}></View>
                            <View style={styles.navigation_dot_1}></View>
                            <View style={styles.navigation_line_1}></View>
                            <View style={styles.navigation_dot_2}></View>

                        </View>
                    </View>

                    <View style={{ flex: 1.5, marginTop: "5%" }}>

                        <ScrollView>
                            <Text style={styles.account_details}>Personal & Professional Details</Text>

                            <View style={styles.backgroundLogin_4} onStartShouldSetResponder={this.showMenu}>
                                <Menu style={{ width: "83%", backgroundColor: '#1D1C24', marginTop: "1%" }}
                                    ref={this.setMenuRef}
                                    button={
                                        this.state.Sports_text != '' ?
                                            <Text style={{
                                                color: "#D2D2D3", marginLeft: "10%", alignSelf: 'center',
                                                justifyContent: 'center', fontSize: 14,fontFamily:'Raleway-Regular'
                                            }}>
                                                {this.state.Sports_text}</Text>

                                            : <Text style={{
                                                color: "#D2D2D3", marginLeft: "10%", alignSelf: 'center',
                                                justifyContent: 'center', fontSize: 14,fontFamily:'Raleway-Regular'
                                            }}>
                                                Your Sports</Text>
                                    }

                                >

                                    {SportList_Data.map((item, key) =>
                                        <MenuItem style={{ color: "#D2D2D3" }} onPress={() => { this.hideMenu(); this.reviewAction(item.sports_name, item.sports_id); }}>
                                            <Text style={{ color: "#D2D2D3", marginLeft: "8%",fontFamily:'Raleway-Regular',fontSize:14 }}>  {item.sports_name}</Text>
                                        </MenuItem>
                                    )}

                                    <Image style={styles.Sports} source={require('../../../Images/arrow_sports.png')}></Image>
                                </Menu>
                                <Image style={styles.Sports} source={require('../../../Images/collapse_arrow.png')}></Image>
                            </View>

                            <View style={styles.backgroundLogin_2}>
                                <TextInput
                                    style={styles.inputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Profession"
                                    placeholderTextColor="#D2D2D3"
                                    keyboardType='default'
                                    returnKeyType="next"
                                    underlineColorAndroid='transparent'
                                    onChangeText={(profession) => this.setState({ profession })}
                                    blurOnSubmit={false} />
                            </View>
                            <View style={styles.backgroundLogin_2}  >
                                <TextInput editable={false}
                                 placeholderTextColor="#D2D2D3" 
                                 placeholder="Select date of birth" 
                                 style={{ 
                                    alignSelf: 'center',
                                    marginLeft: "6%",
                                    color: '#fff',width:'45%',
                                    fontSize: 14, fontFamily:'Raleway-Regular' }} 
                                 value={this.state.oneTimeSelected_date} ></TextInput>
                                <DateTimePickerModal
                                    isVisible={this.state.isDatePickerVisible}
                                    mode="date"
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDatePicker}
                                    forment="dd-MM-y" />

                                <TouchableOpacity style={{ marginLeft: "40%", }} onPress={this.showDatePicker}>
                                    <Image style={{ alignSelf: 'center', width: 18, height: 18, }} source={require('../../../Images/calender.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.backgroundLogin_2} onStartShouldSetResponder={this.showGenderMenu}>
                                <Menu
                                    style={{ width: "83%", backgroundColor: '#1D1C24', marginTop: "1%" }}
                                    ref={this.setGenderMenuRef}
                                    button={

                                        this.state.Gender_Name != '' ?
                                            <Text style={{
                                                color: "#D2D2D3", marginLeft: "8%", alignSelf: 'center',
                                                justifyContent: 'center', fontSize: 14, marginBottom: 5,fontFamily:'Raleway-Regular'
                                            }}>{this.state.Gender_Name}</Text>
                                            :
                                            <Text style={{
                                                color: "#D2D2D3", marginLeft: "10%", alignSelf: 'center',
                                                justifyContent: 'center', fontSize: 14, marginBottom: 5,fontFamily:'Raleway-Regular'
                                            }}>Gender</Text>

                                    }>

                                    {this.state.Gender.map((item, key) =>
                                        <MenuItem onPress={() => {
                                            this.hideGenderMenu();
                                            this.gender_Action(item.gender_name);
                                        }}>
                                            <Text style={{ color: "#D2D2D3", marginLeft: "8%",fontFamily:'Raleway-Regular',fontSize:14 }}>{item.gender_name}</Text></MenuItem>
                                    )}
                                    <Image style={styles.Sports} source={require('../../../Images/arrow_sports.png')}></Image>
                                </Menu>
                                <Image style={styles.Sports} source={require('../../../Images/collapse_arrow.png')}></Image>
                            </View>
                            <View style={styles.backgroundLogin_2}>
                                <TextInput
                                    style={styles.inputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Address"
                                    placeholderTextColor="#D2D2D3"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    onChangeText={(address) => this.setState({ address })}
                                    underlineColorAndroid='transparent'
                                    onSubmitEditing={() =>
                                        this._cityinput && this._cityinput.focus()
                                    }
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={styles.backgroundLogin_2}>
                                <TextInput
                                    style={styles.inputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="City"
                                    placeholderTextColor="#D2D2D3"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    onChangeText={(city) => this.setState({ city })}
                                    underlineColorAndroid='transparent'
                                    ref={ref => {
                                        this._cityinput = ref;
                                    }}
                                    onSubmitEditing={() =>
                                        this._postcodeinput && this._postcodeinput.focus()
                                    }
                                    blurOnSubmit={false} />
                            </View>
                            <View style={styles.backgroundLogin_2}>
                                <TextInput
                                    style={styles.inputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Post Code / Zip Code"
                                    placeholderTextColor="#D2D2D3"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    onChangeText={(zip_code) => this.setState({ zip_code })}
                                    underlineColorAndroid='transparent'
                                    ref={ref => {
                                        this._postcodeinput = ref;
                                    }}
                                    onSubmitEditing={() =>
                                        this._countryinput && this._countryinput.focus()
                                    }
                                    blurOnSubmit={false} />
                            </View>
                            <View style={styles.backgroundLogin_2}>
                                <TextInput
                                    style={styles.inputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Country"
                                    placeholderTextColor="#D2D2D3"
                                    keyboardType='default'
                                    returnKeyType="next"
                                    onChangeText={(country) => this.setState({ country })}
                                    underlineColorAndroid='transparent'
                                    ref={ref => {
                                        this._countryinput = ref;
                                    }}
                                    onSubmitEditing={() =>
                                        this._nationalityinput && this._nationalityinput.focus()
                                    }
                                    blurOnSubmit={false} />
                            </View>
                            <View style={styles.backgroundLogin_2}>
                                <TextInput
                                    style={styles.inputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Nationality"
                                    placeholderTextColor="#D2D2D3"
                                    keyboardType='default'
                                    returnKeyType="next"
                                    onChangeText={(nationality) => this.setState({ nationality })}
                                    ref={ref => {
                                        this._nationalityinput = ref;
                                    }}
                                    underlineColorAndroid='transparent'
                                    onSubmitEditing={() =>
                                        this._phoneNoinput && this._phoneNoinput.focus()}
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
                                    onChangeText={(contact_no) => this.setState({ contact_no })}
                                    underlineColorAndroid='transparent'
                                    ref={ref => {
                                        this._phoneNoinput = ref;
                                    }}
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false} />
                            </View>

                            <View style={styles.NextButton} onStartShouldSetResponder={this.GoToNextScreen}>
                                <Text style={{color:"#fff",fontSize:14,fontFamily:'Raleway-Bold'}}>Next</Text>

                            </View>

                        </ScrollView>
                    </View>


                </View>
            </KeyboardAwareScrollView>
        )
    }


}

export default NextScoutClubScreen