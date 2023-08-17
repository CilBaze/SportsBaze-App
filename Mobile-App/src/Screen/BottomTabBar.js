import * as React from 'react'
import { View, Text, Image, Button, SafeAreaView, Alert } from 'react-native'
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import { getAsyncStorage } from '../Routes/AsynstorageClass';
import styles from '../Screen/Comments/commnts_styles'
let myUId = ''
let myProfile = ''
export default class BottomTabBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            UserListInfo: [],
            isSignUpModalVisible: false,
            setResponse: [],
            isHomeSelected: false,
            isSearchSelected: false,
            isMoreSelected: false,
            isMyProfileSelected: false
        }
    }
    async componentDidMount() {
        myUId = await getAsyncStorage('user_id');
        myProfile = await getAsyncStorage("profile_pic");
    }
    GotToUploadScreen = () => {
        this.setState({ isSignUpModalVisible: !this.state.isSignUpModalVisible });

        if (this.state.setResponse.length > 10) {
            Alert.alert(
                '',
                'You are exceeding the maximum limit of upload files. Please reduce the selection upto 10 files!',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]
            );
        } else {
            this.props.navigation.navigate('UploadPost', {
                uploadUrl: this.state.setResponse,
            });
        }
    };
    UploadImg = () => {
        this.setState({ isSignUpModalVisible: !this.state.isSignUpModalVisible });
    };
 
  


    render() {
        const homeSelectedImage = require('../Images/ic_home.png');
        const homeUnFocused = require('../Images/ic_homedisSelected.png')
        return (

            <View>
                <View style={styles.bottom_bar}>

                    <TouchableOpacity style={styles.bottom_image}
                        onPress={() => this.homeScreen()}>
                        <Image
                            style={styles.homeImage}
                            source={this.state.isHomeSelected ? homeUnFocused : homeSelectedImage}
                        />
                    </TouchableOpacity>
                    {this.state.isSearchSelected == false ?
                        <TouchableOpacity style={styles.bottom_image}
                            onPress={() => this.searchScreen()}>
                            <Image
                                style={styles.homeImage}
                                source={require('../Images/ic_search.png')}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.bottom_image}
                            onPress={() => this.searchScreen()}>
                            <Image
                                style={styles.homeImage}
                                source={require('../Images/selected_ic_search.png')}
                            />
                        </TouchableOpacity>
                    }

                    <TouchableOpacity
                        style={styles.bottom_image}
                        onPress={this.UploadImg}>
                        <Image
                            style={styles.homeImage}
                            source={require('../Images/ic_add.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottom_image}
                        onPress={() => this.moreScreen()}>
                        <Image
                            style={styles.homeImage}
                            source={require('../Images/ic_more.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottom_image}
                        onPress={() => this.myprofileScreen()}>
                        {myProfile == null || myProfile == "" ? <Image
                            style={styles.homeImage2}
                            source={require('../Images/ic_profile.png')}
                        />
                            :
                            <Image
                                style={styles.homeImage2}
                                source={{ uri: myProfile }}
                            />
                        }

                    </TouchableOpacity>
                </View>

                <Modal
                    isVisible={this.state.isSignUpModalVisible}
                    onBackdropPress={() => this.setState({ isSignUpModalVisible: false })}
                    onRequestClose={() => {
                        0
                        this.setState({ isSignUpModalVisible: false });
                    }}

                >
                    <View style={styles.SignupModal}>
                        <View style={{ width: '100%', height: 0.5, marginTop: 25 }}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '5%' }}>
                            <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require("../Images/ic-camera.png")}></Image>
                            <Button
                                title="Take image"
                                color="#15141A"
                                onPress={() => {
                                    ImagePicker.openCamera(
                                        {
                                            includeBase64: false,
                                            compressImageMaxHeight: 1000,
                                            compressImageMaxWidth: 1000,

                                        }).then(image => {
                                            console.log(image);
                                            this.setState({ setResponse: image });
                                            this.GotToUploadScreen();
                                        },
                                        );
                                }}></Button>
                        </View>
                        <View
                            style={{
                                width: '100%',
                                height: 0.5,
                                backgroundColor: '#98989B',
                            }}></View>
                        <View style={{ flexDirection: 'row', marginTop: '5%', marginLeft: "23%" }}>
                            <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require("../Images/ic-gallery.png")}></Image>
                            <Button
                                color="#15141A"
                                title="Gallery"
                                onPress={() => {
                                    ImagePicker.openPicker(
                                        {
                                            multiple: true,
                                            width: 300,
                                            height: 400,
                                            showsSelectedCount: true,
                                            maxFiles: 10
                                        }).then(image => {
                                            console.log(image);
                                            this.setState({ setResponse: image });
                                            this.GotToUploadScreen();
                                        },
                                        );
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: '100%',
                                height: 0.5,
                                backgroundColor: '#98989B',
                            }}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '5%' }}>
                            <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require("../Images/ic_video.png")}></Image>
                            <Button
                                color="#15141A"
                                title="Take video"
                                onPress={() => {
                                    ImagePicker.openCamera(
                                        {
                                            mediaType: 'video',
                                            includeBase64: false,
                                            width: 300,
                                            height: 400,
                                        }).then(image => {
                                            console.log(image);
                                            this.setState({ setResponse: image });
                                            this.GotToUploadScreen();
                                        },
                                        );
                                }}
                            />
                        </View>
                    </View>
                </Modal>

            </View>
        )
    }
}