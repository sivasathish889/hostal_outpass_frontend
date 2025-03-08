import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import annaUniversity from "@/assets/annaUniversity.png";
import url from "@/constants/urls";
import { Dropdown } from "react-native-element-dropdown";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import { useNavigation } from "expo-router";
import { hp } from "@/helpers/dimensions"
import themes from "@/constants/themes";
import Spinner from "react-native-loading-spinner-overlay";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const StudentRegister = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false)

  let [name, setName] = useState(null);
  let [registerNumber, setRegisterNumber] = useState(null);
  let [department, setDepartment] = useState(null);
  let [year, setYear] = useState(null);
  let [phoneNumber, setPhoneNumber] = useState(null);
  let [parentNumber, setParentNumber] = useState(null);
  let [eMail, setEMail] = useState(null);
  let [district, setDistrict] = useState(null);
  let [password, setPassword] = useState(null);
  let [confirmPassword, setConfirmPassword] = useState(null);

  let [nameError, setNameError] = useState(null);
  let [registerNumberError, setRegisterNumberError] = useState(null);
  let [departmentError, setDepartmentError] = useState(null);
  let [yearError, setYearError] = useState(null);
  let [phoneNumberError, setPhoneNumberError] = useState(null);
  let [parentNumberError, setParentNumberError] = useState(null);
  let [eMailError, setEMailError] = useState(null);
  let [districtError, setDistrictError] = useState(null);
  let [passwordError, setPasswordError] = useState(null);
  let [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const registerRef = useRef()
  const phoneNumberRef = useRef()
  const parentNumberRef = useRef()
  const emailRef = useRef()
  const districtRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const toast = useToast();
  let navigation = useNavigation();

  const handleSubmit = async () => {
    // Form Validationn
    if (name === null || name.length == 0) {
      return setNameError("Name is Required");
    } else if (registerNumber === null || registerNumber.length == 0) {
      return setRegisterNumberError("RegisterNumber is Required");
    } else if (department === null || department.length == 0) {
      return setDepartmentError("Department is Required");
    } else if (year === null || year.length == 0) {
      return setYearError("Year is Required");
    } else if (phoneNumber === null || phoneNumber.length == 0) {
      return setPhoneNumberError("Phone Number is Required");
    } else if (parentNumber === null || parentNumber.length == 0) {
      return setParentNumberError("Parent Number is Required");
    } else if (eMail === null || eMail.length == 0) {
      return setEMailError("e-mail is Required");
    } else if (district === null || district.length == 0) {
      return setDistrictError("District is Required");
    } else if (password === null || password.length == 0) {
      return setPasswordError("Password is Required");
    } else if (confirmPassword === null || confirmPassword.length == 0) {
      return setConfirmPasswordError("Confirm Password is Required");
    }

    let payload = {
      name,
      registerNumber,
      department,
      year,
      phoneNumber,
      parentNumber,
      eMail,
      district,
      password,
      confirmPassword,
    };
    setSpinnerVisible(true)
    try {
      const { data } = await axios.post(`${url.CLIENT_URL}${url.studentRegister}`, payload)
      if (data.success) {
        toast.show(data.message, {
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });

        navigation.navigate("(register)/registerOTP", {
          token: data.Token,
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
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ImageBackground source={annaUniversity} style={styles.backgroundImage}>
      <Spinner
        visible={spinnerVisible}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : "height"} style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.mainHead}>Student</Text>
          <Text style={styles.subHead}>Register</Text>

          <View style={styles.inputGroups}>
            <Text style={styles.label}>Name :</Text>
            <TextInput
              placeholder="Enter Your Name"
              style={styles.input}
              placeholderTextColor={themes.placeholderTextColor}
              onSubmitEditing={() => registerRef.current.focus()}
              onChangeText={(text) => {
                setName(text);
                setNameError(null);
              }}
              value={name}
              inputMode="text"
              autoComplete="studentName"
            />
            {nameError != null ? (
              <Text style={styles.errorText}>{nameError}</Text>
            ) : (
              ""
            )}
          </View>

          <View style={styles.inputGroups}>
            <Text style={styles.label}>Register Number :</Text>
            <TextInput
              placeholder="Enter Your Regsiter Number"
              style={styles.input}
              placeholderTextColor={themes.placeholderTextColor}
              keyboardType="number-pad"
              ref={registerRef}
              onChangeText={(text) => {
                setRegisterNumber(text);
                setRegisterNumberError(null);
              }}
              value={registerNumber}
              inputMode="numeric"
              autoComplete="registerNumber"
            />
            {registerNumberError != null ? (
              <Text style={styles.errorText}>{registerNumberError}</Text>
            ) : (
              ""
            )}
          </View>

          <View style={styles.inputRows}>
            <View style={styles.inputGrid}>
              <Text style={styles.label}>Department :</Text>
              <Dropdown
                style={[styles.dropdown]}
                data={[
                  { label: "CSE ", value: "CSE" },
                  { label: "ECE ", value: "ECE" },
                  { label: "IT ", value: "IT" },
                  { label: "CIVIL", value: "CIVIL" },
                ]}
                placeholder="Select Department"
                mode="modal"
                maxHeight={100}
                labelField="label"
                valueField="value"
                value={department}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setDepartment(item.value);
                  setIsFocus(false);
                  setDepartmentError(null);
                }}
                autoComplete="department"
                placeholderStyle={{
                  color: themes.placeholderTextColor,
                  paddingStart: 10,
                  fontSize: hp(1.6)
                }}
                itemContainerStyle={{ borderRadius: 10 }}
              />
              {departmentError != null ? (
                <Text style={styles.errorText}>{departmentError}</Text>
              ) : (
                ""
              )}
            </View>

            <View style={styles.inputGrid}>
              <Text style={styles.label}>Year :</Text>
              <Dropdown
                style={[styles.dropdown]}
                data={[
                  { label: "I ", value: "1" },
                  { label: "II ", value: "2" },
                  { label: "III ", value: "3" },
                  { label: "IV ", value: "4" },
                ]}
                placeholder="Select Year"
                mode="modal"
                maxHeight={100}
                labelField="label"
                autoComplete="year"
                valueField="value"
                value={year}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setYear(item.value);
                  setIsFocus(false);
                  setYearError(null);
                }}
                placeholderStyle={{
                  color: themes.placeholderTextColor,
                  paddingStart: 10,
                  fontSize: hp(1.6)
                }}
                itemContainerStyle={{ borderRadius: 10 }}
                accessibilityLabel="year"
                aria-label="year"
              />
              {yearError != null ? (
                <Text style={styles.errorText}>{yearError}</Text>
              ) : (
                ""
              )}
            </View>
          </View>

          <View style={styles.inputRows}>
            <View style={styles.inputGrid}>
              <Text style={styles.label}>Phone Number :</Text>
              <TextInput
                placeholder="Enter Your Phone Number"
                style={styles.input}
                placeholderTextColor={themes.placeholderTextColor}
                keyboardType="number-pad"
                onChangeText={(text) => { setPhoneNumber(text); setPhoneNumberError(null) }}
                value={phoneNumber}
                ref={phoneNumberRef}
                onSubmitEditing={() => parentNumberRef.current.focus()}
                inputMode="numeric"
                autoComplete="phoneNumber"
              />
              {phoneNumberError != null ? (
                <Text style={styles.errorText}>{phoneNumberError}</Text>
              ) : (
                ""
              )}
            </View>

            <View style={styles.inputGrid}>
              <Text style={styles.label}>Parent Number :</Text>
              <TextInput
                placeholder="Enter Your Parent Number "
                style={styles.input}
                keyboardType="number-pad"
                placeholderTextColor={themes.placeholderTextColor}
                onChangeText={(text) => { setParentNumber(text); setParentNumberError(null) }}
                value={parentNumber}
                ref={parentNumberRef}
                onSubmitEditing={() => emailRef.current.focus()}
                inputMode="numeric"
                autoComplete="parentNumber"
              />
              {parentNumberError != null ? (
                <Text style={styles.errorText}>{parentNumberError}</Text>
              ) : (
                ""
              )}
            </View>
          </View>

          <View style={styles.inputGroups}>
            <Text style={styles.label}>E-mail :</Text>
            <TextInput
              placeholder="Enter Your E-mail"
              style={styles.input}
              placeholderTextColor={themes.placeholderTextColor}
              onChangeText={(text) => { setEMail(text); setEMailError(null) }}
              value={eMail}
              ref={emailRef}
              onSubmitEditing={() => districtRef.current.focus()}
              keyboardType="email-address"
              inputMode="email"
              autoComplete="studentEmail"
            />
            {eMailError != null ? (
              <Text style={styles.errorText}>{eMailError}</Text>
            ) : (
              ""
            )}
          </View>

          <View style={styles.inputGroups}>
            <Text style={styles.label}>District :</Text>
            <TextInput
              placeholder="Enter Your District"
              style={styles.input}
              placeholderTextColor={themes.placeholderTextColor}
              onChangeText={(text) => { setDistrict(text); setDistrictError(null) }}
              value={district}
              inputMode="text"
              ref={districtRef}
              onSubmitEditing={() => passwordRef.current.focus()}
              autoComplete="studentDistrict"
            />
            {districtError != null ? (
              <Text style={styles.errorText}>{districtError}</Text>
            ) : (
              ""
            )}
          </View>
          <View style={styles.inputGroups}>
            <Text style={styles.label}>Password :</Text>
            <View>
              <TextInput
                placeholder="Enter Your Password"
                style={[styles.input, { paddingEnd: 25 }]}
                placeholderTextColor={themes.placeholderTextColor}
                onChangeText={(text) => { setPassword(text); setPasswordError(null) }}
                secureTextEntry={!showPassword}
                value={password}
                ref={passwordRef}
                onSubmitEditing={() => confirmPasswordRef.current.focus()}
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
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : (
              ""
            )}
          </View>

          <View style={styles.inputGroups}>
            <Text style={styles.label}>Confirm Password :</Text>
            <View>
              <TextInput
                placeholder="Enter Confirm Password"
                style={[styles.input, { paddingEnd: 25 }]}
                placeholderTextColor={themes.placeholderTextColor}
                onChangeText={(text) => { setConfirmPassword(text); setConfirmPasswordError(null) }}
                value={confirmPassword}
                secureTextEntry={!showPassword}
                inputMode="text"
                ref={confirmPasswordRef}
              />
              <MaterialCommunityIcons
                name={showPassword ? "eye" : "eye-off"}
                size={18}
                color="black"
                style={styles.icon}
                onPress={toggleShowPassword}
              />
            </View>
            {confirmPasswordError != null ? (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            ) : (
              ""
            )}
          </View>

          <Text style={{ marginStart: 15 }}>
            If You Already Regsiter...
            <Text
              style={{
                color: themes.mainColor,
                textDecorationLine: "underline",
                fontSize: hp(2),
              }}
              onPress={() => navigation.goBack()}
            >
              Login
            </Text>
          </Text>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={handleSubmit}
            >
              <Text style={styles.btn}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground >
  )
}

export default StudentRegister

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
    backgroundColor: "rgb(171,171,171)",
    borderRadius: 20,
    width: "85%",
    paddingHorizontal: "10"
  },
  mainHead: {
    textAlign: "center",
    fontSize: hp(3.5),
    color: themes.mainColor,
    fontWeight: "700",
  },
  subHead: {
    textAlign: "center",
    fontSize: hp(2),
    marginBottom: "3%",
    textDecorationLine: "underline",
  },
  inputRows: {
    display: "flex",
    flexDirection: "row",
  },
  inputGroups: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputGrid: {
    width: "50%",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
    width: "100%",
    color: "black",
    fontSize: hp(1.3),
    height: hp(4.5),
    paddingStart: 15,
  },
  label: {
    fontSize: hp(1.6),
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
  dropdown: {
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
    width: "100%",
    color: "black",
    fontSize: hp(1.6),
    height: 42,
    borderRadius: 10,
    paddingStart: 10,
  },
  errorText: {
    color: "red",
    fontSize: hp(1.3),
    marginStart: 10,
    marginTop: 5,
  },
  icon: {
    position: "absolute",
    bottom: "30%",
    right: "4%",
  },
});