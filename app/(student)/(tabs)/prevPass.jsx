import { FlatList, StyleSheet, Text, View, RefreshControl, TextInput, Modal, TouchableOpacity, ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import env from "@/constants/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import themes from "@/constants/themes";
import { hp } from "@/helpers/dimensions";
import { Dropdown } from "react-native-element-dropdown";
import { Entypo } from "@expo/vector-icons";
import InfoGrid from "@/components/InfoGrid";
import backgroundIcon from "@/assets/backgroundPic.png"


const PrevPass = () => {
  let now = new Date();
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false)
  const [infoData, setInfoData] = useState({})
  const [isFocus, setIsFocus] = useState(false);

  const [searchQuery, setSearchQuery] = useState("")
  const [statusQuery, setStatusQuery] = useState("")

  useEffect(() => {
    setSpinnerVisible(true);
    fetchData();
  }, [refreshing]);

  const fetchData = async () => {
    try {
      await AsyncStorage.getItem("student").then(async (userId) => {
        await axios
          .get(`${env.CLIENT_URL}${env.studentAllPasses}/${userId}`)
          .then(async (data) => {
            setData(data.data.data);
            setStatusQuery("")
            setSearchQuery("")
          })
          .catch((error) => console.log(error));
      });
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
      setSpinnerVisible(false);
    }
  };

  const renderItem = (item) => {
    return <View
      style={[
        styles.container,
        {
          backgroundColor: `${item.item.status == 2
            ? themes.acceptColor
            : item.item.status == 3
              ? themes.rejectColor
              : ""
            }`,
        },
      ]}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.roomNoStyle}>
          {item.item.RoomNo}.
        </Text>
      </View>

      <View style={styles.leftCont}>
        <View>
          <Text style={[styles.nameStyle]}>{item.item.Purpose}</Text>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.time}>{item.item.InDateTime}</Text>
          <Text> - </Text>
          <Text style={styles.time}>{item.item.OutDateTime}</Text>
        </View>
      </View>

      <View style={styles.rightCon}>
        <Text style={[styles.placeStyle]}>{item.item.Destination}</Text>
      </View>
      <Text style={styles.createdStyle}>
        {new Date(item.item.createdAt).getDate() == String(now.getDate())
          ? "Today"
          : new Date(item.item.createdAt).getDate() + 1 ==
            String(now.getDate())
            ? "YesterDay"
            : new Date(item.item.createdAt)
              .toLocaleString(undefined, "Asia/Kolkata")
              .split(",")[0]}
      </Text>
      <TouchableOpacity onPress={() => openSheet(item.item)} style={styles.infoIcon}>
        <Entypo size={25} name="info-with-circle" />
      </TouchableOpacity>
    </View>
  }

  const openSheet = (item) => {
    setmodalVisible(true)
    setInfoData(item)
  }
  const filteredData = data.filter((item) => {
    return (item.Destination.toString().toLocaleLowerCase().startsWith(searchQuery.toString().toLocaleLowerCase())) && (item.status.toString().toLocaleLowerCase().includes(statusQuery.toString().toLocaleLowerCase()))
  })

  return (
    <View
      style={{ flex: 1 }}>
      <ImageBackground source={backgroundIcon} resizeMode="contain" style={{ flex: 1 }}>
        <Spinner
          visible={spinnerVisible}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
          cancelable={true}
        />
        <View style={styles.header}>
          <Text style={{ color: themes.acceptColor, fontSize: hp(2) }}>Accept </Text>
          <Text style={{ fontSize: hp(2) }}>and </Text>
          <Text style={{ color: themes.rejectColor, fontSize: hp(2) }}>
            Rejecting Passes
          </Text>
        </View>
        <View style={styles.filterInputs}>
          <TextInput style={styles.input} placeholder="Search Destination" onChangeText={(text) => setSearchQuery(text)} value={searchQuery} />
          <Dropdown
            style={[styles.dropdown]}
            data={[
              { label: "None", value: "" },
              { label: "Accept ", value: "2" },
              { label: "Reject ", value: "3" },
            ]}
            maxHeight={100}
            labelField="label"
            valueField="value"
            placeholder="Select Status"
            value={statusQuery}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setStatusQuery(item.value);
              setIsFocus(false);
            }}
            placeholderStyle={{
              color: themes.placeholderTextColor,
              paddingStart: 10,
              fontSize: hp(1.6)
            }}
            itemContainerStyle={{ borderRadius: 10 }}
            accessibilityLabel="pass Status"
            aria-label="pass Status"
          />
        </View>
        <FlatList
          data={filteredData}
          style={{ marginBottom: hp(4) }}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
              style={{ flex: 1 }}
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
                <InfoGrid label={infoData.status == "2" ? "Approved By" : "Rejected By"} value={infoData?.warden || ""} />
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </View>
  );
};

export default PrevPass;

const styles = StyleSheet.create({
  container: {
    backgroundColor: themes.pendingColor,
    margin: "2%",
    boxShadow: "2 2 5 1",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  header: {
    marginVertical: "2%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    paddingTop: "7%",
  },
  leftCont: {
    width: "40%",
  },
  nameStyle: {
    textAlign: "center",
    fontSize: hp(1.7),

  },
  rightCon: {
    width: "40%",
  },
  placeStyle: {
    textAlign: "center"
  },
  timeContainer: {
    flexDirection: "row"
  },
  time: {
    width: "50%",
    fontSize: hp(1.3),
    textAlign: "center"
  },
  createdStyle: {
    position: "absolute",
    right: 3,
    top: 3,
    fontSize: hp(1),
    opacity: 0.5,
  },
  emptyMsgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMsg: {
    fontSize: hp(5),
    opacity: 0.5,
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
  dropdown: {
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
    color: "black",
    fontSize: hp(1.6),
    height: 42,
    borderRadius: 10,
    paddingStart: 10,
    flex: 1
  },
  filterInputs: {
    flexDirection: "row",
    gap: "10",
    marginHorizontal: 7,
    marginBottom: 5
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
    top: 10

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
