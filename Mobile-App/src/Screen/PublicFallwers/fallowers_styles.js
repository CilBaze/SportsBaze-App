import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    Header_Bg: {
        flex: .5,
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
        fontWeight:'bold'

    },
    ProfileText: {
        color: '#fff',
        fontSize: 14,
        fontFamily:'Raleway-Bold'
     },
    ProfileText_2: {
        color: '#525156',
        fontSize: 18,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    Following: {
        color: '#fff',
        fontSize: 10,
        fontFamily:'Raleway-Regular'
            
    },
    followingBg:{
     width:"75%",
     height:"65%",
     borderColor:'#fff',
     borderWidth:1,
     alignItems:'center',
     marginLeft:"15%" ,
     marginTop:"5%",
     borderRadius:10,
     justifyContent:'center'
    
    },

    followingB:{
        width:"75%",
        height:"80%",
        borderColor:'#fff',
        borderWidth:1,
        alignItems:'center',
        marginLeft:"15%" ,
        marginTop:"5%",
        borderRadius:10,
        justifyContent:'center'
           
       },
    followersBg: {
        backgroundColor: '#201F27',
        marginTop: "5%",
        flex: .6,
        flexDirection: 'row'
    },
   
    Text_1: {
        color: '#fff',
        marginLeft: "14%",
        fontSize: 18,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    Text_2: {
        color: '#fff',
        marginLeft: "14%",
        fontSize: 16,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    bottom_bar: {
        flex: .3,
        flexDirection: 'row',
        marginTop:10,
        backgroundColor:'#343339',
        alignItems:'center'
    },
    bottom_image: {
        marginHorizontal: "8%",
       alignItems:'center',
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
    user_name: {
        color: '#D3D3D5',
        fontSize: 16
    },
    userType: {
        color: '#D3D3D5',
        fontSize: 12
    },
    more_icon: {
        marginTop: 20,
       
    },
    more_icon_2: {
        marginLeft:"0%",
        position:'absolute',
        top:"31%",
        left:"50%",
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
        marginLeft:20
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
        height: 30,
        borderRadius: 20,
        backgroundColor: '#000',
        marginTop: 20,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,

    },

    comments_bg: {
        height: 30,
        borderRadius: 20,
        backgroundColor: '#000',
        marginTop: 20,
        marginLeft: "40%",
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 10,
        width:"45%"


    },
    like: {
        width: 15,
        height: 15,
        marginLeft: 15,

    },
    textStyle: {
        color: '#D3D3D5',
        marginLeft: 10,
        marginRight: 15
    },
    counts_likes: {
        color: '#D3D3D5',
        fontSize: 16,
        marginRight: "5%"
    },
    text_likes: {
        color: '#D3D3D5',
        fontSize: 16,

    },
    write_post: {
        color: '#D3D3D5',
        flex: .8
    },
    read_more: {
        color: '#D3D3D5',
        fontSize: 16,


    },

    view_all: {
        color: '#98989B',


    },
    uploadedTime: {
        color: '#98989B',
        position: 'absolute',
       
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
        bottom: "0%",
     },
     DeletePost_2: {
        color: '#fff',
        fontSize:16,
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',

    },
    DeletePost_3: {
        color: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontFamily:'Raleway-Regular'
    },
    DeletePost: {
        color: '#fff',
        fontSize:14,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: "10%", marginLeft: "5%",
        fontFamily:'Raleway-Bold'

    },
    
     DeletePost_1:{
        color:'#fff',
        fontSize:20,
        fontWeight:'bold',
        alignSelf:'center',
        justifyContent:'center',
   },
     NoBtn:{
        width: "30%",
        height:35,
        borderColor: '#fff',
        alignItems: 'center',
        marginTop: "2%",
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: "5%",justifyContent:'center',marginHorizontal:'5%'
     },
     DeletePost_view:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:"5%"
     },
    video_icon:{
        width:30,
        height:30,
        marginRight:"5%"
    },
    BtnView:{
        flexDirection:'row',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:"8%"
        
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
  
})
export default styles;