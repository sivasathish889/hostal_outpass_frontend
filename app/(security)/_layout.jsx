import React from 'react'
import { Stack } from 'expo-router'

const SecurityLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="(login)"
                options={{
                    title: "Security Login",
                    headerStyle: { backgroundColor: themes.mainColor },
                    headerTintColor: "white",
                    headerShown:false
                }}
            />
            
            <Stack.Screen
                name="(tabs)"
                options={{
                    title: "security home",
                    headerStyle: { backgroundColor: themes.mainColor },
                    headerTintColor: "white",
                    headerShown:false

                }}
            />
        </Stack>
    )
}

export default SecurityLayout