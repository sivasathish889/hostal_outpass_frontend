import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import annaUniversity from "@/assets/annaUniversity.png";
import { hp, } from "@/helpers/dimensions"
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import urls from "@/constants/urls";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import themes from "@/constants/themes";
import Spinner from "react-native-loading-spinner-overlay";

const studentLogin = () => {
  let navigation = useRouter();
  let toast = useToast();
  const [spinnerVisible, setSpinnerVisible] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [registerNumber, setRegisterNumber] = useState(null);
  const [password, setPassword] = useState(null);

  const [registerNumberError, setRegisterNumberError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const nextInputRef = useRef();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async () => {
    if (registerNumber === null || registerNumber.length == 0) {
      return setRegisterNumberError("Register Number is Required");
    } else if (password === null || password.length == 0) {
      return setPasswordError("Password is Required");
    }
    let payload = {
      registerNumber,
      password,
    };
    setSpinnerVisible(true)
    try {
      const { data } = await axios.post(`${urls.CLIENT_URL}${urls.studentLogin}`, payload)
      if (data.success) {
        toast.show(data.message, {
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
        AsyncStorage.setItem("student", data.user);
        setRegisterNumber(null);
        setPassword(null);
        navigation.dismissTo("../(tabs)");
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
      toast.show(error.message, {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
    } finally {
      setSpinnerVisible(false)
    }
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ImageBackground source={annaUniversity} style={styles.backgroundImage}>
        <SafeAreaView style={styles.container}>
          <Spinner
            visible={spinnerVisible}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
            cancelable={true}
          />
          <View style={styles.form}>
            <Text style={styles.heading}>Student</Text>
            <Text style={styles.subHead}>Login</Text>

            <View style={styles.inputgroup}>
              <Text style={styles.lable}>Register Number :</Text>
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
                accessibilityLabel="registerNumber"
                aria-label="registerNumber"
              />
              {registerNumberError != null ? (
                <Text style={styles.errorMsg}>{registerNumberError}</Text>
              ) : (
                ""
              )}
              <View>
                <Text style={styles.lable}>Password :</Text>
                <View>
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
                    accessibilityLabel="password"
                    aria-label="password"
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
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default studentLogin

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
    marginBottom: 5
  },
  input: {
    backgroundColor: "#D9D9D9",
    paddingStart: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
    height: hp(4.5),
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
    fontSize: hp(1.3)
  }
});