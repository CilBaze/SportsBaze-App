import * as React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Keyboard, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './athlete_styles';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-community/async-storage';
import { requestPostApiMedia, register } from '../../../NetworkCall/Service'
import AppLoader, { loaderRef } from '../../AppLoader';
import { showLoader, hideLoader } from '../../AppLoader';
import Toast from 'react-native-custom-toast';
import { setAsyncStorage } from '../../../Routes/AsynstorageClass'
import NetInfo from "@react-native-community/netinfo";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


let monthNames = ["Jan", "Feb", "March", "April", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];
let filePath = ''
let athelte_Fname = ''
let athelte_Lname = ''
let athelte_email = ''
let athelte_password = ''
let parent_fname = ''
let parent_Lname = ''
let parent_email = ''
let parent_no = ''
let ImagePath = ""
let Sports_name_arr
let oneTimeSelected_date
let SportList_Data = []
let PersonHeight = []
class NextAthlteScreen extends React.Component {
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
            Foot: [
                { foot_prefer: 'Left' },
                { foot_prefer: 'Right' },
                { foot_prefer: 'Both' },
            ],
            PersonHeight_1To_5: [
                { person_height: '1 feet' },
                { person_height: '2 feet' },
                { person_height: '3 feet' },
                { person_height: '4 feet' },
                { person_height: '5 feet' },
                { person_height: '6 feet' },
                { person_height: '7 feet' },
                { person_height: '8 feet' },
                { person_height: '9 feet' },
                { person_height: '10 feet' },
            ],

            foot_text: '',
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
            sports_id: '',
            height_text: '',
            height_text_2: '',
            PersonHeight_1To_100: [],
            SportList: ''



        }
    }

    _menu = null;
    _gender_menu = null;
    _foot_menu = null;
    _height_menu = null;
    _1To_5_height_menu = null;
    setMenuRef = ref => {
        this._menu = ref;
    };

    setGenderMenuRef = ref => {
        this._gender_menu = ref;
    }
    setFootMenuRef = ref => {
        this._foot_menu = ref;
    }
    hideMenu = () => {
        this._menu.hide();
    };
    hideGenderMenu = () => {
        this._gender_menu.hide();
    };
    hideFootMenu = () => {
        this._foot_menu.hide();
    };

    reviewAction = (sports_name, sportsId) => {
        this.setState({ Sports_text: sports_name })
        this.setState({ sports_id: sportsId })
    }
    gender_Action = (gender_name) => {
        this.setState({ Gender_Name: gender_name })
    }
    foot_Action = (foot_prefer) => {
        this.setState({ foot_text: foot_prefer })
    }

    showMenu = () => {
        this._menu.show();
        this.setState({ SportList: SportList_Data })
    };

    showGenderMenu = () => {
        this._gender_menu.show();
        this.setState(this.state.Gender)
    };
    showFootMenu = () => {
        this._foot_menu.show();
        this.setState(this.state.Foot)
    };

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };
    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false })
    }

    handleDatePicked = (date) => {
        oneTimeSelected_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

        console.log("oneTimeSelected_date",oneTimeSelected_date)
        this.setState({ oneTimeSelected_date })
        this.hideDatePicker();
    };


    showHight = () => {
        this._height_menu.show();
        this.setState(this.state.PersonHeight_1To_100)
    }
    height_Action = (person_h2) => {
        this.setState({ height_text: person_h2 })
    }
    hideheightMenu = () => {
        this._height_menu.hide();
    };

    setheightMenuRef = ref => {
        this._height_menu = ref;
    }



    showHight_1To_5 = () => {
        this._1To_5_height_menu.show();
    }
    height_1To_5_Action = (person_h) => {
        this.setState({ height_text_2: person_h })
    }
    hide_1To_5_heightMenu = () => {
        this._1To_5_height_menu.hide();
    };

    setheight_1To_5MenuRef = ref => {
        this._1To_5_height_menu = ref;
    }


    async componentDidMount() {
        this.CheckConnectivity();
        try {
            filePath = await AsyncStorage.getItem('ProfilePic');
            Sports_name_arr = await AsyncStorage.getItem('sports_list');
            if (filePath != null) {
                this.setState({ image_filePath: filePath })
            } else {
                this.setState({ image_filePath: ImagePath })
            }

        } catch (error) { }

        for (let i = .0; i < 12; i++) {
            PersonHeight.push(i+" inch")
        }
        this.setState({ PersonHeight_1To_100: PersonHeight })

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

    SubmitData = async () => {
        let personHeight = this.state.height_text_2 + this.state.height_text
        this.props.navigation.navigate('AthleteTermCondition', {
            athelte_Fname: athelte_Fname,
            athelte_Lname: athelte_Lname,
            athelte_email: athelte_email,
            athelte_password: athelte_password,
            athelte_parent_fname: parent_fname,
            athelte_parent_Lname: parent_Lname,
            athelte_parent_email: parent_email,
            athelte_parent_no: parent_no,
            imageUrl: ImagePath,
            SportList: SportList_Data,
            sports_id: this.state.sports_id,
            oneTimeSelected_date: this.state.oneTimeSelected_date,
            Gender_Name: this.state.Gender_Name,
            address: this.state.address,
            city: this.state.city,
            country: this.state.country,
            zip_code: this.state.zip_code,
            nationality: this.state.nationality,
            current_club: this.state.current_club,
            favourite_club: this.state.favourite_club,
            preferred_foot: this.state.foot_text,
            personHeight: personHeight,
            contact_no: this.state.contact_no,
        })
    }

    GoBack = () => {
        this.props.navigation.goBack()
    }
    render() {
        const { navigate } = this.props.navigation;
        athelte_Fname = this.props.route.params.athelte_Fname
        athelte_Lname = this.props.route.params.athelte_Lname
        athelte_email = this.props.route.params.athelte_email
        athelte_password = this.props.route.params.athelte_password
        parent_fname = this.props.route.params.athelte_parent_fname
        parent_Lname = this.props.route.params.athelte_parent_Lname
        parent_email = this.props.route.params.athelte_parent_email
        parent_no = this.props.route.params.athelte_parent_no
        ImagePath = this.props.route.params.imageUrl
        SportList_Data = this.props.route.params.SportList
        return (
            <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#000' }}>

                <View>
                    <AppLoader ref={loaderRef} />

                </View>
                <View style={{ flex: 1, }}>
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ marginRight: "10%", marginTop: "11%", }} onPress={this.GoBack}>
                                <Image style={{ width: 20, height: 20 }} source={require('../../../Images/back.png')} />
                            </TouchableOpacity>
                            <Text style={styles.headerText}>ATHLETE REG. FORM</Text>
                        </View>

                        <TouchableOpacity style={styles.imgBg}>
                            {this.state.image_filePath != "" || this.state.image_filePath == null ? <Image
                                source={{ uri: this.state.image_filePath }} style={styles.img}
                            /> :
                                <Image style={styles.img} source={require('../../../Images/profile.png')} />
                            }
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={styles.navigation_dot_1}></View>
                            <View style={styles.navigation_line_2}></View>
                            <View style={styles.navigation_dot_1}></View>
                        </View>
                    </View>

                    <View style={{ flex: 1.5, marginTop: "5%" }}>
                        <ScrollView>
                            <Text style={styles.account_details}>Personal & Professional Details</Text>
                            <View style={styles.backgroundLogin_3} onStartShouldSetResponder={this.showMenu}>
                                <Menu style={{ width: "83%", backgroundColor: '#1D1C24', marginTop: "1%" }}
                                    ref={this.setMenuRef}
                                    button={

                                        this.state.Sports_text != '' ?
                                            <Text style={{
                                                color: "#D2D2D3", marginLeft: "8%", alignSelf: 'center',
                                                justifyContent: 'center', fontSize: 14, fontFamily:'Raleway-Regular'
                                            }}>
                                                {this.state.Sports_text}</Text>

                                            : <Text style={{
                                                color: "#D2D2D3", marginLeft: "8%", alignSelf: 'center',
                                                justifyContent: 'center', fontSize: 14, fontFamily:'Raleway-Regular'
                                            }}>
                                                Your Sports</Text>
                                    }


                                >


                                    {SportList_Data.map((item, key) =>
                                        <MenuItem style={{ color: "#D2D2D3" }} onPress={() => {
                                            this.hideMenu();
                                            this.reviewAction(item.sports_name, item.sports_id);
                                        }}>
                                            <Text style={{ color: "#D2D2D3", marginLeft: "8%" , fontFamily:'Raleway-Regular',fontSize:14}}>  {item.sports_name}</Text>
                                        </MenuItem>
                                    )}

                                    <Image style={styles.Sports} source={require('../../../Images/collapse_arrow.png')}></Image>
                                </Menu>
                                <Image style={styles.Sports} source={require('../../../Images/arrow_sports.png')}></Image>
                            </View>
                            <View style={styles.backgroundLogin_2}  >
                                <TextInput editable={false}
                                    placeholderTextColor="#D2D2D3"
                                    placeholder="Select date of birth"
                                    style={{
                                        alignSelf: 'center',
                                        marginLeft: "6%",
                                        color: '#fff',width:'45%',
                                        fontSize: 14, fontFamily:'Raleway-Regular'
                                    }}
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
                            <View style={styles.backgroundLogin_3} onStartShouldSetResponder={this.showGenderMenu}>
                                <Menu
                                    style={{ width: "83%", backgroundColor: '#1D1C24', marginTop: "1%" }}
                                    ref={this.setGenderMenuRef}
                                    button={

                                        this.state.Gender_Name != '' ?
                                            <Text style={{
                                                color: "#D2D2D3", marginLeft: "8%", alignSelf: 'center',
                                                justifyContent: 'center', fontSize: 14, marginBottom: 5, fontFamily:'Raleway-Regular'
                                            }}>{this.state.Gender_Name}</Text>
                                            :
                                            <Text style={{
                                                color: "#D2D2D3", marginLeft: "8%", alignSelf: 'center',
                                                justifyContent: 'center', fontSize: 14, marginBottom: 5, fontFamily:'Raleway-Regular'
                                            }}>Gender</Text>

                                    }>
                                    {this.state.Gender.map((item, key) =>
                                        <MenuItem onPress={() => {
                                            this.hideGenderMenu();
                                            this.gender_Action(item.gender_name);
                                        }}>
                                            <Text style={{ color: "#D2D2D3", marginLeft: "8%",fontSize:14, fontFamily:'Raleway-Regular' }}>{item.gender_name}</Text></MenuItem>
                                    )}
                                    <Image style={styles.Sports} source={require('../../../Images/collapse_arrow.png')}></Image>
                                </Menu>
                               
                                <Image style={styles.Sports} source={require('../../../Images/arrow_sports.png')}></Image>
                            </View>
                            <View style={styles.backgroundLogin_3}>
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
                            <View style={styles.backgroundLogin_3}>
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
                                    keyboardType='number-pad'
                                    returnKeyType="next"
                                    onChangeText={(contact_no) => this.setState({ contact_no })}
                                    underlineColorAndroid='transparent'
                                    ref={ref => {
                                        this._phoneNoinput = ref;
                                    }}
                                    onSubmitEditing={() =>
                                        this._countryClubinput && this._countryClubinput.focus()
                                    }
                                    blurOnSubmit={false} />
                            </View>

                            <View style={styles.backgroundLogin_2}>
                                <TextInput
                                    style={styles.inputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Your Current Club"
                                    placeholderTextColor="#D2D2D3"
                                    keyboardType='default'
                                    returnKeyType="next"
                                    onChangeText={(current_club) => this.setState({ current_club })}
                                    underlineColorAndroid='transparent'
                                    ref={ref => {
                                        this._countryClubinput = ref;
                                    }}
                                    onSubmitEditing={() =>
                                        this._fevClubinput && this._fevClubinput.focus()
                                    }
                                    blurOnSubmit={false} />
                            </View>
                            <View style={styles.backgroundLogin_2}>
                                <TextInput
                                    style={styles.inputStyle}
                                    underlineColorAndroid="#F6F6F7"
                                    placeholder="Favourite Club"
                                    placeholderTextColor="#D2D2D3"
                                    keyboardType='default'
                                    returnKeyType="next"
                                    onChangeText={(favourite_club) => this.setState({ favourite_club })}
                                    underlineColorAndroid='transparent'
                                    ref={ref => {
                                        this._fevClubinput = ref;
                                    }}
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false} />
                            </View>
                            <View style={styles.backgroundLogin_3} onStartShouldSetResponder={this.showFootMenu}>
                                <Menu
                                    style={{ width: "83%", backgroundColor: '#1D1C24', marginTop: "1%" }}
                                    ref={this.setFootMenuRef}
                                    button={
                                        this.state.foot_text != '' ?
                                            <Text style={{
                                                color: "#D2D2D3", marginLeft: "9%", alignSelf: 'center',
                                                justifyContent: 'center', fontSize: 14, marginBottom: 5, fontFamily:'Raleway-Regular'
                                            }}>{this.state.foot_text}</Text>
                                            : <Text style={{
                                                color: "#D2D2D3", marginLeft: "9%", alignSelf: 'center',
                                                justifyContent: 'center', fontSize: 14, marginBottom: 5, fontFamily:'Raleway-Regular'
                                            }}>Preferred Foot</Text>
                                    }>
                                    {this.state.Foot.map((item, key) =>
                                        <MenuItem onPress={() => {
                                            this.hideFootMenu();
                                            this.foot_Action(item.foot_prefer);
                                        }}>
                                            <Text style={{ color: "#D2D2D3", marginLeft: "8%" , fontFamily:'Raleway-Regular',fontSize:14}}>{item.foot_prefer}</Text></MenuItem>
                                    )}

                                    <Image style={styles.Sports} source={require('../../../Images/collapse_arrow.png')}></Image>
                                </Menu>
                                <Image style={styles.Sports} source={require('../../../Images/arrow_sports.png')}></Image>

                            </View>

                            <View style={styles.backgroundLogin_3}>

                                <Menu
                                    style={{ width: "53%", height: "30%", marginBottom: "10%", backgroundColor: '#1D1C24', }}
                                    ref={this.setheight_1To_5MenuRef}
                                    button={
                                        this.state.height_text_2 != '' ?
                                            <Text style={{
                                                color: "#D2D2D3", marginLeft: 30,
                                                fontSize: 14, marginBottom: 5,fontFamily:'Raleway-Regular'
                                            }}>{this.state.height_text_2}</Text>
                                            :
                                            <Text style={{
                                                color: "#D2D2D3", marginLeft: 30,
                                                fontSize: 14, marginBottom: 5,fontFamily:'Raleway-Regular'
                                            }}>Height</Text>
                                    }>

                                    <ScrollView>
                                        {this.state.PersonHeight_1To_5.map((item, key) =>
                                            <MenuItem onPress={() => {
                                                this.hide_1To_5_heightMenu();
                                                this.height_1To_5_Action(item.person_height);
                                            }}>
                                                <Text style={{ color: "#D2D2D3", marginLeft: "8%" ,fontFamily:'Raleway-Regular',fontSize:14}}>{item.person_height}</Text></MenuItem>
                                        )}

                                    </ScrollView>
                                    <Image style={styles.Sports} source={require('../../../Images/collapse_arrow.png')}></Image>

                                </Menu>

                                <TouchableOpacity style={styles.Sports_2} onPress={this.showHight_1To_5}>
                                    <Image source={require('../../../Images/arrow_sports.png')}></Image>
                                </TouchableOpacity>

                                <Menu
                                    style={{ width: "53%", height: "30%", backgroundColor: '#1D1C24', }}
                                    ref={this.setheightMenuRef}
                                    button={

                                        this.state.height_text != '' ?
                                            <Text style={{
                                                color: "#D2D2D3", marginLeft: 2,
                                                fontSize: 14, marginBottom: 5,fontFamily:'Raleway-Regular'
                                            }}>{this.state.height_text}</Text>
                                            :
                                            <Text style={{
                                                color: "#D2D2D3", marginLeft: 5,
                                                fontSize: 14, marginBottom: 5,fontFamily:'Raleway-Regular'
                                            }}></Text>
                                    }>

                                    <ScrollView>
                                        {PersonHeight.map((item, key) =>
                                            <MenuItem onPress={() => {
                                                this.hideheightMenu();
                                                this.height_Action(item);
                                            }}>
                                                <Text style={{ color: "#D2D2D3", marginLeft: "10%" ,fontFamily:'Raleway-Regular',fontSize:14}}>{item}</Text></MenuItem>
                                        )}

                                    </ScrollView>
                                    <Image style={styles.Sports} source={require('../../../Images/collapse_arrow.png')}></Image>

                                </Menu>
                                <TouchableOpacity style={styles.Sports} onPress={this.showHight}>
                                    <Image source={require('../../../Images/arrow_sports.png')}></Image>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.SubmitButton} onStartShouldSetResponder={this.SubmitData}>
                                <Text style={{color:'#fff',fontFamily:'Raleway-Regular',fontSize:14}}>Next</Text>

                            </View>
                            <View style={styles.NextButton_2}>
                                <Toast ref="customToast" backgroundColor="#fff" textColor='black' />
                            </View>

                        </ScrollView>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }


}

export default NextAthlteScreen