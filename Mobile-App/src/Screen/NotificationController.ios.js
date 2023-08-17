import { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIos from '@react-native-community/push-notification-ios';

const NotificationController = (props) => {

  PushNotification.configure({
    onNotification: (notification) => {
      if (notification) {
        console.log(notification);
      }
    },
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      PushNotificationIos.addNotificationRequest({
        id: remoteMessage.messageId,
        body: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        userInfo: remoteMessage.data,
      });
    });

    return unsubscribe;
  }, []);

  return null;
};

export default NotificationController;