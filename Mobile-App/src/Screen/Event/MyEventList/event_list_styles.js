import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    Header_Bg: {
        height: 80,
        backgroundColor: '#343339',
        flexDirection: 'row',
        alignItems: 'center'

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
    viewattendeesText: {
        color: '#fff',
        marginLeft: "8%",
        fontSize: 18,
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    bottom_bar: {
        flex: .25,
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#000',
        alignItems: 'center',
        width: "100%"
    },
    bottom_image: {
        marginHorizontal: "8%",
        alignItems: 'center',
    },


    CardView: {
        width: "95%",
        marginTop: "6%",
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
    homeImage: {
        height: 20,
        width: 20
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
    tex1: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Raleway-Regular'
    },
    text_3: {
        color: '#fff',
        fontSize: 14,
        marginTop: "2%",
        fontFamily: 'Raleway-Regular'
    },
    text_5: {
        color: '#fff',
        fontSize: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        fontFamily: 'Raleway-Regular'
    },
    text_6: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center',
        marginLeft: "3%"
    },
    text_4: {
        color: '#989899',
        fontSize: 14,
        marginTop: "2%",
        width: "70%",
        fontFamily: 'Raleway-Regular'
    },
    underline: {
        width: "100%",
        borderWidth: 1,
        color: '#989899',
        marginTop: "3%"
    },
    text_2: {
        color: '#fff',
        marginLeft: "3%",
        color: '#989899',
        fontSize: 14,fontFamily: 'Raleway-Regular'
    },
    registerBoder: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 30,
        width: 80,
        height: 35,
        marginHorizontal: "2%"
    },
    ViewAttendees: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 30,
        height: 35,
        width: 123,
        marginHorizontal: "2%"
    },
    createEventBoder: {
        width: "40%",
        height: "40%",
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 30,
        marginTop: "10%",
        marginBottom: "5%",
        alignSelf: 'center',
        flexDirection: 'row',

    },
    location: {
        width: 15,
        height:20,
       marginTop:2
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
        bottom: "-3%",
        alignItems: 'center'
    },
    DeletePost: {
        color: '#fff',
        fontSize:14,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: "5%",
        marginLeft: "0%",
        fontFamily: 'Raleway-Bold'
    },

    DeletePost_3: {
        color: '#fff',
        fontSize:14,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: "1%",
        marginLeft: "0%",
        fontFamily: 'Raleway-Bold'
    },
    DeletePost_1: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    DeletePost_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "5%"
    },
    DeletePost_2: {
        color: '#fff',
        fontSize: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        fontFamily: 'Raleway-Bold'
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
        marginTop: "8%"
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


})
export default styles;