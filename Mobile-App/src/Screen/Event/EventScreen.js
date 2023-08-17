import React from 'react'
import { View, Text, Image, TextInput, Button, PermissionsAndroid, Alert, Platform, Linking, Keyboard, useRef } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './event_styles';
import { requestGetApi, get_event_list_2, defaultdistance } from '../../NetworkCall/Service';
import { getAsyncStorage } from '../../Routes/AsynstorageClass';
import Toast from 'react-native-custom-toast';
import NetInfo from "@react-native-community/netinfo";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import HeaderScreen from '../header'
import Loader from '../CustomComponent/Loader';
import Geocoder from 'react-native-geocoding';
import WhiteHeaderScreen from '../WhiteHeader';
import CustomAlert from '../CustomAlert';
import { asin } from 'react-native-reanimated';
import Geolocation from '@react-native-community/geolocation';

let eventList = []
_menu = null;
let unsubscribe
let distance = ''

class EventScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            EventData_list: [],
            text: '',
            input_location: '',
            locationLat: '',
            locationLong: '',
            distanceList: [],
            PageNo: 1,
            loading: false,
            isSelectedCategory: false,
            postalCode: '',
            theamColor: '',
            newlocationLat: '',
            newlocationLong: '',
            Alert_Visibility: false,
            alert_msg: '',
            islocation: false,
            ischangeView: false,
            destination: "",
        }
    }
    async componentDidMount() {
        this.CheckConnectivity();
        this.setState({ PageNo: 1 })
        eventList = []
        this.setState({ loading: true });
        this.requestLocationPermission();
        await this.setState({ text: '', newlocationLat: '', newlocationLat: '', EventData_list: [], distanceList: [], input_location: '', input_location: "", })
        this.geteventList(distance);
        let theamColor = await getAsyncStorage('theamColor')
        this.setState({ theamColor: theamColor });

        unsubscribe = this.props.navigation.addListener('focus', async () => {
            this.requestLocationPermission();
            console.log("asgdusgdugdf")
            this.textInput.clear()
            await this.setState({ text: '', newlocationLat: '', newlocationLat: '', EventData_list: [], distanceList: [], input_location: '', islocation: false, ischangeView: false, })

            console.log("this.state.text:::", this.state.text)
            this.geteventList(distance);
        });
        Geocoder.init("AIzaSyB4O2q844JvXcOpT0J6wreFNT0pP7qfZy4");

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
    subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
            (position) => {
                console.log(position);
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);
                this.setState({ newlocationLong: currentLongitude })

                this.setState({ newlocationLat: currentLatitude })
            },
            (error) => {
                console.log("error,,,,,,", error.message)
            },
            {
                enableHighAccuracy: false,
                maximumAge: 1000
            },
        );
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

                if (this.state.newlocationLat != '' && this.state.newlocationLong != '') {
                    this.getDistanceList();
                }
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

    getcurrentLocation = () => {
        Geocoder.from(this.state.newlocationLat, this.state.newlocationLong)

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
    }



    openAlert = () => {
        this.setState({ Alert_Visibility: false })
    }
    closeAlert = () => {
        this.setState({ Alert_Visibility: false })
    }
    CheckConnectivity = () => {

        NetInfo.fetch().then(state => {
            if (state.isConnected == true) {
            } else {
                this.setState({ Alert_Visibility: true })
                this.setState({ alert_msg: "Internet is not connected." })
            }
        });

        NetInfo.addEventListener(state => {
            if (state.isConnected == true) {
            } else {
                this.setState({ Alert_Visibility: true })
                this.setState({ alert_msg: "Internet is not connected." })
            }
        });
    }
    addressLink = (lat, long) => {
        const daddr = `${lat},${long}`;
        const company = Platform.OS === "ios" ? "apple" : "google";
        Linking.openURL(`http://maps.${company}.com/maps?daddr=${daddr}`);
    }
    GoTobackScreen = () => {
        this.props.navigation.goBack()
    }
    geteventList = async (distance) => {
     
        const body = {
            'per_page': 20,
            'page_no': this.state.PageNo,
            'keywords': this.state.text,
            'latitude': this.state.newlocationLat,
            'longitude': this.state.newlocationLong,
            'distance': distance
        }
        let token_value = await getAsyncStorage('tokenkey');
        console.log("token::::::", token_value);
        const { responseJson, err } = await requestGetApi(get_event_list_2, body, 'GET', token_value)
        console.log("event data", responseJson)
        this.setState({ loading: false });
        if (responseJson.status == true) {
            eventList = responseJson.data.records;
            if (this.state.PageNo == 1) {
                this.setState({ EventData_list: eventList })
            } else {
                this.setState({ EventData_list: this.state.EventData_list.concat(eventList) })
            }
        } else {
        }
    }
    getDistanceList = async () => {
        const body = {
        }
        const { responseJson, err } = await requestGetApi(defaultdistance, body, 'GET');
        this.setState({ loading: false });
        let milesDistance = [];
        responseJson.data.forEach((el, i, arr) => {
            let tempObj = {}
            tempObj.isSelected = false,
                tempObj.val = el
            milesDistance.push(tempObj);
        });
        this.setState({ distanceList: milesDistance });
        console.log("distance::", milesDistance)
    }
    createEvent() {
        this.props.navigation.navigate('CreateEvent')
    }
    searchData(text) {
        console.log("text=======", text)
        this.setState({ EventData_list: [], newlocationLat: '', newlocationLat: '', distanceList: [] })
        this.setState({ PageNo: 1 })
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(() => {
            this.setState({ text: text });
            eventList = []
            this.geteventList(distance);
        }, 1000);


    }
    onDistancefilter(item, index) {
        let arr = [...this.state.distanceList];
        arr.forEach((el, i, arr) => {
            if (i == index) {
                el.isSelected = true;
            } else {
                el.isSelected = false;
            }
        });
        this.setState({
            distanceList: arr
        })
        this.geteventList(item);
    }
    footerList = () => {
        if (eventList.length > 20) {
            return (
                <View>
                    <Loader isLoader={this.state.loading}></Loader>
                </View>
            )
        } else {
            return null;
        }

    }
    handleLoadMore = async () => {
        if (eventList.length > 10) {
            await this.setState({ PageNo: this.state.PageNo + 1 })
            this.geteventList(distance);
        }

    }
    registerScreen(event_id) {
        this.props.navigation.navigate("RegisterScreen", {
            event_id: event_id
        })
    }
    searchByLocation = async () => {
        console.log("bjisgsjg::::::::::")
        eventList = []
        await this.setState({ text: '', EventData_list: [], newlocationLat: '', newlocationLat: '', distanceList: [] })
        this.setState({ PageNo: 1 })
        distance = ''
        this.geteventList(distance);
        this.setState({ islocation: !this.state.islocation });
    }
    OnChangeLocation = () => {
        this.setState({ ischangeView: true })
    }

    render() {


        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>

                {this.state.theamColor == "BLACK" ?
                    <View style={styles.Header_Bg}>
                        <TouchableOpacity onPress={this.GoTobackScreen} style={{ marginLeft: 30, }}>
                            <Image style={{ width: 20, height: 20, }} source={require('../../Images/back.png')} ></Image>
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Sports Event</Text>
                        {this.state.ischangeView == false ?
                            <TouchableOpacity style={styles.backgroundLogin_4} onPress={this.OnChangeLocation}>
                                <Text style={styles.inputStyle2} numberOfLines={1}>{this.state.input_location}</Text>
                                <Image style={styles.location} source={require('../../Images/ic_location.png')} />
                            </TouchableOpacity>
                            :
                            <View style={styles.backgroundLogin_black}>
                                <GooglePlacesAutocomplete
                                    placeholder='Search events by location'
                                    styles={{ color: "#fff", fontFamily: 'Raleway-Regular' }}
                                    minLength={2}
                                    ref={c => this.googlePlacesAutocomplete = c}
                                    textInputProps={{
                                        clearButtonMode: 'never',
                                        ref: input => {
                                            this.textInput = input;
                                        },
                                        placeholderTextColor: "white"
                                    }}
                                    showSoftInputOnFocus={false}
                                    returnKeyType={'search'}
                                    listViewDisplayed='auto'
                                    fetchDetails={true}
                                    renderDescription={row => row.description}
                                    onPress={(data, details = null) => {
                                        this.setState({ ischangeView: true })
                                        console.log("data=>", data, details)
                                        console.log("details=>", details)
                                        this.setState({ locationLat: details.geometry.location.lat })
                                        this.setState({ locationLong: details.geometry.location.lng })
                                        this.setState({ input_location: data.description });
                                        this.setState({ newlocationLat: details.geometry.location.lat })
                                        this.setState({ newlocationLong: details.geometry.location.lng })
                                        this.setState({ text: '' })
                                        this.setState({ PageNo: 1 })
                                        this.geteventList(distance);

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
                                    getDefaultValue={() => {
                                        return 'fgf'
                                    }}
                                    query={{
                                        key: 'AIzaSyB4O2q844JvXcOpT0J6wreFNT0pP7qfZy4',
                                        language: 'en',
                                    }}
                                    styles={{
                                        textInputContainer: {
                                            width: '100%', borderRadius: 20,
                                            borderColor: '#000', color: '#000', height: 25,
                                        },
                                        predefinedPlacesDescription: {
                                            color: '#000', fontFamily: 'Raleway-Bold', backgroundColor: '#000'
                                        },
                                        listView: {
                                            top: 28,
                                            position: 'absolute',
                                            color: 'black',
                                            backgroundColor: "#000",
                                            width: '250%',
                                            right: '1%',

                                        },
                                        description: {
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            fontSize: 14,
                                            maxWidth: '99%',
                                            fontFamily: 'Raleway-Regular', backgroundColor: '#000', color: '#fff'
                                        },
                                        textInput: {
                                            color: '#fff',
                                            borderRadius: 20,
                                            marginLeft: 1,
                                            backgroundColor: '#000',
                                            height: 25,
                                            fontSize: 10,
                                            alignSelf: 'center', fontFamily: 'Raleway-Regular', marginTop: 5,
                                        },
                                        poweredContainer: {
                                            justifyContent: 'flex-end',
                                            alignItems: 'center',
                                            borderBottomRightRadius: 5,
                                            borderBottomLeftRadius: 5,
                                            borderColor: '#c8c7cc',
                                            borderTopWidth: 0.5,
                                            backgroundColor: "#000"
                                        },
                                        row: {
                                            backgroundColor: '#000',
                                            padding: 13,
                                            height: 44,
                                            flexDirection: 'row',
                                        },
                                        separator: {
                                            height: 0.5,
                                            backgroundColor: '#c8c7cc',
                                        },


                                    }}

                                    currentLocation={true} currentLocationLabel="Current location"
                                    nearbyPlacesAPI='GooglePlacesSearch'
                                    GoogleReverseGeocodingQuery={{}}
                                    GooglePlacesSearchQuery={{
                                        rankby: 'distance',
                                    }}
                                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                                    renderLeftButton={() => <Image style={{ width: 10, height: 10, marginLeft: 10, alignSelf: 'center' }} source={require('../../Images/selected_ic_search.png')} />}
                                    renderRightButton={() => <Image style={styles.location2} source={require('../../Images/ic_location.png')} />}
                                />
                            </View>
                        }
                    </View> :
                    <View style={styles.Header_Bg2}>
                        <TouchableOpacity onPress={this.GoTobackScreen} style={{ marginLeft: 30, }}>
                            <Image style={{ width: 20, height: 20, }} source={require('../../Images/back_black.png')} ></Image>
                        </TouchableOpacity>
                        <Text style={styles.headerText2}>Sports Event</Text>
                        {this.state.ischangeView == false ?
                            <TouchableOpacity style={styles.backgroundLogin_4_white} onPress={this.OnChangeLocation}>
                                <Text style={styles.inputStyle} numberOfLines={1}>{this.state.input_location}</Text>
                                <Image style={styles.location} source={require('../../Images/noun_Location_1278600.png')} />
                            </TouchableOpacity>
                            :
                            <View style={styles.backgroundLogin_white}>
                                <GooglePlacesAutocomplete
                                    placeholder='Search events by location'
                                    styles={{ color: "#958985", fontFamily: 'Raleway-Regular' }}
                                    minLength={2}
                                    autoFocus={false}
                                    returnKeyType={'search'}
                                    listViewDisplayed='auto'
                                    fetchDetails={true}
                                    renderDescription={row => row.description}
                                    onPress={(data, details = null) => {
                                        console.log("data=>", data, details)
                                        console.log("details=>", details)
                                        this.setState({ locationLat: details.geometry.location.lat })
                                        this.setState({ locationLong: details.geometry.location.lng })
                                        this.setState({ input_location: data.description });
                                        this.setState({ newlocationLat: details.geometry.location.lat })
                                        this.setState({ newlocationLong: details.geometry.location.lng })
                                        this.setState({ text: '' })
                                        this.geteventList(distance);

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
                                    getDefaultValue={() => {
                                        return 'fgf'
                                    }}
                                    query={{
                                        key: 'AIzaSyB4O2q844JvXcOpT0J6wreFNT0pP7qfZy4',
                                        language: 'en',
                                    }}
                                    styles={{
                                        textInputContainer: {
                                            width: '100%', borderRadius: 20,
                                            borderColor: '#000', color: '#000', height: 25
                                        },

                                        predefinedPlacesDescription: {
                                            color: '#000', fontFamily: 'Raleway-Bold',
                                        },
                                        listView: {
                                            top: 28,
                                            position: 'absolute',
                                            color: 'black',
                                            backgroundColor: "black",
                                            width: '250%',
                                            right: '1%',
                                        },

                                        description: {
                                            fontSize: 14,
                                            fontFamily: 'Raleway-Regular',
                                        },
                                        textInputProps: { placeholderTextColor: '#000' },
                                        textInput: {
                                            color: '#000',
                                            borderRadius: 20,
                                            marginLeft: 2,
                                            marginTop: 1,
                                            height: 20,
                                            fontSize: 10,
                                            alignSelf: 'center', fontFamily: 'Raleway-Regular', marginTop: 5,
                                        },
                                    }}
                                    currentLocation={true} currentLocationLabel="Current location"
                                    nearbyPlacesAPI='GooglePlacesSearch'
                                    GoogleReverseGeocodingQuery={{}}
                                    GooglePlacesSearchQuery={{
                                        rankby: 'distance',
                                    }}
                                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                                    renderLeftButton={() => <Image style={{ width: 10, height: 10, marginLeft: 15, alignSelf: 'center' }} source={require('../../Images/ic_search.png')} />}
                                    renderRightButton={() => <Image style={styles.location2} source={require('../../Images/noun_Location_1278600.png')} />}
                                />
                            </View>
                        }
                    </View>}
                <View style={styles.searchView}>
                    <Image style={{ width: 12, height: 12, marginLeft: 15, }} source={require('../../Images/selected_ic_search.png')}></Image>
                    <TextInput
                        placeholder='Search events by Title,Description,etc.'
                        style={{ padding: 5, color: '#fff', fontSize: 10, marginLeft: 5, width: '90%', fontFamily: 'Raleway-Regular' }}
                        onChangeText={(text) => this.searchData(text)}
                        placeholderTextColor='#fff'
                        returnKeyType="done"
                        blurOnSubmit={false}
                        onSubmitEditing={Keyboard.dismiss}
                        ref={input => { this.textInput = input }}
                    />
                </View>
                <View style={{ marginLeft: 35, marginVertical: 12, zIndex: -99, }}>
                    <FlatList
                        horizontal={true}
                        data={this.state.distanceList}
                        renderItem={({ item, index }) => (
                            <View>
                                {item.isSelected == true ?
                                    <TouchableOpacity style={styles.subcategoryitem2}
                                        onPress={() => this.onDistancefilter(item.val, index)}>
                                        <Text style={styles.subcategory2}>{item.val}</Text>
                                        <Text style={styles.miles2}>Miles</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={styles.subcategoryitem}
                                        onPress={() => this.onDistancefilter(item.val, index)}>
                                        <Text style={styles.subcategory}>{item.val}</Text>
                                        <Text style={styles.miles}>Miles</Text>
                                    </TouchableOpacity>
                                }
                            </View>

                        )}
                        keyExtractor={(_, index) => index.toString()} />
                </View>

                <View style={{ flex: 4.5, zIndex: -999, }}>
                    <FlatList data={this.state.EventData_list}
                        renderItem={({ item, index }) =>
                            <View style={styles.CardView}>
                                <View style={{ marginHorizontal: "5%", marginVertical: "5%" }}>
                                    <Text style={styles.tex1}>{item.event_name}</Text>
                                    <View style={styles.underline}></View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.text_3}>Description : </Text>
                                        <Text style={styles.text_4}>{item.event_description}</Text>
                                    </View>
                                    {item.event_date != null ?
                                        <View style={{ flexDirection: 'row', marginTop: "2%", }}>
                                            <Text style={styles.text_31}>Event date : </Text>
                                            <Text style={styles.text_41}>{item.event_date.slice(0, -9)}</Text>
                                        </View> :
                                        null
                                    }

                                    <View style={{ flexDirection: 'row', marginTop: "2%", }}>
                                        <Image style={styles.location2} source={require('../../Images/ic_location.png')}></Image>
                                        <TouchableOpacity onPress={() => this.addressLink(item.latitude, item.longitude)}>
                                            <Text style={styles.text_2}>{item.location + ", " + item.postal_code}</Text>
                                        </TouchableOpacity>

                                    </View>
                                    <View style={{ width: 140, marginTop: '3%' }}>
                                        <TouchableOpacity style={styles.registerBoder} onPress={() => this.registerScreen(item.event_id)}>
                                            <Text style={styles.text_5}>Register</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        }
                        keyExtractor={(_, index) => index.toString()}
                        onEndReached={this.handleLoadMore}
                        ListFooterComponent={this.footerList}
                        onEndReachedThreshold={0.8}
                    />
                    <View style={styles.NextButton_2}>
                        <Toast ref="customToast" backgroundColor="#fff" textColor='black' />
                    </View>
                </View>
                <View style={{}}>
                    <TouchableOpacity style={styles.createEventBoder} onPress={() => this.createEvent()}>
                        <Image style={styles.location_event} source={require('../../Images/ic_event_add.png')}></Image>
                        <Text style={styles.text_6}>Create Event</Text>
                    </TouchableOpacity>
                </View>
                <Loader isLoader={this.state.loading}></Loader>
                <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
            </SafeAreaView>
        )
    }

}

export default EventScreen;