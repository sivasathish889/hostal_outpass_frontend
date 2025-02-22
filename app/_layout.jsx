import { Stack } from "expo-router";
import themes from "@/constants/themes"
import { ToastProvider } from "react-native-toast-notifications";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function RootLayout() {
  const [isAuth, setisAuth] = useState(null)

  useEffect(() => {
    const getToken = async () => {
      await AsyncStorage.getAllKeys().then((data) => setisAuth(data))
    }
    getToken()
  }, [])
  console.log((isAuth.includes('student')));

  return (
    <ToastProvider>
      <SafeAreaProvider>
        <Stack>
          {isAuth.includes('student') ?
            <Stack.Screen
              name="(student)"
              options={{
                title: "student",
                headerStyle: { backgroundColor: themes.mainColor },
                headerTintColor: "white",
                headerShown: false
              }}
            /> : <Stack.Screen
              name="welcome"
              options={{
                title: "welcome",
                headerStyle: { backgroundColor: themes.mainColor },
                headerTintColor: "white",
                headerShown: false
              }}
            />
          }

          <Stack.Screen
            name="(warden)"
            options={{
              headerShown: false,
              title: "warden ",
              headerStyle: { backgroundColor: themes.mainColor },
              headerShown: false
            }}
          />

        </Stack>
      </SafeAreaProvider>
    </ToastProvider>
  )
}
