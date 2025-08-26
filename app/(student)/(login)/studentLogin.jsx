import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import annaUniversity from "@/assets/annaUniversity.png";
import { hp } from "@/helpers/dimensions";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import urls from "@/constants/urls";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import themes from "@/constants/themes";
import Spinner from "react-native-loading-spinner-overlay";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { getMessaging, getToken } from "@react-native-firebase/messaging";
import { getApp } from "@react-native-firebase/app";

const studentLogin = () => {
  let navigation = useRouter();
  let toast = useToast();
  const [fcmToken, setFcmToken] = useState(null);

  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registerNumber, setRegisterNumber] = useState(null);
  const [password, setPassword] = useState(null);

  const [registerNumberError, setRegisterNumberError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const nextInputRef = useRef();

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const sendToken = async () => {
    // Get FCM Token
    const app = getApp();
    const messaging = getMessaging(app);
    const token = await messaging.getToken();
    console.log("FCM Token from student login:", token);
    setFcmToken(token);
  };
  useEffect(() => {
    sendToken();
  }, []);

  const handleSubmit = async () => {
    if (registerNumber === null || registerNumber.length == 0) {
      return setRegisterNumberError("Register Number is Required");
    } else if (password === null || password.length == 0) {
      return setPasswordError("Password is Required");
    }
    let payload = {
      registerNumber,
      password,
      fcmToken,
    };
    setSpinnerVisible(true);
    try {
      const { data } = await axios.post(
        `${urls.CLIENT_URL}${urls.studentLogin}`,
        payload
      );
      if (data.success) {
        toast.show(data.message, {
          type: "success",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
          successIcon: (
            <MaterialCommunityIcons
              name="check-circle"
              size={24}
              color="white"
            />
          ),
          style: {
            marginTop: hp(8),
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        });
        AsyncStorage.setItem("student", data.user);
        setRegisterNumber(null);
        setPassword(null);
        navigation.dismissTo("../(tabs)");
      } else {
        toast.show(data.message, {
          type: "danger",
          placement: "top",
          duration: 3000,
          offset: 50,
          animationType: "zoom-in",
          dangerIcon: <FontAwesome name="warning" size={20} color="white" />,
          style: {
            marginTop: hp(5),
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        });
      }
    } catch (error) {
      toast.show(data.message, {
        type: "danger",
        placement: "top",
        duration: 3000,
        offset: 50,
        animationType: "zoom-in",
        dangerIcon: <FontAwesome name="warning" size={20} color="white" />,
        style: {
          marginTop: hp(5),
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      });
    } finally {
      setSpinnerVisible(false);
    }
  };
  return (
    <ImageBackground source={annaUniversity} style={styles.backgroundImage}>
      <Spinner
        visible={spinnerVisible}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
        cancelable={true}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.form}>
          <Text style={styles.heading}>Student</Text>
          <Text style={styles.subHead}>Login</Text>

          <View style={styles.inputgroup}>
            <Text style={styles.lable}>Register Number :</Text>
            <View>
              <FontAwesome
                name="user"
                size={18}
                color="rgba(0,0,0,.6)"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enter Your Regsiter Number"
                style={styles.input}
                placeholderTextColor={themes.placeholderTextColor}
                onSubmitEditing={() => nextInputRef.current.focus()}
                onChangeText={(text) => {
                  setRegisterNumber(text);
                  setRegisterNumberError(null);
                }}
                keyboardType="number-pad"
                value={registerNumber}
                inputMode="numeric"
                autoComplete="studentRegisterNumber"
              />
            </View>
            {registerNumberError != null ? (
              <Text style={styles.errorMsg}>{registerNumberError}</Text>
            ) : (
              ""
            )}
            <View>
              <Text style={styles.lable}>Password :</Text>
              <View>
                <FontAwesome
                  name="lock"
                  size={18}
                  color="rgba(0,0,0,.6)"
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Enter Your Password"
                  style={styles.input}
                  placeholderTextColor={themes.placeholderTextColor}
                  secureTextEntry={!showPassword}
                  ref={nextInputRef}
                  onChangeText={(text) => {
                    setPassword(text);
                    setPasswordError(null);
                  }}
                  value={password}
                  inputMode="text"
                  autoComplete="studentPassword"
                />
                <MaterialCommunityIcons
                  name={showPassword ? "eye" : "eye-off"}
                  size={18}
                  color="black"
                  style={styles.icon}
                  onPress={toggleShowPassword}
                />
              </View>
              {passwordError != null ? (
                <Text style={styles.errorMsg}>{passwordError}</Text>
              ) : (
                ""
              )}
            </View>
            <Text
              style={styles.forgetPass}
              onPress={() => navigation.navigate("(login)/forgetPassword")}
            >
              Forget/Change Password
            </Text>
          </View>
          <Text style={{ marginTop: 10, fontSize: hp(1.3) }}>
            If you dont have account..
            <Text
              onPress={() => navigation.navigate("(register)/studentRegister")}
              style={{
                color: themes.mainColor,
                textDecorationLine: "underline",
                fontSize: hp(1.5),
              }}
            >
              Please Register
            </Text>
          </Text>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={handleSubmit}
            >
              <Text style={styles.btn}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default studentLogin;

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
    marginTop: hp(2),
    fontWeight: "700",
  },
  subHead: {
    textAlign: "center",
    fontSize: hp(3),
  },
  buttonOutline: {
    backgroundColor: themes.mainColor,
    borderRadius: 5,
    padding: hp(1),
    paddingHorizontal: hp(5),
    borderBlockColor: "black",
    marginVertical: hp(2),
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
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#D9D9D9",
    paddingStart: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
    height: hp(4.5),
    paddingStart: "12%",
    color: "black",
  },
  forgetPass: {
    textAlign: "right",
    marginVertical: hp(1),
    textDecorationLine: "underline",
  },
  icon: {
    position: "absolute",
    bottom: "25%",
    right: "4%",
  },
  errorMsg: {
    color: "red",
    fontSize: hp(1.3),
  },
  inputIcon: {
    position: "absolute",
    top: "28%",
    left: "4%",
    zIndex: 99,
  },
});
