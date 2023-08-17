import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TextInput, Alert, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import { getAsyncStorage, setAsyncStorage } from '../../Routes/AsynstorageClass';
import { requestGetApi, userstatus ,getcolor} from '../../NetworkCall/Service';


let theamColor = ''
const styles = StyleSheet.create({
  selectedBtn: { flex: 1, justifyContent: 'center', borderTopWidth: 2, alignItems: 'center', backgroundColor: '#000', },
  unSelectbtn: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },

  selectedBtn2: { flex: 1, justifyContent: 'center', borderTopWidth: 2, alignItems: 'center', backgroundColor: 'white', },
  unSelectbtn2: { flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' },
})

export default class Bottom extends React.Component {

  constructor(props) {
    super(props)
  }
  async componentDidMount() {
   this.getTheam();
   
  }


  getTheam = async()=> {
    const body = {
    }
    let token_value = await getAsyncStorage('tokenkey');
    const { responseJson, err } = await requestGetApi(getcolor, body, 'GET');
    console.log("getcolor=>", responseJson.data)
    theamColor=responseJson.data.color
    this.setState({theamColor:responseJson.data.color})

  }
  render() {
    const { tabArr, action } = this.props
    return (
      <View>
        {theamColor == 'BLACK' ?

          <View style={{ height: 65, flexDirection: 'row', }}>
            {
              tabArr.map((item, index) =>
                <TouchableOpacity style={item.isSelect ? styles.selectedBtn : styles.unSelectbtn} key={index} onPress={() => action(index)}>
                  {index!=2 ?
                   <Image style={{ height:18, width:18, resizeMode: 'contain', marginBottom: 5, tintColor: item.isSelect ? 'white' : 'grey' }} source={item.tabImage}></Image>
                  :
                  <Image style={{ height:45, width:45, resizeMode: 'contain', marginBottom: 5, tintColor: item.isSelect ? 'white' : 'white' }} source={item.tabImage}></Image>
                  }
                 
                </TouchableOpacity>
              )
            }
          </View> :
          <View style={{ height: 65, flexDirection: 'row', }}>
            {
              tabArr.map((item, index) =>
                <TouchableOpacity style={item.isSelect ? styles.selectedBtn2 : styles.unSelectbtn2} key={index} onPress={() => action(index)}>
                  {index!=2 ?
                   <Image style={{ height:18, width:18, resizeMode: 'contain', marginBottom: 5, tintColor: item.isSelect ? 'black' : 'grey' }} source={item.tabImage}></Image>
                  :
                  <Image style={{ height:45, width:45, resizeMode: 'contain', marginBottom: 5, tintColor: item.isSelect ? 'grey' : 'grey' }} source={item.tabImage}></Image>
                  }
               
                </TouchableOpacity>
              )
            }
          </View>
        }

      </View>

    );
  }
}