import * as React from 'react';
import { View, Text, Image, Linking, Dimensions, ImageBackground, Keyboard } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles'
import ReadMore from 'react-native-read-more-text';
import { requestGetApi, GetGymList, defaultdistance } from '../../NetworkCall/Service';
import { getAsyncStorage } from '../../Routes/AsynstorageClass';
import NetInfo from "@react-native-community/netinfo";
import VideoPlayer from 'react-native-video-controls';
import moment from 'moment';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import HeaderScreen from '../header'
import Loader from '../CustomComponent/Loader';
import Carousel from 'react-native-snap-carousel';
import CustomAlert from '../CustomAlert';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

let PostData_arr = []

let distance = ''
let unsubscribe
class GymScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            isSignUpModalVisible: false,
            setResponse: '',
            PostData_list: [],
            upload_post_id: '',
            islike: false,
            isModalVisible: false,
            selectedItemIndex: 0,
            item_selected: '',
            text: '',
            input_location: '',
            locationLat: '',
            locationLong: '',
            distanceList: [],
            PageNo: 1,
            loading: false,
            newlocationLat: '',
            newlocationLong: '',
            Alert_Visibility: false,
            alert_msg: '',
            paused: true,
            videoIndex: 0,
            islocation: false,
            islocation: false,
            islocation: false,
            ischangeView: false,
            theamColor: '',
        }
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ color: '#fff', marginTop: 5, fontFamily: 'Raleway-Regular' }} onPress={handlePress}>
                Read more
            </Text>
        );
    }

    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ color: '#fff', marginTop: 5, fontFamily: 'Raleway-Regular' }} onPress={handlePress}>
                Read less
            </Text>
        );
    }

    componentDidMount =async () => {
        this.CheckConnectivity();
        let theamColor = await getAsyncStorage('theamColor')
        this.setState({ theamColor: theamColor });
        this.requestLocationPermission();
        this.getUploadPostList(distance);

        unsubscribe = this.props.navigation.addListener('focus', async () => {
            this.requestLocationPermission();
            PostData_arr = []
            await this.setState({ text: '', PostData_list: [], newlocationLat: '', locationLong: '', locationLong: false, distanceList: [], ischangeView:false})
            this.getUploadPostList(distance);
        });
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
    getUploadPostList = async (distance) => {
        this.setState({ loading: true, })
        const body = {
            'per_page': 20,
            'page_no': this.state.PageNo,
            'keywords': this.state.text,
            'latitude': this.state.newlocationLat,
            'longitude': this.state.newlocationLong,
            'distance': distance
        }
        let token_value = await getAsyncStorage('tokenkey');
        console.log("token:::", token_value);
        const { responseJson, err } = await requestGetApi(GetGymList, body, 'GET', token_value)
        console.log("uploadPost Response", responseJson)
        this.setState({ loading: false, })
        if (responseJson.status == true) {
            console.log('uploadPost', responseJson.data.records);
            PostData_arr = responseJson.data.records;
            if (this.state.PageNo == 1) {
                this.setState({ PostData_list: responseJson.data.records })
            } else {
                this.setState({ PostData_list: this.state.PostData_list.concat(responseJson.data.records) })
            }
        } else {
        }
    }
    getDistanceList = async () => {
        this.setState({ loading: true, })
        const body = {
        }
        const { responseJson, err } = await requestGetApi(defaultdistance, body, 'GET')
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

    GetdateTime = (created_date) => {
        created_date.slice(0, 10);
        created_date.slice(11, 21);
        return moment(created_date).fromNow();
    }
    onplay = (id) => {
        this.setState({ paused: !this.state.paused })
        this.setState({ videoIndex: id })
    }

    addressLink = (lat, long) => {
        const daddr = `${lat},${long}`;
        const company = Platform.OS === "ios" ? "apple" : "google";
        Linking.openURL(`http://maps.${company}.com/maps?daddr=${daddr}`);

    }

    OnChangeLocation = () => {
        this.setState({ ischangeView: true })
    }
    renderItems(data) {
        const { item, index } = data;
        return (
            <View style={{ height: 300, }}>

                {item.image_url.split('.').pop() == 'mp4' ? (

                    <View style={{ alignItems: 'center', height: 300, width: '93%', }}>
                        {this.state.paused == true ?
                            <View style={{ width: '100%', height: 300 }}>
                                <ImageBackground style={{ width: '100%', height: 300 }}
                                    source={{ uri: item.thumbnail_image_url }}>
                                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: '30%' }} onPress={() => this.onplay(item.image_id)}>
                                        <Image style={{ width: 40, height: 45, alignSelf: 'center' }} source={require('../../Images/play-w.png')} />
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                            :
                            <View style={{ width: '100%', height: 300 }}>
                                {this.state.videoIndex == item.image_id ?
                                    <TouchableOpacity style={{ width: '100%', height: 300 }} onPress={() => this.onplay(item.image_id)}>
                                        <VideoPlayer style={{ width: '100%', height: 300 }}
                                            loading={true}
                                            source={{ uri: item.image_url }}
                                            paused={this.state.paused}
                                            resizeMode={'cover'}
                                            isFullscreen={true}
                                            showOnStart={true}
                                            repeat={true}
                                            pip={true}
                                            playWhenInactive={false}
                                            pauseOnPress={true}
                                            toggleResizeModeOnFullscreen={true}
                                            doubleTapTime={10}
                                            seekerPosition={5}
                                            mediaPlaybackRequiresUserAction={true}
                                            playInBackground={false} />
                                    </TouchableOpacity>
                                    :
                                    <View style={{ width: '100%', height: 300 }}>
                                        <ImageBackground style={{ width: '100%', height: 300 }}
                                            source={{ uri: item.thumbnail_image_url }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: '30%' }} onPress={() => this.onplay(item.image_id)}>
                                                <Image style={{ width: 40, height: 45, alignSelf: 'center' }} source={require('../../Images/play-w.png')} />
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    </View>
                                }
                            </View>
                        }
                        <Text style={{
                            right: '10%',
                            color: "#fff",
                            alignSelf: 'flex-end',
                            fontSize: 15,
                            position: 'absolute', fontFamily: 'Raleway-Regular',
                            top: 5
                        }}>{index + 1 + "/" + item.total_images}</Text>
                    </View>

                ) : (
                    <View>
                        <Image
                            style={{ width: '93%', height: 300 }}
                            source={{ uri: item.image_url }}
                            resizeMode={'cover'}
                            rate={1.0}
                        />
                        <Text style={{
                            right: '10%',
                            color: "#fff",
                            alignSelf: 'flex-end', fontSize: 15, fontFamily: 'Raleway-Regular',
                            position: 'absolute', top: 5
                        }}>{index + 1 + "/" + item.total_images}</Text>
                    </View>
                )}
            </View>
        );
    }
    GoTobackScreen = () => {
        this.props.navigation.goBack()
    }
    _handleTextReady = () => {
        // ...
    }


    searchData(text) {
        this.setState({ PostData_list: [], newlocationLat: '', newlocationLong: '', distanceList: [] })
        this.setState({ PageNo: 1 })
        clearTimeout(this.typingTimer);// this will cancel the previous timer
        this.typingTimer = setTimeout(() => {
            this.setState({ text: text });
            this.setState({ PageNo: 1 })
            PostData_arr = []
            this.getUploadPostList(distance);
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
        console.log("arr::::", arr)
        this.getUploadPostList(item);
    }

    footerList = () => {
        if (PostData_arr.length > 20) {
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
        if (PostData_arr.length > 20) {
            await this.setState({ PageNo: this.state.PageNo + 1 })
            this.getUploadPostList(distance);
        }

    }
    searchByLocation = async () => {
        this.setState({ islocation: !this.state.islocation });
        await this.setState({ text: '', PostData_list: [], newlocationLat: '', newlocationLong: '', distanceList: [] })
        PostData_arr = []
        this.getUploadPostList(distance);
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }} >

                {this.state.theamColor == "BLACK" ?
                    <View style={styles.Header_Bg}>
                        <TouchableOpacity onPress={this.GoTobackScreen} style={{ marginLeft: 30, }}>
                            <Image style={{ width: 20, height: 20, }} source={require('../../Images/back.png')} ></Image>
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Gym</Text>
                        {this.state.ischangeView == false ?
                            <TouchableOpacity style={styles.backgroundLogin_4} onPress={this.OnChangeLocation}>
                                <Text style={styles.inputStyle2} numberOfLines={1}>{this.state.input_location}</Text>
                                <Image style={styles.location} source={require('../../Images/ic_location.png')} />
                            </TouchableOpacity>
                            :
                            <View style={styles.backgroundLogin_black}>
                                <GooglePlacesAutocomplete
                                    placeholder='Search by location'
                                    styles={{ color: "#fff", fontFamily: 'Raleway-Regular' }}
                                    minLength={2}
                                    autoFocus={true}
                                    returnKeyType={'search'}
                                    listViewDisplayed='auto'
                                    fetchDetails={true}
                                    textInputProps={{ placeholderTextColor: 'white' }}
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
                                            borderColor: '#000', color: '#000', height:25,
                                        },
                                      
                                        predefinedPlacesDescription: {
                                            color: '#000', fontFamily: 'Raleway-Bold',backgroundColor:'#000'
                                        },
                                        listView: {
                                            top:28,
                                            position: 'absolute',
                                            color: 'black',
                                            backgroundColor: "#000",
                                            width:'270%',
                                            right:-15,
    
                                        },
                                        description: {
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            fontSize: 14,
                                            maxWidth: '99%',
                                            fontFamily: 'Raleway-Regular',backgroundColor:'#000',color:'#fff'
                                        },
                                        textInput: {
                                            color: '#fff',
                                            borderRadius: 20,
                                            marginLeft:1,
                                            backgroundColor: '#000',
                                            height: 25,
                                            fontSize: 10,
                                            alignSelf: 'center', fontFamily: 'Raleway-Regular',marginTop:5,
                                        },
                                        poweredContainer: {
                                            justifyContent: 'flex-end',
                                            alignItems: 'center',
                                            borderBottomRightRadius: 5,
                                            borderBottomLeftRadius: 5,
                                            borderColor: '#c8c7cc',
                                            borderTopWidth: 0.5,
                                            backgroundColor:"#000"
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
                                    renderLeftButton={() => <Image style={{ width: 10, height: 10, marginLeft: 15, alignSelf: 'center' }} source={require('../../Images/selected_ic_search.png')} />}
                                    renderRightButton={() => <Image style={styles.location2} source={require('../../Images/ic_location.png')} />}
                                />
                            </View>
                        }
                    </View> :
                    <View style={styles.Header_Bg2}>
                        <TouchableOpacity onPress={this.GoTobackScreen} style={{ marginLeft: 30, }}>
                            <Image style={{ width: 20, height: 20, }} source={require('../../Images/back_black.png')} ></Image>
                        </TouchableOpacity>
                        <Text style={styles.headerText2}>Gym</Text>
                        {this.state.ischangeView == false ?
                            <TouchableOpacity style={styles.backgroundLogin_4_white} onPress={this.OnChangeLocation}>
                                <Text style={styles.inputStyle} numberOfLines={1}>{this.state.input_location}</Text>
                                <Image style={styles.location} source={require('../../Images/noun_Location_1278600.png')} />
                            </TouchableOpacity>
                            :
                            <View style={styles.backgroundLogin_white}>
                                <GooglePlacesAutocomplete
                                    placeholder='Search by location'
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
                                            borderColor: '#000', color: '#000', height:25
                                        },

                                        predefinedPlacesDescription: {
                                            color: '#000', fontFamily: 'Raleway-Bold',
                                        },
                                        listView: {
                                            top: 32,
                                            position: 'absolute',
                                            color: 'black',
                                            backgroundColor: "black",
                                            width: '270%',
                                            right: -10
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
                                            height: 25,
                                            fontSize: 10,
                                            alignSelf: 'center', fontFamily: 'Raleway-Regular',marginTop:5,
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
                                    renderRightButton={() => <Image style={styles.location} source={require('../../Images/noun_Location_1278600.png')} />}
                                />
                            </View>
                        }
                    </View>}

                <View style={{ marginLeft: 35, marginTop: '3%', zIndex: -99, }}>
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

                <View style={styles.searchView}>
                    <Image style={{ width: 12, height: 12, marginLeft: 10}} source={require('../../Images/selected_ic_search.png')}></Image>
                    <TextInput
                        placeholder='Search by Title,description etc.'
                        style={{ padding: 5, color: '#fff', fontSize: 10, marginLeft: 5, width: '90%', fontFamily: 'Raleway-Regular' }}
                        onChangeText={(text) => this.searchData(text)}
                        returnKeyType="done"
                        placeholderTextColor='fff'
                        blurOnSubmit={false}
                        onSubmitEditing={Keyboard.dismiss}
                        placeholderTextColor='#A4A4A4'
                    />
                </View>
                
                <View style={{ flex: 1.7,zIndex:-99, }}>

                    <FlatList data={this.state.PostData_list}
                        renderItem={({ item, index }) =>
                            <View style={styles.CardView}>
                                <View style={{ marginLeft: '7%', marginBottom: '5%', marginTop: '5%' }}>
                                    <Text style={styles.user_name}>
                                        {item.title}
                                    </Text>
                                </View>
                                <View style={{ height: 300, }}>
                                    {item.post_images.map(item2 => { item2.total_images = item.total_images; })}
                                    {item.post_images == 0 ? (
                                        <Image style={{ width: '100%', height: 250 }} source={require('../../Images/homeImg.png')} />
                                    ) : (
                                        <Carousel
                                            ref={(c) => { this._carousel = c; }}
                                            data={item.post_images}
                                            renderItem={(item) => this.renderItems(item)}
                                            sliderWidth={Dimensions.get("window").width}
                                            itemWidth={Dimensions.get("window").width}
                                            scrollEndDragDebounceValue={0}
                                            activeSlideOffset={0}
                                            apparitionDelay={10}
                                            lockScrollWhileSnapping={true}
                                            inactiveSlideOpacity={1}
                                            inactiveSlideScale={1}
                                        />
                                    )}
                                </View>
                                <View style={styles.DescriptionView}>
                                    <Text style={{ color: '#fff', fontSize: 13, fontFamily: 'Raleway-Regular' }}>Description: </Text>
                                    <ReadMore
                                        numberOfLines={3}
                                        renderTruncatedFooter={this._renderTruncatedFooter}
                                        renderRevealedFooter={this._renderRevealedFooter}
                                        onReady={this._handleTextReady}>
                                        <Text style={styles.read_more}>
                                            {item.description}
                                        </Text>
                                    </ReadMore>
                                </View>
                                <View
                                    style={styles.seprator}
                                />
                                <View style={{ flexDirection: 'row', marginLeft: "5%", marginTop: 5 }}>
                                    <Image style={{ width: 10, height:15, marginTop: 5 }} source={require('../../Images/ic_location.png')}></Image>
                                    <TouchableOpacity onPress={() => this.addressLink(item.latitude, item.longitude)}>
                                        <Text style={{ color: '#fff', marginLeft: '2%', width: '65%', fontFamily: 'Raleway-Regular',fontSize:12 }}>{item.location + ", " + item.postal_code}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.siteUrl}>
                                    <TouchableOpacity style={styles.siteUrl2} onPress={() => Linking.openURL(item.website_url)}>
                                        <Image style={{width:15,height:15}} source={require('../../Images/compass.png')}></Image>
                                        <Text style={{ color: '#fff', marginLeft: 10, fontFamily: 'Raleway-Regular', fontSize: 12 }}>Visit Site</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.getDate}>

                                    <Text style={styles.uploadedTime}>{this.GetdateTime(item.created_date)}</Text>
                                </View>
                            </View>
                        }
                        keyExtractor={(_, index) => index.toString()}
                        onEndReached={this.handleLoadMore}
                        ListFooterComponent={this.footerList}
                        onEndReachedThreshold={0.8}
                    />
                </View>
                <Loader isLoader={this.state.loading}></Loader>
                <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
            </SafeAreaView>
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
                // this.setState({ input_location: addressComponent })
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


}





export default GymScreen;