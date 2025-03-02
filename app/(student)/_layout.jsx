import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    return (
        
        <Stack>
            <Stack.Screen
                name="(login)/studentLogin"
                options={{
                    title: "Login",
                    headerStyle: { backgroundColor: themes.mainColor },
                    headerTintColor: "white",
                }}
            />

            <Stack.Screen
                name="(login)/forgetPassword"
                options={{
                    title: "Forget Password",
                    headerStyle: { backgroundColor: themes.mainColor },
                    headerTintColor: "white",
                }}
            />

            <Stack.Screen
                name="(login)/verifyOTP"
                options={{
                    title: "Verify otp",
                    headerStyle: { backgroundColor: themes.mainColor },
                    headerTintColor: "white",
                }}
            />

            <Stack.Screen
                name="(login)/changePassword"
                options={{
                    title: "Change Password",
                    headerStyle: { backgroundColor: themes.mainColor },
                    headerTintColor: "white",
                }}
            />

            <Stack.Screen
                name="(register)/studentRegister"
                options={{
                    title: "Register",
                    headerStyle: { backgroundColor: themes.mainColor },
                    headerTintColor: "white",
                }}
            />
            <Stack.Screen
                name="(register)/registerOTP"
                options={{
                    title: "Verify OTP",
                    headerStyle: { backgroundColor: themes.mainColor },
                    headerTintColor: "white",
                }}
            />
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                    title: "studentHome",
                    headerStyle: { backgroundColor: themes.mainColor },

                }}
            />
        </Stack>
    )
}

export default _layout