import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    Header_Bg: {
        backgroundColor: '#343339',
        flexDirection: 'row',
        alignItems: 'center',
        height:80

    },
    headerText: {
        color: '#fff',
        marginLeft: "15%",
        fontSize: 18,
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight:'bold'

    },
    bottom_bar: {
        flex: .25,
        flexDirection: 'row',
        marginTop:10,
        backgroundColor:'#000',
        alignItems:'center'
    },
    bottom_image: {
        marginHorizontal: "8%",
       alignItems:'center',
    },
   
    NextButton_2:{
        width:"100%",
        height:30,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        alignSelf:'center',
        bottom:50,     
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
        marginTop: "8%",
        alignSelf:'center',
        flexDirection:'row',
        marginBottom:"5%",
        height:50
    },

    backgroundLogin_2: {
        width: "85%",
        height:80,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#1D1C24',
        alignSelf:'center',
        flexDirection:'row',
        marginBottom:"5%",
        height:50
    },
    backgroundLogin_3: {
        width: "85%",
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#1D1C24',
        alignSelf:'center',
        flexDirection:'row',
        marginBottom:"5%",
        height:50
    },
    backgroundLogin_4: {
        width: "85%",
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#1D1C24',
        alignSelf:'center',
        flexDirection:'row',
        marginBottom:"5%",
    },
    inputStyle: {
        marginLeft: "5%",
        fontSize:14,
        color:'#D2D2D3',
        width: "80%",
        fontFamily: 'Raleway-Regular'
    },
    inputStyle2: {
        marginLeft: "5%",
        fontSize:14,
        color:'#D2D2D3',
        width: "85%",
        marginTop:5,
        fontFamily: 'Raleway-Regular',
    },
    location:{
        width:15,
        height:20,
        marginTop:8,
    },
    location2:{
        width:15,
        height:20,
        alignSelf:'center',justifyContent:'center',
        marginRight:20
    },
    location_btn:{
       marginTop:"45%"
    },
    createEventBoder:{
        width:"30%",
        height:"40%",
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:30,
        marginTop:"10%",
        marginBottom:"5%",
        alignSelf:'center',
        flexDirection:'row',
        
    },
    text_6:{
        color:'#fff',
        fontSize:18,
        alignSelf:'center',
        justifyContent:'center',
        marginLeft:"3%",
        fontFamily: 'Raleway-Bold',marginBottom:5
    },
})

export default styles;