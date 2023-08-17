import * as React from 'react';
import { View, Text, TouchableOpacity, Keyboard, Image, Platform, Alert, ScrollView } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './upload-styles'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { requestGetApi, sports_category, sports } from '../../NetworkCall/Service'
import { requestPostApi, uploadPost } from '../../NetworkCall/Service'
import Toast from 'react-native-custom-toast';
import { getAsyncStorage } from '../../Routes/AsynstorageClass'
import { setAsyncStorage } from '../../Routes/AsynstorageClass'
import NetInfo from "@react-native-community/netinfo";
import VideoPlayer from 'react-native-video-controls';
import Loader from '../CustomComponent/Loader';
import CustomAlert from '../CustomAlert';

let Sports_category_arr = []
let UploadUriPath = []

class UploadPost extends React.Component {

    constructor() {

        super()

        this.state = {
            textcaption: '',
            category_Name: '',
            sub_category_Name: '',
            category_id: '',
            sub_category_id: '',
            Sports_category: [],
            uploadFilePath: '',
            sportsList_name: [],
            loading: false,
            theamColor: '',
            Alert_Visibility: false,
            alert_msg: ''
        }
    }


    async componentDidMount() {
        console.log("UploadUriPath=>", UploadUriPath);
        let theamColor = await getAsyncStorage('theamColor')
        this.setState({ theamColor: theamColor })
        this.CheckConnectivity();
        this.getSportsList();
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
    getSportsCategoryList = async () => {
        this.setState({ loading: true })
        const body = {
        }
        let subSports = sports_category + "/" + this.state.category_id
        const { responseJson, err } = await requestGetApi(subSports, body, 'GET')
        this.setState({ loading: false })
        if (responseJson.status == true) {
            this._subcategory_menu.show();
            console.log('customer list', responseJson.data);
            Sports_category_arr = responseJson.data;
            this.setState({ Sports_category: Sports_category_arr })
            console.log("data", this.state.SportList_item);
        }
    }

    getSportsList = async () => {
        this.setState({ loading: true })
        const body = {
        }
        const { responseJson, err } = await requestGetApi(sports, body, 'GET')
        this.setState({ loading: false })
        if (responseJson.status == true) {
            console.log('customerlist', responseJson.data);
            Sports_name_arr = responseJson.data;
            this.setState({ sportsList_name: Sports_name_arr })
            console.log("data", this.state.sportsList_name)

        }


    }
    _category_menu = null;
    setCategoryMenuRef = ref => {
        this._category_menu = ref;
    }
    hideCategoryMenu = () => {
        this._category_menu.hide();

    };
    Category_Action = (category_name, category_id) => {
        this.setState({ category_Name: category_name })
        this.setState({ category_id: category_id })
    }
    showCategoryMenu = () => {
        this._category_menu.show();
        this.setState(this.state.sportsList_name);
    };

    _subcategory_menu = null;
    setSubCategoryMenuRef = ref => {
        this._subcategory_menu = ref;
    }
    hideSubCategoryMenu = () => {
        this._subcategory_menu.hide();
    };
    SubCategory_Action = (sub_sports_name, sub_category_id) => {
        this.setState({ sub_category_Name: sub_sports_name })
        this.setState({ sub_category_id: sub_category_id })
    }
    showSubCategoryMenu = async () => {
        this.getSportsCategoryList();
        this.setState(this.state.Sports_category)

    };

    UploadPost = async () => {
        if (this.state.textcaption == '') {
            this.refs.customToast.showToast('Please write caption!', 5000);
            return;
        }
        if (this.state.category_id == '') {
            this.refs.customToast.showToast('Please enter category name!', 5000);
            return;
        }
        if (this.state.sub_category_id == '') {
            this.refs.customToast.showToast('Please enter subcategory name!', 5000);
            return;
        }
        this.setState({ loading: true })
        let token = await getAsyncStorage('tokenkey');
        const formData = new FormData()
        var fileName = Math.floor(Math.random() * 100) + 1;
        await setAsyncStorage('sports_id', this.state.category_id)
        await setAsyncStorage('sub_sports_id', this.state.sub_category_id)
        await setAsyncStorage('description', this.state.textcaption)

        formData.append('sports_id', this.state.category_id)
        formData.append('sub_sports_id', this.state.sub_category_id)
        formData.append('description', this.state.textcaption)
        if (UploadUriPath.length >= 0) {
            for (let i = 0; i < UploadUriPath.length; i++) {
                const fileFormat = UploadUriPath[i].path.split(".");
                console.log("fileFormat===>", fileFormat[fileFormat.length - 1])
                formData.append("media[" + i + "]", {
                    uri: Platform.OS === "android" ? UploadUriPath[i].path : UploadUriPath[i].path.replace("file://", ""),
                    type: (UploadUriPath[i].path.indexOf('.mp4') > -1 || UploadUriPath[i].path.indexOf('.mov') > -1 || UploadUriPath[i].path.indexOf('.wmv') > -1) ? "video/" + fileFormat[fileFormat.length - 1] : UploadUriPath[i].mime,
                    name: (UploadUriPath[i].path.indexOf('.mp4') > -1 || UploadUriPath[i].path.indexOf('.mov') > -1 || UploadUriPath[i].path.indexOf('.wmv') > -1) ? "abcbcbc." + fileFormat[fileFormat.length - 1] : "abcbcbc." + fileFormat[fileFormat.length - 1]
                })
            }
        } else {
            const fileFormat = UploadUriPath.path.split(".");
            console.log("fileFormat===>", fileFormat[fileFormat.length - 1])
            formData.append("media", {
                uri: Platform.OS === "android" ? UploadUriPath.path : UploadUriPath.path.replace("file://", ""),
                type: (UploadUriPath.path.indexOf('.mp4') > -1 || UploadUriPath.path.indexOf('.mov') > -1 || UploadUriPath.path.indexOf('.wmv') > -1) ? "video/" + fileFormat[fileFormat.length - 1] : UploadUriPath.mime,
                name: (UploadUriPath.path.indexOf('.mp4') > -1 || UploadUriPath.path.indexOf('.mov') > -1 || UploadUriPath.path.indexOf('.wmv') > -1) ? "abcbcbc." + fileFormat[fileFormat.length - 1] : "abcbcbc." + fileFormat[fileFormat.length - 1]
            })

        }

        const { responseJson, err } = await requestPostApi(uploadPost, formData, 'POST', token)
        console.log("formData ", formData)
        console.log("Response responseJson", JSON.stringify(responseJson))
        this.setState({ loading: false })
        if (responseJson.status == true) {
            this.props.navigation.navigate('Tab')
        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
        }

    }
    onCancel = () => {
        this.props.navigation.goBack(null);
    }
    renderItems(data, totalCount) {
        const { item, index } = data;
        return (
            <View style={{ alignItems: 'center', height: 150, marginLeft: 15, }}>
                {item.path.split('.').pop() == 'mp4' ? (
                    <View>
                        <VideoPlayer style={{ width: 150, height: 150 }}
                            loading={true}
                            source={{ uri: item.path }}
                            paused={true}
                            isFullscreen={true}
                            repeat={true}
                            showOnStart={true}
                            playInBackground={false} />
                    </View>

                ) : (
                    <View>
                        <Image
                            style={{ width: 150, height: 150 }}
                            source={{ uri: item.path }}
                            resizeMode={'cover'}
                            rate={1.0}
                        />
                    </View>
                )}
            </View>
        );
    }
    render() {

        const { navigate } = this.props.navigation;
        UploadUriPath = this.props.route.params.uploadUrl
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>
                <ScrollView>
                    {this.state.theamColor == 'BLACK' ?
                        <View style={styles.UploadText}>
                            <TouchableOpacity onPress={this.onCancel}>
                                <Text style={styles.text}>Cancel</Text>
                            </TouchableOpacity >
                            <View >
                                <Text style={styles.text}>New Post</Text>
                                <View style={{ height: 1, backgroundColor: "#fff", width: 80 }}></View>
                            </View>
                            <TouchableOpacity onPress={this.UploadPost}>
                                <Text style={styles.text}>Upload</Text>
                            </TouchableOpacity>
                        </View> :
                        <View style={styles.UploadText2}>
                            <TouchableOpacity onPress={this.onCancel}>
                                <Text style={styles.text2}>Cancel</Text>
                            </TouchableOpacity >
                            <View >
                                <Text style={styles.text2}>New Post</Text>
                                <View style={{ height: 1, backgroundColor: "#000", width: 80 }}></View>
                            </View>
                            <TouchableOpacity onPress={this.UploadPost}>
                                <Text style={styles.text2}>Upload</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={styles.ImageBg}>
                        {(UploadUriPath.length >= 0) ?

                            <FlatList
                                data={UploadUriPath}
                                horizontal={true}
                                renderItem={(item) => this.renderItems(item)}
                                keyExtractor={(_, index) => index.toString()}
                            />


                            : (
                                <View style={styles.uploadImg}>
                                    <Image style={styles.ImageBg_2}
                                        source={{ uri: UploadUriPath.path }}></Image>
                                </View>
                            )}

                    </View>

                    <View style={styles.InputBg}>
                        <TextInput
                            style={styles.inputStyle}
                            underlineColorAndroid="#F6F6F7"
                            placeholder="Write a caption..."
                            placeholderTextColor="#9B9B9D"
                            keyboardType="default"
                            returnKeyType="next"
                            onChangeText={(textcaption) => this.setState({ textcaption })}
                            underlineColorAndroid='transparent'
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                            multiline={true}
                        />
                    </View>
                    <Text style={styles.select_text}>Select Sports category</Text>
                    <View>
                        <View style={styles.backgroundLogin} onStartShouldSetResponder={this.showCategoryMenu}>
                            <Menu

                                style={styles.MenuBg}
                                ref={this.setCategoryMenuRef}
                                button={<Text style={styles.MenuText}>{this.state.category_Name}</Text>}>
                                {this.state.sportsList_name.map((item, key) =>
                                    <MenuItem onPress={() => {
                                        this.hideCategoryMenu();
                                        this.Category_Action(item.sports_name, item.sports_id);
                                    }}>
                                        <Text style={styles.menuSelectText}> {item.sports_name}</Text></MenuItem>
                                )}
                                <Image style={styles.Sports} source={require('../../Images/arrow_sports.png')}></Image>
                            </Menu>
                            <Image style={styles.Sports} source={require('../../Images/collapse_arrow.png')}></Image>
                        </View>
                    </View>

                    <Text style={styles.select_text_2}>Select Sub category</Text>
                    <View >
                        <View style={styles.backgroundLogin_2} onStartShouldSetResponder={this.showSubCategoryMenu}>
                            <Menu
                                style={styles.MenuBg}
                                ref={this.setSubCategoryMenuRef}
                                button={<Text style={styles.MenuText}>{this.state.sub_category_Name}</Text>}>
                                {this.state.Sports_category.map((item, key) =>
                                    <MenuItem onPress={() => {
                                        this.hideSubCategoryMenu();
                                        this.SubCategory_Action(item.sub_sports_name, item.sub_sports_id);
                                    }}>
                                        <Text style={styles.menuSelectText}> {item.sub_sports_name}</Text></MenuItem>
                                )}
                                <Image style={styles.Sports} source={require('../../Images/arrow_sports.png')}></Image>
                            </Menu>
                            <Image style={styles.Sports} source={require('../../Images/collapse_arrow.png')}></Image>
                        </View>
                    </View>

                    <View style={styles.NextButton_2}>
                        <Toast ref="customToast" backgroundColor="#fff" textColor='black' />
                    </View>
                    <View style={{ height: 80 }}></View>
                </ScrollView>
                <Loader isLoader={this.state.loading}></Loader>
                <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
            </SafeAreaView>
        )
    }
}
export default UploadPost