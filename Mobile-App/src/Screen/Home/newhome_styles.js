import { StyleSheet } from 'react-native'

const styles = StyleSheet.create(
    {
        bottom_bar: {
            height:50,
            flexDirection: 'row',
            marginHorizontal: "5%",
            marginTop: 10
        },
        bottom_image: {
            marginHorizontal: "7%",
            alignItems: 'center',
            marginTop: 10
        },
        homeImage: {
            height: 20,
            width: 20,
        },
        homeImage2: {
            height: 20,
            width: 20,
            borderRadius:20/2
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
            height:60,
            width:100,
            alignSelf:'center',justifyContent:'center',marginTop:20
        },
        Notification_icon: {
            marginLeft: "20%",
            marginTop: 10,
          
        },
        timer_icon: {
            alignItems:'center',
            justifyContent:'center',
            alignContent:'center',
            alignSelf:'center',marginLeft:'37%'
        },
        notifiaction: {
            height: 22,
            width: 18
        },
        chat_icon: {
            height: 31,
            width: 30
        },
        chat: {
            marginTop: 10,
           marginRight:"5%"
        },
        chatCount:{
            width:20,
            height:20,
            borderRadius:20/2,
            backgroundColor:'#fff',
            justifyContent:'center',
            alignItems:'center',
            alignSelf:'center',
            position:'absolute',
            bottom:15,
            left:20
          },
          count:{
            color:"#000",
            fontSize:10,
            alignSelf:'center',
            justifyContent:'center',
            fontWeight:'bold'
        },
        CardView: {
            width: "100%",
            marginTop: "6%",
            backgroundColor: '#fff',
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
            color: '#000',
            fontSize: 16,
            fontWeight:'bold'
        },
        userType: {
            color: '#000',
            fontSize: 12,
          fontWeight:'bold'
        },
        userType2: {
            color: '#000',
            fontSize: 13,
            marginTop:'3%',marginLeft:'6%'
        },
        more_icon: {
            marginTop: 20,
            marginLeft: 35
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
            marginRight:20
        },
        fav_icon: {
            marginTop:10,
           
        },
        febImg: {
            width: 15,
            height: 20,
        },
        like_bg: {
            height: 25,
            borderRadius: 20,
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            marginRight:5,
            marginLeft:10,
        },

        comments_bg: {
            height:25,
            borderRadius: 20,
            marginTop: 20,
            marginRight: 5,
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft:30,
        },
        comments_bg2: {
            height:25,
            borderRadius: 20,
            marginTop: 20,
            marginRight: 5,
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft:10,
        },

        msg_bg: {
            height:25,
            borderRadius: 20,
            marginTop: 20,
            marginRight: 5,
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft:30,
        },
        like: {
            width: 22,
            height:22, 
        },
       
        textStyle: {
            color: '#D3D3D5',
            marginLeft: 10,
            marginRight: 15,
            fontSize:12
        },
        counts_likes: {
            color: '#000',
            fontSize: 14,
        },
        counts_likes2: {
            color: '#000',
            fontSize: 14,
            marginTop:24
        },
        bg_likes: {
            marginTop:22,marginLeft:5,
        },
      
        text_likes: {
            color: '#D3D3D5',
            fontSize: 12,

        },
        write_post: {
            color: '#D3D3D5',
            flex: .8
        },
        read_more: {
            color: '#000',
            fontSize: 14,

        },
        view_all: {
            color: '#000',
            fontSize: 14,
            marginLeft:'7%',
            marginTop:'6%'
        },
      
        uploadedTime: {
            color: '#000',
            fontSize: 12,
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
            borderColor: '#ddd',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.9,
            shadowRadius: 3,
            elevation: 5,
            shadowRadius: 10,
            //position: 'absolute',
          //  bottom: 0,
         },
         DeletePost:{
             color:'#fff',
             fontSize:20,
             fontWeight:'bold',
             alignSelf:'center',
             justifyContent:'center',
             marginTop:"10%",marginLeft:"5%"

         },
         DeletePost_1:{
            color:'#fff',
            fontSize:20,
            fontWeight:'bold',
            alignSelf:'center',
            justifyContent:'center',
       },
         NoBtn:{
             width:90,
             height:40,
             borderColor:'#fff',
             alignItems:'center',
             marginLeft:"10%",
             marginTop:"5%",
             borderRadius:20,
             borderWidth:1
         },
         DeletePost_view:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            marginTop:"5%"
         },
         DeletePost_2:{
            color:'#fff',
            fontSize:20,
            fontWeight:'bold',
            alignSelf:'center',
            justifyContent:'center',
            marginTop:"3%"

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
            marginTop:"5%"
        },
        InputBg:{
            marginLeft: "5%",
          
    
        },
        inputStyle: {
            marginLeft: "5%",
            color:'#F6F6F7',
            width:"100%",
            height:50
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
         activityIndicator: {
            position:'absolute',
            alignSelf:'center',
            justifyContent:'center',
            marginTop:"50%"
           
         }
    }
)
export default styles;