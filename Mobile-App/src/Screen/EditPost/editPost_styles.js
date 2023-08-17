import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    text: {
        color: '#fff',
        fontSize: 16,
        fontFamily:'Raleway-Bold'
    },
    text2: {
        color: '#000',
        fontSize: 16,
        fontFamily:'Raleway-Bold'
    },
    UploadText: {
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 70,
        alignItems: 'center'
    },
    UploadText2: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 70,
        alignItems: 'center'
    },
    textbg: {
        marginHorizontal: "8%",
        marginVertical: "5%"
    },
    textbg2: {
        marginHorizontal: "8%",
        marginVertical: "5%"
    },
    ImageBg: {

        height: 150,
        flexDirection: 'row',
        marginTop: "10%",
        marginHorizontal: "5%",

    },
    ImageBg_2: {
        height: 100,
        flexDirection: 'row',
        borderRadius: 10


    },
    uploadImg: {
        width: 130,
        height: 100,
        borderRadius: 8,
        alignSelf: 'center',
        marginLeft: "5%"
    },
    inputStyle: {
        marginLeft: "5%",
        color: '#F6F6F7',
        width: 180,
        fontSize: 14,
        fontFamily:'Raleway-Regular'
    },
    InputBg: {
        alignSelf: 'center',
        marginLeft: "5%",
        marginRight: 10

    },
    select_text: {
        color: '#F8F8F8',
        fontSize: 16,
        marginLeft: "8%",
        marginTop: "8%",
        fontFamily:'Raleway-Regular'
    },
    select_text_2: {
        color: '#F8F8F8',
        fontSize: 16,
        marginLeft: "8%",
        marginTop: "5%",
        fontFamily:'Raleway-Regular'
    },
    backgroundLogin: {
        width: "85%",
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#1D1C24',
        marginTop: "5%",
        alignSelf: 'center',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center'
    },

    backgroundLogin_2: {
        width: "85%",
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#1D1C24',
        alignSelf: 'center',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        marginTop: "5%",
    },
    Sports: {
        position: 'absolute',
        right: "5%",
        alignSelf: 'center'

    },
    MenuText: {
        color: "#D2D2D3",
        marginLeft: "15%",
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 14,
        marginBottom: 5
    },
    MenuBg: {
        width: "83%",
        backgroundColor: '#1D1C24',
        marginTop: "1%"
    },
    menuSelectText: {
        color: "#D2D2D3",
        marginLeft: "8%",
        fontFamily:'Raleway-Regular'
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

    bottom_bar: {
        height: 80,
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#000'
    },
    bottom_image: {
        marginHorizontal: "7%",
        alignItems: 'center',
        width: 25, height: 25
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
        height: 20,
        width: 20,

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