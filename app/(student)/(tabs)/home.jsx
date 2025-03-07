import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ImageBackground,
} from "react-native";

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";
import Spinner from "react-native-loading-spinner-overlay"
import { useNavigation } from "expo-router";
import axios from "axios";

import themes from "@/constants/themes";
import Entypo from '@expo/vector-icons/Entypo';
import env from "@/constants/urls";

import NewPassModel from "@/components/NewPassModel";
import EditPassModals from "@/components/EditPassModals";
import { wp } from "@/helpers/dimensions";
import backgroundIcon from "@/assets/backgroundPic.png"


const HomeScreen = () => {
  const [passModelVisible, setPassModelVisible] = useState(false);
  const [editModelVisible, setEditModelVisible] = useState(false);
  const [dataRefresh, setDataRefresh] = useState(true);
  const [userId, setUserId] = useState(null);
  const [fetchPassData, setFetchPassData] = useState({});

  const [roomNo, setRoomNo] = useState(null);
  const [destination, setDestination] = useState(null);
  const [purpose, setPurpose] = useState(null);
  const [inDateTime, setinDateTime] = useState(null);
  const [outDateTime, setoutDateTime] = useState(null);
  const [passId, setPassId] = useState(null);
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  let navigation = useNavigation();
  let toast = useToast();
  let now = new Date();

  const handleInDateTimePicker = (e) => {
    setinDateTime(e.toLocaleString());
    setInDatePickerVisible(false);
  };

  const handleOutDateTimePicker = (e) => {
    setoutDateTime(e.toLocaleString());
    setOutDatePickerVisible(false);
  };

  const DeleteAlerting = (deletePassId) => {
    Alert.alert("Delete Outpass", "Are you deleting your Outpass", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sure",
        onPress: () => handlePassDelete(deletePassId),
        style: "default",
      },
    ]);
  };

  useEffect(() => {
    setSpinnerVisible(true)
    fetchData();
  }, [dataRefresh, refreshing]);

  const fetchData = async () => {
    await AsyncStorage.getItem("student").then((userId) => {
      setUserId(userId);
      axios
        .get(`${env.CLIENT_URL}${env.studentPendingPasses}/${userId}`)
        .then((data) => {
          setFetchPassData(data.data);
          setRefreshing(false);
          setSpinnerVisible(false)

        });
    });
  };

  const handelPassUpdate = async () => {
    const payload = {
      roomNo,
      destination,
      purpose,
      inDateTime,
      outDateTime,
      passId,
    };
    setSpinnerVisible(true)
    await axios
      .put(
        `${env.CLIENT_URL}${env.studentEditingPass}`,
        (payload)
      )
      .then((data) => {
        if (data.data.success) {
          toast.show(data.data.message, {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
          navigation.navigate("(tabs)");
          setEditModelVisible(false);
          setDataRefresh(!dataRefresh);
          setSpinnerVisible(false)

        } else {
          toast.show(data.data.message, {
            type: "danger",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
          setSpinnerVisible(false)

        }
      })
      .catch((error) => console.log(error));
  };
  const handlePassDelete = async (deletePassId) => {
    setSpinnerVisible(true)
    try {
      const { data } = await axios.delete(`${env.CLIENT_URL}${env.studentDeletePass}/${deletePassId}`)
      if (data.success) {
        toast.show(data.message, {
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
        navigation.navigate("(tabs)");
        setEditModelVisible(false);
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
      setDataRefresh(!dataRefresh);
      setSpinnerVisible(false)
    }
  };

  return (
    <View style={{ flex: 1 }}>
            <ImageBackground source={backgroundIcon} resizeMode="contain" style={{ flex: 1 }}>
      <Spinner
        visible={spinnerVisible}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
        cancelable={true}
      />
      <FlatList
        data={fetchPassData.pass}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <Text style={styles.roomNoStyle}>
                  {item.RoomNo.toUpperCase()}.
                </Text>
              </View>

              <View style={{ display: "flex", paddingVertical: 10 }}>
                <Text style={styles.titleStyle}>{item.Purpose}</Text>
                <View style={styles.times}>
                  <Text style={styles.outDateTimeStyle}>
                    {item.OutDateTime}
                  </Text>
                  <Text style={{ marginEnd: 10 }}>-</Text>
                  <Text style={styles.inDateTimeStyle}>{item.InDateTime}</Text>
                </View>
              </View>
              <Text style={styles.placeStyle}>{item.Distination}</Text>
              <View style={styles.btnGroup}>
                <TouchableOpacity
                  style={styles.editBtnOutline}
                  onPress={() => {
                    setEditModelVisible(!editModelVisible);
                    setinDateTime(item.InDateTime);
                    setoutDateTime(item.OutDateTime);
                    setRoomNo(item.RoomNo);
                    setPurpose(item.Purpose);
                    setDestination(item.Distination);
                    setPassId(item._id);
                  }}
                >
                  <Text style={styles.editBtn}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteBtnOutline}
                  onPress={() => DeleteAlerting(item._id)}
                >
                  <Text style={styles.deleteBtn}>Delete</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.createdStyle}>
                {new Date(item.createdAt).getDate() == String(now.getDate())
                  ? "Today"
                  : new Date(item.createdAt).getDate() + 1 ==
                    String(now.getDate())
                    ? "YesterDay"
                    : new Date(item.createdAt)
                      .toLocaleString(undefined, "Asia/Kolkata")
                      .split(",")[0]}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }
      />

      <TouchableOpacity
        style={styles.plusIconStyle}
        onPress={() => setPassModelVisible(!passModelVisible)}
      >
        <Entypo name="plus" size={24} color="black" />
      </TouchableOpacity>

      {/* New Pass Model */}
      <NewPassModel
        setDataRefresh={setDataRefresh}
        userId={userId}
        passModelVisible={passModelVisible}
        setPassModelVisible={setPassModelVisible}
        dataRefresh={dataRefresh}
      />
      {/* Edit Pass Model */}
      <EditPassModals
        editModelVisible={editModelVisible}
        setEditModelVisible={setEditModelVisible}
        roomNo={roomNo}
        setRoomNo={setRoomNo}
        destination={destination}
        setDestination={setDestination}
        purpose={purpose}
        setPurpose={setPurpose}
        outDateTime={outDateTime}
        handleOutDateTimePicker={handleOutDateTimePicker}
        inDateTime={inDateTime}
        handleInDateTimePicker={handleInDateTimePicker}
        handelPassUpdate={handelPassUpdate}
      />
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: themes.secondaryColor,
    margin: 10,
    boxShadow: "2 2 5 1",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  roomNoStyle: {
    fontSize: 16,
    backgroundColor: "#D9D9D9",
    width: 60,
    height: 78,
    alignSelf: "center",
    textAlign: "center",
    paddingTop: 25,
  },
  titleStyle: {
    marginStart: 10,
    fontSize: 20,
    marginTop: -5,
    width :wp(40)
  },
  times: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    marginStart: 10,
  },
  inDateTimeStyle: {
    width: 80,
    marginStart: 5,
  },
  outDateTimeStyle: {
    width: 80,
  },
  placeStyle: {
    paddingHorizontal: 20,
  },
  createdStyle: {
    position: "absolute",
    right: 3,
    top: 3,
    fontSize: 8,
    opacity: 0.5,
  },
  btnGroup: {
    position: "absolute",
    right: 5,
    rowGap: 5,
  },
  editBtnOutline: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "green",
    borderRadius: 5,
  },
  editBtn: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
  deleteBtnOutline: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "red",
    borderRadius: 5,
  },
  deleteBtn: {
    color: "white",
    fontSize: 10,
  },
  plusIconStyle: {
    position: "absolute",
    bottom: 50,
    right: 50,
    backgroundColor: "#AFAFAF",
    padding: 12,
    borderRadius: 25,
  },

});
