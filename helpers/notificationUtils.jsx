import * as Notifications from "expo-notifications";
import {
  getMessaging,
  setBackgroundMessageHandler,
} from "@react-native-firebase/messaging";
import { getApp } from "@react-native-firebase/app";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const notificationUtils = async () => {
  const router = useRouter();
  const app = getApp();
  const messaging = getMessaging(app);

  const sendToken = async () => {
    // Get FCM Token
    const token = await messaging.getToken();
    console.log("FCM Token from NotificationUtils", token);
  };
  useEffect(() => {
    sendToken();

    const handleNotification = (notification) => {
      const screen = notification?.request?.content?.data?.screen;
      if (screen !== null) {
        router.navigate(screen);
      }
    };

    // Listen for user clicking on a notification
    const notificationClickSubscription =
      Notifications.addNotificationResponseReceivedListener(handleNotification);

    // Handle notification when app is opened from quit state
    const initialNotification = messaging.getInitialNotification();
    if (initialNotification && initialNotification.notification) {
      handleNotification(initialNotification.notification);
    }

    // Handle notification when app is opened from background
    messaging.onNotificationOpenedApp((remoteMessage) => {
      handleNotification(remoteMessage.notification);
    });

    // Handle background notifications
    setBackgroundMessageHandler(messaging, async (remoteMessage) => {
      // console.log("Message handled in the background!", remoteMessage);
    });

    // Handle foreground notifications
    const unsubscribe = messaging.onMessage(async (remoteMessage) => {
      // console.log("A new FCM message arrived!", remoteMessage);
      Notifications.scheduleNotificationAsync({
        content: {
          title: remoteMessage.data.title,
          body: remoteMessage.data.body,
          data: remoteMessage.data,
        },
        trigger: { seconds: 4 },
      });
    });
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowList: true,
      }),
    });
    return () => {
      unsubscribe();
      notificationClickSubscription.remove();
    };
  }, []);
};

export default notificationUtils;
