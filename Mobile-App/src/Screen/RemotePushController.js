import React, { useEffect } from 'react';
import PushNotification from "react-native-push-notification";


const RemotePushController = () =>{
    useEffect(()=>{
        PushNotification.configure({

            onRegister: function (token) {
              console.log('TOKEN:::::', token);
            },

            onNotification: function (notification) {
              console.log('NOTIFICATION:::::::', notification);
              console.log('notification.message:::::::', notification.message);

            if (notification.foreground) {
            PushNotification.localNotification({
              title:notification.title,
              message:notification.message
            });
            } 
            },

            senderID: "your_fcm_sender_id_here",

            permissions: {
              alert: true,
              badge: true,
              sound: true,
            },

            popInitialNotification: true,

            requestPermissions: true,
          });
    },[]);

    return null;
};

export default RemotePushController;