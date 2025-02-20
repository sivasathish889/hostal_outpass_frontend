import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";

import env from "../../../constants/urls";
import axios from "axios";
import { RFPercentage } from "react-native-responsive-fontsize";
import Spinner from "react-native-loading-spinner-overlay";
import AntDesign from "@expo/vector-icons/AntDesign";

let rejectColor = "#E86062";

const RejectPass = () => {
  let now = new Date();

  const [fetchPassData, setFetchPassData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, [refreshing]);

  const fetchData = async () => {
    axios.get(`${env.CLIENT_URL}${env.wardenAllRejectPass}`).then((data) => {
      setSpinnerVisible(true);
      setFetchPassData(data.data.pass);
      setSpinnerVisible(false);
      setRefreshing(false);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Spinner
        visible={spinnerVisible}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
      {fetchPassData.length > 0 ? (
        <FlatList
          data={fetchPassData}
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
                      <Text style={styles.nameStyle}>{item.name}</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.department}>
                          {item.year} year -{" "}
                        </Text>
                        <Text style={styles.department}>
                          {item.Department.toUpperCase()}{" "}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View>
                    <Text style={styles.placeStyle}>{item.Distination}</Text>
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
        <ScrollView>
          <View style={styles.emptyPassContainer}>
            <AntDesign name="exception1" size={40} color="black" />
            <Text style={styles.emptyPass}>No Passes</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default RejectPass;

const styles = StyleSheet.create({
  container: {
    backgroundColor: rejectColor,
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
    fontSize: RFPercentage(2),
  },
  nameStyle: {
    fontSize: RFPercentage(2.5),
  },
  times: {
    flexDirection: "row",
  },
  inDateTimeStyle: {
    width: 60,
    marginStart: 5,
    fontSize: RFPercentage(1.2),
    textAlign: "center",
  },
  outDateTimeStyle: {
    maxWidth: 60,
    fontSize: RFPercentage(1.2),
    textAlign: "center",
  },
  placeStyle: {
    textAlign: "center",
    fontSize: RFPercentage(2),
  },
  createdStyle: {
    position: "absolute",
    right: 3,
    top: 1,
    fontSize: 8,
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
    fontSize: RFPercentage(4),
  },
});
