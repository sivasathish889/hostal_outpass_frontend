import { FlatList, StyleSheet, Text, View, RefreshControl, TextInput } from "react-native";
import { useEffect, useState } from "react";
import env from "@/constants/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import themes from "@/constants/themes";
import { hp } from "@/helpers/dimensions";
import { Dropdown } from "react-native-element-dropdown";


const PrevPass = () => {
  let now = new Date();
  const [data, setData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const [searchQuery, setSearchQuery] = useState("")
  const [passDropDownData, setDropDownData] = useState("")

  useEffect(() => {
    setSpinnerVisible(true);
    fetchData();
  }, [refreshing]);

  const fetchData = async () => {
    try {
      await AsyncStorage.getItem("student").then(async (userId) => {
        await axios
          .get(`${env.CLIENT_URL}${env.studentAllPasses}/${userId}`)
          .then(async(data) => {
            setData(data.data.data);
            setDropDownData("")
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


  return (
    <View
    >
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
      {/* <View style={styles.filterInputs}>
        <TextInput style={styles.input} placeholder="Search" onChangeText={(text) => setSearchQuery(text)} value={searchQuery} />
        <Dropdown
          style={[styles.dropdown]}
          data={[
            { label: "Accept ", value: "Accept" },
            { label: "Reject ", value: "Reject" },
          ]}
          maxHeight={100}
          labelField="label"
          valueField="value"
          placeholder="Select Status"
          value={passDropDownData}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setDropDownData(item.value);
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
      </View> */}
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View
              style={[
                styles.container,
                {
                  backgroundColor: `${item.status == 2
                    ? themes.acceptColor
                    : item.status == 3
                      ? themes.rejectColor
                      : ""
                    }`,
                },
              ]}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.roomNoStyle}>
                  {item.RoomNo.toUpperCase()}.
                </Text>
              </View>

              <View style={{ display: "flex" }}>
                <Text style={styles.titleStyle}>{item.Purpose}</Text>
                <View style={styles.times}>
                  <Text style={styles.outDateTimeStyle}>
                    {item.OutDateTime}
                  </Text>
                  <Text style={{ marginEnd: "2%" }}>-</Text>
                  <Text style={styles.inDateTimeStyle}>{item.InDateTime}</Text>
                </View>
              </View>
              <Text style={styles.placeStyle}>{item.Distination}</Text>
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
            style={{ flex: 1 }}
          />
        }
      />
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
  titleStyle: {
    marginStart: "4%",
    fontSize: hp(2.3),
    marginTop: -5,
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
    height:hp(4.5),
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
  }
});
