import React from 'react'
import { Stack } from 'expo-router'
import themes from '@/constants/themes'

const WardenLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(login)"
        options={{
          title: "Warden Login",
          headerStyle: { backgroundColor: themes.mainColor },
          headerTintColor: "white",
          headerShown:false
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