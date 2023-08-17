import * as React from 'react';
import { Alert, View, Text, TouchableOpacity,Image,Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './athlete_styles';
import TermCondition from './TermCondition';
import { requestPostApiMedia, register } from '../../../NetworkCall/Service'
import { setAsyncStorage } from '../../../Routes/AsynstorageClass';
import Loader from '../../CustomComponent/Loader';
import CustomAlert from '../../CustomAlert';

let filePath = ''
let athelte_Fname = ''
let athelte_Lname = ''
let athelte_email = ''
let athelte_password = ''
let parent_fname = ''
let parent_Lname = ''
let parent_email = ''
let parent_no = ''
let ImagePath = ""
let Sports_name_arr
let oneTimeSelected_date = ''
let SportList_Data = []
let PersonHeight = []
let sports_id = ''
let Gender_Name = ''
let address = ''
let city = ''
let country = ''
let zip_code = ''
let nationality = ''
let current_club = ''
let favourite_club = ''
let preferred_foot = ''
let personHeight = ''
let contact_no = ''
let selectLetterFile = ''
let selectIdCard = ''
let singleFile = ''
let selectFileResponse = ''
let selectIdCardResponse = ''
let selectLetterFileResponse = ''
let profession=''

export default class CoachTermCondition extends React.Component {

    constructor() {
        super();
        this.state = {
            foot_text: '',
            captureImage: '',
            dob: '',
            address: '',
            city: '',
            country: '',
            zip_code: '',
            nationality: '',
            current_club: '',
            favourite_club: '',
            preferred_foot: '',
            height: '',
            contact_no: '',
            sports_id: '',
            height_text: '',
            height_text_2: '',
            PersonHeight_1To_100: [],
            SportList: '',
            isDatePickerVisible: false,
            oneTimeSelected_date: "",
            image_filePath: '',
            Sports_text: '',
            Gender_Name: '',
            termsCheck: false,
            loading:false,
            Alert_Visibility: false,
            alert_msg: '',
            term_condition:''
        }
    }
    fileNameFromUrl(url) {
        var matches = url.match(/\/([^\/?#]+)[^\/]*$/);
        if (matches != null){
            if (matches.length > 1 || matches != null) {
                return matches[1];
              }
          
        }
        return null;
     }
     openAlert = () => {
        if(this.state.alert_msg=="Register successfully."){
            this.setState({ Alert_Visibility: false });
            this.props.navigation.navigate('SignInScreen')
        }else{
            this.setState({ Alert_Visibility: false });
        }  
    }
    closeAlert = () => {
        this.setState({ Alert_Visibility: false })
    }
    CheckedDetails = () => {
        this.setState({ isChecked: true })
        this.setState({ term_condition: 1 })
    }
    SubmitData = async () => {
       
        if (!this.state.termsCheck) {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Kindly tick all the checkboxes to give your consent before signing up with sportsbaze" })
            return;
        }
      
        this.setState({loading:true});
        const formData = new FormData()
        formData.append('first_name', athelte_Fname)
        formData.append('last_name', athelte_Lname)
        formData.append('email', athelte_email)
        formData.append('password', athelte_password)
        formData.append('user_group', 3)
        formData.append('parent_first_name', parent_fname)
        formData.append('parent_last_name', parent_Lname)
        formData.append('parent_email', parent_email)
        formData.append('parent_contact_no', parent_no)
        formData.append('sports', sports_id)
        formData.append('dob', oneTimeSelected_date)
        formData.append('gender', Gender_Name)
        formData.append('address', address)
        formData.append('city', city)
        formData.append('country', country)
        formData.append('zip_code', zip_code)
        formData.append('nationality', nationality)
        formData.append('contact_no', contact_no)
        formData.append('profession', profession)
        formData.append('term_condition',"1")

        if (selectLetterFileResponse != "") {
            formData.append("letter_of_employment", {
                uri: Platform.OS === "android" ? selectLetterFileResponse.uri : selectLetterFileResponse.uri.replace("file://", ""),
                type: selectLetterFileResponse.type,
                name: selectLetterFileResponse.name,
            })

        }

        if (selectIdCardResponse != "") {
            formData.append("id_card", {
                uri: Platform.OS === "android" ? selectIdCardResponse.uri : selectIdCardResponse.uri.replace("file://", ""),
                type: selectIdCardResponse.type,
                name: selectIdCardResponse.name,
            })

        }
        if (selectFileResponse != "") {
            formData.append("professional_certificate", {
                uri: Platform.OS === "android" ? selectFileResponse.uri : selectFileResponse.uri.replace("file://", ""),
                type: selectFileResponse.type,
                name: selectFileResponse.name,
            })

        }

        if (ImagePath != "") {
            formData.append("profile_pic", {
                uri: Platform.OS === "android" ? ImagePath.uri : ImagePath.uri.replace("file://", ""),
                type: ImagePath.type,
                name: this.fileNameFromUrl(ImagePath.uri)
            })

        }
        console.log("form data:::", formData)
        const { responseJson, err } = await requestPostApiMedia(register, formData, 'POST')
        this.setState({loading:false});
        console.log("Response +++", responseJson.status)
        if (responseJson.status == true) {
            await setAsyncStorage('dob', this.state.oneTimeSelected_date);
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "Register successfully." })
     
        }
        else {
            this.setState({ Alert_Visibility: true })
            this.setState({ alert_msg: "This email has already been registered." })
        }

    }
    render() {
        athelte_Fname = this.props.route.params.athelte_Fname
        athelte_Lname = this.props.route.params.athelte_Lname
        athelte_email = this.props.route.params.athelte_email
        athelte_password = this.props.route.params.athelte_password
        parent_fname = this.props.route.params.athelte_parent_fname
        parent_Lname = this.props.route.params.athelte_parent_Lname
        parent_email = this.props.route.params.athelte_parent_email
        parent_no = this.props.route.params.athelte_parent_no
        ImagePath = this.props.route.params.imageUrl
        sports_id = this.props.route.params.sports_id,
        oneTimeSelected_date = this.props.route.params.oneTimeSelected_date,
        Gender_Name = this.props.route.params.Gender_Name,
        address = this.props.route.params.address,
        city = this.props.route.params.city,
        country = this.props.route.params.country,
        zip_code = this.props.route.params.zip_code,
        nationality = this.props.route.params.nationality,
        contact_no = this.props.route.params.contact_no,
        selectLetterFile = this.props.route.params.selectLetterFile,
        selectIdCard = this.props.route.params.selectIdCard,
        singleFile = this.props.route.params.singleFile
        selectLetterFileResponse = this.props.route.params.selectLetterFileResponse
        selectIdCardResponse = this.props.route.params.selectIdCardResponse
        selectFileResponse = this.props.route.params.selectFileResponse
        profession= this.props.route.params.profession

        return (
            <View style={{ height: '100%', backgroundColor: '#000' }}>
                <ScrollView>
                    <View style={{ height: '80%' }}>
                        <TermCondition checkAction={this.checkAction.bind(this)} navigation={this.props.navigation} />
                    </View>
                    <TouchableOpacity style={styles.createAccount} onPress={this.SubmitData}>
                        <Text style={{ color: '#fff', fontFamily:'Raleway-Bold',fontSize:14 }}>Create Account</Text>
                    </TouchableOpacity>
                    <Loader isLoader={this.state.loading}></Loader>
                </ScrollView>
                <CustomAlert Alert_Visibility={this.state.Alert_Visibility} onPress={this.openAlert} closeModal={this.closeAlert} msg={this.state.alert_msg} />
            </View>
        )
    }


    checkAction = (check) => {
        this.setState({ termsCheck: check })

    }
}