import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { useToast } from "react-native-toast-notifications";
import urls from "@/constants/urls";
import axios from "axios";
import { useNavigation } from "expo-router";
import themes from "@/constants/themes";
import { Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { collageLocationRadius } from "@/helpers/calculateUserRadius";
import Spinner from "react-native-loading-spinner-overlay"
import * as Location from "expo-location"
import { hp } from "@/helpers/dimensions";
import notificationAPI from "@/utils/notificationAPI";

const NewPassModel = (props) => {
  const {
    setDataRefresh,
    userId,
    passModelVisible,
    setPassModelVisible,
    dataRefresh,
  } = props;
  const [isInDatePickerVisible, setInDatePickerVisible] = useState(false);
  const [isOutDatePickerVisible, setOutDatePickerVisible] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const [roomNo, setRoomNo] = useState("");
  const [destination, setDestination] = useState(null);
  const [purpose, setPurpose] = useState(null);
  const [inDateTime, setinDateTime] = useState(null);
  const [outDateTime, setoutDateTime] = useState(null);

  const [roomError, setRoomError] = useState(null);
  const [destinationError, setDestinationError] = useState(null);
  const [purposeError, setPurposeError] = useState(null);
  const [inDateError, setInDateError] = useState(null);
  const [outDateError, setOutDateError] = useState(null);


  const destinationRef = useRef();
  const purposeRef = useRef();

  let navigation = useNavigation();
  let toast = useToast();

  const handlePassSubmit = async () => {
    // Form validation
    try {
      if (roomNo === null || roomNo.length == 0) {
        return setRoomError("Room Number is required");
      } else if (destination === null || destination.length == 0) {
        return setDestinationError("Destinaion is required");
      } else if (purpose === null || purpose.length == 0) {
        return setPurposeError("Purpose is required");
      } else if (outDateTime === null || outDateTime.length == 0) {
        return setOutDateError("Out date is required");
      } else if (inDateTime === null || inDateTime.length == 0) {
        return setInDateError("In date is required");
      }

      const payload = {
        roomNo,
        destination,
        purpose,
        inDateTime,
        outDateTime,
        userId,
      };

      setSpinnerVisible(true)
      // get user Permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == 'granted') {
        // get user Loction
        let locationData = await Location.getCurrentPositionAsync({});
        const distance = await collageLocationRadius(locationData?.coords?.longitude, locationData?.coords?.latitude);
        if (!distance >= 600) {
          toast.show("You are mot inside the campus", {
            type: "danger",
            placement: "top",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
            dangerIcon: <FontAwesome name="warning" size={20} color="white" />,
            style: { marginTop: hp(5), width: "100%", display: "flex", justifyContent: "center", alignItems: "center" },
          });
          return;
        }
        await axios
          .post(`${urls.CLIENT_URL}${urls.studentNewRequest}`, payload)
          .then((data) => {
            if (data.data.success) {
              // 
              notificationAPI("wardenToken","New Outpass", roomNo)
              toast.show(data.data.message, {
                type: "success",
                placement: "top",
                duration: 4000,
                offset: 30,
                animationType: "slide-in",
                successIcon: <MaterialCommunityIcons name="check-circle" size={24} color="white" />,
                style: { marginTop: hp(5), width: "100%", display: "flex", justifyContent: "center", alignItems: "center" },
              });
              navigation.navigate("(tabs)");
              setDestination(null);
              setinDateTime(null);
              setoutDateTime(null);
              setPurpose(null);
              setRoomNo("");
              setPassModelVisible(false);
              setDataRefresh(!dataRefresh);
              setSpinnerVisible(false)
            } else {
              toast.show(data.data.message, {
                type: "danger",
                placement: "bottom",
                duration: 4000,
                offset: 30,
                animationType: "slide-in",
              });
              setSpinnerVisible(false)
            }
          })
          .catch((error) => console.log(error))
      }
      else {
        toast.show('Permission to access location was denied', {
          type: "warning",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
        setSpinnerVisible(false)
        return
      }

    } catch (error) {
      toast.show('Please Turn On the Location', {
        type: "warning",
        placement: "bottom",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
      setSpinnerVisible(false)
    }

  };
  const handleInDateTimePicker = (e) => {
    setinDateTime(e.toLocaleString());
    setInDatePickerVisible(false);
  };

  const handleOutDateTimePicker = (e) => {
    setoutDateTime(e.toLocaleString());
    setOutDatePickerVisible(false);
  };


  return (
    <View style={styles.modelContainer}>
      <Spinner
        visible={spinnerVisible}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
        cancelable={true}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={passModelVisible}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : "padding"} style={styles.container}>

          <View style={styles.modelContainer}>
            <StatusBar backgroundColor={"rgba(0,0,0,0.5)"} />
            <View style={styles.ModelContent}>
              <TouchableOpacity
                onPress={() => setPassModelVisible(!passModelVisible)}
                style={styles.closeBtn}
              >
                <Entypo name="cross" size={24} color="black" />
              </TouchableOpacity>

              <Text style={styles.modelHeading}>New Out Pass</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Room No :</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your Room No"
                  placeholderTextColor={"#AFAFAF"}
                  onSubmitEditing={() => destinationRef.current.focus()}
                  onChangeText={(text) => {
                    setRoomNo(text);
                    setRoomError(null);
                  }}
                  value={roomNo.toUpperCase()}
                />
                {roomError != null ? (
                  <Text style={{ color: "red" }}>{roomError}</Text>
                ) : (
                  ""
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Destination :</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Destination"
                  placeholderTextColor={"#AFAFAF"}
                  ref={destinationRef}
                  onSubmitEditing={() => purposeRef.current.focus()}
                  onChangeText={(text) => {
                    setDestination(text);
                    setDestinationError(null);
                  }}
                  value={destination}
                />
                {destinationError != null ? (
                  <Text style={{ color: "red" }}>{destinationError}</Text>
                ) : (
                  ""
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Purpose :</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Purpose"
                  ref={purposeRef}
                  placeholderTextColor={"#AFAFAF"}
                  onChangeText={(text) => {
                    setPurpose(text);
                    setPurposeError(null);
                  }}
                  value={purpose}
                />
                {purposeError != null ? (
                  <Text style={{ color: "red" }}>{purposeError}</Text>
                ) : (
                  ""
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Out Date & Time:</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={"#AFAFAF"}
                  placeholder=" Out Time &  Date"
                  defaultValue={outDateTime}
                  editable={false}
                />
                {outDateError != null ? (
                  <Text style={{ color: "red" }}>{outDateError}</Text>
                ) : (
                  ""
                )}
                <DateTimePicker
                  onCancel={() => setOutDatePickerVisible(false)}
                  mode="datetime"
                  onConfirm={(e) => {
                    handleOutDateTimePicker(e);
                    setOutDateError(null);
                  }}
                  isVisible={isOutDatePickerVisible}
                  minimumDate={new Date()}
                />
                <TouchableOpacity
                  style={styles.calendarIconStyle}
                  onPress={() => setOutDatePickerVisible(!isInDatePickerVisible)}
                >
                  <Entypo name="calendar" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>In Date & Time :</Text>
                <TextInput
                  style={styles.input}
                  placeholder=" In Time and Date"
                  placeholderTextColor={"#AFAFAF"}
                  defaultValue={inDateTime}
                  editable={false}
                />
                {inDateError != null ? (
                  <Text style={{ color: "red" }}>{inDateError}</Text>
                ) : (
                  ""
                )}
                <DateTimePicker
                  mode="datetime"
                  onCancel={() => setInDatePickerVisible(false)}
                  onConfirm={(e) => {
                    handleInDateTimePicker(e);
                    setInDateError(null);
                  }}
                  isVisible={isInDatePickerVisible}
                  minimumDate={new Date()}
                />
                <TouchableOpacity
                  style={styles.calendarIconStyle}
                  onPress={() => setInDatePickerVisible(!isInDatePickerVisible)}
                >
                  <Entypo name="calendar" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.buttonOutline}
                  onPress={() => {
                    handlePassSubmit();
                  }}
                >
                  <Text style={styles.btn}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default NewPassModel;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modelContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  ModelContent: {
    padding: 20,
    margin: "10%",
    marginVertical: "50%",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
  },
  modelHeading: {
    textAlign: "center",
    fontSize: 20,
    color: themes.mainColor,
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    paddingStart: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
    height: hp(4.5),
  },
  inputLabel: {
    fontSize: 18,
  },
  inputGroup: {
    marginTop: 10,
  },
  buttonOutline: {
    backgroundColor: themes.mainColor,
    borderRadius: 5,
    padding: 10,
    borderBlockColor: "black",
    marginVertical: 20,
    paddingHorizontal: 40,
  },
  btn: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  calendarIconStyle: {
    position: "absolute",
    right: 10,
    top: 30,
  },
  closeBtn: {
    alignSelf: "flex-end",
    backgroundColor: "red",
    borderRadius: 6,
    padding: 2
  },
});
