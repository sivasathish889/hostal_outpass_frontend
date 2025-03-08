import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Modal,
  ImageBackground,
} from "react-native";
import { useEffect, useState } from "react";
import env from "@/constants/urls";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import { hp, wp } from "@/helpers/dimensions";
import Spinner from "react-native-loading-spinner-overlay";
import themes from "@/constants/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import InfoGrid from "@/components/InfoGrid";
import icon from "@/assets/backgroundPic.png"

const home = () => {
  let toast = useToast();
  let now = new Date();

  const [fetchPassData, setFetchPassData] = useState({});
  const [dataRefresh, setDataRefresh] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [userId, setUserId] = useState(null)
  const [modalVisible, setmodalVisible] = useState(false)
  const [infoData, setInfoData] = useState({})

  useEffect(() => {
    AsyncStorage.getItem('security').then((data) => setUserId(data))
    setSpinnerVisible(true);
    fetchData();
  }, [dataRefresh, refreshing]);

  const fetchData = async () => {
    axios.get(`${env.CLIENT_URL}${env.securityAcceptPass}`).then((data) => {
      setFetchPassData(data.data.pass);
      setSpinnerVisible(false)
      setRefreshing(false);
    });
  };

  const AlertingAction = (action, id) => {
    Alert.alert(`${action} Outpass`, `Are you ${action} this Outpass`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sure",
        onPress: () => actionHandle(action, id),
        style: "default",
      },
    ]);
  };

  const actionHandle = (action, id) => {
    if (action === "Out Time Updated") {
      axios
        .put(`${env.CLIENT_URL}${env.securityUpdateOutTime}`, { id, userId })
        .then((data) => {
          if (data.data.success) {
            toast.show(data.data.message, {
              type: "success",
              placement: "bottom",
              duration: 4000,
              offset: 30,
              animationType: "slide-in",
            });
            setDataRefresh(!dataRefresh);
          } else {
            toast.show(data.data.message, {
              type: "danger",
              placement: "bottom",
              duration: 4000,
              offset: 30,
              animationType: "slide-in",
            });
          }
        })
        .catch((error) => console.log(error));
    } else if (action === "In Time Updated") {
      axios
        .put(`${env.CLIENT_URL}${env.securityUpdateInTime}`, { id, userId })
        .then((data) => {
          if (data.data.success) {
            toast.show(data.data.message, {
              type: "success",
              placement: "bottom",
              duration: 4000,
              offset: 30,
              animationType: "slide-in",
            });
            setDataRefresh(!dataRefresh);
          } else {
            toast.show(data.data.message, {
              type: "danger",
              placement: "bottom",
              duration: 4000,
              offset: 30,
              animationType: "slide-in",
            });
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const openSheet = (item) => {
    setmodalVisible(true)
    setInfoData(item)
  }
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={icon} style={styles.backgoundImage} resizeMode="contain" >
        <Spinner
          visible={spinnerVisible}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
          cancelable={true}
        />
        <FlatList
          data={fetchPassData}
          style={{ marginBottom: hp(4) }}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <View style={styles.title}>
                  <Text style={styles.roomNoStyle}>
                    {item.RoomNo.toUpperCase()}.
                  </Text>
                </View>

                <View style={styles.leftCon}>
                  <Text style={[styles.nameStyle, item.name.length > 10 ? { fontSize: hp(1.3) } : { fontSize: hp(1.7) }]}>{item.name.toUpperCase()}</Text>
                  <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Text style={styles.department}>{item.year} year - </Text>
                    <Text style={styles.department}>{item.Department} </Text>
                  </View>
                </View>

                <View style={styles.rightCon}>
                  <View>
                    <Text style={[styles.placeStyle, item.Distination.length > 10 ? { fontSize: hp(1.3) } : { fontSize: hp(1.7) }]}>{item.Distination}</Text>
                  </View>
                  <View style={styles.timeContainer}>
                    <Text style={styles.time}>{item.InDateTime}</Text>
                    <Text> - </Text>
                    <Text style={styles.time}>{item.OutDateTime}</Text>
                  </View>
                </View>

                <View style={styles.btnGroup}>
                  <TouchableOpacity
                    onPress={() => AlertingAction("Out Time Updated", item._id)}
                    style={{ backgroundColor: "green", padding: 5 }}
                  >
                    <Text style={{ fontSize: 10 }}>Out Time</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => AlertingAction("In Time Updated", item._id)}
                    style={{ backgroundColor: "gray", padding: 5 }}
                  >
                    <Text style={{ fontSize: 10 }}>In Time</Text>
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
                <TouchableOpacity onPress={() => openSheet(item)} style={styles.infoIcon}>
                  <Entypo size={15} name="info-with-circle" color={"black"} />
                </TouchableOpacity>
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
        {/* Info Modal */}
        <View style={styles.modal}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setmodalVisible(false)}
            onDismiss={() => setmodalVisible(false)}
          >
            <View style={styles.ModelContent}>
              <Text style={styles.heading}> Pass Info </Text>
              <TouchableOpacity onPress={() => setmodalVisible(false)} style={styles.cancelIcon} >
                <Entypo name="circle-with-cross" size={35} color="red" />
              </TouchableOpacity>
              <View style={styles.infoGrid}>
                <InfoGrid label="Name" value={infoData?.name} />
                <InfoGrid label="Reg.No" value={infoData?.RegisterNumber || ""} />
                <InfoGrid label="Year & Dept" value={infoData?.Department || ""} />
                <InfoGrid label="Room No" value={infoData?.RoomNo || ""} />
                <InfoGrid label="Destination" value={infoData?.Distination || ""} />
                <InfoGrid label="Purpose" value={infoData?.Purpose || ""} />
                <InfoGrid label="Phone No" value={infoData?.PhoneNumber || ""} />
                <InfoGrid label="Parent No" value={infoData?.ParentNumber || ""} />
                <InfoGrid label="Out Time" value={infoData?.OutDateTime || ""} />
                <InfoGrid label="In Time" value={infoData?.InDateTime || ""} />
                <InfoGrid label={infoData?.status == "2" ? "Approved By" : "Rejected By"} value={infoData?.warden || ""} />
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </View>
  )
}

export default home

const styles = StyleSheet.create({
  container: {
    backgroundColor: themes.acceptColor,
    margin: 10,
    boxShadow: "2 2 5 1",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  title: {
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
  leftCon: {
    width: "32%"
  },
  rightCon: {
    width: "35%"
  },
  department: {
    fontSize: hp(1.6),
    textAlign: "center"
  },
  nameStyle: {
    textAlign: "center"
  },
  timeContainer: {
    flexDirection: "row"
  },
  time: {
    width: "50%",
    fontSize: hp(1.2),
    textAlign: "center"

  },
  placeStyle: {
    textAlign: "center",
  },
  createdStyle: {
    position: "absolute",
    right: 3,
    top: 3,
    fontSize: 8,
    opacity: 0.5,
  },
  btnGroup: {
    columnGap: 8,
    flexDirection: "column",
    position :"absolute",
    right : 6,
    rowGap : 2,
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
  infoIcon: {
    position: "absolute",
    right: 0,
    bottom: 0
  },
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
    position: "absolute",
    right: 10,
    top: 10,

  },
  heading: {
    textAlign: "center",
    fontSize: hp(3),
    color: "black",
    paddingBottom: 20,
    textDecorationLine: "underline"
  },
  infoGrid: {
    width: "100%",
  },
  backgoundImage: {
    flex: 1,
  }
});