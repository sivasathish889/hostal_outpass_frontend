import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const WardenLayout = () => {
  return (
    <Stack>
      <Stack.Screen
            name="(login)/wardenLogin"
            options={{
              title: "Warden Login",
              headerStyle: { backgroundColor: themes.mainColor },
              headerTintColor: "white",
            }}
          />

          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              title: "warden home",
              headerStyle: { backgroundColor: themes.mainColor },

            }}
          />
    </Stack>
  )
}

export default WardenLayout