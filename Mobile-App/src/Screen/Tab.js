import * as React from 'react'
import { View, Text, Image, Button, SafeAreaView, Alert, Dimensions, } from 'react-native'
import { FlatList, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';

import Home from './Home/HomeScreen';
import Search from './SearchUser/SearchUserScreen';
import More from './BottomMoreTab/MoreScreen'
import Profile from './MyProfile/ProfileScreen';
import TabBottom from './CustomComponent/Bottom';
import BottomTabBar from './BottomTabBar';
import styles from '../Screen/Comments/commnts_styles'

import Modal from 'react-native-modal';
import CustomAlert from './CustomAlert';
const windowHeight = Dimensions.get('window').height



export default class Tab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabArr: [{ tabName: '', isSelect: true, tabImage: require('../Images/home.png') },
            { tabName: '', isSelect: false, tabImage: require('../Images/ic_search.png') },
            { tabName: '', isSelect: false, tabImage: require('../Images/add-btn.png') },
            { tabName: '', isSelect: false, tabImage: require('../Images/menu.png') },
            { tabName: '', isSelect: false, tabImage: require('../Images/myprofile.png') },
            ],
            selectedTabTitle: '',
            isSignUpModalVisible: false,
            setResponse: [],
            openModal: false,
            Alert_Visibility: false,
            alert_msg: ''
        }
    }

    componentDidMount() {
    }

    openAlert = () => {
        this.setState({ Alert_Visibility: false })
    }
    closeAlert = () => {
        this.setState({ Alert_Visibility: false })
    }

    render() {
        const { selectedTab } = this.state
        return (
            <View style={{ height: '100%', width: '100%' }}>
                <View style={{ height: windowHeight - 65, width: '100%', }}>
                    {
                        this.state.tabArr[0].isSelect ?
                            <Home navigation={this.props.navigation}></Home>
                            :
                            this.state.tabArr[1].isSelect ?
                                <Search navigation={this.props.navigation}></Search> :
                                this.state.tabArr[3].isSelect ?
                                    <More navigation={this.props.navigation}></More> :
                                    this.state.tabArr[4].isSelect ?
                                        <Profile navigation={this.props.navigation}></Profile>
                                        : null
                    }

                    {
                        this.state.openModal ?
                            this.openModal()
                            : null
                    }
                </View>
                <TabBottom tabArr={this.state.tabArr} action={this.tabAction.bind(this)}></TabBottom>
                <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
            </View>
        )
    }

    tabAction = (index) => {
        if (index == 2) {
            this.setState({ openModal: true })
        } else {
            let arr = []
            this.setState({ openModal: false })
            const map = this.state.tabArr.map((item, index) => {
                item.isSelect = false
                arr.push(item)
            })
            arr[index].isSelect = true
            this.setState({ tabArr: arr, selectedTabTitle: this.state.tabArr[index].tabName })
        }


    }

    openModal = () =>

        <Modal
            style={{}}
            isVisible={this.state.openModal}
            hasBackdrop={true}
            activeOpacity={.1}
            onBackdropPress={() => this.setState({ openModal: false })}
            onRequestClose={() => {
                this.setState({ openModal: false })
            }}
        >

            <View style={styles.SignupModal}>
                <View onStartShouldSetResponder={() => {
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
                }}

                    style={{ flexDirection: 'row', marginTop: '5%', marginLeft: "25%"}}>
                    <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require("../Images/ic-camera.png")}></Image>
                    <Text style={{ color: "#fff", fontSize: 16, fontFamily: 'Raleway-Regular' }}> Take image</Text>
                </View>
                <View
                    style={{
                        width: '100%',
                        height: 0.5,
                        backgroundColor: '#98989B',
                        marginTop: 10
                    }}></View>
                <View style={{ flexDirection: 'row', marginTop: '5%', marginLeft: "25%" }}
                    onStartShouldSetResponder={() => {
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
                    }}>
                    <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require("../Images/ic-gallery.png")}></Image>
                    <Text style={{ color: "#fff", fontSize: 16 ,fontFamily: 'Raleway-Regular' }}>Gallery</Text>
                </View>
                <View
                    style={{
                        width: '100%',
                        height: 0.5,
                        backgroundColor: '#98989B',
                        marginTop: 10
                    }}></View>
                <View style={{flexDirection: 'row', marginTop: '5%', marginLeft: "25%" }}
                    onStartShouldSetResponder={() => {
                        ImagePicker.openCamera(
                            {
                                mediaType: 'video',
                                includeBase64: false,
                                maxWidth: 1200,
                                maxHeight: 1200,
                                quality: 0.8,
                            }).then(image => {
                                console.log(image);
                                this.setState({ setResponse: image });
                                this.GotToUploadScreen();
                            },
                            );
                    }}>
                    <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require("../Images/ic_video.png")}></Image>
                    <Text style={{ color: "#fff", fontSize: 16, fontFamily: 'Raleway-Regular' }}>Take video</Text>
                </View>
            </View>
        </Modal>

    GotToUploadScreen = () => {
        this.setState({ openModal: !this.state.openModal });

        if (this.state.setResponse.length > 10) {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg:'You are exceeding the maximum limit of upload files. Please reduce the selection upto 10 files!'})
        } else {
            console.log("agfgfdgsfd")
            this.setState({ openModal: false })
            this.props.navigation.navigate('UploadPost', {
                uploadUrl: this.state.setResponse,
            });
        }
    };
    UploadImg = () => {
        this.setState({ openModal: !this.state.openModal });
    };

}