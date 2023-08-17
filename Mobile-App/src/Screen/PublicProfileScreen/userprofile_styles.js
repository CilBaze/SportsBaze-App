import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    Header_Bg: {
        flex: .5,
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15

    },
    Header_Bg2: {
        flex: .5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15

    },
    fieldBG: {
        flex: .5,
        marginLeft: "5%",
        marginTop: "5%",
        flexDirection: 'row'
    },
    headerText: {
        color: '#fff',
        marginLeft: "15%",
        fontSize: 18,
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'

    },
    headerText2: {
        color: '#000',
        marginLeft: "15%",
        fontSize: 18,
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'

    },
    ProfileText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Raleway-Bold', width: 150
    },
    userGN: {
        color: '#fff',
        fontSize: 10,
        fontFamily: 'Raleway-Regular'
    },
    ProfileText_2: {
        color: '#fff',
        fontSize: 12,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    Following: {
        color: '#fff',
        fontSize: 10,
        fontFamily: 'Raleway-Regular'

    },
    followingBg: {
        width: 80,
        height: "50%",
        borderColor: '#fff',
        borderWidth: 1,
        alignItems: 'center',
        marginTop: "5%",
        borderRadius: 10,
        justifyContent: 'center',
        left: '35%',
    },
    followersBg: {
        backgroundColor: '#201F27',
        alignItems: 'center',
        flexDirection: 'row',
        height: 60
    },

    Text_1: {
        color: '#fff',
        marginLeft: "14%",
        fontSize: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: '5%',
        fontFamily: 'Raleway-Regular'
    },
    Text_2: {
        color: '#fff',
        marginLeft: "14%",
        fontSize: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        fontFamily: 'Raleway-Regular'
    },
    bottom_bar: {
        flex: .3,
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#343339',
        alignItems: 'center'
    },
    bottom_image: {
        marginHorizontal: "8%",
        alignItems: 'center',
        flex: .3
    },
    homeImage: {
        height: 20,
        width: 20
    },
    camera_image: {
        height: 20,
        width: 25
    },
    Top_camera: {
        marginLeft: "5%",
        marginTop: "5%",
        flex: .3
    },
    logo_timeline: {
        height: 50,
        width: 70
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
    user_name: {
        color: '#D3D3D5',
        fontSize: 14,
        fontFamily: 'Raleway-Bold'
    },
    userType: {
        color: '#D3D3D5',
        fontSize: 12, fontFamily: 'Raleway-Regular'
    },
    userType2: {
        color: '#D3D3D5',
        fontSize: 12,
        marginTop: '4%', marginLeft: '6%',
        fontFamily: 'Raleway-Regular'

    },

    more_icon: {
        marginTop: 20,

    },
    more_icon_2: {
        marginLeft: "0%",
        position: 'absolute',
        top: "31%",
        left: "50%",
        width: "25%",
        backgroundColor: '#1D1C24'
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
        marginLeft: 20
    },
    fav_icon: {
        marginTop: 8,
        marginLeft: 25
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
        backgroundColor: '#343339', width: 100, justifyContent: 'center',marginLeft:'20%',
    },
    comments_bg2: {
        height: 25,
        borderRadius: 30,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
        backgroundColor: '#343339', width:90, justifyContent: 'center',marginLeft:'20%',
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
        marginTop: 25, marginLeft: 5,
    },
    text_likes: {
        color: '#D3D3D5',
        fontSize: 12,
        fontFamily:'Raleway-Regular',
        marginLeft:5
    },
    view_all2: {
        color: '#D3D3D5',
        fontSize: 12,
        marginLeft: '5%',
        fontFamily: 'Raleway-Regular'
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
        marginLeft: '5%',
        marginTop: 25
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
        height: 200
    },
    JonMarked_Completed_Modal: {
        width: "100%",
        height: 200,
        backgroundColor: '#000',
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: '#000',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 5,
        shadowRadius: 10,
        position: 'absolute',
        bottom: "-1%",
    },
    DeletePost_2: {
        color: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 14,
        fontFamily: 'Raleway-Bold'

    },
    DeletePost_3: {
        color: '#fff',
        fontSize: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        fontFamily: 'Raleway-Regular'
    },
    DeletePost: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Raleway-Bold',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: "10%", marginLeft: "5%"

    },
    DeletePost_1: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    NoBtn: {
        width: "30%",
        height: 35,
        borderColor: '#fff',
        alignItems: 'center',
        marginTop: "2%",
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: "5%", justifyContent: 'center', marginHorizontal: '5%'
    },
    DeletePost_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "5%"
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
        justifyContent: 'space-between',
        marginTop: "8%"

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

    }

})
export default styles;