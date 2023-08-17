import { StyleSheet } from 'react-native'

const styles = StyleSheet.create(
    {
        Headerbg: {
            backgroundColor: '#000',
            flexDirection: 'row',
            alignItems: 'center',
            height: 90
        },

        Headerbg2: {
            backgroundColor: '#000',
            flexDirection: 'row',
            alignItems: 'center',
            height: 80,
        },
        msgHeader: {
            backgroundColor: '#000',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15
        },
        msgHeader2: {
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15
        },
        comments: {
            color: '#fff',
            alignSelf: 'center',
            fontSize: 20,
            marginLeft: "27%",
            fontWeight: 'bold'

        },
        comments4: {
            color: '#fff',
            alignSelf: 'center',
            fontSize: 16,
            marginLeft: "5%",
            fontFamily: 'Raleway-Bold', marginTop: 5
        },
        comments42: {
            color: '#000',
            alignSelf: 'center',
            fontSize: 20,
            marginLeft: "5%",
            fontFamily: 'Raleway-Bold'
        },
        searchView: {
            height: 50,
            marginTop: '2%',
            backgroundColor: '#15141A',
            borderRadius: 20,
            marginHorizontal: '5%',
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1
        },
        searhList: {
            backgroundColor: '#15141A',
            borderRadius: 20,
            flexDirection: 'row',
            marginLeft: "10%",
            marginHorizontal: '5%',
            marginBottom: 10
        },
        searhList2: {
            backgroundColor: '#15141A',
            borderRadius: 20,
            flexDirection: 'row',
            marginLeft: "10%",
            marginHorizontal: '5%',
            marginBottom: 10,
            marginTop: '10%'
        },
        Header_Bg: {
            height: 80,
            backgroundColor: '#000',
            flexDirection: 'row',
            alignItems: 'center'

        },
        headerText: {
            color: '#fff',
            marginLeft: "15%",
            fontSize: 18,
            alignSelf: 'center',
            justifyContent: 'center',
            fontFamily: 'Raleway-Bold',
        },
        Header_Bg2: {
            height: 80,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center'

        },
        headerText2: {
            color: '#000',
            marginLeft: "15%",
            fontSize: 18,
            alignSelf: 'center',
            justifyContent: 'center',
            fontFamily: 'Raleway-Bold',
        },
        underline: {
            width: 300,
            borderWidth: .5,
            color: '#989899',
            marginTop: 10, marginBottom: 10
        },
        CommentInput_2: {
            marginTop: "5%",
            flex: 6
        },
        backBtn: {
            marginLeft: 20,
            alignSelf: 'center', justifyContent: 'center'
        },
        createEventBoder: {
            width: '70%',
            height: 35,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#fff',
            borderWidth: 1,
            borderRadius: 30,
            marginTop: "10%",
            marginBottom: "2%",
            alignSelf: 'center',
            backgroundColor: '#fff', flexDirection: 'row',
            backgroundColor: '#201F27'
        },
        text_6: {
            color: '#fff',
            fontSize: 14,
            alignSelf: 'center',
            justifyContent: 'center',
            marginLeft: "3%",
            fontFamily: 'Raleway-Bold'
        },
        CommentInput: {
            backgroundColor: '#000',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 80
        },
        CommentInput3: {
            backgroundColor: '#000',
            flexDirection: 'row',
            height: 100,
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        inputStyle: {
            color: '#fff',
            fontSize: 15,
            margin: 20,
            flex: 1,
            fontFamily: 'Raleway-Regular'

        },
        profile_img: {
            height: 30,
            width: 30,
            borderRadius: 30 / 2
        },
        profile_img_2: {
            height: 30,
            width: 30,
            borderRadius: 30 / 2,
            marginTop: 8
        },
        Profileimgbg: {
            alignSelf: 'center', justifyContent: 'center',
            alignItems: 'center', flexDirection: 'row', marginLeft: '5%'

        },
        Profileimgbg_2: {
            marginTop: "5%",
            marginLeft: "5%",
        },
        textPost: {
            color: "#fff",
            fontSize: 16,
            fontFamily: 'Raleway-Bold'
        },
        PostBg: {
            margin: 20,
            height: 50
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
        bottom_Underline: {
            height: 1,
            backgroundColor: '#000',
            marginTop: "3%"
        },
        WriteComments: {
            color: "#fff",
            fontSize: 11,
            width: 250,
            fontFamily: 'Raleway-Regular'

        },
        msText: {
            color: "#808084",
            fontSize: 8,
            width: "35%",
            fontFamily: 'Raleway-Regular',
        },
        count: {
            color: "#000",
            fontSize: 10,
            alignSelf: 'center',
            justifyContent: 'center',
            fontFamily: 'Raleway-Bold', marginBottom: 3
        },
        chatCount: {
            width: 20,
            height: 20,
            borderRadius: 20 / 2,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        },
        WriteComments2: {
            color: "#000",
            fontSize: 10,
            marginRight: 20,
            maxWidth: 150, fontFamily: 'Raleway-Regular'
        },
        WriteComments3: {
            color: "#000",
            fontSize: 10,
            fontFamily: 'Raleway-Regular'
        },
        TextTime: {
            color: '#000',
            fontSize: 8,
            marginLeft: 5,
            fontFamily: 'Raleway-Regular'
        },
        WriteComments_2: {
            color: "#7F7E87",
            fontSize: 8,
            position: 'absolute',
            right: "5%",
            top: "40%",
            fontFamily: 'Raleway-Regular'
        },
        postDay: {
            color: "#7F7E87",
            fontSize: 10,
            width: 250,
            fontFamily: 'Raleway-Regular'
        },
        textColor: {
            color: '#fff',
            fontWeight: 'bold'
        },
        textColor_2: {
            color: '#fff',

        },

        bottom_bar: {
            flexDirection: 'row',
            marginTop: 10,
            backgroundColor: '#000',
            height: 50, alignItems: 'center'
        },
        bottom_image: {
            marginHorizontal: "7%",
            alignItems: 'center',
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

    }
)

export default styles;