import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import annaUniversity from "@/assets/annaUniversity.png";
import { useToast } from "react-native-toast-notifications";
import env from "@/constants/urls";
import axios from "axios";
import { useLocalSearchParams, useNavigation, useRouter, } from "expo-router";
import themes from "@/constants/themes";
import { hp } from "@/helpers/dimensions";
import Spinner from "react-native-loading-spinner-overlay";

const VerifyOTP = () => {
  let [otp, setOtp] = useState(null);
  const [spinnerVisible, setSpinnerVisible] = useState(false)

  let toast = useToast()
  let backendOtp = useLocalSearchParams().otp;
  let userName = useLocalSearchParams().userName
  let navigation = useNavigation();

  let payload = {
    backendOtp,
    otp
  }
  const handleSubmit = async () => {
    setSpinnerVisible(true)
    try {
      const { data } = await axios.post(`${env.CLIENT_URL}${env.securityLoginVerify}`, payload)
      if (data.success) {
        toast.show(data.message, {
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
        setOtp(null)
        navigation.navigate("changePassword", {
          userName: userName
        });
      } else {
        toast.show(data.message, {
          type: "danger",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });

      }
    } catch (error) {
      console.log(error.message);

    } finally {
      setSpinnerVisible(false)
    }
  };

  return (
    <ImageBackground source={annaUniversity} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={spinnerVisible}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
          cancelable={true}
        />
        <View style={styles.form}>
          <Text style={styles.heading}>Security</Text>
          <Text style={styles.subHead}>Verify OTP</Text>

          <View style={styles.inputgroup}>
            <Text style={styles.lable}>OTP</Text>
            <TextInput
              placeholder="Enter Your OTP"
              style={styles.input}
              placeholderTextColor={themes.placeholderTextColor}
              keyboardType="number-pad"
              onChangeText={(text) => setOtp(text)}
              inputMode="numeric"
            />
          </View>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={handleSubmit}
            >
              <Text style={styles.btn}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    minWidth: "80%",
    backgroundColor: "rgb(171,171,171)",
  },
  heading: {
    textAlign: "center",
    fontSize: hp(4),
    color: themes.mainColor,
    marginTop: 15,
    fontWeight: "700",
  },
  subHead: {
    textAlign: "center",
    fontSize: hp(2),
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#D9D9D9",
    paddingStart: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
    height:hp(4.5),
    width: "80%",
    alignSelf: "center",
  },
  lable: {
    textAlign: "center",
    marginBottom: 10,
  },
  buttonOutline: {
    backgroundColor: themes.mainColor,
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 40,
    borderBlockColor: "black",
    marginVertical: 20,
  },
  btn: {
    color: "white",
    fontSize: 15,
  },
});
