// const baseUrl =
//   'https://www.nileprojects.in/sportsBaze/';

  //const baseUrl ='http://18.235.140.68/';
  const baseUrl ='https://sportsbaze.nileprojects.in/';

//API END POINT LISTS

export const register = 'register'
export const login = 'login'
export const sports = 'sports'
export const sports_category = 'sports'
export const uploadPost = 'api/posts'
export const likePost = 'api/posts/like'
export const unlikePost = 'api/posts/unlike'
export const commentsPost = 'api/posts/comments'
export const myPost = 'api/posts/my-feed'
export const delete_posts = 'api/posts'
export const delete_comments = 'api/posts/comments'
export const shared_post = 'api/posts/shared'
export const edit_post = 'api/posts/update'
export const favourite_post = 'api/posts/favourite'
export const get_favourite = 'api/posts/favourite'
export const get_public_profile = 'api/posts/my-feed'
export const follow_user = 'api/user/follow'
export const unfollow_user = 'api/user/unfollow'
export const getpublic_follower = 'api/user/follower'
export const get_public_details = 'api/user/public'
export const getpublic_folloing = 'api/user/following'
export const get_profile = 'api/user'
export const get_event_list = 'api/events/my-feed'
export const get_event_list_2 = 'api/events'
export const create_events = 'api/events'
export const delete_events = 'api/events'
export const edit_event = 'api/events/update'
export const post_unfavourite = 'api/posts/unfavourite'
export const forgotPassword = 'reset-password'
export const resetPassword = 'forgot-password'
export const GetSportsCenterlist = 'api/sports-center'
export const GetGymList = 'api/gym'
export const GetFitnessStudoList = 'api/fitness-studio'
export const fitnessStudio_like = 'api/fitness-studio/like'
export const fitnessStudio_unlike = 'api/fitness-studio/unlike'
export const GetfitnessCategoryList = 'fitness-category'
export const ConatctUsCoachingAcademy = 'api/enquiry'
export const userSearch = 'api/user/list'
export const UpdateUserProfile = 'api/user/profile'
export const GetCoachingAcademyList = 'api/coaching-academy'
export const defaultdistance = 'api/default-distance'
export const eventsParticipate = 'api/events/participate'
export const geteventsParticipate = 'api/events/participants'
export const userstatus = 'api/user/status'
export const traineeDetail = 'api/get-trainee-detail'
export const savesession = 'api/save-session'
export const traineeProfile = 'api/get-trainee-profile'
export const getcolor= 'api/get-color'
export const bell_notification= 'api/user/bell-notification'
export const chat_pushnotification= 'api/user/chat-pushnotification'
export const see_admin_notification= 'api/user/see-notification'
export const see_user_notification= 'api/user/see-user-notification'
export const clear_all_notification= 'api/user/clear-all-notification'
export const save_my_post= 'api/save-my-post'
export const unsavefrommypost= 'api/unsave-from-my-post'
export const getmypostlist= 'api/get-my-post-list'
export const book_appointment= 'api/book-appointment'
export const sportlist= 'api/sport-list'

export const requestGetApi = async (endPoint, body, method, token) => {
  var header = {};
  var url = baseUrl + endPoint;

  header = {
    'Content-type': 'application/json', 'Cache-Control': 'no-cache',
    'Authorization': 'Bearer ' + token

  };



  url = url + objToQueryString(body);
  console.log('Request Url:-' + url + '\n');

  try {
    let response = await fetch(url, {
      method: method,
      headers: header,
    });

    let code = await response.status;
    console.log(code);

    if (code == 200) {
      let responseJson = await response.json();
      console.log("data from back", responseJson);
      return { responseJson: responseJson, err: null, code: code };
    } else if (code == 400) {
      let responseJson = await response.json();
      return { responseJson: null, err: responseJson.message, code: code };
    } else {
      return { responseJson: null, err: 'Something went wrong!', code: code };
    }
  } catch (error) {
    return {
      responseJson: null,
      err: 'Something Went Wrong! Please check your internet connection.',
      code: 500,
    };
    console.error(error);
  }
};

export const requestPostApiMedia = async (endPoint, formData, method, token) => {

  var header = {
    'Content-type': 'multipart/form-data',
    'Authorization': 'Bearer ' + token

  };

  var url = baseUrl + endPoint;
  console.log('Request Url:-' + url + '\n');
  console.log(formData + '\n');

  try {
    let response = await fetch(url, {
      method: method,
      body: formData,
      headers: header,
    });

    let code = await response.status;
    console.log(code)

    if (code == 200) {
      let responseJson = await response.json();
      console.log('data from backend', responseJson);
      return { responseJson: responseJson, err: null };
    } else if (code == 400) {
      let responseJson = await response.json();
      return { responseJson: null, err: responseJson.message };
    } else {
      return { responseJson: null, err: 'Something went wrong!' };
    }
  } catch (error) {
    console.log("error", error);
    return {
      responseJson: null,
      err: 'Something Went Wrong! Please check your internet connection.',
    };

  }
};





export const requestDeleteApiMedia = async (endPoint, formData, method, token) => {

  var header = {
    'Content-type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer ' + token

  };

  var url = baseUrl + endPoint;
  console.log('Request Url:-' + url + '\n');
  console.warn(formData + '\n');

  try {
    let response = await fetch(url, {
      method: method,
      body: formData,
      headers: header,
    });

    let code = await response.status;
    console.log(code)

    if (code == 200) {
      let responseJson = await response.json();
      console.log('data from backend', responseJson);
      return { responseJson: responseJson, err: null };
    } else if (code == 400) {
      let responseJson = await response.json();
      return { responseJson: null, err: responseJson.message };
    } else {
      return { responseJson: null, err: 'Something went wrong!' };
    }
  } catch (error) {
    console.log(error);
    return {
      responseJson: null,
      err: 'Something Went Wrong! Please check your internet connection.',
    };

  }
};





export const requestPostApiUrlEncodedform = async (endPoint, formData, method, token) => {

  var header = {
    'Content-type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer ' + token

  };

  var url = baseUrl + endPoint;
  console.log('Request Url:-' + url + '\n');
  console.warn(formData + '\n');

  try {
    let response = await fetch(url, {
      method: method,
      body: formData,
      headers: header,
    });

    let code = await response.status;
    console.log(code)

    if (code == 200) {
      let responseJson = await response.json();
      console.log('data from backend', responseJson);
      return { responseJson: responseJson, err: null };
    } else if (code == 400) {
      let responseJson = await response.json();
      return { responseJson: null, err: responseJson.message };
    } else {
      return { responseJson: null, err: 'Something went wrong!' };
    }
  } catch (error) {
    console.log(error);
    return {
      responseJson: null,
      err: 'Something Went Wrong! Please check your internet connection.',
    };

  }
};


export const requestPostApi = async (endPoint, formData, method, token) => {

  var header = {
    'Content-type': 'multipart/form-data',
    'Authorization': 'Bearer ' + token

  };

  var url = baseUrl + endPoint;
  console.log('Request Url:-' + url + '\n');
  console.warn(formData + '\n');

  try {
    let response = await fetch(url, {
      method: method,
      body: formData,
      headers: header,
    });

    let code = await response.status;
    console.log("code:::::::::", code)

    if (code == 200) {
      let responseJson = await response.json();
      console.log('data from backend', responseJson);
      return { responseJson: responseJson, err: null };
    } else if (code == 400) {
      let responseJson = await response.json();
      return { responseJson: null, err: responseJson.message };
    } else {
      return { responseJson: null, err: 'Something went wrong!' };
    }
  } catch (error) {
    console.log("::::::::::::error", error);
    return {
      responseJson: null,
      err: 'Something Went Wrong! Please check your internet connection.',
    };

  }
};
const objToQueryString = (obj) => {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
    );
  }
  return keyValuePairs.length == 0 ? '' : '?' + keyValuePairs.join('&');
};
