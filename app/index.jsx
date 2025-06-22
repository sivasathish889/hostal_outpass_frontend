import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";


const Main = () => {
  const [isAuth, setIsAuth] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      const keys = await AsyncStorage.getAllKeys();
      setIsAuth(keys);
      setLoading(false);
    };
    getToken();
  }, []);

  if (loading) return null;

  return (
    isAuth.includes('security') ? <Redirect href='(security)/(tabs)/home' /> :
      isAuth.includes('student') ? <Redirect href='(student)/(tabs)/home' /> :
        isAuth.includes('warden') ? <Redirect href='(warden)/(tabs)/home' /> :
          <Redirect href="welcome" />
  );
};

export default Main;


