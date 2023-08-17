import React from 'react'
import { View, Text, Image, Colors, Button, BackHandler, Alert, TextInput, Keyboard } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './edit_event_styles';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-picker';
import { requestPostApiMedia, edit_event } from '../../../NetworkCall/Service';
import Toast from 'react-native-custom-toast';
import { getAsyncStorage } from '../../../Routes/AsynstorageClass';
import NetInfo from "@react-native-community/netinfo";
import HeaderScreen from '../../header';
import Loader from '../../CustomComponent/Loader';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import CustomAlert from '../../CustomAlert';

let location = ''
let event_name = ''
let event_description = ''
let event_id = ''
let postal_code=''
class EditEvent extends React.Component {

    constructor() {
        super();
        this.state = {
            isSignUpModalVisible: false,
            setResponse: '',
            event_name: '',
            input_description: '',
            input_location: '',
            loading: false,
            input_description: '',
            input_location: '',
            currentLongitude: '',
            currentLatitude: '',
            locationStatus: '',
            locationLat: '',
            locationLong: '',
            isDatePickerVisible: false,
            oneTimeSelected_date: '',
            postalCode:'',
            ischangeView:false,
            Alert_Visibility: false,
            alert_msg: ''
        }
    }

    componentDidMount() {
        this.CheckConnectivity();
        this.setState({ event_name: event_name })
        this.setState({ input_description: event_description })
        this.setState({ input_location: location })
        this.setState({  postalCode: postal_code })
        Geocoder.init("AIzaSyB4O2q844JvXcOpT0J6wreFNT0pP7qfZy4");
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
        this.props.navigation.goBack()
    }

    editEvent = async () => {
        if (this.state.event_name == "") {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "please enter event name." })
            return;
        }
        if (this.state.input_location == "") {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "please enter location." })
            return;
        }
        if (this.state.input_description == "") {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "please enter description." })
            return;
        }
       
        this.setState({ loading: true })
        let token = await getAsyncStorage('tokenkey');
        const formData = new FormData()
        formData.append('event_name', this.state.event_name)
        formData.append('event_description', this.state.input_description)
        formData.append('location', this.state.input_location)
        formData.append('event_id', event_id)
        formData.append('postal_code', this.state.postalCode);
        console.log("form data==", formData)
        const { responseJson, err } = await requestPostApiMedia(edit_event, formData, 'POST', token)
        this.setState({ loading: false })
        if (responseJson.status == true) {
            this.props.navigation.navigate('EventListScreen');
        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg:responseJson.message})
        }
    }
    OnChangeLocation=()=>{
        this.setState({ischangeView:true})
    }
    render() {
        const { navigate } = this.props.navigation;
        event_name = this.props.route.params.event_name;
        event_description = this.props.route.params.event_description;
        location = this.props.route.params.location;
        event_id = this.props.route.params.event_id;
        postal_code = this.props.route.params.postal_code;
        console.log("Edit details::::::::", event_name, event_description, location, event_id)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>
                <HeaderScreen title='Events' navigation={this.props.navigation} />
                <View style={{ flex: 4, }}>
                    <View style={styles.CardView}>
                        <View style={styles.backgroundLogin}>
                            <TextInput
                                style={styles.inputStyle}
                                underlineColorAndroid="#F6F6F7"
                                placeholder="Enter Event Name"
                                placeholderTextColor="#D2D2D3"
                                keyboardType='default'
                                returnKeyType="next"
                                onChangeText={(event_name) => {
                                    this.setState({ event_name });
                                }}
                                value={this.state.event_name}
                                underlineColorAndroid='transparent'
                                onSubmitEditing={() =>
                                    this.input_location && this.input_location.focus()
                                }
                                blurOnSubmit={false} />
                        </View>
                       {this.state.ischangeView==false ? 
                        <TouchableOpacity style={styles.backgroundLogin_3} onPress={this.OnChangeLocation}>
                            <Text style={styles.inputStyle2}>{this.state.input_location +", "+this.state.postalCode}</Text>
                            <TouchableOpacity style={styles.location_btn}>
                                <Image style={styles.location} source={require('../../../Images/ic_location.png')}></Image>
                            </TouchableOpacity>
                        </TouchableOpacity>
    :
                        <View style={styles.backgroundLogin_4}>
                            <GooglePlacesAutocomplete
                                minLength={2}
                                autoFocus={false}
                                returnKeyType={'search'}
                                listViewDisplayed='auto'
                                fetchDetails={true}
                                renderDescription={row => row.description}
                                onPress={(data, details = null) => {
                                   console.log("::::::::::::::::::::kirti::::::",data,details)
                                    this.setState({ locationLat: details.geometry.location.lat })
                                    this.setState({ locationLong: details.geometry.location.lng })
                                    this.setState({ input_location: data.description })

                                    Geocoder.from(this.state.locationLat ,this.state.locationLong )
                       
                                    .then(json => {
                                        console.log("json=>",json);
                                        var addressComponent = json.results[0]
                                        console.log("addressComponent=>", addressComponent)
                                        const zipCode =addressComponent?.address_components.find((addressComponent) =>
                                           addressComponent.types.includes('postal_code'),
                                           
                                         )?.short_name;
                                           
                                         this.setState({postalCode:zipCode})
                                           console.log(" zipCode=>",zipCode);
                                
                                    })
                                    .catch(error =>
                                        console.warn(error)
                                    );
                                }}
                                getDefaultValue={() => 'search'}
                                query={{
                                    key: 'AIzaSyB4O2q844JvXcOpT0J6wreFNT0pP7qfZy4',
                                    language: 'en',
                                }}
                                styles={{
                                    textInputContainer: {
                                        width: '100%', borderRadius: 30,
                                        borderColor: '#000',height:48,color: '#fff',
                                    },
                                    description: {
                                        fontWeight: 'bold',
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
                                        height:35
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
                                renderRightButton={() => <Image style={styles.location2} source={require('../../../Images/ic_location.png')} />}
                            />
                        </View>
    }
                        <View style={styles.backgroundLogin_2}>
                            <TextInput
                                style={styles.inputStyle}
                                underlineColorAndroid="#F6F6F7"
                                placeholder="write description"
                                placeholderTextColor="#444154"
                                keyboardType='default'
                                returnKeyType="next"
                                onChangeText={(input_description) => {
                                    this.setState({ input_description });
                                }}
                                value={this.state.input_description}
                                underlineColorAndroid='transparent'
                                ref={ref => {
                                    this.input_description = ref;
                                }}
                                multiline={true}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false} />
                        </View>
                    </View>
                </View>

                <View style={{ flex: .5, marginVertical: "5%" }}>
                    <View style={styles.NextButton_2}>
                        <Toast ref="customToast" backgroundColor="#fff" textColor='black' />
                    </View>
                    <TouchableOpacity style={styles.createEventBoder} onPress={() => this.editEvent()}>
                        <Text style={styles.text_6}>Update</Text>
                    </TouchableOpacity>
                </View>
                <Loader isLoader={this.state.loading}></Loader>
                <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
            </SafeAreaView>
        )
    }
}

export default EditEvent;