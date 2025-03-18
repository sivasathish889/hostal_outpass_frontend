import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useState } from "react";


const Welcome = () => {
  const [isAuth, setisAuth] = useState('')

  const getToken = async () => {
    await AsyncStorage.getAllKeys().then((data) => setisAuth(data))
  }
  getToken()

  return (

    isAuth.includes('security') ? <Redirect href='(security)/(tabs)/home'/> : isAuth.includes('student') ? <Redirect href='(student)/(tabs)/home'/> : isAuth.includes('warden') ? <Redirect href='(warden)/(tabs)/home'/> : <Redirect href="welcome" /> 
   
  );
};

export default Welcome;


