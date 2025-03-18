import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router"
import { useState } from 'react';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import homeIcon from "@/assets/TabBar/HomeIcon.png";
import Previous from "@/assets/TabBar/Previous.png";
import Settings from "@/assets/TabBar/Settings.png";
import themes from "@/constants/themes";
import { hp, wp } from "@/helpers/dimensions";


const Layout = () => {
  const [action, setAction] = useState("home");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={themes.mainColor} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome </Text>
        <TouchableOpacity>
          <FontAwesome5 name="bell" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Tabs
        initialRouteName="home"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: themes.mainColor,
            borderRadius: 40,
            height: "9%",
            position: "absolute",
            bottom: 0
          },
          animation: "shift",
          tabBarPosition: "bottom",
          headerShown: false,
          tabBarHideOnKeyboard: true,

        }}>
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return (
                <View
                  style={
                    action == "home"
                      ? {
                        backgroundColor: "white",
                        marginTop: hp(4),
                        height: hp(5.5),
                        borderRadius: 60,
                        paddingHorizontal: hp(1.6),
                        paddingTop: hp(0.7),
                      }
                      : {
                        marginTop: hp(4),
                        height: hp(5.5),
                        paddingTop: hp(0.7),
                      }
                  }
                >
                  <Image
                    source={homeIcon}
                    style={
                      action == "home"
                        ? { tintColor: themes.mainColor, alignSelf: "center" }
                        : { tintColor: "white", alignSelf: "center" }
                    }
                  />
                  <Text
                    style={
                      action == "home"
                        ? { color: themes.mainColor, fontSize: hp(1.1), width: wp(12), textAlign: "center" }
                        : { color: "white", fontSize: hp(1.1), width: wp(12), textAlign: "center" }
                    }
                  >
                    Home
                  </Text>
                </View>
              );
            },
            tabBarLabel: () => {
              return null;
            },
          }}
          listeners={{ tabPress: () => setAction("home") }}
        />
        <Tabs.Screen
          name="prevPass"
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return (
                <View
                  style={
                    action == "previous"
                      ? {
                        backgroundColor: "white",
                        marginTop: hp(4),
                        height: hp(5.5),
                        borderRadius: 60,
                        paddingHorizontal: hp(1),
                        paddingTop: hp(0.7),
                      }
                      : {
                        marginTop: hp(4),
                        height: hp(5.5),
                        paddingTop: hp(0.7),
                      }
                  }
                >
                  <Image
                    source={Previous}
                    style={
                      action == "previous"
                        ? { tintColor: themes.mainColor, alignSelf: "center" }
                        : { tintColor: "white", alignSelf: "center" }
                    }
                  />
                  <Text
                    style={
                      action == "previous"
                        ? { color: themes.mainColor, fontSize: hp(1.1), width: wp(15), textAlign: "center" }
                        : { color: "white", fontSize: hp(1.1), width: wp(15), textAlign: "center" }
                    }
                  >
                    Previous
                  </Text>
                </View>
              );
            },
            tabBarLabel: () => {
              return null;
            },
          }}
          listeners={{ tabPress: () => setAction("previous") }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return (
                <View
                  style={
                    action == "settings"
                      ? {
                        backgroundColor: "white",
                        marginTop: hp(4),
                        height: hp(5.5),
                        borderRadius: hp(5.5),
                        paddingHorizontal: hp(0.7),
                        paddingTop: hp(0.7),
                      }
                      : {
                        marginTop: hp(4),
                        height: hp(5.5),
                        paddingTop: hp(0.7),
                      }
                  }
                >
                  <Image
                    source={Settings}
                    style={
                      action == "settings"
                        ? { tintColor: themes.mainColor, alignSelf: "center" }
                        : { tintColor: "white", alignSelf: "center" }
                    }
                  />
                  <Text
                    style={
                      action == "settings"
                        ? {
                          color: themes.mainColor,
                          fontSize: hp(1.1),
                          width: wp(15),
                          textAlign: "center"
                        }
                        : {
                          color: "white",
                          fontSize: hp(1.1),
                          width: wp(15),
                          textAlign: "center"
                        }
                    }
                  >
                    Settings
                  </Text>
                </View>
              );
            },
            tabBarLabel: () => {
              return null;
            },
          }}
          listeners={{ tabPress: () => setAction("settings") }}
        />
      </Tabs>
    </SafeAreaView>
  )
}

export default Layout


const styles = StyleSheet.create({
  header: {
    backgroundColor: themes.mainColor,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white",
    padding: 20,
  },
  headerText: {
    color: "white",
    fontSize: 20,
  },
  ImageStyle: {
    tintColor: "white",
    marginRight: 10,
  },
});