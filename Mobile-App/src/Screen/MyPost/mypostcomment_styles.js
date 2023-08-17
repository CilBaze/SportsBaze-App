import {StyleSheet} from 'react-native'

 const styles=StyleSheet.create(
     {
        Headerbg:{
            backgroundColor:'#000',
            flex:.45,
            flexDirection:'row',
            alignItems:'center'
        },
        comments:{
         color:'#fff',
         alignSelf:'center',
         fontSize:20,
         marginLeft:"10%",
         fontWeight:'bold'
         
        },
        
        CommentInput_2:{  
            flex:3,
            marginTop:"5%"
        },
        backBtn:{
            marginLeft:"25%"
        },
        CommentInput:{  
            flex:.5,
            backgroundColor: '#000',
            flexDirection:'row',
            alignItems:'center',
          
            
        },
        inputStyle: {
            color:'#fff',
            fontSize:14,
            marginRight:"20%",
            width:180,
            fontFamily:'Raleway-Regular'
            
       },
      
        profile_img:{
            height:50,
            width:50,
            borderRadius:50/2
       },
       profile_img_2:{
        height:40,
        width:40,
        borderRadius:40/2
   },
        Profileimgbg:{ 
           marginBottom:"2%",
           flex:.3,
           marginLeft:"5%",
           marginRight:"10%",
         
        },
        Profileimgbg_2:{ 
            marginTop:"5%",
            marginLeft:"5%",
         },
        textPost:{
            color:"#fff",
            fontSize:16,fontFamily:'Raleway-Bold'
        },
        PostBg:{
         marginLeft:"10%"   ,
         flex:.5,
         marginBottom:"2%"
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
        bottom_Underline:{
            height:1,
            backgroundColor:'#201E27',
            marginTop:"3%"
        },
        WriteComments:{
            color:"#fff",
            fontSize:12,
            fontFamily:'Raleway-Regular',
        },

        WriteComments_2:{
            color:"#7F7E87",
            fontSize:8,
            position:'absolute',
            right:"5%",
            top:"25%",
            fontFamily:'Raleway-Regular'
        },
        postDay:{
            color:"#7F7E87",
            fontSize:10,
            width:'23%',
            fontFamily:'Raleway-Regular',width:200
        },
        textColor:{
            color:'#fff',
            fontWeight:'bold'
        },
        textColor_2:{
            color:'#fff',
         
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
            alignItems:'center'
         },
         DeletePost:{
             color:'#fff',
             fontSize:14,
             alignSelf:'center',
             justifyContent:'center',
             marginTop:"5%",
             marginLeft:"10%",
             fontFamily:'Raleway-Bold'
         },

         DeletePost_3:{
            color:'#fff',
            fontSize:20,
            fontWeight:'bold',
            alignSelf:'center',
            justifyContent:'center',
            marginTop:"1%",
            marginLeft:"10%"

        },
         DeletePost_1:{
            color:'#fff',
            fontSize:16,
            alignSelf:'center',
            justifyContent:'center',
            fontFamily:'Raleway-Bold'
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
            fontSize:14,
            fontWeight:'bold',
            alignSelf:'center',
            justifyContent:'center',
            marginTop:"3%",
            fontFamily:'Raleway-Regular'
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
          
            
        }

     }
 )

 export default styles;