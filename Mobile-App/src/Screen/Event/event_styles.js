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
    searchView: {
        height: 35,
        backgroundColor: '#201F27',
        borderRadius: 20,
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: "1%",
        zIndex: -999,
        marginTop: 10
    },
    backgroundLogin_3: {
        width: "50%",
        borderRadius: 20,
        backgroundColor: '#fff',
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: "3%",
        marginLeft: '15%',

    },
    backgroundLogin_black: {
        width: "48%",
        borderRadius: 20,
        borderColor: '#fff',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 1,
        borderWidth: 1,
        marginLeft: '7%', right: '4%'

    },
    backgroundLogin_white: {
        width: "43%",
        borderRadius: 20,
        borderColor: '#000',
        alignSelf: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        marginLeft: '8%', right: '2%'

    },
    backgroundLogin_4: {
        width: "67%",
        borderRadius: 20,
        borderColor: '#fff',
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: 1,
        height: 25, borderWidth: 1, right: '15%'

    },

    backgroundLogin_4_white: {
        width: "67%",
        borderRadius: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 1,
        height: 25, borderColor: '#000', borderWidth: 1, right: '15%'

    },
    inputStyle2: {
        marginLeft: "5%",
        fontSize: 10,
        color: '#fff',
        width: "85%",
        fontFamily: 'Raleway-Regular', justifyContent: 'center', alignSelf: 'center',
    },

    inputStyle: {
        marginLeft: "5%",
        fontSize: 10,
        color: '#000',
        width: "85%",
        fontFamily: 'Raleway-Regular', justifyContent: 'center', alignSelf: 'center'
    },
    locationView: {
        width: "70%",
        borderRadius: 20,
        backgroundColor: '#fff',
        alignSelf: 'center',
        flexDirection: 'row',
        marginLeft: 20

    },
    fieldBG: {
        flex: .5,
        marginLeft: "5%",
        marginTop: "5%",
        flexDirection: 'row'
    },
    headerText: {
        color: '#fff',
        fontSize: 16,
        alignSelf: 'center',
        marginLeft: 20,
        fontFamily: 'Raleway-Bold'
    },
    headerText2: {
        color: '#000',
        fontSize: 16,
        alignSelf: 'center',
        marginLeft: 20,
        fontFamily: 'Raleway-Bold'
    },
    bottom_bar: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#000',
        alignItems: 'center',
        width: "100%",
        flex: .35
    },
    bottom_image: {

    },

    homeImage: {
        height: 20,
        width: 20,
        marginLeft: 50
    },
    CardView: {
        width: "93%",
        marginTop: "2%",
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
        flex: 2
    },
    subcategoryitem2: {
        height: 30,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginRight: 20,
        width: 40,
        borderColor: '#fff', borderWidth: 1,
        marginHorizontal: 20
    },
    subcategoryitem: {
        height: 30,
        borderRadius: 5,
        backgroundColor: '#201F27',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginRight: 20,
        width: 40,
        borderColor: '#fff', borderWidth: 1,
        marginHorizontal: 20
    },
    subcategory: {
        color: '#fff',
        fontSize: 12,
        marginHorizontal: 5, fontFamily: 'Raleway-Bold', marginTop: 5
    },
    subcategory2: {
        color: '#000',
        fontSize: 12,
        marginHorizontal: 5,
        fontFamily: 'Raleway-Bold', marginTop: 5
    },
    miles: {
        color: '#fff',
        fontSize: 8,
        marginHorizontal: 5,
        fontFamily: 'Raleway-Bold', marginBottom: 5
    },
    miles2: {
        color: '#000',
        fontSize: 8,
        marginHorizontal: 5,
        fontFamily: 'Raleway-Bold', marginBottom: 5
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
        fontFamily: 'Raleway-Bold'
    },
    text_3: {
        color: '#fff',
        fontSize: 12,
        marginTop: 10,
        fontFamily: 'Raleway-Regular'
    },
    text_31: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Raleway-Regular'
    },
    text_5: {
        color: '#fff',
        fontSize: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        fontFamily: 'Raleway-Bold'
    },
    text_6: {
        color: '#fff',
        fontSize: 14,
        alignSelf: 'center',
        justifyContent: 'center',
        marginLeft: "3%",
        fontFamily: 'Raleway-Bold'
    },
    text_4: {
        color: '#989899',
        fontSize: 12,
        marginTop: 10,
        marginRight: "30%",
        fontFamily: 'Raleway-Regular'
    },
    text_41: {
        color: '#989899',
        fontSize: 12,
        marginRight: "30%",
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
        marginLeft: "0%",
        color: '#989899',
        fontSize: 12,
        fontFamily: 'Raleway-Regular'
    },
    registerBoder: {
        width: '60%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 15,
        marginBottom: 10,
    },

    createEventBoder: {
        width: '50%',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 30,
        marginTop: "5%",
        marginBottom: "2%",
        alignSelf: 'center',
        flexDirection: 'row',
    },

    location: {
        width: 8,
        height: 14,
        alignSelf: 'center',
        marginRight: 1
    },
    location2: {
        width: 10,
        height: 15,
        alignSelf: 'center',
        marginRight: 5
    },

    location_event: {
        width: 15,
        height: 15,
    }


})
export default styles;