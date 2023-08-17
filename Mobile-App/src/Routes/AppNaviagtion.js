// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './../Screen/Home/HomeScreen'
import SignInScreen from '../Screen/Login/SignIn/SignIn';
import AthleteScreen from '../Screen/Login/SignUp/AthleteScreen';
import NextAthlteScreen from '../Screen/Login/SignUp/NextAthlteScreen';
import CoachTrainerScreen from '../Screen/Login/SignUp/CoachTrainerScreen';
import NextCoachTrainerScreen from '../Screen/Login/SignUp/NextCoachTrainerScreen';
import ProfessionalVerifactiuonCTScreen from '../Screen/Login/SignUp/ProfessionalVerifactiuonCTScreen';
import ScoutClubScreen from '../Screen/Login/SignUp/ScoutClubScreen';
import NextScoutClubScreen from '../Screen/Login/SignUp/NextScoutClubScreen';
import PFClubScreen from '../Screen/Login/SignUp/PFClubScreen';
import FanUserScreen from '../Screen/Login/SignUp/FanUserScreen';
import NextFanUserScreen from '../Screen/Login/SignUp/NextFanUserScreen';
import AppLoader from '../Screen/AppLoader';
import UploadPost from '../Screen/UploadImage/UploadPost';
import SplashScreen from '../Screen/SplashScreen/SplashScreen';
import CommentScreen from '../Screen/Comments/CommentScreen';
import ProfileScreen from '../Screen/MyProfile/ProfileScreen';
import EditProfileScreen from '../Screen/EditProfileDetails/EditProfileScreen';
import MyPostScreen from '../Screen/MyPost/MyPostScreen';
import MyPostComments from '../Screen/MyPost/MyPostComments';
import EditPostScreen from '../Screen/EditPost/EditPostScreen';
import FavouriteScreen from '../Screen/AddToFavourite/FavouriteScreen';
import MoreScreen from '../Screen/BottomMoreTab/MoreScreen';
import EventScreen from '../Screen/Event/EventScreen';
import PublicProfile from '../Screen/PublicProfileScreen/PublicProfile';
import PublicFallowers from '../Screen/PublicFallwers/PublicFallowers';
import PublicFollowing from '../Screen/Publicfollowing/PublicFollowing';
import CreateEvent from '../Screen/Event/CreateEvent/CreateEvent';
import EventListScreen from '../Screen/Event/MyEventList/EventListScreen';
import EditEvent from '../Screen/Event/EditEvent/EditEvent';
import MyFallwers from '../Screen/MyProfile/MyFallwers/MyFallowers';
import Myfollowing from '../Screen/MyProfile/Myfollowing/MyFollowing';
import SendOtp from '../Screen/Login/ForgetPassword/SendOtp'
import CreatePassword from '../Screen/Login/ForgetPassword/CreatePassword';
import SportsCenterScreen from '../Screen/SportsCenter/SportsCenterScreen';
import GymScreen from '../Screen/Gym/GymScreen';
import CoachingAcademy from '../Screen/CoachingAcademy/CoachingAcademy';
import FitnessStudo from '../Screen/FitnessStudo/FitnessStudo';
import ContactUs from '../Screen/CoachingAcademy/ContactUs/ContactUs';
import ChatScreen from '../Screen/Chat/ChatScreen';
import ChatBox from '../Screen/Chat/ChatBox';
import RegisterScreen from '../Screen/Event/Register/Register';
import SearchUserScreen from '../Screen/SearchUser/SearchUserScreen';
import TermCondition from '../Screen/Login/SignUp/TermCondition';
import AthleteTermCondition from '../Screen/Login/SignUp/AthleteTermCondition';
import FanUserTermCondition from '../Screen/Login/SignUp/FanUserTermCondition';
import CoachTermCondition from '../Screen/Login/SignUp/CoachTermCondition';
import clubTermCondition from '../Screen/Login/SignUp/clubTermCondition';
import ViewAttendees from '../Screen/Event/ViewAttendees';
import HeaderScreen from '../Screen/header';
import BottomTabBar from '../Screen/BottomTabBar'
import Tab from '../Screen/Tab/';
import UserLike from '../Screen/UserLike';
import PersonalTrainer from '../Screen/PersonalTrainer/PersonalTrainer';
import TrainerProfile from '../Screen/PersonalTrainer/TrainerProfile';
import BookSession from '../Screen/PersonalTrainer/BookSession';
import WhiteHeaderScreen from '../Screen/WhiteHeader';
import NotificationList from '../Screen/NotificationList';
import CustomAlert from '../Screen/CustomAlert';
import Privacy_Policy from '../Screen/Privacy_Policy';
import Termcondition_Policy from '../Screen/Termcondition_Policy';
import Bookappointment from '../Screen/SportsCenter/Bookappointment';
import savedList from '../Screen/FitnessStudo/savedList';


const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="AthleteScreen" component={AthleteScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="NextAthlteScreen" component={NextAthlteScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="CoachTrainerScreen" component={CoachTrainerScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="NextCoachTrainerScreen" component={NextCoachTrainerScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="ProfessionalVerifactiuonCTScreen" component={ProfessionalVerifactiuonCTScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="ScoutClubScreen" component={ScoutClubScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="NextScoutClubScreen" component={NextScoutClubScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="PFClubScreen" component={PFClubScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="FanUserScreen" component={FanUserScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="NextFanUserScreen" component={NextFanUserScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="AppLoader" component={AppLoader} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="UploadPost" component={UploadPost} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="CommentScreen" component={CommentScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="MyPostScreen" component={MyPostScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="MyPostComments" component={MyPostComments} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="EditPostScreen" component={EditPostScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="FavouriteScreen" component={FavouriteScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="PublicProfile" component={PublicProfile} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="MoreScreen" component={MoreScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="EventScreen" component={EventScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="PublicFallowers" component={PublicFallowers} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="PublicFollowing" component={PublicFollowing} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="CreateEvent" component={CreateEvent} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="EventListScreen" component={EventListScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="EditEvent" component={EditEvent} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="MyFallwers" component={MyFallwers} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="Myfollowing" component={Myfollowing} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="SendOtp" component={SendOtp} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="CreatePassword" component={CreatePassword} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="SportsCenterScreen" component={SportsCenterScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="GymScreen" component={GymScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="CoachingAcademy" component={CoachingAcademy} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="FitnessStudo" component={FitnessStudo} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="ContactUs" component={ContactUs} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="ChatBox" component={ChatBox} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="SearchUserScreen" component={SearchUserScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="TermCondition" component={TermCondition} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="AthleteTermCondition" component={AthleteTermCondition} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="FanUserTermCondition" component={FanUserTermCondition} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="CoachTermCondition" component={CoachTermCondition} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="clubTermCondition" component={clubTermCondition} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="ViewAttendees" component={ViewAttendees} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="headerScreen" component={HeaderScreen} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="BottomTabBar" component={BottomTabBar} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="Tab" component={Tab} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="UserLike" component={UserLike} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="PersonalTrainer" component={PersonalTrainer} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="Trainer Profile" component={TrainerProfile} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="BookSession" component={BookSession} options={{
          gestureEnabled: false
        }} />
        <Stack.Screen name="WhiteHeaderScreen" component={WhiteHeaderScreen} />
        <Stack.Screen name="NotificationList" component={NotificationList} options={{
          gestureEnabled: false
        }} />

        <Stack.Screen name="CustomAlert" component={CustomAlert} options={{
          gestureEnabled: false
        }} />

        <Stack.Screen name="Privacy_Policy" component={Privacy_Policy} options={{
          gestureEnabled: false
        }} />
         <Stack.Screen name="Termcondition_Policy" component={Termcondition_Policy} options={{
          gestureEnabled: false
        }} />
          <Stack.Screen name="Bookappointment" component={Bookappointment} options={{
          gestureEnabled: false
        }} />
         <Stack.Screen name="savedList" component={savedList} options={{
          gestureEnabled: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default AppNavigation;