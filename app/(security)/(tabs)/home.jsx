import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import env from "@/constants/urls";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import { hp, wp } from "@/helpers/dimensions";
import Spinner from "react-native-loading-spinner-overlay";
import themes from "@/constants/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const home = () => {
  let toast = useToast();
  let now = new Date();

  const [fetchPassData, setFetchPassData] = useState({});
  const [dataRefresh, setDataRefresh] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [userId, setUserId] = useState(null)
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
  return (
    <View style={{ flex: 1 }}>
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

              <View style={styles.detailsContainer}>
                <View style={{ display: "flex", paddingVertical: 15 }}>
                  <View style={styles.titleStyle}>
                    <Text style={[styles.nameStyle, item.name.length > 10 ? { fontSize: hp(1.3) } : { fontSize: hp(2) }]}>{item.name.toUpperCase()}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                      <Text style={styles.department}>{item.year} year - </Text>
                      <Text style={styles.department}>{item.Department} </Text>
                    </View>
                  </View>
                </View>

                <View style={{width: wp(27)}}>
                  <Text style={[styles.placeStyle, item.Distination.length > 15 ? { fontSize: hp(1.3) } : { fontSize: hp(2) }]}>{item.Distination}</Text>
                  <View style={styles.times}>
                    <Text style={styles.outDateTimeStyle}>
                      {item.OutDateTime} 
                    </Text>
                    <Text> -</Text>
                    <Text style={styles.inDateTimeStyle}>
                      {item.InDateTime}
                    </Text>
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
              </View>
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
  titleStyle: {
    marginStart: 10,
    fontSize: 20,
    marginTop: -5,
  },
  department: {
    fontSize: hp(2),
    textAlign: "center"
  },
  nameStyle: {
    width: wp(40),
    textAlign: "center"
  },
  times: {
    flexDirection: "row",
  },
  inDateTimeStyle: {
    width: 60,
    marginStart: 5,
    fontSize: hp(1),
    textAlign: "center",
  },
  outDateTimeStyle: {
    maxWidth: 60,
    fontSize: hp(1),
    textAlign: "center",
  },
  placeStyle: {
    textAlign: "center",
    fontSize: hp(2),
    width : wp(25)
  },
  createdStyle: {
    position: "absolute",
    right: 3,
    top: 1,
    fontSize: 8,
    opacity: 0.5,
  },
  btnGroup: {
    rowGap: 4,
    flexDirection: "column",
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
});