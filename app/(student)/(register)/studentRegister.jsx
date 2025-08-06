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
import annaUniversity from "@/assets/annaUniversity.png";
import url from "@/constants/urls";
import { Dropdown } from "react-native-element-dropdown";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import { useNavigation } from "expo-router";
import { hp } from "@/helpers/dimensions"
import themes from "@/constants/themes";
import Spinner from "react-native-loading-spinner-overlay";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const StudentRegister = () => {
  const [spinnerVisible, setSpinnerVisible] = useState(false)

  const [name, setName] = useState(null);
  const [registerNumber, setRegisterNumber] = useState(null);
  const [department, setDepartment] = useState(null);
  const [gender, setGender] = useState(null);
  const [year, setYear] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [parentNumber, setParentNumber] = useState(null);
  const [eMail, setEMail] = useState(null);
  const [district, setDistrict] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [nameError, setNameError] = useState(null);
  const [registerNumberError, setRegisterNumberError] = useState(null);
  const [genderError, setGenderError] = useState(null);
  const [departmentError, setDepartmentError] = useState(null);
  const [yearError, setYearError] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [parentNumberError, setParentNumberError] = useState(null);
  const [eMailError, setEMailError] = useState(null);
  const [districtError, setDistrictError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [step, setStep] = useState(1);


  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

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
    if (step == 1) {
      if (name === null || name.length == 0) {
        return setNameError("Name is Required");
      } else if (registerNumber === null || registerNumber.length == 0) {
        return setRegisterNumberError("RegisterNumber is Required");
      } else if (department === null || department.length == 0) {
        return setDepartmentError("Department is Required");
      } else if (year === null || year.length == 0) {
        return setYearError("Year is Required");
      }
      setStep(prevStep => Math.min(prevStep + 1, totalSteps));
      return
    }
    else if (step == 2) {
      if (eMail === null || eMail.length == 0) {
        return setEMailError("e-mail is Required");
      } else if (gender === null || gender.length == 0) {
        return setGenderError("Gender is Required");
      } else if (phoneNumber === null || phoneNumber.length == 0) {
        return setPhoneNumberError("Phone Number is Required");
      } else if (parentNumber === null || parentNumber.length == 0) {
        return setParentNumberError("Parent Number is Required");
      }
      setStep(prevStep => Math.min(prevStep + 1, totalSteps));
      return
    }
    else {
      if (district === null || district.length == 0) {
        return setDistrictError("District is Required");
      } else if (password === null || password.length == 0) {
        return setPasswordError("Password is Required");
      } else if (confirmPassword === null || confirmPassword.length == 0) {
        return setConfirmPasswordError("Confirm Password is Required");
      }
    }

    let payload = {
      name,
      registerNumber,
      department,
      year,
      phoneNumber,
      parentNumber,
      gender,
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
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
          successIcon: <MaterialCommunityIcons name="check-circle" size={24} color="white" />,
          style: { marginTop: hp(5), width: "100%", display: "flex", justifyContent: "center", alignItems: "center" },
        });
        navigation.navigate("(register)/registerOTP", {
          token: data.Token,
        });
      } else {
        toast.show(data.message, {
          type: "danger",
          placement: "top",
          duration: 3000,
          offset: 50,
          animationType: "zoom-in",
          dangerIcon: <FontAwesome name="warning" size={20} color="white" />,
          style: { marginTop: hp(5), width: "100%", display: "flex", justifyContent: "center", alignItems: "center" },
        });

      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setSpinnerVisible(false)
    }
  };
  const toggleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const totalSteps = 3;


  const handlePrevious = () => {
    setStep(prevStep => Math.max(prevStep - 1, 1));
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
          {/* prograss bar */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", textAlign: "center", alignItems: "center" }}>
            {[...Array(totalSteps)].map((_, index) => (
              <>
                <Text key={index} style={[styles.step, (index + 1 <= step || step > totalSteps) && { backgroundColor: themes.mainColor, color: "white" }]}>{index + 1}</Text>
                {index + 2 <= totalSteps && <View style={[styles.line, index + 1 < step ? { borderColor: themes.mainColor, backgroundColor: themes.mainColor } : {}]}></View>}
              </>
            ))}
          </View>
          <Text style={styles.mainHead}>Student</Text>
          <Text style={styles.subHead}>Register</Text>
          {/* step 1 */}
          {step == 1 && (
            <>
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
                    mode="default"
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={department}
                    onChange={(item) => {
                      setDepartment(item.value);
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
                    mode="default"
                    maxHeight={300}
                    labelField="label"
                    autoComplete="year"
                    valueField="value"
                    value={year}
                    onChange={(item) => {
                      setYear(item.value);
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
            </>
          )}

          {step == 2 && (
            <>
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
                <Text style={styles.label}>Gender :</Text>
                <Dropdown
                  style={[styles.dropdown]}
                  data={[
                    { label: "Male ", value: "Male" },
                    { label: "Female ", value: "Female" }
                  ]}
                  placeholder="Select Gender"
                  mode="modal"
                  maxHeight={100}
                  labelField="label"
                  valueField="value"
                  value={gender}
                  onChange={(item) => {
                    setGender(item.value);

                    setGenderError(null);
                  }}
                  autoComplete="gender"
                  placeholderStyle={{
                    color: themes.placeholderTextColor,
                    paddingStart: 10,
                    fontSize: hp(1.6)
                  }}
                  itemContainerStyle={{ borderRadius: 10 }}
                />
                {genderError != null ? (
                  <Text style={styles.errorText}>{genderError}</Text>
                ) : (
                  ""
                )}
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
            </>
          )}

          {step == 3 && (
            <>
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
                    secureTextEntry={!showPassword1}
                    value={password}
                    ref={passwordRef}
                    onSubmitEditing={() => confirmPasswordRef.current.focus()}
                    inputMode="text"
                    autoComplete="studentPassword"

                  />
                  <MaterialCommunityIcons
                    name={showPassword1 ? "eye" : "eye-off"}
                    size={18}
                    color="black"
                    style={styles.icon}
                    onPress={toggleShowPassword1}
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
                    secureTextEntry={!showPassword2}
                    inputMode="text"
                    ref={confirmPasswordRef}
                  />
                  <MaterialCommunityIcons
                    name={showPassword2 ? "eye" : "eye-off"}
                    size={18}
                    color="black"
                    style={styles.icon}
                    onPress={toggleShowPassword2}
                  />
                </View>
                {confirmPasswordError != null ? (
                  <Text style={styles.errorText}>{confirmPasswordError}</Text>
                ) : (
                  ""
                )}
              </View>
            </>
          )}

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
          <View style={styles.buttonContainer}>
            {step > 1 && (
              <TouchableOpacity
                style={styles.buttonOutline}
                onPress={handlePrevious}
              >
                <Text style={styles.btn}> Previous </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={handleSubmit}
            >
              <Text style={styles.btn}> {step < 3 ? "Next" : "Register"} </Text>
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
  buttonContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  buttonOutline: {
    backgroundColor: themes.mainColor,
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 40,
    borderBlockColor: "black",
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontSize: hp(1.4),
    height: 42,
    borderRadius: 10,
    paddingStart: 10,
  },
  errorText: {
    color: "#DC143C",
    fontSize: hp(1.3),
    marginStart: 10,
    marginTop: 5,
  },
  icon: {
    position: "absolute",
    bottom: "30%",
    right: "4%",
  },
  progressBar: {
    height: 5,
    width: "100%",
    borderColor: "black",
    marginVertical: 15,
    borderWidth: 1
  },
  step: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 50,
    borderColor: "transparent",
    backgroundColor: "gray",
    marginVertical: 10,
    height: hp(3.3),
    width: hp(3.5),
    textAlign: "center"
  },
  line: {
    borderWidth: 1,
    width: "30%",
    marginVertical: 2,
    borderColor: "gray",
    borderRadius: 20,
    backgroundColor: "gray"
  }
});