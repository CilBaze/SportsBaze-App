import React from 'react'
import { View, Text, Image} from 'react-native';
import { FlatList} from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../Screen/PublicFallwers/fallowers_styles';
import NetInfo from "@react-native-community/netinfo";
import HeaderScreen from './header';
import Loader from './CustomComponent/Loader';
import { setAsyncStorage } from '../Routes/AsynstorageClass';

let post_likes=[]

class UserLike extends React.Component {

    constructor() {
        super();
        this.state = {
            postLikeList:[]
        }
    }

  componentDidMount = () => {
        console.log("post_likes=",post_likes)
        this.setState({postLikeList:post_likes})
        this.CheckConnectivity();
    }

    CheckConnectivity = () => {

        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            if (state.isConnected == true) {
            } else {
                alert("internet not connected")
            }
            console.log("Is connected?", state.isConnected);
        });

        NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected == true) {
            } else {
                alert("internet not connected")
            }
        });
    }
    GoTobackScreen = () => {
        this.props.navigation.goBack();
    }
    PublicProfileScreen = async (userId) => {
        await setAsyncStorage('UserPostId', userId)
        this.props.navigation.navigate('PublicProfile', {
          userId: userId
        });
      };
  
    render() {
       post_likes = this.props.route.params.post_likes;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#15141A' }}>
                  <HeaderScreen title='Likes' navigation={this.props.navigation}/>
                <View style={{ flex: 3, backgroundColor: '#15141A' }}>
                    <FlatList data={this.state.postLikeList}
                        renderItem={({ item, index }) =>
                            <View style={styles.fieldBG} onStartShouldSetResponder={()=>this.PublicProfileScreen(item.user_id)}>
                                {item.profile_pic == "" ? <Image style={{ marginLeft: "0%", width: 30, height: 30, marginTop: "0%" }}
                                    source={require('../Images/ic_profile.png')} /> :
                                    <Image style={{ marginLeft: "0%", width: 30, height: 30, borderRadius: 30 / 2, marginTop: "0%" }}
                                        source={{ uri: item.profile_pic }} />
                                }
                                <View style={{ marginLeft: "5%", flex: .9 }}>
                                    <Text style={styles.ProfileText}>{item.like_by}</Text>
                                </View>
                            </View>
                        }
                        keyExtractor={(_, index) => index.toString()}
                      />
                </View>
                  <Loader isLoader={this.state.loading}></Loader>
            </SafeAreaView>
        )
    }

}

export default UserLike;