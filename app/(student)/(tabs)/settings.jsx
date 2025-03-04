import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import urls from "@/constants/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from 'react-native-loading-spinner-overlay';
import { hp } from "@/helpers/dimensions";
import { useRouter } from "expo-router";

const Settings = () => {
  const router = useRouter()
  const [spinnerVisible, setSpinnerVisible] = useState(false)
  const [fetchingData, setFetchingData] = useState([
    {
      Department: "",
      District: "",
      Email: "",
      RegisterNumber: "",
      name: "",
    },
  ]);

  const fetchDate = async () => {
    try {
      let id = await AsyncStorage.getItem("student");
      if (id != null) {
        const { data } = await axios.get(`${urls.CLIENT_URL}${urls.studentData}${id}`)
        setFetchingData(data?.data);
      } else {
        router.dismissTo("welcome");
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setSpinnerVisible(false)
    }

  };

  useEffect(() => {
    setSpinnerVisible(true)
    fetchDate();
  }, []);

  const logOutAlert = () => {
    Alert.alert("Log Out", "Are you sure you want logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sure",
        onPress: () => handleLogout(),
        style: "default",
      },
    ]);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("student").then(() =>
        router.dismissTo("welcome")
      );
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View style={styles.container}>
      <Spinner
        visible={spinnerVisible}
        textContent={"Loading..."}
        textStyle={{ color: '#FFF' }}
      />
      <View style={styles.profile}>
        <AntDesign name="user" size={120} color="black" />
        <Text>{fetchingData[0]?.name.toUpperCase()}</Text>
        <Text>{fetchingData[0]?.RegisterNumber}</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnOutline} onPress={logOutAlert}>
          <Text style={styles.logoutBtn}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: "6%",
  },
  profile: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    width: "80%",
  },
  btnOutline: {
    backgroundColor: "red",
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutBtn: {
    color: "white",
    fontSize: hp(2.5),
  },
});
