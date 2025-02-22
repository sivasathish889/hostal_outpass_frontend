import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";




const [studentToken, setStudentToken] = useState("")
const [wardenAuth, setWardenAuth] = useState("")

const getToken = async () => {
    setStudentToken(token)

}
useEffect(() => {
    getToken()
}, [])


export const authContext = createContext()
export const AuthProvider = ({ children }) => {

    const loginCheck = async () => {
        let token = await AsyncStorage.getAllKeys()
        return token
    }

    return (
        <authContext.Provider value={{ loginCheck }}>{children}</authContext.Provider>
    )
}



