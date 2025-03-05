import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { hp } from '@/helpers/dimensions';
const PassInfoModal = ({ modalVisible }) => {
    return (
        <View style={styles.modal}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={styles.ModelContent}>
                    <Entypo name="circle-with-cross" size={30} color="red" style={styles.cancelIcon} />
                    <Text style={styles.heading}> Pass Info </Text>
                </View>
            </Modal>
        </View>
    )
}

export default PassInfoModal

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
    cancelIcon : {
        position : "absolute",
        right : "5%",
        top : "10%"
    },
    heading :{
        textAlign :"center",
        fontSize : hp(2)
    }
})