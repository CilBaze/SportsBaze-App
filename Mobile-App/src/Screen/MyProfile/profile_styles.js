import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    Header_Bg: {
        height: 95,
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15

    },
    Header_Bg2: {
        height: 95,
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
        fontFamily:'Raleway-Bold'
    },
    headerText2: {
        color: '#000',
        marginLeft: "15%",
        fontSize: 18,
        alignSelf: 'center',
        justifyContent: 'center',
        fontFamily:'Raleway-Bold'
    },
    ProfileText: {
        color: '#fff',
        fontSize: 14,
        fontFamily:'Raleway-Bold'
    },
    ProfileText_2: {
        color: '#525156',
        fontSize: 12,
        fontFamily:'Raleway-Regular'
    },
    followersBg: {
        backgroundColor: '#201F27',
        marginTop: "5%",
        flexDirection: 'row',
        height: 70
    },
    followersBg_2: {
        marginTop: "5%",
        flex: 3
    },
    Text_1: {
        color: '#fff',
        fontSize: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        fontFamily:'Raleway-Regular'
    },
    Text_2: {
        color: '#fff',
        fontSize: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        fontFamily:'Raleway-Regular'
    },
    Text_3: {
        color: '#fff',
        marginLeft: "5%",
        fontSize: 16,
        alignSelf: 'center',
        justifyContent: 'center',
        fontFamily:'Raleway-Regular'
    },
    userdetails: {
        flexDirection: 'row',
        backgroundColor: '#1D1C24',
        height: 55,
        marginHorizontal: "5%",
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },

    userdetails_2: {
        flexDirection: 'row',
        backgroundColor: '#1D1C24',
        height: 55,
        marginHorizontal: "5%",
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: "4%"
    },
    userDetails_icon: {
        width: 20,
        height: 20,
        marginLeft: "8%"
    },
    bottom_bar: {
        height: "7%",
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#000',
        alignItems: 'center', justifyContent: 'center'
    },
    bottom_image: {
        marginLeft: "8%"
    },
    homeImage: {
        height: 20,
        width: 20,
        marginLeft: 20
    },
    camera_image: {
        height: 20,
        width: 25
    },

    homeImage2: {
        height: 20,
        width: 20,
        borderRadius: 20 / 2
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
})
export default styles;