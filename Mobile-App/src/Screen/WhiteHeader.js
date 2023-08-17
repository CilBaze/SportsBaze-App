import * as React from 'react'
import { View, Text, Image, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './BottomMoreTab/bottom_styles';

export default class WhiteHeaderScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            theamColor: ''
        }
    }
    GoTobackScreen = () => {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View>
                {
                    Platform.OS === "android" ?
                        <View style={styles.Header_Bg2}>
                            <TouchableOpacity onPress={this.GoTobackScreen} style={{ marginLeft: 30, }}>
                                <Image style={{ width: 20, height: 20, }} source={require('../Images/back_black.png')} ></Image>
                            </TouchableOpacity>
                            <Text style={styles.headerText2}>{this.props.title}</Text>
                        </View>
                        :
                        <View style={styles.Header_Bg2}>
                            <TouchableOpacity onPress={this.GoTobackScreen} style={{ marginLeft: 30, marginTop: 20 }}>
                                <Image style={{ width: 20, height: 20, }} source={require('../Images/back_black.png')} ></Image>
                            </TouchableOpacity>
                            <Text style={styles.headerTextIOS2}>{this.props.title}</Text>
                        </View>
                }
            </View>

        )

    }
}