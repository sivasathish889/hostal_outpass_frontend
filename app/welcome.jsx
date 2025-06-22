import { Image, PermissionsAndroid, StatusBar, StyleSheet, Text, TouchableOpacity, View, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
let logo = require("@/assets/images/adaptive-icon.png");
import themes from "@/constants/themes";
import { useRouter } from "expo-router";
import { hp } from "@/helpers/dimensions";
import { useEffect, useState } from "react";


const Welcome = () => {
  const router = useRouter();

  // useEffect(() => {
  //   const requestNotificationPermission = async () => {
  //     try {
  //       if (Platform.OS === "android") {
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
  //         );
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           console.log("Notification permission granted");

         
  //         } else {
  //           console.log("Notification permission denied");
  //         }
  //       } else {
  //         console.log("Notification permissions are not required on this platform");
  //       }
  //     } catch (err) {
  //       console.warn("Error requesting notification permission:", err);
  //     }
  //   };

  //   const unsubscribe = requestNotificationPermission();

  //   return () => {
  //     if (unsubscribe) {
  //       unsubscribe; 
  //     }
  //   };
  // }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar  backgroundColor={themes.mainColor}  />
      <View style={{ alignItems: "center" }}>
        <Text style={styles.mainText}>Welcome</Text>
        <Image source={logo} alt="AU Logo" style={styles.Image} />
        <Text style={styles.subText}>
          Anna University Hostal Outpass its simplify Your Outpass
        </Text>
      </View>
      <View style={{ rowGap: 30, marginTop: 60 }}>
        <TouchableOpacity style={styles.buttonOutline} onPress={() => router.navigate('(student)/(login)/studentLogin')}>
          <Text style={styles.buttonsText}>Student</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOutline} onPress={() => router.navigate('(warden)/(login)/wardenLogin')}>
          <Text style={styles.buttonsText}>Warden</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOutline} onPress={() => router.navigate('(security)/(login)/securityLogin')}>
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