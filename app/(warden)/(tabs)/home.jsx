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
  TextInput
} from "react-native";
import { useEffect, useState } from "react";
import env from "@/constants/urls";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import AntDesign from "@expo/vector-icons/AntDesign";
import { hp, wp } from "@/helpers/dimensions";
import Spinner from "react-native-loading-spinner-overlay";
import themes from "@/constants/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import InfoGrid from "@/components/InfoGrid";
import backgroundIcon from "@/assets/backgroundPic.png"

const Home = () => {
  let toast = useToast();
  let now = new Date();
  const [userId, setUserId] = useState(null)
  const [fetchPassData, setFetchPassData] = useState([]);
  const [dataRefresh, setDataRefresh] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false)
  const [infoData, setInfoData] = useState({})

  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    AsyncStorage.getItem("warden").then((data) => setUserId(data))
    setSpinnerVisible(true);
    fetchData();
  }, [dataRefresh, refreshing]);


  const fetchData = async () => {
    await AsyncStorage.getItem("warden").then(async (wardenId) => {
      await axios.get(`${env.CLIENT_URL}${env.wardenPendingPass}/${wardenId}`).then((data) => {
        setFetchPassData(data.data.pass);
        setSpinnerVisible(false)
        setRefreshing(false);
      })
    });
  };

  const AlertingAction = (action, id, destination, studentId) => {
    Alert.alert(`${action} Outpass`, `Are you ${action} this Outpass`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sure",
        onPress: () => actionHandle(action, id, destination, studentId),
        style: "default",
      },
    ]);
  };

  const actionHandle = async (action, id, destination, studentId) => {
    if (action === "Accept") {
      await axios
        .put(`${env.CLIENT_URL}${env.wardenPassAccept}`, { id, userId })
        .then((data) => {

          // notiication
          if (data.data.success) {
            toast.show(data.data.message, {
              type: "success",
              placement: "top",
              duration: 4000,
              offset: 30,
              animationType: "slide-in",
              successIcon: <MaterialCommunityIcons name="check-circle" size={24} color="white" />,
              style: { marginTop: hp(5), width: "100%", display: "flex", justifyContent: "center", alignItems: "center" },
            });
            setDataRefresh(!dataRefresh);
          } else {
            toast.show(data.data.message, {
              type: "danger",
              placement: "top",
              duration: 3000,
              offset: 50,
              animationType: "zoom-in",
              dangerIcon: <FontAwesome name="warning" size={20} color="white" />,
              style: { marginTop: hp(5), width: "100%", display: "flex", justifyContent: "center", alignItems: "center" },
            });
          }
        })
        .catch((error) => console.log(error));
    } else if (action === "Reject") {
      await axios
        .put(`${env.CLIENT_URL}${env.wardenPassReject}`, { id, userId })
        .then((data) => {
          if (data.data.success) {
            toast.show(data.data.message, {
              type: "success",
              placement: "top",
              duration: 4000,
              offset: 30,
              animationType: "slide-in",
              successIcon: <MaterialCommunityIcons name="check-circle" size={24} color="white" />,
              style: { marginTop: hp(5), width: "100%", display: "flex", justifyContent: "center", alignItems: "center" },
            });
            setDataRefresh(!dataRefresh);
          } else {
            toast.show(data.data.message, {
              type: "danger",
              placement: "top",
              duration: 3000,
              offset: 50,
              animationType: "zoom-in",
              dangerIcon: <FontAwesome name="warning" size={20} color="white" />,
              style: { marginTop: hp(5), width: "100%", display: "flex", justifyContent: "center", alignItems: "center" },
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

  const filteredData = fetchPassData?.filter((item) => {
    return (item.RegisterNumber.toString().toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase().toString()))
  })

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={backgroundIcon} resizeMode="contain" style={{ flex: 1 }}>
        <Spinner
          visible={spinnerVisible}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
          cancelable={true}
        />
        <View style={styles.filterInputs}>
          <TextInput style={styles.input} placeholder="Search Register Number" keyboardType="numeric" onChangeText={(text) => setSearchQuery(text)} value={searchQuery} placeholderTextColor={themes.placeholderTextColor}/>
        </View>
        <FlatList
          data={filteredData}
          style={{ marginBottom: hp(10) }}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <View style={styles.title}>
                  <Text style={styles.roomNoStyle}>
                    {item.RoomNo.toUpperCase()}.
                  </Text>
                </View>

                <View style={styles.leftCon}>
                  <Text style={[styles.nameStyle, item.name.length > 10 ? { fontSize: hp(1.3) } : { fontSize: hp(2) }]}>{item.name.toUpperCase()}</Text>
                  <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Text style={styles.department}>{item.year} year - </Text>
                    <Text style={styles.department}>{item.Department} </Text>
                  </View>
                </View>

                <View style={styles.rightCon}>
                  <View>
                    <Text style={[styles.placeStyle, item.Destination.length > 10 ? { fontSize: hp(1.3) } : { fontSize: hp(2) }]}>{item.Destination}</Text>
                  </View>
                  <View style={styles.timeContainer}>
                    <Text style={styles.time}>{item.InDateTime}</Text>
                    <Text> - </Text>
                    <Text style={styles.time}>{item.OutDateTime}</Text>
                  </View>
                </View>

                <View style={styles.btnGroup}>
                  <TouchableOpacity
                    onPress={() => AlertingAction("Accept", item._id, item.Destination, item.User)}
                  >
                    <AntDesign name="checkcircle" size={30} color="green" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => AlertingAction("Reject", item._id, item.Destination, item.User)}
                  >
                    <AntDesign name="closecircle" size={30} color="red" />
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
                <InfoGrid label="Destination" value={infoData?.Destination || ""} />
                <InfoGrid label="Purpose" value={infoData?.Purpose || ""} />
                <InfoGrid label="Phone No" value={infoData?.PhoneNumber || ""} />
                <InfoGrid label="Parent No" value={infoData?.ParentNumber || ""} />
                <InfoGrid label="Out Time" value={infoData?.OutDateTime || ""} />
                <InfoGrid label="In Time" value={infoData?.InDateTime || ""} />
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Home;

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
    width: "30%"
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
    flexDirection: "row",
    position: "absolute",
    right: 3
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
  input: {
    backgroundColor: "#D9D9D9",
    paddingStart: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
    height: hp(4.5),
    flex: 1
  },
  filterInputs: {
    flexDirection: "row",
    gap: "10",
    marginHorizontal: hp(2),
    marginTop: hp(1),
  },
});
