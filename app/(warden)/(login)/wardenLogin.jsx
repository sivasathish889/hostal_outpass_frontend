import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import annaUniversity from "@/assets/annaUniversity.png";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import url from "@/constants/urls";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import themes from "@/constants/themes";
import { useNavigation } from "expo-router";
import { hp } from "@/helpers/dimensions";
import Spinner from "react-native-loading-spinner-overlay";

const WardenLogin = () => {
  let navigation = useNavigation();
  let toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);

  const [userNameError, setUserNameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const nextInputRef = useRef()

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    if (userName === null || userName.length == 0) {
      return setUserNameError("Username is Required");
    } else if (password === null || password.length == 0) {
      return setPasswordError("Password is Required");
    }
    let payload = {
      userName,
      password,
    };
    setSpinnerVisible(true)
    try {
      const { data } = await axios.post(`${url.CLIENT_URL}${url.wardenLogin}`, payload)
      if (data.success) {
        toast.show(data.message, {
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
        setUserName(null);
        setPassword(null);
        navigation.navigate("verifyOtp", {
          otp: data.Token,
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
        />
        <View style={styles.form}>
          <Text style={styles.heading}>Warden</Text>
          <Text style={styles.subHead}>Login</Text>

          <View style={styles.inputgroup}>
            <Text style={styles.lable}>User Name :</Text>
            <View>
              <FontAwesome name="user" size={18} color="rgba(0,0,0,.6)" style={styles.inputIcon} />
              <TextInput
                placeholder="Enter Your User Name"
                style={styles.input}
                placeholderTextColor={themes.placeholderTextColor}
                onSubmitEditing={() => nextInputRef.current.focus()}
                onChangeText={(text) => {
                  setUserName(text);
                  setUserNameError(null);
                }}
                value={userName}
                key={"warden"}
                aria-label="warden-userName"
                accessibilityLabel="warden-userName"
              />
            </View>
            {userNameError != null ? (
              <Text style={styles.errorMsg}>{userNameError}</Text>
            ) : (
              ""
            )}
            <View>
              <Text style={styles.lable}>Password :</Text>
              <View>
                <FontAwesome name="lock" size={18} color="rgba(0,0,0,.6)" style={styles.inputIcon} />
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
                  aria-label="warden-password"
                  accessibilityLabel="warden-password"
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
  );
};

export default WardenLogin;

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
    height: hp(4.5),
    marginBottom: "3%",
    paddingStart: "12%"
  },
  forgetPass: {
    textAlign: "right",
    marginVertical: 10,
    textDecorationLine: "underline",
  },
  icon: {
    position: "absolute",
    bottom: "40%",
    right: "4%",
  },
  errorMsg: {
    color: "red",
    fontSize: hp(1.3)
  },
  inputIcon: {
    position: "absolute",
    top: "24%",
    left: "4%",
    zIndex: 99
  }
});
