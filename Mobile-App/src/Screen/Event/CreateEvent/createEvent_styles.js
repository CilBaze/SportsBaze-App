import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    Header_Bg: {
        backgroundColor: '#343339',
        flexDirection: 'row',
        alignItems: 'center',
        height: 80

    },
    headerText: {
        color: '#fff',
        marginLeft: "15%",
        fontSize: 18,
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'

    },
    bottom_bar: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#000',
        alignItems: 'center',
        width: "100%",
        flex: .25
    },
    bottom_image: {
        marginHorizontal: "8%",
        alignItems: 'center',

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
    backgroundLogin: {
        width: "85%",
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#1D1C24',
        marginTop: "12%",
        alignSelf: 'center',
        flexDirection: 'row',
        height: 50
    },

    backgroundLogin_2: {
        width: "85%",
        height:80,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#1D1C24',
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: "5%",
        marginTop: "3%",
    },
    backgroundLogin_datePicker: {
        width: "85%",
        height: 80,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#1D1C24',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: "3%",
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    backgroundLogin_3: {
        width: "85%",
        borderRadius: 20,
        backgroundColor: '#1D1C24',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 10,
    },
    inputStyle: {
        marginLeft: "5%",
        fontSize: 14,
        color: '#D2D2D3',
        width: "90%",
        fontFamily:'Raleway-Regular'
    },
    inputStyle2: {
        color:'#fff',
        width:'90%',
        marginLeft: "5%",
        alignSelf:'center',
        fontSize:14,
        height:80,
        textAlignVertical: 'top',
        top:5,
        fontFamily:'Raleway-Regular'
    },
    location: {
        width:15,
        height:20,
        marginTop: 10,
        marginRight: 20
    },
    location_btn: {
        marginTop: 10,
        marginRight: 20
    },
    createEventBoder: {
        height:40,
        width: "35%",
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 30,
        marginBottom: "5%",
        alignSelf: 'center',
        flexDirection: 'row',

    },
    createtouch: {
        width: "100%",
        height: '100%',
        alignSelf: 'center', justifyContent: 'center',

    },
    text_5:{
        color:'#fff',
        fontSize:16,
        alignSelf:'center',
        justifyContent:'center',
        fontFamily:'Raleway-Bold'
    },
    text_6: {
        color: '#000',
        fontSize:18,
        alignSelf: 'center',
        justifyContent: 'center',
        marginLeft: "3%"
    },
})

export default styles;