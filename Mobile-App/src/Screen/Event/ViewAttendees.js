import * as React from 'react'
import { Image, Text, View, ScrollView } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { getAsyncStorage } from '../../Routes/AsynstorageClass';
import styles from './MyEventList/event_list_styles';
import { requestGetApi, geteventsParticipate } from '../../NetworkCall/Service'
import HeaderScreen from '../header';
import Loader from '../CustomComponent/Loader';

let event_id = ''
export default class ViewAttendees extends React.Component {
    constructor() {
        super();
        this.state = {
            eventParticipate_list: [],
            event_id: '',
            loading: false
        }
    }

    componentDidMount() {
        this.setState({ event_id: event_id })
        this.geteventsParticipateList();
    }
    GoTobackScreen = () => {
        this.props.navigation.goBack()
    }
    async geteventsParticipateList() {
        this.setState({ loading: true });
        const body = {

        }
        let token_value = await getAsyncStorage('tokenkey');
        let eventsParticipateApi = geteventsParticipate + "/" + this.state.event_id
        const { responseJson, err } = await requestGetApi(eventsParticipateApi, body, 'GET', token_value)
        console.log("event list=>", responseJson);
        this.setState({ loading: false });
        if (responseJson.status == true) {
            this.setState({ eventParticipate_list: responseJson.data.records })

        } else {
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        event_id = this.props.route.params.event_id;
        console.log("event_id", event_id)
        return (
            <View style={{ height: '100%', backgroundColor: '#15141A' }}>
                <HeaderScreen title='View Attendees' navigation={this.props.navigation} />
                <ScrollView>
                    <View style={{ backgroundColor: '#15141A' }}>

                        {this.state.eventParticipate_list == "" ?
                            <Text style={{
                                color: "#fff", margin: '30%', justifyContent: 'center',
                                alignSelf: 'center', fontFamily: 'Raleway-Bold', fontSize: 18
                            }}>No records</Text>
                            :

                            <FlatList data={this.state.eventParticipate_list}
                                renderItem={({ item, index }) =>
                                    <View style={styles.CardView}>
                                        <View style={{ marginHorizontal: "5%", marginVertical: "5%" }}>
                                            {item.last_name != null ?
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={styles.text_3}>Name : </Text>
                                                    <Text style={styles.text_4}>{item.first_name + " " + item.last_name}</Text>
                                                </View>
                                                :
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={styles.text_3}>Name : </Text>
                                                    <Text style={styles.text_4}>{item.first_name}</Text>
                                                </View>
                                            }

                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.text_3}>Email : </Text>
                                                <Text style={styles.text_4}>{item.email}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.text_3}>Contact No : </Text>
                                                <Text style={styles.text_4}>{item.contact_no}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.text_3}>Event Name : </Text>
                                                <Text style={styles.text_4}>{item.event_name}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', }}>
                                                <Text style={styles.text_3}>Event Location : </Text>
                                                <Text style={styles.text_4}>{item.location}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.text_3}>Description : </Text>
                                                <Text style={styles.text_4}>{item.message}</Text>
                                            </View>
                                            <View style={styles.underline}></View>
                                            {item.user_last_name != null ? <View style={{ flexDirection: 'row', }}>
                                                <Text style={styles.text_3}>Submitted By : </Text>
                                                <Text style={styles.text_4}>{item.user_first_name + " " + item.user_last_name}</Text>
                                            </View> :
                                                <View style={{ flexDirection: 'row', }}>
                                                    <Text style={styles.text_3}>Submitted By : </Text>
                                                    <Text style={styles.text_4}>{item.user_first_name}</Text>
                                                </View>}


                                        </View>
                                    </View>
                                }
                                keyExtractor={(_, index) => index.toString()}
                                onEndReached={this.handleLoadMore}
                                ListFooterComponent={this.footerList}
                                onEndReachedThreshold={0.8}
                            />
                        }
                    </View>
                </ScrollView>

                <Loader isLoader={this.state.loading}></Loader>

            </View>
        )
    }
}