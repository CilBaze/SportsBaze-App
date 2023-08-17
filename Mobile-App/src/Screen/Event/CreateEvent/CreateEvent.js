import React from 'react'
import { View, Text, Image, Colors, Button, BackHandler, Alert, TextInput, Keyboard, Platform, PermissionsAndroid } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './createEvent_styles';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-picker';
import { requestPostApiMedia, create_events } from '../../../NetworkCall/Service';
import Toast from 'react-native-custom-toast';
import { getAsyncStorage } from '../../../Routes/AsynstorageClass';
import NetInfo from "@react-native-community/netinfo";
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import HeaderScreen from '../../header';
import Loader from '../../CustomComponent/Loader';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomAlert from '../../CustomAlert';
import { NavigationActions } from '@react-navigation/native';

let oneTimeSelected_date = ''
class CreateEvent extends React.Component {

    constructor() {
        super();
        this.state = {
            isSignUpModalVisible: false,
            setResponse: '',
            event_name: '',
            input_description: '',
            input_location: '',
            currentLongitude: '',
            currentLatitude: '',
            locationStatus: '',
            locationLat: '',
            locationLong: '',
            isDatePickerVisible: false,
            oneTimeSelected_date: '',
            postalCode: '',
            Alert_Visibility: false,
            alert_msg: ''
        }
    }

    componentDidMount() {
        this.CheckConnectivity();
        Geocoder.init("AIzaSyB4O2q844JvXcOpT0J6wreFNT0pP7qfZy4");
    }
    openAlert = () => {
        this.setState({ Alert_Visibility: false })
    }
    closeAlert = () => {
        this.setState({ Alert_Visibility: false })
    }
    requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
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
                    this.getOneTimeLocation();
                    this.subscribeLocationLocation();

                } else {
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    componentWillUnmount() {
    }

    getOneTimeLocation = () => {

        Geolocation.getCurrentPosition(
            (position) => {
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);
                this.setState({ currentLongitude: currentLongitude })
                this.setState({ currentLatitude: currentLatitude })

                Geocoder.from(currentLatitude, currentLongitude)
                    .then(json => {
                        var addressComponent = json.results[0].formatted_address;
                        console.log("addressComponent", addressComponent);
                        this.setState({ input_location: addressComponent })

                    })
                    .catch(error => console.warn(error));
                console.log("input_location=>", this.state.input_location)
            },
            (error) => {
                console.log("error", error.message)
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };

    subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
            (position) => {
                console.log(position);
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);
                this.setState({ currentLongitude: currentLongitude })

                this.setState({ currentLatitude: currentLatitude })
            },
            (error) => {
                console.log("error", error.message)
            },
            {
                enableHighAccuracy: false,
                maximumAge: 1000
            },
        );
    };
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
    UploadImg = () => {
        this.setState({ isSignUpModalVisible: !this.state.isSignUpModalVisible })
    }

    GotToUploadScreen = () => {
        this.props.navigation.navigate('UploadPost', {
            uploadUrl: this.state.setResponse,
            SportList: SportList_Data,

        })
        this.setState({ isSignUpModalVisible: !this.state.isSignUpModalVisible })
    }
    GoTobackScreen = () => {
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'EventScreen' })]
        }))
    }
    createEvent = async () => {
        if (this.state.event_name == "") {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please enter event name." })
            return;
        }
        if (this.state.input_location == "") {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please enter location." })
            return;
        }
        if (this.state.oneTimeSelected_date == "") {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please enter event date." })
            return;
        }
        if (this.state.input_description == "") {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Please enter description." })
            return;
        }

        this.setState({ loading: true });
        let token = await getAsyncStorage('tokenkey');
        console.log("token", this.state.sharePost_id)
        const formData = new FormData()
        formData.append('event_name', this.state.event_name);
        formData.append('event_description', this.state.input_description);
        formData.append('location', this.state.input_location);
        formData.append('latitude', this.state.locationLat);
        formData.append('longitude', this.state.locationLong);
        formData.append('event_date', this.state.oneTimeSelected_date),
            formData.append('postal_code', this.state.postalCode)
        console.log("form data==", formData)

        const { responseJson, err } = await requestPostApiMedia(create_events, formData, 'POST', token)
        this.setState({ loading: false });
        if (responseJson.status == true) {
            this.props.navigation.navigate('EventListScreen');
        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
        }

    }
    getLocation = () => {
    }
    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };
    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false })
    }

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
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>

                <HeaderScreen title='Events' navigation={this.props.navigation} />
                <ScrollView style={{}}>
                    <View style={styles.backgroundLogin}>
                        <TextInput
                            placeholder="Event Name"
                            style={styles.inputStyle}
                            underlineColorAndroid="#F6F6F7"
                            placeholderTextColor='#808084'
                            keyboardType='default'
                            returnKeyType="next"
                            onChangeText={(event_name) => this.setState({ event_name })}
                            underlineColorAndroid='transparent'
                            onSubmitEditing={() =>
                                this.input_location && this.input_location.focus()
                            }
                            blurOnSubmit={false} />
                 
                    </View>
                    <View style={styles.backgroundLogin_3}>
                        <GooglePlacesAutocomplete
                            minLength={2}
                            autoFocus={false}
                            returnKeyType={'search'}
                            listViewDisplayed='auto'
                            fetchDetails={true}
                            renderDescription={row => row.description}
                            onPress={(data, details = null) => {
                                console.log("::::::::::::::::::::kirti::::::", data, details)
                                this.setState({ locationLat: details.geometry.location.lat })
                                this.setState({ locationLong: details.geometry.location.lng })
                                this.setState({ input_location: data.description })

                                Geocoder.from(this.state.locationLat, this.state.locationLong)

                                    .then(json => {
                                        console.log("json=>", json);
                                        var addressComponent = json.results[0]
                                        console.log("addressComponent=>", addressComponent)
                                        const zipCode = addressComponent?.address_components.find((addressComponent) =>
                                            addressComponent.types.includes('postal_code'),

                                        )?.short_name;

                                        this.setState({ postalCode: zipCode })
                                        console.log(" zipCode=>", zipCode);

                                    })
                                    .catch(error =>
                                        console.warn(error)
                                    );
                            }}
                            getDefaultValue={() => 'search'}
                            query={{
                                // key: 'AIzaSyB4O2q844JvXcOpT0J6wreFNT0pP7qfZy4',
                                key:'AIzaSyCL0motlT4ghhUlb4DOj_uOPket7csPz4Q',
                                language: 'en',
                            }}
                            styles={{
                                textInputContainer: {
                                    width: '100%', borderRadius: 30,
                                    borderColor: '#000', borderWidth: 1, height: 45
                                },
                                description: {
                                    fontFamily: 'Raleway-Bold'
                                },
                                predefinedPlacesDescription: {
                                    color: '#fff',
                                },
                                textInput: {
                                    color: '#fff',
                                    borderRadius: 20,
                                    marginLeft: 5,
                                    marginTop: 5, backgroundColor: '#1D1C24',
                                    placeholderTextColor: '#fff',
                                    height: 35
                                },
                            }}
                            currentLocation={true}
                            currentLocationLabel="Current location"
                            nearbyPlacesAPI='GooglePlacesSearch'
                            GoogleReverseGeocodingQuery={{}}
                            GooglePlacesSearchQuery={{
                                rankby: 'distance',
                            }}

                            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                            renderRightButton={() => <Image style={styles.location} source={require('../../../Images/ic_location.png')} />}
                        />
                    </View>
                    <View style={styles.backgroundLogin_datePicker}  >
                        <TextInput editable={false}
                            placeholderTextColor="#808084"
                            placeholder="Event date"
                            style={{
                                alignSelf: 'center',
                                marginLeft: "5%",
                                color: '#fff',
                                fontSize: 14, fontFamily: 'Raleway-Regular', width: '80%'
                            }}
                            value={this.state.oneTimeSelected_date} ></TextInput>
                        <DateTimePickerModal
                            isVisible={this.state.isDatePickerVisible}
                            mode="date"
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDatePicker}
                            forment="dd-MM-y" />
                        <TouchableOpacity style={{ marginRight: 20 }} onPress={this.showDatePicker}>
                            <Image style={{ alignSelf: 'center', width: 18, height: 18, }} source={require('../../../Images/calender.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.backgroundLogin_2}>
                        <TextInput
                            style={styles.inputStyle2}
                            underlineColorAndroid="#F6F6F7"
                            placeholder="Description"
                            placeholderTextColor='#808084'
                            keyboardType='default'
                            returnKeyType="next"
                            onChangeText={(input_description) => this.setState({ input_description })}
                            underlineColorAndroid='transparent'
                            ref={ref => {
                                this.input_description = ref;
                            }}
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                            multiline={true} />
                    </View>


                    <View style={styles.NextButton_2}>
                        <Toast ref="customToast" backgroundColor="#fff" textColor='black' />
                    </View>
                    <View style={styles.createEventBoder}>
                        <TouchableOpacity style={styles.createtouch} onPress={() => this.createEvent()}>
                            <Text style={styles.text_5}>Publish</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Loader isLoader={this.state.loading}></Loader>
                <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
            </SafeAreaView>
        )
    }
}

export default CreateEvent;