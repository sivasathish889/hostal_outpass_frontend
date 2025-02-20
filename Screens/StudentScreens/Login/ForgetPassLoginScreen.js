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
import annaUniversity from "../../../assets/annaUniversity.jpeg";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import env from "../../../constants/urls";
import axios from "axios";

let mainColor = "rgb(11,117,131)";
let placeholderTextColor = "#AFAFAF";

const ForgetPassLoginScreen = () => {
  let navigation = useNavigation()
  let toast = useToast()
  const [registerNumber, setRegisterNumber] = useState(null)
  let payload = {
    registerNumber
  }
  const handleSubmit = async() => {
    await axios.post(`${env.CLIENT_URL}${env.studentLoginForgetPassword}`, JSON.stringify(payload))
    .then((data) => {
      if (data.data.success) {
        toast.show(data.data.message, {
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
        navigation.navigate("/StudentForgetOTP",{
          otp : data.data.Token,
          registerNumber : registerNumber
        });
      } else {
        toast.show(data.data.message, {
          type: "danger",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
      }
    })
    .catch((error) => console.log(error));  };
  return (
    <ImageBackground source={annaUniversity} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.heading}>Student</Text>
          <Text style={styles.subHead}>Change Password</Text>

          <View style={styles.inputgroup}>
            <Text style={styles.lable}>Enter Your Register Number :</Text>
            <TextInput
              placeholder="Enter Regsiter Number"
              style={styles.input}
              placeholderTextColor={placeholderTextColor}
              keyboardType="number-pad"
              onChangeText={(text)=>setRegisterNumber(text)}
              inputMode="numeric"
              />
          </View>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={handleSubmit}
            >
              <Text
                style={styles.btn}
              >
                Verify OTP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ForgetPassLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
  },
  form: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 30,
    width: "80%",
    backgroundColor: "rgb(171,171,171)",
  },
  heading: {
    textAlign: "center",
    fontSize: 35,
    color: mainColor,
    marginTop: 15,
    fontWeight: "700",
  },
  subHead: {
    textAlign: "center",
    fontSize: 25,
  },
  buttonOutline: {
    backgroundColor: mainColor,
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
  inputgroup: {
    marginTop: 25,
    rowGap: 10,
  },
  lable: {
    fontWeight: "400",
  },
  input: {
    backgroundColor: "#D9D9D9",
    paddingStart: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
  },
});
