import {
  Image,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
let logo = require("@/assets/images/adaptive-icon.png");
import themes from "@/constants/themes";
import { useRouter } from "expo-router";
import { hp } from "@/helpers/dimensions";
import { useEffect, useState } from "react";
import {
  getMessaging,
  getToken,
  onMessage,
  onBackgroundMessage,
  setBackgroundMessageHandler,
} from "@react-native-firebase/messaging";
import { getApp } from "@react-native-firebase/app";
import * as Notifications from "expo-notifications";
const Welcome = () => {
  const router = useRouter();
  const app = getApp();
  const messaging = getMessaging(app);
  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        if (Platform.OS === "android") {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Notification permission granted");
          } else {
            console.log("Notification permission denied");
          }
        } else {
          const authStatus = await messaging().requestPermission();
          const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

          if (enabled) {
            console.log("Authorization status:", authStatus);
          }
        }
      } catch (err) {
        console.warn("Error requesting notification permission:", err);
      }
    };

    requestNotificationPermission();

    const handleNotificationClick = async (response) => {
      const screen = response?.notification?.request?.content?.data?.screen;
      console.log(
        "click",
        response?.notification?.request?.content?.data?.screen
      );
      if (screen !== null) {
        router.navigate(screen);
      }
    };

    // Listen for user clicking on a notification
    const notificationClickSubscription =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationClick
      );
    // Init
    const initialNotification = messaging.getInitialNotification();
    if (initialNotification && initialNotification.notification) {
      console.log(
        "Notification caused app to open from quit state:",
        initialNotification.notification
      );
    }

    // Handle notification when app is opened from background
    messaging.onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage && remoteMessage.notification) {
        console.log(
          "Notification caused app to open from background state:",
          remoteMessage.notification
        );
      }
    });

    // Handle background notifications
    setBackgroundMessageHandler(messaging, async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    // Handle foreground notifications
    const unsubscribe = messaging.onMessage(async (remoteMessage) => {
      console.log("A new FCM message arrived!", remoteMessage);
      Notifications.scheduleNotificationAsync({
        content: {
          title: remoteMessage.data.title,
          body: remoteMessage.data.body,
          data: remoteMessage.data,
        },
        trigger: { seconds: 4 },
      });
    });
    // Configure push notification behavior when app is in foreground
    return () => {
      unsubscribe();
      requestNotificationPermission();
      notificationClickSubscription.remove();
    };
  }, []);
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowList: true,
    }),
  });

  useEffect(() => {
    const initMsg = async () => {};
    initMsg();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={themes.mainColor} />
      <View style={{ alignItems: "center" }}>
        <Text style={styles.mainText}>Welcome</Text>
        <Image source={logo} alt="AU Logo" style={styles.Image} />
        <Text style={styles.subText}>
          Anna University Hostal Outpass its simplify Your Outpass
        </Text>
      </View>
      <View style={{ rowGap: 30, marginTop: 60 }}>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => router.navigate("(student)/(login)/studentLogin")}
        >
          <Text style={styles.buttonsText}>Student</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => router.navigate("(warden)/(login)/wardenLogin")}
        >
          <Text style={styles.buttonsText}>Warden</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => router.navigate("(security)/(login)/securityLogin")}
        >
          <Text style={styles.buttonsText}>Security</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(11,117,131)",
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  subText: {
    width: 300,
    textAlign: "center",
    color: "white",
    marginVertical: 20,
    fontSize: 20,
  },
  buttonOutline: {
    backgroundColor: "white",
    borderRadius: 5,
  },
  buttonsText: {
    fontSize: 20,
    padding: 10,
    paddingHorizontal: 50,
  },
  Image: {
    width: hp(20),
    height: hp(20),
  },
});
