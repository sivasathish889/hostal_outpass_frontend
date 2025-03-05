import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp } from '@/helpers/dimensions'

const InfoGrid = ({ label, value }) => {
    return (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoSeparator}>: </Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    )
}

export default InfoGrid

const styles = StyleSheet.create({

    infoRow: {
        flexDirection: "row",
        marginBottom: 12,
    },
    infoLabel: {
        width: 100,
        fontSize: hp(2),
        color: "white",
    },
    infoSeparator: {
        fontSize: hp(1.8),
        color: "white",
        marginRight: 5,
    },
    infoValue: {
        flex: 1,
        fontSize: hp(2),
        color: "white",
    },
})