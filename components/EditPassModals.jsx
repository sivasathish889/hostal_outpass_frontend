import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Modal
} from "react-native"; import React, { useRef, useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { hp } from "@/helpers/dimensions";

const EditPassModals = (props) => {

    const { editModelVisible, setEditModelVisible, roomNo, setRoomNo, destination, setDestination, purpose, setPurpose, outDateTime, handleOutDateTimePicker, inDateTime, handleInDateTimePicker, handelPassUpdate } = props
    const [isInDatePickerVisible, setInDatePickerVisible] = useState(false);
    const [isOutDatePickerVisible, setOutDatePickerVisible] = useState(false);

    const destinationRef = useRef();
    const purposeRef = useRef();
    return (
        <View style={styles.modelContainer}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={editModelVisible}
            >
                <View style={styles.modelContainer}>
                    <StatusBar backgroundColor={"rgba(0,0,0,0.5)"} />
                    <View style={styles.ModelContent}>
                        <TouchableOpacity
                            onPress={() => setEditModelVisible(!editModelVisible)}
                            style={styles.closeBtn}
                        >
                            <Entypo name="cross" size={24} color="black" />
                        </TouchableOpacity>

                        <Text style={styles.modelHeading}>Update OutPass</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Room No :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={roomNo}
                                onSubmitEditing={() => destinationRef.current.focus()}
                                placeholderTextColor={"#AFAFAF"}
                                onChangeText={(text) => {
                                    setRoomNo(text);
                                }}
                                inputMode="text"

                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Destination :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={destination}
                                ref={destinationRef}
                                onSubmitEditing={() => purposeRef.current.focus()}
                                placeholderTextColor={"#AFAFAF"}
                                onChangeText={(text) => {
                                    setDestination(text);
                                }}
                                inputMode="text"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Purpose :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={purpose}
                                placeholderTextColor={"#AFAFAF"}
                                ref={purposeRef}
                                onChangeText={(text) => {
                                    setPurpose(text);
                                }}
                                inputMode="text"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Out Date & Time:</Text>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor={"#AFAFAF"}
                                placeholder={outDateTime}
                                editable={false}
                                inputMode="text"
                            />

                            <DateTimePicker
                            mode="datetime"
                                onCancel={() => setOutDatePickerVisible(false)}
                                onConfirm={(e) => {
                                    handleOutDateTimePicker(e);
                                }}
                                isVisible={isOutDatePickerVisible}
                            />
                            <TouchableOpacity
                                style={styles.calendarIconStyle}
                                onPress={() =>
                                    setOutDatePickerVisible(!isInDatePickerVisible)
                                }
                            >
                                <Entypo name="calendar" size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>In Date & Time :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={inDateTime}
                                placeholderTextColor={"#AFAFAF"}
                                editable={false}
                            />

                            <DateTimePicker
                            mode="datetime"
                                onCancel={() => setInDatePickerVisible(false)}
                                onConfirm={(e) => {
                                    handleInDateTimePicker(e);
                                }}
                                isVisible={isInDatePickerVisible}
                            />
                            <TouchableOpacity
                                onPress={() => setInDatePickerVisible(!isInDatePickerVisible)}
                                style={styles.calendarIconStyle}
                            >
                                <Entypo name="calendar" size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity
                                style={styles.buttonOutline}
                                onPress={handelPassUpdate}
                            >
                                <Text style={styles.btn}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default EditPassModals

const styles = StyleSheet.create({
    modelContainer: {
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    ModelContent: {
        padding: 20,
        margin: "10%",
        marginVertical: "50%",
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
    },
    modelHeading: {
        textAlign: "center",
        fontSize: 20,
        color: themes.ma,
        textDecorationLine: "underline",
        marginBottom: 20,
    },
    input: {
        backgroundColor: "white",
        paddingStart: 10,
        borderRadius: 5,
        borderWidth: 1,
        height: hp(4.5),
        borderColor: "rgb(115,115,115)",
    },
    inputLabel: {
        fontSize: 18,
    },
    inputGroup: {
        marginTop: 10,
    },
    buttonOutline: {
        backgroundColor: themes.mainColor,
        borderRadius: 5,
        padding: 10,
        borderBlockColor: "black",
        marginVertical: 20,
        paddingHorizontal: 40,
    },
    btn: {
        color: "white",
        fontSize: 15,
        textAlign: "center",
    },
    calendarIconStyle: {
        position: "absolute",
        right: 10,
        top: 30,
    },
    closeBtn: {
        alignSelf: "flex-end",
        backgroundColor: "red",
        padding: 3,
        borderRadius: 5
    },
})