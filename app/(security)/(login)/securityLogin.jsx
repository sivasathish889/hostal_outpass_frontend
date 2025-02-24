import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import annaUniversity from "@/assets/annaUniversity.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import url from "@/constants/urls";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import themes from "@/constants/themes";
import { useNavigation } from "expo-router";
import { hp } from "@/helpers/dimensions";
import Spinner from "react-native-loading-spinner-overlay";

const securityLogin = () => {
  let navigation = useNavigation();
  let toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);

  const [userNameError, setUserNameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const toggleShowPassword = () => setShowPassword(!showPassword);


  const handleSubmit = async () => {
    if (userName === null || userName.length == 0) {
      return setUserNameError("Please Enter Username");
    } else if (password === null || password.length == 0) {
      return setPasswordError("Please Enter Password");
    }

    setSpinnerVisible(true)
    try {
      const { data } = await axios.post(`${url.CLIENT_URL}${url.securityLogin}`, { userName, password, })
      if (data.success) {
        toast.show(data.message, {
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
        setUserName(null);
        setPassword(null)
        navigation.navigate("verifyOtp", {
          otp: data.Token,
          user : data.user
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
      console.log(error.message)
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
          <Text style={styles.subHead}>Login</Text>

          <View style={styles.inputgroup}>
            <Text style={styles.lable}>User Name :</Text>
            <TextInput
              placeholder="Enter Your User Name"
              style={styles.input}
              placeholderTextColor={themes.placeholderTextColor}
              onChangeText={(text) => {
                setUserName(text);
                setUserNameError(null);
              }}
              value={userName}
              key={"warden"}
              aria-label="warden-userName"
              accessibilityLabel="warden-userName"
            />
            {userNameError != null ? (
              <Text style={{ color: "red" }}>{userNameError}</Text>
            ) : (
              ""
            )}
            <View>
              <Text style={styles.lable}>Password :</Text>
              <TextInput
                placeholder="Enter Your Password"
                style={styles.input}
                placeholderTextColor={themes.placeholderTextColor}
                secureTextEntry={!showPassword}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError(null);
                }}
                value={password}
                inputMode="text"
                aria-label="warden-password"
                accessibilityLabel="warden-password"
              />
              {passwordError != null ? (
                <Text style={{ color: "red" }}>{passwordError}</Text>
              ) : (
                ""
              )}
              <MaterialCommunityIcons
                name={showPassword ? "eye" : "eye-off"}
                size={18}
                color="black"
                style={styles.icon}
                onPress={toggleShowPassword}
              />
            </View>
            <Text
              style={styles.forgetPass}
              onPress={() => navigation.navigate("forgetPassword")}
            >
              Forget/Change Password
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={handleSubmit}
            >
              <Text style={styles.btn}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default securityLogin

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
    fontSize: hp(4),
    color: themes.mainColor,
    marginTop: 15,
    fontWeight: "700",
  },
  subHead: {
    textAlign: "center",
    fontSize: hp(2),
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
    fontSize: hp(2),
  },
  inputgroup: {
    marginTop: 25,
  },
  lable: {
    fontWeight: "400",
    marginBottom: "2%"
  },
  input: {
    backgroundColor: "#D9D9D9",
    paddingStart: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
    marginBottom: "3%"
  },
  forgetPass: {
    textAlign: "right",
    marginVertical: 10,
    textDecorationLine: "underline",
  },
  icon: {
    position: "absolute",
    bottom: "27%",
    right: "4%",
  },
});