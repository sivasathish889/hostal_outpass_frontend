import { Stack, Slot } from "expo-router";
import themes from "@/constants/themes"
import { ToastProvider } from "react-native-toast-notifications";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function RootLayout() {

  return (
    <ToastProvider>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen
            name="welcome"
            options={{
              title: "welcome",
              headerStyle: { backgroundColor: themes.mainColor },
              headerTintColor: "white",
              headerShown: false
            }}
          />
          <Stack.Screen
            name="(student)"
            options={{
              title: "student",
              headerStyle: { backgroundColor: themes.mainColor },
              headerTintColor: "white",
              headerShown: false
            }}
          />


          <Stack.Screen
            name="(warden)"
            options={{
              headerShown: false,
              title: "warden ",
              headerStyle: { backgroundColor: themes.mainColor },
              headerShown: false
            }}
          />

          <Stack.Screen
            name="(security)"
            options={{
              headerShown: false,
              title: "security ",
              headerStyle: { backgroundColor: themes.mainColor },
              headerShown: false
            }}
          />

        </Stack>
      </SafeAreaProvider>
    </ToastProvider>
  )
}
