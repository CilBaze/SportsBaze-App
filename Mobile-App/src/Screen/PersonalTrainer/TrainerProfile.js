import * as React from 'react';
import {
    View, Text, Image, Button, Dimensions, ImageBackground,
} from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import ReadMore from 'react-native-read-more-text';
import { requestGetApi, traineeProfile } from '../../NetworkCall/Service';
import { getAsyncStorage } from '../../Routes/AsynstorageClass';
import NetInfo from '@react-native-community/netinfo';
import VideoPlayer from 'react-native-video-player';
import HeaderScreen from '../header';
import Loader from '../CustomComponent/Loader';
import Carousel from 'react-native-snap-carousel';
import Star from 'react-native-star-view';
import CustomAlert from '../CustomAlert';
let PostData_arr = [];
let unsubscribe
let id = ''

class TrainerProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            PageNo: 1,
            loading: false,
            PostData_arr: '',
            rating: [],
            Alert_Visibility: false,
            alert_msg: '',
            paused: true,
            videoIndex: 0,
            isMute: false

        };
        this.page = 0;
    }

    componentDidMount = () => {
        this.CheckConnectivity();
        this.getUploadPostList();
        unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getUploadPostList();
        });
    };
    openAlert = () => {
        this.setState({ Alert_Visibility: false })
    }
    closeAlert = () => {
        this.setState({ Alert_Visibility: false })
    }
    CheckConnectivity = () => {
        NetInfo.fetch().then((state) => {
            console.log('Connection type', state.type);
            if (state.isConnected == true) {
            } else {
                this.setState({ Alert_Visibility: true })
                this.setState({ alert_msg: "Internet is not connected." })
            }
            console.log('Is connected?', state.isConnected);
        });

        NetInfo.addEventListener((state) => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
            if (state.isConnected == true) {
            } else {
                this.setState({ Alert_Visibility: true })
                this.setState({ alert_msg: "Internet is not connected." })
            }
        });
    };
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
            <Text style={{ color: '#fff', marginTop: 5, fontFamily: 'Raleway-Regular', fontSize: 12 }} onPress={handlePress}>
                Read less
            </Text>
        );
    }
    getUploadPostList = async () => {
        this.setState({ loading: true })
        const body = {
            'trainee_id': id
        }
        let token_value = await getAsyncStorage('tokenkey');
        console.log(token_value)
        const { responseJson, err } = await requestGetApi(traineeProfile, body, 'GET', token_value);
        console.log('traineeProfile=>', responseJson);

        console.log("url==", PostData_arr.base_url + "/" + PostData_arr.profile_pic)
        this.setState({ loading: false })
        if (responseJson.status == true) {
            PostData_arr = responseJson.data;
            this.setState({ rating: PostData_arr.rating })

        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
            console.error(error);
            that.setState({ setOnLoad: false, fetching_Status: false });
        }
    };

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
    onplay = (id) => {
        this.setState({ paused: !this.state.paused })
        this.setState({ videoIndex: id })
    }
    renderItems(data) {
        const { item, index } = data;

        return (
            <View style={{ height: 300 }}>
                {item.name.split('.').pop() == 'mp4' ? (
                    <View style={{ alignItems: 'center', height: 300, width: '93%', }}>

                        <View style={{ width: '100%', height: 300 }}>
                            <VideoPlayer
                                style={{ width: '100%', height: 300 }}
                                video={{ uri: item.image_url }}
                                resizeMode={"cover"}
                                muted={this.state.isMute}
                                paused={this.state.paused}
                                disableFullscreen={true}
                                pauseOnPress={true}
                                onPlayPress={() => this.setState({ paused: false })}
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
                        <Text style={{ right: '10%', fontFamily: 'Raleway-Regular', color: "#fff", alignSelf: 'flex-end', fontSize: 15, marginRight: 10, position: 'absolute', top: 5 }}>{index + 1 + "/" + item.total_images}</Text>
                    </View>
                )}
            </View>
        );
    }

    render() {
        id = this.props.route.params.id;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
                <HeaderScreen title='Trainer Profile' navigation={this.props.navigation} />
                <ScrollView style={{ flex: 1.7, backgroundColor: '#15141A' }}>

                    <View
                        style={styles.CardView}>
                        <View style={styles.imgView}>
                            {PostData_arr.profile_pic == '' || PostData_arr.profile_pic == null ? (
                                <Image
                                    style={{ width: 120, height: 120, borderRadius: 120 / 2 }}
                                    source={require('../../Images/ic_profile.png')}
                                />
                            ) : (
                                <Image
                                    style={{
                                        width: 120,
                                        height: 120,
                                        borderRadius: 120 / 2,
                                    }}
                                    source={{ uri: PostData_arr.base_url + "/" + PostData_arr.profile_pic }}
                                />

                            )}
                            <View style={{ marginLeft: 20 }}>
                                <Text style={styles.user_name}>
                                    {PostData_arr.title}
                                </Text>

                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <Star score={Number(PostData_arr.rating)} />
                                </View>
                            </View>

                        </View>
                        <View style={{ height: 300, }}>
                            {PostData_arr.post_images == 0 ? (
                                <Image style={{ height: 300 }} source={require('../../Images/homeImg.png')} />
                            ) : (
                                <Carousel
                                    ref={(c) => { this._carousel = c; }}
                                    data={PostData_arr.post_images}
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

                        <View style={{ margin: 16 }}>
                            <View style={{ marginLeft: 6, marginBottom: 10 }}>
                                <ReadMore
                                    numberOfLines={4}
                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                    renderRevealedFooter={this._renderRevealedFooter}
                                    onReady={this._handleTextReady}>
                                    <Text style={styles.read_more2}>
                                        {PostData_arr.description}
                                    </Text>
                                </ReadMore>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.userType2}>
                                    Speciality:
                                </Text>
                                <Text style={styles.userType}>
                                    {PostData_arr.speciality}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.userType2}>
                                    Skills:
                                </Text>
                                <Text style={styles.userType}>
                                    {PostData_arr.skill}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.userType2}>
                                    Years of experience:
                                </Text>
                                <Text style={styles.userType}>
                                    {PostData_arr.experience}
                                </Text>
                            </View>

                        </View>
                    </View>
                </ScrollView>
                <Loader isLoader={this.state.loading}></Loader>
                <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
            </SafeAreaView>
        );
    }
}

export default TrainerProfile;



