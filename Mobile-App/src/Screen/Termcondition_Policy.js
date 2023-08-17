import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import HeaderScreen from './header';

// ...
export default class Termcondition_Policy extends Component {
    render() {
        return (
            <View style={{height:'100%',backgroundColor:'#000'}}><HeaderScreen title='Terms and conditions' navigation={this.props.navigation} />
                <WebView style={{}} source={{ uri: 'https://sportsbaze.nileprojects.in/term-condition' }} /></View>
        )
    }
}