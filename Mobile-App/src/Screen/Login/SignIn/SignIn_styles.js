import { StyleSheet } from 'react-native'
import { create } from 'react-test-renderer'

const styles = StyleSheet.create({

    LoginHeader: {
        height: 320,
        width:'100%',
    },
    ForgetHeader: {
      width:20,
      height:20,
      alignSelf:'center',
       justifyContent:'center',
    },
    ForgetText: {
        color: '#fff',
       fontSize:16,marginLeft:"25%",
       alignSelf:'center',justifyContent:'center'
    },
    ForgetText2: {
        color: '#fff',
        fontFamily:'Raleway-Regular',
        fontSize:14
    },
    LoginInputs: {
        flex: 3.5,
        flexDirection: 'column',

    },
    LoginText: {
        color: '#F1F1F1',
        marginTop: "10%",
        fontSize: 16,
        marginLeft: "15%",
        fontFamily:'Raleway-Regular'
    },

    PasswordText: {
        color: '#F1F1F1',
        marginTop: "5%",
        fontStyle: 'normal',
        fontSize: 16,
        marginLeft: "15%",
        fontFamily:'Raleway-Regular'
    },
    backgroundLogin: {
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#1C1B23',
        marginTop: "2%",
       marginHorizontal:"10%",
       justifyContent:'center'

    },

    ForgetEmail: {
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#1C1B23',
        marginTop: "2%",
        marginHorizontal:"10%",
        alignItems:'center'
       
    },
    datePicker: {
        width: "80%",
        height:50,
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
    meassage: {
        height: 90,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#1C1B23',
        marginTop: "2%",
        marginHorizontal:"10%",
       
    },
    forgetinputStyle: {
      color:'#fff',
       width:'90%',
       alignSelf:'center',
       fontSize:14,
       height:50,
       fontFamily:'Raleway-Regular'
    },
    backgroundLogin_2: {
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#1C1B23',
        marginTop: "2%",
        marginHorizontal:"10%",
        alignItems:'center',
        flexDirection: 'row',
        
    },
    msginputStyle: {
        color:'#fff',
        padding:10,
        height: 90,
        textAlignVertical: 'top',
        marginLeft:10,
        top:5,
        fontFamily:'Raleway-Regular'
    },
    inputStyle: {
        marginLeft: "5%",
        color:'#fff',
        justifyContent:'center',
        fontFamily:'Raleway-Regular',
        flex:1,fontSize:14
    },
  
    forgetBackGround: {
        margin:16,
        alignItems:'center'
    },
    SignIn_Btn: {
        height:50,
        width: 200,
        borderColor: '#fff',
        borderRadius: 30,
        alignItems: 'center',
        alignSelf:'center',
        justifyContent:'center',
        marginTop:10,
        borderWidth:1
       
    },


    SignIn_BtnBG: {
        borderRadius: 30,
        borderWidth: 1,
        margin:16,borderColor:'#131219',
        height:80,backgroundColor:'#131219'
        
    },
    ForgetNextBtnBG: {
        height: 45,
        width: "40%",
        backgroundColor: '#fff',
        borderRadius: 30,
        borderWidth: 1,
        marginTop: "7%",
        marginBottom: "5%",
        alignItems: 'center',
        alignSelf:'center',
        justifyContent:'center'
    },
    registerBoder:{
        width:140,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:30,
        marginTop:'8%',
        marginBottom:10,
        alignSelf:'center',
    },
    text_5:{
        color:'#fff',
        fontSize:16,
        alignSelf:'center',
        justifyContent:'center',
        fontFamily:'Raleway-Bold'
    },
    SignInText: {
        fontSize: 16,
        alignSelf:'center',
        justifyContent:'center',
        color:'#fff',
        fontFamily:'Raleway-Bold'
        
    },
    SignInText2: {
        fontSize: 18,
        alignSelf:'center',
        justifyContent:'center',
    },
    SignUpText: {
        marginTop: "1%",
        marginBottom: "2%",
        alignSelf: 'center',
        flexDirection: 'row',
        fontSize: 14,
    },
    SignUp: {
        color: '#fff',
        marginLeft: 2,
        fontSize: 14,
        alignSelf: 'center',
        marginBottom: "1%",
        fontFamily:'Raleway-Regular'
    },
    NextButton_2:{
        width:"115%",
        height:30,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        alignSelf:'center',
        bottom:50,    
    },

    NextButton:{
        height:80,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center', 
        marginBottom:30
    },
    createPasswordText: {
        color: '#9B9B9D',
        marginTop: "1%",
        fontFamily:'Raleway-Regular',
        fontSize: 10,
        marginLeft: "15%"
    },
    ModalSuccess:{
       width:250,
       backgroundColor:'#fff',
       alignSelf:'center',
       borderRadius:20,
       alignItems:'center',
       justifyContent:'center'
    },
    SignupModal: {
        backgroundColor: '#000',
        borderRadius: 14,
        borderColor: '#fff',
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 5,
        shadowRadius: 10,
        marginBottom: 10,
       position:'absolute',
       width:"100%",
       bottom:"-5%"

    },
    UserBg: {

        height: "12%",
        width: "70%",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#1C1C22',
        alignSelf: 'center',
        marginBottom:20,

    },

    UserBg2: {

        height: "12%",
        width: "70%",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        alignSelf: 'center',
        backgroundColor:'#fff',
        flexDirection:'row'

    },

    UserBg3: {

        height: "12%",
        width: "70%",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: "30%",
        alignSelf: 'center',
        backgroundColor:'#fff',
        flexDirection:'row'

    },

    UserBg4: {

        height: "12%",
        width: "70%",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: "30%",
        alignSelf: 'center',
        flexDirection:'row',
        backgroundColor:'#1C1C22'

    },
    fontText: {
        color: '#ACACAF',
        fontSize: 16,
        fontFamily:'Raleway-Regular'

    },
    fontText_2: {
        color: '#ACACAF',
        fontSize: 16,
        marginLeft:10,
        fontFamily:'Raleway-Regular'

    },
    text: {
        marginBottom: "10%",
        alignSelf: 'center',
        color: '#F5F5F5',
        fontSize: 18,
        marginTop: "10%",
        fontFamily:'Raleway-Regular'
    }


})

export default styles