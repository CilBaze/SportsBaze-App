
import * as React from 'react';
import { View, Text, Image, Keyboard, Alert } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './mypostcomment_styles'
import { requestPostApiMedia, commentsPost } from '../../NetworkCall/Service';
import { getAsyncStorage } from '../../Routes/AsynstorageClass';
import Toast from 'react-native-custom-toast';
import moment from 'moment';
import { requestDeleteApiMedia, delete_comments } from '../../NetworkCall/Service';
import Modal from 'react-native-modal';
import { requestGetApi, myPost } from '../../NetworkCall/Service';
import AppLoader, { hideLoader, loaderRef, showLoader } from '../AppLoader';
import NetInfo from "@react-native-community/netinfo";
import HeaderScreen from '../header';
import CustomAlert from '../CustomAlert';


let postId = ''
let PostData_arr = []
let deleted_comment_id = ''
let user_profile_pic = ''
let publicProfile = ''
class MyPostComments extends React.Component {

    constructor() {
        super()
        this.state = {
            post_comments: '',
            comments_list: [],
            setCurrentDate: '',
            isModalVisible: false,
            selectedItemIndex: 0,
            item_selected: '',
            profileImage: '',
            comment_by: '',
            commnetUserId: '',
            Alert_Visibility: false,
            alert_msg: ''
        }
    }

    GoBack = () => {
        this.props.navigation.goBack()
    }
    onPostComments = async () => {
        this.textInput.clear()
        let token = await getAsyncStorage('tokenkey');
        if (this.state.post_comments == '') {
            this.refs.customToast.showToast("Please enter comment", 5000);
            return;
        }
        const formData = new FormData()
        formData.append('post_id', postId)
        formData.append('comments', this.state.post_comments)

        const { responseJson, err } = await requestPostApiMedia(commentsPost, formData, 'POST', token)
        console.log("commentsform data", formData)
        console.log("Response of PostunComments", JSON.stringify(responseJson.data.comment_id))
        if (responseJson.status == true) {
            this.state.comments_list.splice(0, 0, { "comments": this.state.post_comments, "comment_by": this.state.comment_by, "profile_pic": this.state.profileImage, "comment_id": responseJson.data.comment_id })
            this.setState({ post_comments: '' })
        } else {

            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
        }
    }

    async componentDidMount() {
        this.CheckConnectivity();
        this.setState({ comments_list: PostData_arr });

        user_profile_pic = await getAsyncStorage('ProfilePic');
        let first_name = await getAsyncStorage('FisrtName');
        let last_name = await getAsyncStorage('LastName');
        this.setState({ comment_by: first_name + " " + last_name });

        this.setState({ profileImage: user_profile_pic })

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
    GetdateTime = (created_date) => {
        return moment(created_date).fromNow();
    }

    toggleModal(comment_id, index) {
        console.log("comment_id", comment_id)
        this.setState({
            isModalVisible: !this.state.isModalVisible, selectedItemIndex: index, item_selected: comment_id

        });
    };


    NoClick() {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    deletePost = async () => {
        let arr = []
        this.state.comments_list.map((item, index) => {
            if (index != this.state.selectedItemIndex) {
                arr.push(item)
            }
            deleted_comment_id = index.comment_id
        })
        this.setState({ comments_list: arr, isModalVisible: false, selectedItemIndex: 0 })
        console.log("id:::", this.state.item_selected)
        showLoader();
        let token = await getAsyncStorage('tokenkey');
        console.log("token", token)
        var details = {
            'comment_id': this.state.item_selected
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        const { responseJson, err } = await requestDeleteApiMedia(delete_comments, formBody, 'DELETE', token)
        console.log("Response of delete +++++++++++++++++++++++++++", (responseJson))
        hideLoader();
        if (responseJson.status == true) {

            // this.refs.customToast.showToast("sucess..", 5000);
        } else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: responseJson.message })
        }
    }



    getValue = (item, index) => {


        return (
            <View>
                <View style={{ flexDirection: 'row' }} >
                    <View style={styles.Profileimgbg_2} >
                        {item.profile_pic == '' || item.profile_pic == null ? <Image style={styles.profile_img}
                            source={require('../../Images/ic_profile.png')} /> :

                            <Image style={styles.profile_img}
                                source={{ uri: item.profile_pic }} />
                        }</View>
                    <Text style={styles.WriteComments_2}>{this.GetdateTime(item.created_date)}</Text>
                    <View style={{ marginTop: "5%", marginLeft: "2%" }}>
                        <TouchableOpacity onPress={() => this.toggleModal(item.comment_id, index)}>
                            <Text style={styles.WriteComments}>{item.comment_by}</Text>
                            <Text style={styles.postDay}>{item.comments}</Text>
                        </TouchableOpacity>
                    </View>


                </View>
                <View style={styles.bottom_Underline}></View>
            </View>
        )
    }

    // getUploadPostList = async () => {
    //         const body = {
    //         }

    //         let token_value = await getAsyncStorage('tokenkey');


    //         console.log("token:::", token_value);
    //         const { responseJson, err } = await requestGetApi(myPost, body, 'GET', token_value)
    //         console.log("uploadPost Response------------", responseJson)

    //         if (responseJson.status == true) {
    //             hideLoader()
    //             console.log('uploadPost--------:::::::::::::', responseJson.data.records);
    //             PostData_arr = responseJson.data.records;
    //             let arrlist = [];
    //             console.log("data::::::::::============", responseJson.data.post_likes)
    //             this.setState({ PostData_list: PostData_arr })
    //         } else {
    //             hideLoader()
    //         }
    //     }
    render() {
        const { navigate } = this.props.navigation;
        postId = this.props.route.params.postId;
        PostData_arr = this.props.route.params.post_comments;
        console.log('PostData_list::::::', PostData_arr);
        publicProfile = this.props.route.params.publicProfile;


        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>
                <HeaderScreen title='Comments' navigation={this.props.navigation} />
                <View style={styles.CommentInput_2}>
                    <AppLoader ref={loaderRef} />
                    {this.state.comments_list.length > 0 ?
                        <FlatList data={this.state.comments_list}
                            renderItem={({ item, index }) =>

                                this.getValue(item, index)

                            }
                            keyExtractor={(_, index) => index.toString()}
                        />
                        :
                        <Text style={{ color: '#fff', alignSelf: 'center', marginTop: "20%", fontSize: 18, fontFamily: 'Raleway-Regular' }}>No comments</Text>
                    }

                </View>

                <View style={styles.NextButton_2}>
                    <Toast ref="customToast" backgroundColor="#fff" textColor='black' />
                </View>
                <View style={styles.CommentInput}>
                    <View style={styles.Profileimgbg} >

                        {this.state.profileImage == '' || this.state.profileImage == null ? <Image style={styles.profile_img_2}
                            source={require('../../Images/ic_profile.png')} /> :
                            <Image style={styles.profile_img_2}
                                source={{ uri: this.state.profileImage }} />
                        }
                    </View>
                    <TextInput
                        style={styles.inputStyle}
                        underlineColorAndroid="#F6F6F7"
                        placeholder="Add a comment..."
                        placeholderTextColor="#9B9B9D"
                        keyboardType='default'
                        returnKeyType="next"
                        onChangeText={(post_comments) => this.setState({ post_comments })}
                        underlineColorAndroid='transparent'
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        multiline={true}
                        ref={input => { this.textInput = input }} />

                    <TouchableOpacity style={styles.PostBg} onPress={this.onPostComments}>
                        <Text style={styles.textPost}>Post</Text>
                    </TouchableOpacity>

                </View>


                {
                    this.state.isModalVisible

                        ?

                        <Modal
                            activeOpacity={1}
                            backdropColor="transparent"
                            isVisible={this.state.isModalVisible}
                            style={{ width: "100%", alignSelf: 'center' }}
                            onRequestClose={() => { this.setState({ isModalVisible: false }) }}>
                            <View style={styles.JonMarked_Completed_Modal}>
                                <View style={styles.DeletePost_view}>
                                    <Text style={styles.DeletePost_1}>Delete Comment</Text>
                                </View>
                                <Text style={styles.DeletePost}>Are you sure you want to delete
                                        </Text>
                                <Text style={styles.DeletePost_3}>comment?</Text>
                                <View style={styles.BtnView}>
                                    <View style={styles.NoBtn} onStartShouldSetResponder={() => this.NoClick()}>
                                        <Text style={styles.DeletePost_2}>No</Text>
                                    </View>

                                    <View style={styles.NoBtn} onStartShouldSetResponder={() => this.deletePost()}>
                                        <Text style={styles.DeletePost_2}>Yes</Text>
                                    </View>

                                </View>
                            </View>
                        </Modal>
                        :
                        null
                }
                <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
            </SafeAreaView>
        )
    }

}
export default MyPostComments;