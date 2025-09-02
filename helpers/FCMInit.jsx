import { getApp } from "@react-native-firebase/app";
import { getMessaging } from "@react-native-firebase/messaging";

const fcmInit = async () => {
  // Get FCM Token
  const app = getApp();
  const messaging = getMessaging(app);
  const token = await messaging.getToken();
  console.log("FCM Token from Warden login:", token);
};

export default fcmInit;