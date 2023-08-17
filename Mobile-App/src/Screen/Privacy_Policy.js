import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import HeaderScreen from './header';

// ...
export default class Privacy_Policy extends Component {
    render() {
        return (
            <View style={{height:'100%',backgroundColor:'#000'}}><HeaderScreen title='Privacy policy' navigation={this.props.navigation} />
                <WebView style={{}} source={{ uri: 'https://sportsbaze.nileprojects.in/privacy-policy' }} /></View>
        )
    }
}