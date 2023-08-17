import * as React from 'react';
import { View, Text, Image, Dimensions, ImageBackground } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles'
import ReadMore from 'react-native-read-more-text';
import { requestGetApi, traineeDetail, defaultdistance, } from '../../NetworkCall/Service';
import { getAsyncStorage } from '../../Routes/AsynstorageClass';
import NetInfo from "@react-native-community/netinfo";
import VideoPlayer from 'react-native-video-player';
import moment from 'moment';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import HeaderScreen from '../header'
import Loader from '../CustomComponent/Loader';
import Carousel from 'react-native-snap-carousel';
import Star from 'react-native-star-view';

let PostData_arr = []

let distance = ''


const WATER_IMAGE = require('../../Images/whitebgstar.png')
class PersonalTrainer extends React.Component {

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
            paused: true,
            videoIndex: 0,
            isMute: false,
            scrollStatus: false,
            imageid: ''
        }
    }


    componentDidMount = () => {
        this.CheckConnectivity();
        this.getUploadPostList(distance);
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
    getUploadPostList = async () => {
        this.setState({ loading: true, })
        const body = {
            'per_page': 20,
            'page_no': this.state.PageNo,
            'keywords': this.state.text,
        }
        let token_value = await getAsyncStorage('tokenkey');
        console.log("token:::", token_value);
        const { responseJson, err } = await requestGetApi(traineeDetail, body, 'GET', token_value)

        console.log(" responseJson=>", responseJson)

        console.log(" err=>", err)


        this.setState({ loading: false, })
        if (responseJson.status == true) {
            console.log('uploadPost', responseJson.data.records);
            PostData_arr = responseJson.data.records;
            if (this.state.PageNo == 1) {
                this.setState({ PostData_list: responseJson.data.records })
            } else {
                this.setState({ PostData_list: this.state.PostData_list.concat(responseJson.data.records) })
            }
        }
    }


    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }

    onscrollView() {
        this.setState({ scrollStatus: true })
    }
    renderItems(data, outerindex) {
        const { item, index } = data;

        const onplay = async (id, index) => {
            console.log("outer :::::")
            this.setState({ videoIndex: outerindex });
            this.setState({ imageid: id });

            this.setState({ scrollStatus: false });
        }

        return (
            <View style={{ height: 300, }}>

                {item.name.split('.').pop() == 'mp4' ? (

                    <View style={{ alignItems: 'center', height: 300, width: '93%', }}>
                        <View style={{ width: '100%', height: 300 }}>
                            <VideoPlayer
                                style={{ width: '100%', height: 300 }}
                                video={{ uri: item.image_url }}
                                resizeMode={"cover"}
                                muted={this.state.isMute}
                                onStart={() => onplay(item.image_id)}
                                onStartPress={() => onplay(item.image_id)}
                                paused={this.state.scrollStatus ? true : outerindex == this.state.videoIndex && this.state.imageid == item.image_id ? false : true}
                                disableFullscreen={true}
                                pauseOnPress={true}
                                onPlayPress={() => onplay(item.image_id)}
                                thumbnail={{ uri: item.thumbnail_image_url }}
                            />
                        </View>
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
                            source={{ uri: item.name }}
                            resizeMode={'cover'}
                            rate={1.0}
                        />
                        <Text style={{
                            right: '10%',
                            color: "#fff",
                            alignSelf: 'flex-end', fontSize: 15,
                            position: 'absolute', top: 5, fontFamily: 'Raleway-Regular'
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
    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ color: '#fff', marginTop: 5, fontFamily: 'Raleway-Regular', fontSize: 12 }} onPress={handlePress}>
                Read more
            </Text>
        );
    }

    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ color: '#fff', marginTop: 5, fontSize: 12, fontFamily: 'Raleway-Regular', }} onPress={handlePress}>
                Read less
            </Text>
        );
    }

    searchData(text) {
        clearTimeout(this.typingTimer);// this will cancel the previous timer
        this.typingTimer = setTimeout(() => {
            this.setState({ text: text });
            this.setState({ PageNo: 1 })
            this.getUploadPostList(distance);
        }, 1000);
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

    bookeSession = (id) => {
        this.props.navigation.navigate("BookSession", {
            id: id
        }
        )
    }
    trainerProfile = (id) => {
        this.props.navigation.navigate("Trainer Profile", {
            id: id
        })
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }} >
                <HeaderScreen title='Personal Trainer' navigation={this.props.navigation} />
                <View style={styles.searchView}>
                    <Image style={{ width: 12, height: 12, marginLeft: 15, }} source={require('../../Images/ic_search.png')}></Image>
                    <TextInput
                        style={{ padding: 5, color: '#808084', fontSize: 12, marginLeft: 5, width: '90%', fontFamily: 'Raleway-Regular' }}
                        onChangeText={(text) => this.searchData(text)}
                        keyboardType='default'
                        blurOnSubmit={false}
                        placeholderTextColor='#A4A4A4'
                        placeholder='Search By Name'
                    />
                </View>

                <View style={{ flex: 1.7, marginTop: 10 }}>

                    <FlatList data={this.state.PostData_list}
                        onScroll={(info) => this.onscrollView(info)}
                        renderItem={({ item, index }) =>
                            <View style={styles.CardView}>
                                <View style={{ marginLeft: '7%', marginBottom: '5%', marginTop: '5%', flexDirection: 'row' }}>
                                    <Text style={styles.user_name}>
                                        {item.title}
                                    </Text>
                                    <View style={{ position: 'absolute', right: 10 }}>
                                        <Star score={Number(item.rating)} />
                                    </View>
                                </View>

                                <View style={{ height: 300, }}>
                                    {item.post_images.map(item2 => { item2.total_images = item.total_images; })}
                                    {item.post_images == 0 || item.post_images == null ? (
                                        <Image style={{ height: 300 }} source={require('../../Images/homeImg.png')} />
                                    ) :
                                        (
                                            <Carousel
                                                ref={(c) => { this._carousel = c; }}
                                                data={item.post_images}
                                                renderItem={(item2) => this.renderItems(item2, index,)}
                                                sliderWidth={Dimensions.get("window").width}
                                                itemWidth={Dimensions.get("window").width}
                                                scrollEndDragDebounceValue={0}
                                                activeSlideOffset={0}
                                                apparitionDelay={10}
                                                lockScrollWhileSnapping={true}
                                                inactiveSlideOpacity={1}
                                                inactiveSlideScale={1}
                                            />
                                        )

                                    }
                                </View>
                                <View style={styles.DescriptionView2}>
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
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={styles.siteUrl2} onPress={() => this.bookeSession(item.id)}>
                                        <Text style={{ margin: 8, color: '#fff', fontFamily: 'Raleway-Regular', fontSize: 12 }}>Book Session</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.siteUrl2} onPress={() => this.trainerProfile(item.id)}>
                                        <Text style={{ margin: 8, color: '#fff', fontFamily: 'Raleway-Regular', fontSize: 12 }}>Trainer Profile</Text>
                                    </TouchableOpacity>


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
            </SafeAreaView>
        );
    }

}





export default PersonalTrainer;

