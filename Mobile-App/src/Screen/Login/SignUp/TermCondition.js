import * as React from 'react'
import { View, Image, Text, Alert } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import styles from './athlete_styles';


export default class TermCondition extends React.Component {

    constructor() {
        super();
        this.state = {
            isChecked: false,
            isChecked_privacy: false,
            isTermCondtion: false,
        }

    }
    CheckedDetails = () => {
        if (!this.state.isChecked && this.state.isChecked_privacy && this.state.isTermCondtion) {
            this.props.checkAction(true)
        } else {
            this.props.checkAction(false)
        }
        this.setState({ isChecked: !this.state.isChecked })
    }
    CheckedDetails2 = () => {
        if (this.state.isChecked && !this.state.isChecked_privacy && this.state.isTermCondtion) {
            this.props.checkAction(true)
        } else {
            this.props.checkAction(false)
        }
        this.setState({ isChecked_privacy: !this.state.isChecked_privacy })
    }
    GoBack = () => {
        this.props.navigation.goBack()
    }

    CheckedDetails3 = () => {
        if (this.state.isChecked && this.state.isChecked_privacy && !this.state.isTermCondtion) {
            this.props.checkAction(true)
        } else {
            this.props.checkAction(false)
        }
        this.setState({ isTermCondtion: !this.state.isTermCondtion })
    }

    render() {
        return (

            <View style={{ backgroundColor: '#000', height: '100%' }}>

                <TouchableOpacity style={{ marginLeft: "10%", marginTop: "11%", }} onPress={this.GoBack}>
                    <Image style={{ width: 20, height: 20 }} source={require('../../../Images/back.png')} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '1%', }}>
                    <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'Raleway-Regular' }}>CONSENT</Text>
                    <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                        <View style={{ width: '15%', height: 1, backgroundColor: '#989A92', marginTop: 10 }}></View>
                        <Text style={{ color: '#989A92', marginHorizontal: 10, fontFamily: 'Raleway-Regular', fontSize: 14 }}>TERMS OF USE</Text>
                        <View style={{ width: '15%', height: 1, backgroundColor: '#989A92', marginTop: 10 }}></View>
                    </View>

                </View>
                <View style={{ marginHorizontal: 20, alignItems: 'center', justifyContent: 'center', marginTop: '5%' }}>
                    <Text style={{ color: '#fff', width: '80%', fontFamily: 'Raleway-Regular', fontSize: 13 }}>Sports Baze is a self-promotion platform to help you gain exposure.</Text>
                    <Text style={{ color: '#fff', width: '80%', marginTop: '5%', fontFamily: 'Raleway-Regular', fontSize: 13 }}>Sports Baze can not accept liability for the services it provides or your actions.</Text>

                    <View style={{ width: '80%', height: 70, backgroundColor: '#1E1E1E', marginTop: '5%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                        <TouchableOpacity style={{ marginLeft: '5%' }} onPress={this.CheckedDetails}>
                            {this.state.isChecked == true ? <Image source={require('../../../Images/checked.png')} /> :
                                <Image source={require('../../../Images/unchecked.png')} />}

                        </TouchableOpacity>
                        <Text style={{ color: '#fff', width: '80%', fontFamily: 'Raleway-Regular', fontSize: 13 }}>I accept that i am responsible for my behaviour on the platform.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: '15%' }}>
                        <View style={{ width: '15%', height: 1, backgroundColor: '#989A92', marginTop: 10 }}></View>
                        <Text style={{ color: '#989A92', marginHorizontal: 10, fontFamily: 'Raleway-Regular', fontSize: 14 }}>DATA COLLECTION AND PRIVACY</Text>
                        <View style={{ width: '15%', height: 1, backgroundColor: '#989A92', marginTop: 10 }}></View>
                    </View>

                    <Text style={{ color: '#fff', width: '80%', marginTop: '5%', fontFamily: 'Raleway-Regular', fontSize: 13 }}>We take your privacy very seriously, and will never sell your data to other third parties.</Text>
                    <Text style={{ color: '#fff', width: '80%', marginTop: '5%', fontFamily: 'Raleway-Regular', fontSize: 13 }}>Sport Baze only collect the minimum data required to carry out basic services</Text>
                    <Text style={{ color: '#fff', width: '80%', marginTop: '0%', fontFamily: 'Raleway-Regular', fontSize: 13 }}>Check out our privacy policy here.</Text>

                    <View style={{ width: '80%', height: 70, backgroundColor: '#1E1E1E', marginTop: '5%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                        <TouchableOpacity style={{ marginLeft: '5%' }} onPress={this.CheckedDetails2}>
                            {this.state.isChecked_privacy == true ? <Image source={require('../../../Images/checked.png')} /> :
                                <Image source={require('../../../Images/unchecked.png')} />}

                        </TouchableOpacity>
                        <Text style={{ color: '#fff', width: '80%', fontFamily: 'Raleway-Regular', fontSize: 13 }}>I consent to Skouted collecting my location data and personal information.</Text>
                    </View>

                </View>



                <View style={{
                    width: '74%', height: '10%',
                    backgroundColor: '#1E1E1E', marginTop: '5%',
                    flexDirection: 'row', marginBottom: '5%', marginLeft: "14%", justifyContent: 'center', alignItems: 'center'
                }} >
                    <TouchableOpacity style={{ marginLeft: 25, justifyContent: 'center', alignItems: 'center' }}
                        onPress={this.CheckedDetails3}>
                        {this.state.isTermCondtion == true ? <Image source={require('../../../Images/checked.png')} /> :
                            <Image source={require('../../../Images/unchecked.png')} />}

                    </TouchableOpacity>
                    <View style={{ width: '90%', marginLeft: 10, marginTop: 10 }}>
                        <Text
                            style={{
                                color: '#fff', fontFamily: 'Raleway-Regular', width: '80%',
                                fontSize: 13,
                            }}
                        >By clicking here you agree to the </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text onPress={() =>this.props.navigation.navigate("Termcondition_Policy")}
                                style={{
                                    color: '#fff', fontFamily: 'Raleway-Regular',
                                    fontSize: 13, textDecorationLine: 'underline'
                                }}>Terms and Conditions</Text>
                            <Text
                                style={{
                                    color: '#fff', fontFamily: 'Raleway-Regular',
                                    fontSize: 13,
                                }}> & </Text>
                            <Text onPress={() =>this.props.navigation.navigate("Privacy_Policy")}
                                style={{
                                    color: '#fff', fontFamily: 'Raleway-Regular', width: '80%',
                                    fontSize: 13, textDecorationLine: 'underline'
                                }}>Privacy Policy </Text>
                        </View>

                        <Text style={{
                            color: '#fff', fontFamily: 'Raleway-Regular', width: '80%',
                            fontSize: 13, marginBottom: 10
                        }} > of the application.</Text>
                    </View>
                </View>

            </View>
        )
    }
}
