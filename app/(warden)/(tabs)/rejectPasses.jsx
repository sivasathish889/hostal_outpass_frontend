import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from "react-native";
import { useEffect, useState } from "react";

import env from "@/constants/urls";
import axios from "axios";
import { hp, wp } from "@/helpers/dimensions";
import Spinner from "react-native-loading-spinner-overlay";
import AntDesign from "@expo/vector-icons/AntDesign";
import themes from "@/constants/themes";
import { Entypo } from "@expo/vector-icons";
import InfoGrid from "@/components/InfoGrid";
import backgroundIcon from "@/assets/backgroundPic.png"

const RejectPasses = () => {
  let now = new Date();

  const [fetchPassData, setFetchPassData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false)
  const [infoData, setInfoData] = useState({})


  useEffect(() => {
    setSpinnerVisible(true);
    fetchData();
  }, [refreshing]);

  const fetchData = async () => {
    axios.get(`${env.CLIENT_URL}${env.wardenAllRejectPass}`).then((data) => {
      setFetchPassData(data.data.pass);
      setSpinnerVisible(false);
      setRefreshing(false);
    });
  };
  const openSheet = (item) => {
    setmodalVisible(true)
    setInfoData(item)
  }
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={backgroundIcon} resizeMode="contain" style={{ flex: 1 }}>

        <Spinner
          visible={spinnerVisible}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
          cancelable={true}
        />
        {fetchPassData.length > 0 ? (
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

                  <View style={styles.detailsContainer}>
                    <View style={{ display: "flex", paddingVertical: 15 }}>
                      <View style={styles.titleStyle}>
                        <Text style={[styles.nameStyle, item.name.length > 10 ? { fontSize: hp(1.3) } : { fontSize: hp(2) }]}>{item.name.toUpperCase()}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                          <Text style={styles.department}>
                            {item.year} year -
                          </Text>
                          <Text style={styles.department}>
                            {item.Department.toUpperCase()}{" "}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View>
                      <Text style={[styles.placeStyle, item.Distination.length > 15 ? { fontSize: hp(1.3) } : { fontSize: hp(2) }]}>{item.Distination}</Text>
                      <View style={styles.times}>
                        <Text style={styles.outDateTimeStyle}>
                          {item.OutDateTime}
                        </Text>
                        <Text>-</Text>
                        <Text style={styles.inDateTimeStyle}>
                          {item.InDateTime}
                        </Text>
                      </View>
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
                  <TouchableOpacity onPress={() => openSheet(item)} style={styles.infoIcon}>
                    <Entypo size={25} name="info-with-circle" color={"black"} />
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
        ) : (
          <View style={styles.emptyPassContainer}>
            <AntDesign name="exception1" size={40} color="black" />
            <Text style={styles.emptyPass}>No Passes</Text>
          </View>
        )}
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
  );
};

export default RejectPasses;

const styles = StyleSheet.create({
  container: {
    backgroundColor: themes.rejectColor,
    margin: 10,
    boxShadow: "2 2 5 1",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  roomNoStyle: {
    fontSize: hp(1.8),
    backgroundColor: "#D9D9D9",
    width: 60,
    height: 78,
    alignSelf: "center",
    textAlign: "center",
    paddingTop: 25,
  },
  titleStyle: {
    marginTop: -5,
  },
  department: {
    fontSize: hp(1.7),
    textAlign: "center"
  },
  nameStyle: {
    fontSize: wp(40),
    textAlign: "center"
  },
  times: {
    flexDirection: "row",
  },
  inDateTimeStyle: {
    width: 60,
    marginStart: 5,
    fontSize: hp(1.2),
    textAlign: "center",
  },
  outDateTimeStyle: {
    maxWidth: 60,
    fontSize: hp(1.2),
    textAlign: "center",
  },
  placeStyle: {
    textAlign: "center",
    fontSize: hp(2),
  },
  createdStyle: {
    position: "absolute",
    right: 3,
    top: 1,
    fontSize: hp(1),
    opacity: 0.5,
  },
  btnGroup: {
    columnGap: 8,
    flexDirection: "row",
    marginEnd: "5%",
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
  emptyPassContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyPass: {
    fontSize: hp(4),
  },
  infoIcon: {
    position: "absolute",
    right: "3%"
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
});
