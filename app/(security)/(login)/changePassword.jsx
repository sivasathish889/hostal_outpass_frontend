import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import annaUniversity from "@/assets/annaUniversity.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import url from "@/constants/urls";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { hp } from "@/helpers/dimensions"
import themes from "@/constants/themes";
import Spinner from "react-native-loading-spinner-overlay";
import { FontAwesome } from "@expo/vector-icons";

const ChangePassword = () => {
  let router = useRouter();
  let toast = useToast();

  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [newPasswordVisible, setNewPasswordVisible] = useState(null);
  const [confrimPasswordVisible, setConfirmPasswordVisible] = useState(null);
  const [showPassword, setShowPassword] = useState(false)

  const [newPasswordError, setNewPasswordError] = useState(null);
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(null);
  const [spinnerVisible, setSpinnerVisible] = useState(false)

  const nextInputRef = useRef()

  let userName = useLocalSearchParams().userName;

  const toggleNewPasswordVisible = () => {
    setShowPassword(!showPassword)
    setNewPasswordVisible(!newPasswordVisible);
  };
  const toggleConfirmPasswordVisible = () => {
    setShowPassword(!showPassword)
    setConfirmPasswordVisible(!confrimPasswordVisible);
  };
  const handleSubmit = async () => {
    let payload = {
      userName,
      newPassword,
      confirmNewPassword,
    };
    if (newPassword === null || newPassword.length == 0) {
      return setNewPasswordError(" New Password Required");
    } else if (confirmNewPassword === null || confirmNewPassword.length == 0) {
      return setConfirmNewPasswordError("Confirm Password Required");
    }
    setSpinnerVisible(true)
    try {
      const { data } = await axios.post(`${url.CLIENT_URL}${url.securityChangePassword}`, payload)
      if (data.success) {
        toast.show(data.message, {
          type: "success",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
          successIcon: <MaterialCommunityIcons name="check-circle" size={24} color="white" />,
          style: { marginTop: hp(5), width: "100%",display :"flex", justifyContent:"center", alignItems:"center" },
        });
        router.dismissTo("securityLogin");
      } else {
        toast.show(data.message, {
          type: "danger",
          placement: "top",
          duration: 3000,
          offset: 50,
          animationType: "zoom-in",
          dangerIcon: <FontAwesome name="warning" size={20} color="white" />,
          style: { marginTop: hp(5), width: "100%",display :"flex", justifyContent:"center", alignItems:"center" },
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
          <Text style={styles.subHead}>Reset Password</Text>

          <View style={styles.inputgroup}>
            <Text style={styles.lable}>New Password :</Text>
            <View>
              <TextInput
                placeholder="Enter Your New Password"
                style={styles.input}
                placeholderTextColor={themes.placeholderTextColor}
                secureTextEntry={!newPasswordVisible}
                onSubmitEditing={() => nextInputRef.current.focus()}
                onChangeText={(text) => {
                  setNewPassword(text);
                  setNewPasswordError(null);
                }}
                inputMode="text"
              />
              <MaterialCommunityIcons
                name={showPassword ? "eye" : "eye-off"}
                size={18}
                color="black"
                style={styles.hideIcon1}
                onPress={toggleNewPasswordVisible}
              />
            </View>
            {newPasswordError != null ? (
              <Text style={styles.errorMsg}>{newPasswordError}</Text>
            ) : (
              ""
            )}
            <Text style={styles.lable}>Password :</Text>
            <View>
              <TextInput
                placeholder="Enter Confirm Password"
                style={styles.input}
                placeholderTextColor={themes.placeholderTextColor}
                secureTextEntry={!confrimPasswordVisible}
                ref={nextInputRef}
                onChangeText={(text) => {
                  setConfirmNewPassword(text);
                  setConfirmNewPasswordError(null);
                }}
                keyboardType="visible-password"
                inputMode="text"
              />
              <MaterialCommunityIcons
                name={showPassword ? "eye" : "eye-off"}
                size={18}
                color="black"
                style={styles.hideIcon2}
                onPress={toggleConfirmPasswordVisible}
              />
            </View>
            {confirmNewPasswordError != null ? (
              <Text style={styles.errorMsg}>{confirmNewPasswordError}</Text>
            ) : (
              ""
            )}
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={handleSubmit}
            >
              <Text style={styles.btn}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default ChangePassword

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
    backgroundColor: themes.placeholderTextColor,
  },
  heading: {
    textAlign: "center",
    fontSize: hp(5),
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
    fontSize: hp(1.6),
  },
  lable: {
    fontWeight: "400",
    fontSize: hp(1.5),
    marginBottom: "2%"
  },
  inputgroup: {
    marginTop: 25,
  },
  input: {
    backgroundColor: "#D9D9D9",
    paddingStart: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
    height: hp(4.5),
    marginBottom: "7%"
  },
  hideIcon1: {
    position: "absolute",
    right: 10,
    top : "18%",
  },
  hideIcon2: {
    position: "absolute",
    top : "18%",
    right: 10,
  },
  errorMsg: {
    color: "red",
    fontSize: hp(1.3),
  }
});