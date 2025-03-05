import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { hp } from '@/helpers/dimensions';
import themes from '@/constants/themes';
import InfoGrid from './InfoGrid';


const PassInfoModal = (props) => {
    const { modalVisible, setmodalVisible,name, roomNo, purpose, inTime, outTime, registerNumber, department, destination, phoneNumber, parentNumber } = props
    return (
        <View style={styles.modal}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setmodalVisible(false)}
                onDismiss={() => setmodalVisible(false)}
            >
                <View style={styles.ModelContent}>
                    <TouchableOpacity onPress={() => setmodalVisible(false)} style={styles.cancelIcon} >
                        <Entypo name="circle-with-cross" size={35} color="red" />
                    </TouchableOpacity>
                    <View style={styles.infoGrid}>
                        <Text style={styles.heading}> Pass Info </Text>
                        <InfoGrid label="Name" value={name} />
                        <InfoGrid label="Reg.No" value={registerNumber} />
                        <InfoGrid label="Year & Dept" value={department} />
                        <InfoGrid label="Room No" value={roomNo} />
                        <InfoGrid label="Destination" value={destination} />
                        <InfoGrid label="Purpose" value={purpose}/>
                        <InfoGrid label="Phone No" value={phoneNumber} />
                        <InfoGrid label="Parent No" value={parentNumber} />
                        <InfoGrid label="Out Time" value={outTime} />
                        <InfoGrid label="In Time" value={inTime} />
                        <InfoGrid label="Approved By" value='"sharma"' />
                    </View>
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
        backgroundColor: themes.mainColor,
        borderRadius: 10,
    },
    cancelIcon: {
        alignSelf: "flex-end"
    },
    heading: {
        textAlign: "center",
        fontSize: hp(3),
        color: "black"
    },
    infoGrid: {
        width: "100%",
    },
})