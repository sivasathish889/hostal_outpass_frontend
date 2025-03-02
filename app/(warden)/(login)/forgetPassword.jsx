import {
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import annaUniversity from "@/assets/annaUniversity.png";
import { useToast } from "react-native-toast-notifications";
import url from "@/constants/urls";
import axios from "axios";
import { useNavigation } from "expo-router";
import themes from "@/constants/themes"
import { hp } from "@/helpers/dimensions";
import Spinner from "react-native-loading-spinner-overlay";

const forgetPassword = () => {
    let navigation = useNavigation()
    let toast = useToast()
    const [userName, setUsername] = useState(null)
    const [spinnerVisible, setSpinnerVisible] = useState(false)

    const handleSubmit = async () => {
        setSpinnerVisible(true)
        try {
            const { data } = await axios.post(`${url.CLIENT_URL}${url.wardenForgetPassword}`, { userName })
            if (data.success) {
                toast.show(data.message, {
                    type: "success",
                    placement: "bottom",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });
                navigation.navigate("forgetVerifyOtp", {
                    otp: data.Token,
                    userName: userName
                });
            } else {
                toast.show(data.message, {
                    type: "danger",
                    placement: "bottom",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });

            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setSpinnerVisible(false)
        }
    };
    return (
        <ImageBackground source={annaUniversity} style={styles.backgroundImage}>
            <SafeAreaView style={styles.container}>
                <Spinner
                    visible={spinnerVisible}
                    textContent={"Loading..."}
                    textStyle={{ color: "#FFF" }}
                />
                <View style={styles.form}>
                    <Text style={styles.heading}>Warden</Text>
                    <Text style={styles.subHead}>Change Password</Text>

                    <View style={styles.inputgroup}>
                        <Text style={styles.lable}>Enter Your User Name :</Text>
                        <TextInput
                            placeholder="Enter User Name"
                            style={styles.input}
                            placeholderTextColor={themes.placeholderTextColor}
                            onChangeText={(text) => setUsername(text)}
                            inputMode="text"
                        />
                    </View>
                    <View style={{ alignItems: "center", marginVertical: 10 }}>
                        <TouchableOpacity
                            style={styles.buttonOutline}
                            onPress={handleSubmit}
                        >
                            <Text
                                style={styles.btn}
                            >
                                Verify OTP
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default forgetPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundImage: {
        flex: 1,
    },
    form: {
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 30,
        width: "80%",
        backgroundColor: "rgb(171,171,171)",
    },
    heading: {
        textAlign: "center",
        fontSize: hp(4),
        color: themes.mainColor,
        marginTop: 15,
        fontWeight: "700",
    },
    subHead: {
        textAlign: "center",
        fontSize: hp(2),
    },
    buttonOutline: {
        backgroundColor: themes.mainColor,
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 40,
        borderBlockColor: "black",
        marginVertical: 20,
    },
    btn: {
        color: "white",
        fontSize: hp(1.4),
    },
    inputgroup: {
        marginTop: 25,
        rowGap: 10,
    },
    lable: {
        fontWeight: "400",
    },
    input: {
        backgroundColor: "#D9D9D9",
        paddingStart: 10,
        borderRadius: 5,
        borderWidth: 1,
    height:hp(4.5),
    borderColor: "rgb(115,115,115)",
    },
});