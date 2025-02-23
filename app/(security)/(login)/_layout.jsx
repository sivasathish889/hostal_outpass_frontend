import React from 'react'
import { Stack } from 'expo-router'
import themes from '@/constants/themes'

const _layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="securityLogin"
                options={{
                    title: "Security Login",
                    headerStyle: { backgroundColor: themes.mainColor },
                    headerTintColor: "white",
                }}
            />

            <Stack.Screen
                name="verifyOtp"
                options={{
                    title: "Security Verify",
                    headerStyle: { backgroundColor: themes.mainColor },
                    headerTintColor: "white",
                }}
            />
            
            <Stack.Screen
                name="forgetPassword"
                options={{
                    title: "Forget Password",
                    headerStyle: { backgroundColor: themes.mainColor },
                    headerTintColor: "white",
                }}
            />
            <Stack.Screen
                name="forgetVerifyOtp"
                options={{
                    title: "Verify OTP",
                    headerStyle: { backgroundColor: themes.mainColor },
                    headerTintColor: "white",
                }}
            />
            <Stack.Screen
                name="changePassword"
                options={{
                    title: "Change Password",
                    headerStyle: { backgroundColor: themes.mainColor },
                    headerTintColor: "white",
                }}
            />
        </Stack>
    )
}

export default _layout