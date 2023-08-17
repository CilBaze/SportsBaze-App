<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller']      = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override']      = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes']      = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] 			     = 'admin';
$route['404_override'] 					     = '';
$route['translate_uri_dashes'] 			     = FALSE;

/* Api Route */

$route['login']['post']						= "api/auth/login";
$route['register']['post']					= "api/auth/register";
$route['reset-password']['post']		    = "api/auth/reset_password";
$route['api/get-color']['get']		    	= "api/auth/get_color";
$route['sports']['get']						= "api/sports/index";
$route['fitness-category']['get']			= "api/sports/fitness";
$route['fitness-category/(:any)']['get']	= "api/sports/sub_sports/$1";
$route['sports/(:any)']['get']				= "api/sports/sub_sports/$1";


/*POST API Route*/
$route['api/posts']['get']					= "api/post/list";
$route['api/posts']['post']					= "api/post/create";
$route['api/posts/comments']['post']		= "api/post/comment";
$route['api/posts/like']['post']		    = "api/post/like";
$route['api/posts/unlike']['post']		    = "api/post/unlike";
$route['api/posts/shared']['post']			= "api/post/shared";
$route['api/posts/favourite']['post']		= "api/post/favourite";
$route['api/posts/unfavourite']['post']		= "api/post/unfavourite";
$route['api/posts']['delete']			    = "api/post/postitem";
$route['api/posts/comments']['delete']		= "api/post/comment";
$route['api/posts/my-feed']['get']			= "api/post/my_feed";
$route['api/posts/my-feed/(:any)']['get']	= "api/post/my_feed/post/$1";
$route['api/posts/update']['post']			= "api/post/updateitem";
$route['api/posts/favourite']['get']		= "api/post/favourite";

/*Fitness Studio*/
$route['api/fitness-studio']['get']				= "api/post/list/fitness_studio";
$route['api/fitness-studio']['post']			= "api/post/create/fitness_studio";
$route['api/fitness-studio/comments']['post']	= "api/post/comment/fitness_studio";
$route['api/fitness-studio/like']['post']		= "api/post/like/fitness_studio";
$route['api/fitness-studio/unlike']['post']		= "api/post/unlike/fitness_studio";
$route['api/fitness-studio/shared']['post']		= "api/post/shared/fitness_studio";
$route['api/fitness-studio/favourite']['post']		= "api/post/favourite/fitness_studio";
$route['api/fitness-studio/unfavourite']['post']	= "api/post/unfavourite/fitness_studio";
$route['api/fitness-studio']['delete']			    = "api/post/postitem/fitness_studio";
$route['api/fitness-studio/comments']['delete']	= "api/post/comment/fitness_studio";
$route['api/fitness-studio/my-feed']['get']			= "api/post/my_feed/fitness_studio";
$route['api/fitness-studio/my-feed/(:any)']['get']	= "api/post/my_feed/fitness_studio/$1";
$route['api/fitness-studio/update']['post']			= "api/post/updateitem/fitness_studio";
$route['api/fitness-studio/favourite']['get']		= "api/post/favourite/fitness_studio";

/*Sports Center*/

$route['api/sport-list']['get']				= "api/post/sport_list";
$route['api/sports-center']['get']				= "api/post/list/sports_center";
$route['api/sports-center']['post']			= "api/post/create/sports_center";
$route['api/sports-center/comments']['post']	= "api/post/comment/sports_center";
$route['api/sports-center/like']['post']		= "api/post/like/sports_center";
$route['api/sports-center/unlike']['post']		= "api/post/unlike/sports_center";
$route['api/sports-center/shared']['post']		= "api/post/shared/sports_center";
$route['api/sports-center/favourite']['post']		= "api/post/favourite/sports_center";
$route['api/sports-center/unfavourite']['post']	= "api/post/unfavourite/sports_center";
$route['api/sports-center']['delete']			    = "api/post/postitem/sports_center";
$route['api/sports-center/comments']['delete']	= "api/post/comment/sports_center";
$route['api/sports-center/my-feed']['get']			= "api/post/my_feed/sports_center";
$route['api/sports-center/update']['post']			= "api/post/updateitem/sports_center";
$route['api/sports-center/favourite']['get']		= "api/post/favourite/sports_center";
$route['api/sports-center/my-feed/(:any)']['get']	= "api/post/my_feed/sports_center/$1";
$route['api/save-my-post']['post']	= "api/post/save_my_post";
$route['api/get-my-post-list']['get']	= "api/post/get_my_post_list";
$route['api/unsave-from-my-post']['post']	= "api/post/unsave_from_my_post";
$route['api/book-appointment']['post']	= "api/post/book_appointment";

/*Gym*/
$route['api/gym']['get']				= "api/post/list/gym";
$route['api/gym']['post']				= "api/post/create/gym";
$route['api/gym/comments']['post']		= "api/post/comment/gym";
$route['api/gym/like']['post']			= "api/post/like/gym";
$route['api/gym/unlike']['post']		= "api/post/unlike/gym";
$route['api/gym/shared']['post']		= "api/post/shared/gym";
$route['api/gym/favourite']['post']		= "api/post/favourite/gym";
$route['api/gym/unfavourite']['post']	= "api/post/unfavourite/gym";
$route['api/gym']['delete']			    = "api/post/postitem/gym";
$route['api/gym/comments']['delete']	= "api/post/comment/gym";
$route['api/gym/my-feed']['get']		= "api/post/my_feed/gym";
$route['api/gym/update']['post']		= "api/post/updateitem/gym";
$route['api/gym/favourite']['get']		= "api/post/favourite/gym";
$route['api/gym/my-feed/(:any)']['get']	= "api/post/my_feed/gym/$1";

/*coaching academy*/
$route['api/coaching-academy']['get']				= "api/post/list/coaching_academy";
$route['api/coaching-academy']['post']				= "api/post/create/coaching_academy";
$route['api/coaching-academy/comments']['post']		= "api/post/comment/coaching_academy";
$route['api/coaching-academy/like']['post']			= "api/post/like/coaching_academy";
$route['api/coaching-academy/unlike']['post']		= "api/post/unlike/coaching_academy";
$route['api/coaching-academy/shared']['post']		= "api/post/shared/coaching_academy";
$route['api/coaching-academy/favourite']['post']	= "api/post/favourite/coaching_academy";
$route['api/coaching-academy/unfavourite']['post']	= "api/post/unfavourite/coaching_academy";
$route['api/coaching-academy']['delete']			= "api/post/postitem/coaching_academy";
$route['api/coaching-academy/comments']['delete']	= "api/post/comment/coaching_academy";
$route['api/coaching-academy/my-feed']['get']		= "api/post/my_feed/coaching_academy";
$route['api/coaching-academy/update']['post']		= "api/post/updateitem/coaching_academy";
$route['api/coaching-academy/favourite']['get']		= "api/post/favourite/coaching_academy";
$route['api/coaching-academy/my-feed/(:any)']['get'] = "api/post/my_feed/coaching_academy/$1";

/*Events API Route*/
$route['api/events']['get']							= "api/event/list";
$route['api/events']['post']						= "api/event/create";
$route['api/events']['delete']			    		= "api/event/eventitem";
$route['api/events/my-feed']['get']					= "api/event/my_feed";
$route['api/events/update']['post']					= "api/event/updateitem";
$route['api/events/participate']['post']			= "api/event/participate";
$route['api/events/participants/(:any)']['get']		= "api/event/event_participent/$1";

$route['api/enquiry']['post']				= "api/post/link_contact_form";

$route['api/user']['get']					= "api/user/profile";
$route['api/user/follow']['post']			= "api/user/follow";
$route['api/user/unfollow']['post']			= "api/user/unfollow";
$route['api/user/follower']['get']			= "api/user/follow";
$route['api/user/following']['get']		    = "api/user/following";
$route['api/user/follower/(:any)']['get']	= "api/user/follow/$1";
$route['api/user/following/(:any)']['get']	= "api/user/following/$1";
$route['api/user/public/(:any)']['get']		= "api/user/publicprofile/$1";
$route['api/user/profile']['post']			= "api/user/update_profile";
$route['api/user/list']['get']				= "api/user/list";
$route['api/user/status']['get']			= "api/user/account_status";
$route['api/user/bell-notification']['get']	= "api/user/bell_notification";
$route['api/user/see-notification']['post']	= "api/user/see_notification";
$route['api/user/see-user-notification']['post']	= "api/user/see_user_notification";
$route['api/user/chat-pushnotification']['post']	= "api/user/chat_pushnotification";
$route['api/user/clear-all-notification']['post']	= "api/user/clear_notification";

/* trainee */
$route['api/get-trainee-detail']['get']	    = "api/personal_trainee/get_trainee_detail";
$route['api/save-session']['post']	    	= "api/personal_trainee/save_session";
$route['api/get-trainee-profile']['get']	= "api/personal_trainee/get_profile";







$route['resend']['post']					= "api/auth/resend";
$route['verification-success']['post']		= "api/auth/verification_success";
$route['forgot-password']['post']			= "api/auth/forgot_password";

$route['api/default-distance']['get']			= "api/common/distance";
$route['api/default-logo']['get']				= "api/common/logo_settings";


/* web */
$route['cookie-policy']					= "api/web/cookie_policy";
$route['privacy-policy']				= "api/web/privacy_policy";
$route['term-condition']				= "api/web/term_condition";




