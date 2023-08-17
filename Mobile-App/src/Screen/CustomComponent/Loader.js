import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Modal } from 'react-native';

export default class Loader extends Component {
    render() {

        const{ isLoader } = this.props
        
        return (
                <>
                    {
                        isLoader ? 
                    
                            <View style={{elevation:3,position:'absolute',height:'100%',width:'100%', justifyContent: 'center', alignItems: 'center' }}>

                            <View style={{ backgroundColor: 'white', borderRadius: 10, height: 130, width: 130, justifyContent: 'center', alignItems: 'center' }}>

                                <ActivityIndicator size="large" color='#004473' />
                                <Text style={{ textAlign: 'center', padding: 8 }} >Loading...</Text>

                            </View>

                            </View>

    :<></>
                    }
                </>
        );
    }
}

