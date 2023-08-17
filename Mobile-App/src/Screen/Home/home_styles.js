import { StyleSheet } from 'react-native'

const styles = StyleSheet.create(
    {
        bottom_bar: {
            height: 60,
            flexDirection: 'row',
            marginHorizontal: "5%",
            marginTop: 10
        },
        bottom_image: {
            marginHorizontal: "7%",
            alignItems: 'center',
            marginTop: 10
        },
        homeImage: {
            height: 20,
            width: 20,
        },
        homeImage2: {
            height: 20,
            width: 20,
            borderRadius: 20 / 2
        },

        camera_image: {
            height: 25,
            width: 59
        },
        Top_camera: {
            marginLeft: 15,
            marginTop: "5%",
        },
        logo_timeline: {
            height: 50,
            width: 70,
            alignSelf: 'center', justifyContent: 'center', marginLeft: '15%', marginRight: '15%'
        },
        timer_icon: {
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center',
        },
        homeheader: {
            height: '10%',
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15
        },
        homeheader2: {
            height: '10%',
            backgroundColor: '#000',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15
        },
        notifiaction: {
            height: 25,
            width: 22
        },
        chat_icon: {
            height: 25,
            width: 22
        },
        chat: {
            marginRight: "5%"
        },

        chatCount: {
            width: 16,
            height: 16,
            borderRadius: 16 / 2,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            position: 'absolute',
            bottom: 15,
            left: 20
        },
        chatCount2: {
            width: 16,
            height: 16,
            borderRadius: 16 / 2,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            position: 'absolute',
            bottom: 15,
            left: 10
        },
        chatCount3: {
            width: 20,
            height: 20,
            borderRadius: 20 / 2,
            backgroundColor: '#000',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            position: 'absolute',
            bottom: 18,
            left: 12
        },
        notificationCount: {
            width: 20,
            height: 20,
            borderRadius: 20 / 2,
            backgroundColor: '#000',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            position: 'absolute',
            bottom: 15,
            left: 12
        },
        count: {
            color: "#000",
            fontSize: 8,
            alignSelf: 'center',
            justifyContent: 'center',
            fontFamily: 'Raleway-Bold', marginBottom: 4
        },
        count2: {
            color: "#fff",
            fontSize: 10,
            alignSelf: 'center',
            justifyContent: 'center',
            fontFamily: 'Raleway-Bold', marginBottom: 2,
        },
        msgcount2: {
            color: "#fff",
            fontSize: 10,
            alignSelf: 'center',
            justifyContent: 'center', fontFamily: 'Raleway-Bold', marginBottom: 2
        },
        CardView: {
            width: "93%",
            marginTop: "3%",
            backgroundColor: '#201F27',
            alignSelf: 'center',
            borderRadius: 14,
            borderColor: '#fff',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.9,
            shadowRadius: 3,
            elevation: 5,
            shadowRadius: 10,

        },
        profilepicBg: {
            marginLeft: '2%', width: 50, height: 50, borderRadius: 50 / 2
        },
        user_name: {
            color: '#D3D3D5',
            fontSize: 14,
            fontFamily: 'Raleway-Bold'
        },
        counts_likes2: {
            color: '#000',
            fontSize: 14,
            marginTop: 22
        },
        userType: {
            color: '#D3D3D5',
            fontSize: 10,
            fontFamily: 'Raleway-Regular'
        },
        userType2: {
            color: '#D3D3D5',
            fontSize: 12,
            marginTop: '4%', marginLeft: '6%',
            fontFamily: 'Raleway-Regular'

        },
        more_icon: {
            marginTop: 20,
            marginLeft: 35
        },
        moreImg: {
            width: 30,
            height: 6,
        },
        shareImg: {
            width: 20,
            height: 20,
        },


        share_icon: {
            marginTop: 10,
            marginRight: 20
        },
        fav_icon: {
            marginTop: 10,

        },
        febImg: {
            width: 15,
            height: 20,
        },
        like_bg: {
            height: 25,
            borderRadius: 30,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 5,
            backgroundColor: '#343339', width: 60, justifyContent: 'center'
        },

        comments_bg: {
            height: 25,
            borderRadius: 30,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 5,
            backgroundColor: '#343339', width: 90, justifyContent: 'center'
        },
        comments_bg3: {
            height: 25,
            borderRadius: 30,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 5,
            backgroundColor: '#343339', width: 90, justifyContent: 'center'
        },
        comments_bg2: {
            height: 25,
            borderRadius: 30,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 5,
            backgroundColor: '#343339', width: 90, justifyContent: 'center'
        },

        msg_bg: {
            height: 25,
            borderRadius: 30,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 5,
            backgroundColor: '#343339', width: 90, justifyContent: 'center'
        },
        msg_bg2: {
            height: 25,
            borderRadius: 30,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 5,
            backgroundColor: '#343339', width: 90, justifyContent: 'center'
        },
        like: {
            width: 15,
            height: 15,
        },

        textStyle: {
            color: '#D3D3D5',
            marginLeft: 8,
            fontSize: 10,
            fontFamily: 'Raleway-Regular', alignSelf: 'center'
        },
        counts_likes: {
            color: '#D3D3D5',
            fontSize: 12,
            fontFamily: 'Raleway-Regular'
        },
        bg_likes: {
            marginTop: 22, marginLeft: 5,
        },

        text_likes: {
            color: '#D3D3D5',
            fontSize: 12,
            fontFamily: 'Raleway-Regular',
            marginLeft: 5

        },
        write_post: {
            color: '#D3D3D5',
            flex: .8
        },
        read_more: {
            color: '#D3D3D5',
            fontSize: 12,
            fontFamily: 'Raleway-Regular'
        },
        view_all: {
            color: '#fff',
            fontSize: 14,
            marginLeft: '2%',
            marginTop: 22,
            fontFamily: 'Raleway-Regular'
        },
        view_all2: {
            color: '#D3D3D5',
            fontSize: 12,
            marginLeft: '5%',
            fontFamily: 'Raleway-Regular'
        },
        uploadedTime: {
            color: '#98989B',
            fontSize: 12,
            fontFamily: 'Raleway-Regular'
        },
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
        },
        button: {
            marginVertical: 24,
            marginHorizontal: 24,
        },
        image: {
            marginVertical: 24,
            alignItems: 'center',
        },
        response: {
            marginVertical: 16,
            marginHorizontal: 8,
        },
        SignupModal: {
            backgroundColor: '#15141A',
            borderRadius: 14,
            borderColor: '#15141A',
            shadowColor: '#15141A',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.9,
            shadowRadius: 3,
            elevation: 5,
            shadowRadius: 10,
            marginBottom: 10,
            alignSelf: 'center',
            width: 250,
            height: 200,
            justifyContent: 'center',
            marginTop: '0%'
        },
        JonMarked_Completed_Modal: {
            width: "100%",
            height: 200,
            backgroundColor: '#000',
            alignSelf: 'center',
            borderRadius: 10,
            borderColor: '#ddd',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.9,
            shadowRadius: 3,
            elevation: 5,
            shadowRadius: 10,

        },
        DeletePost: {
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: "10%", marginLeft: "5%"

        },
        DeletePost_1: {
            color: '#fff',
            fontSize: 16,
            alignSelf: 'center',
            justifyContent: 'center',
            fontFamily: 'Raleway-Bold'
        },
        NoBtn: {
            width: '20%',
            height: 35,
            borderColor: '#fff',
            alignItems: 'center',
            marginLeft: "10%",
            marginTop: "5%",
            borderRadius: 20,
            borderWidth: 1, justifyContent: 'center'
        },
        DeletePost_view: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: "5%"
        },
        DeletePost_2: {
            color: '#fff',
            fontSize: 14,
            alignSelf: 'center',
            justifyContent: 'center',
            fontFamily: 'Raleway-Regular'
        },
        video_icon: {
            width: 30,
            height: 30,
            marginRight: "5%"
        },
        BtnView: {
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: "5%"
        },
        InputBg: {
            marginLeft: "5%",


        },
        inputStyle: {
            marginLeft: "5%",
            color: '#F6F6F7',
            width: "100%",
            height: 50,
            fontFamily: 'Raleway-Regular'
        },
        NextButton_2: {
            width: "100%",
            height: 30,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            alignSelf: 'center',
            bottom: 50,
        },
        activityIndicator: {
            position: 'absolute',
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: "50%"

        },
        category: {
            color: '#fff',
            fontSize: 12,
            fontFamily: 'Raleway-Regular',

        },
        category2: {
            color: '#000',
            fontSize: 12,
            fontFamily: 'Raleway-Regular',


        },
        subcategory: {
            color: '#fff',
            fontSize: 12,
            resizeMode: 'contain',
            marginHorizontal: 8,
            fontFamily: 'Raleway-Regular',
        },
        subcategory2: {
            color: '#000',
            fontSize: 12,
            resizeMode: 'contain',
            marginHorizontal: 8,
            fontFamily: 'Raleway-Regular',
        },
        seprator: {
            height: 30,
            width: 1,
            backgroundColor: '#2F2E36',
            marginLeft: 10,

        },
        fitnesssubView: { marginLeft: 50, marginTop: 2, flexDirection: 'row' },
        subcategoryitem: {
            height: 35,
            borderRadius: 10,
            backgroundColor: '#201F27',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginHorizontal: 8,
            marginLeft: 20,
            width: '100%'
        },
        subcategoryitem2: {
            height: 35,
            borderRadius: 10,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginLeft: 20,
            marginHorizontal: 8,
            width: '100%',

        },
        categoryitemList: {
            height: 30,
            borderRadius: 10,
            backgroundColor: '#201F27',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            marginLeft: 25,
            width: '110%',
        },
        categoryitemList2: {
            height: 30,
            borderRadius: 10,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            marginLeft: 25,
            width: '110%',
        }
    }
)
export default styles;