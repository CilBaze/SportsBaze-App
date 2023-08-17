import React, { Component } from 'react';

import { Platform, StyleSheet, View, Text, Image, TouchableOpacity, Alert,Modal } from 'react-native';

export default class CustomAlert extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Alert_Visibility: true
        };

    }

    Show_Custom_Alert(visible) {
        this.setState({ Alert_Visibility: visible });
        this.props.navigation.goBack();

    }

    render() {

        return (
            <View >
            <Modal
                visible={this.props.Alert_Visibility}
                animationType={'fade'}
                transparent={true}
                hasBackdrop={true}
                activeOpacity={.5}
                onBackdropPress={() => this.setState({ Alert_Visibility: false })}
                onRequestClose={() => {
                    this.setState({ Alert_Visibility: false })
                }}
                onRequestClose={() => { this.setState({ Alert_Visibility: false }) }} >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'rgba(52, 52, 52, 0.5)'
                }}>
                    <View style={styles.Alert_Main_View}>
                        <TouchableOpacity style={{ left: '45%' }} onPress={this.props.closeModal}>
                            <Image style={{ width: 15, height: 15 }} source={require("../Images/close.png")} />
                        </TouchableOpacity>
                        <Text style={[styles.Alert_Message, this.props.style]}>{this.props.msg}</Text>
                        <View style={{ flexDirection: 'row',}}>
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={this.props.onPress}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.TextStyle}> Ok </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
              </View>

        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {
        marginTop: (Platform.OS == 'ios') ? 20 : 0,
        flex:1,
      
     
    },
    MainContainer2: {
       backgroundColor:'rgba(52, 52, 52, 0.1)',
       width:'100%',height:'100%'
    },
    Alert_Main_View: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        height: '18%',
        width: '85%',
        borderRadius:10,
    },

    Alert_Title: {
        fontSize: 18,
        color: "#fff",
        textAlign: 'center',
        padding: 10,
        height: '28%'

    },

    Alert_Message: {
        fontSize: 14,
        color: "#000",
        textAlign: 'center',
        height: '42%',
        fontFamily: 'Raleway-Bold',top:10
    },

    buttonStyle: {
        width: '30%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        marginHorizontal: 20,
        borderRadius: 30, marginTop: 15, borderWidth: 1, backgroundColor: "#000"

    },

    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'Raleway-Bold'
    }

});