import { getMessaging, getToken } from "@react-native-firebase/messaging";
import { getApp } from "@react-native-firebase/app";

const getFCMToken = async () => {
  const app = getApp();
  const messaging = getMessaging(app);
  const token = await messaging.getToken();
  console.log("FCM Token from student login:", token);
  return token;
};
module.exports = getFCMToken;
