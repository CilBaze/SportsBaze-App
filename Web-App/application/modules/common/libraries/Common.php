<?php

/**
 * Format class
 *
 * Help convert between various formats such as XML, JSON, CSV, etc.
 *
 * @author  	Phil Sturgeon
 * @license		http://philsturgeon.co.uk/code/dbad-license
 */
class Common {

    public function send_pushnotification($token, $load, $key) {

        $url = 'https://fcm.googleapis.com/fcm/send';

        $fields = array(
            'registration_ids' => $token,
            'data' => $load
        );
        $headers = array(
            'Authorization: key=' . $key,
            'Content-Type: application/json'
        );
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields, true));
        $result = curl_exec($ch);
        //echo $result; die;
        if ($result === FALSE) {
            die('Curl failed: ' . curl_error($ch));
        }
        curl_close($ch);
    }

    /* Send push notification, Shivendra Tiwari on 27-06-2019 */
    function android_push($token, $load) {
           
        $msg = array(
           
            'body'  => $load['msg'],
            'title' => SITE_TITLE,
            'icon'  => 'myicon',//Default Icon
            'sound' => 'mySound',

            );

        
        $api_key = FIREBASE_KEY;
        $test_fcm = 'f7VZEI1iRw4:APA91bFEczBGB67c8FaXXjm9nfYGxfMDDJr2AcXWVJqxPxe2s4uyDD9tYLdFSKwtGIXUv9tI-X-4gRQ0EiaV6c9f_EvNyGUXlepyLehaE6pC-9mq9T6xqHSWPhJEnep6pTHDAL3fKq5J';         
                             
                $fields = array('to'=>$token,'notification'=>$msg,'data'=>$load);
                $headers = array
                    (
                    'Authorization: key='. $api_key,              
                     'Content-Type: application/json'
                    );

            #Send Reponse To FireBase Server
                $ch = curl_init();
                curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
                curl_setopt( $ch,CURLOPT_POST, true );
                curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
                curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
                curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
                curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode($fields));
                $result = curl_exec ($ch);               
                curl_close ( $ch ); 
               
    }




    public function Generate_hash($length) {

        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' . rand(0, 99999);
        $randomString = '';

        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }

        return $randomString;
    }

}

?>