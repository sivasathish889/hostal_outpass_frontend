import React from 'react'
import axios from "axios";

const notificationAPI = async (subId,notificationTitle, notificationBody) => {
    const date = new Date().toDateString()
    await axios.post('https://app.nativenotify.com/api/indie/notification', {
        subID: subId,
        appId: 28686,
        appToken: "xFRNId2udwaz6hmL48krYd",
        title: notificationTitle,
        message: notificationBody,
        dateSent: date,
    })
}

export default notificationAPI