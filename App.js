import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./components/screens/HomeScreen";
import DetailScreen from "./components/screens/DetailScreen";
import FavoritesList from "./components/screens/FavoritesList";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const logo = require("./assets/orchid.png");

const header = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
      <Image source={logo} style={{ width: 30, height: 30 }} />
      <Text style={{ fontSize: 20, fontWeight:"bold", marginLeft: 10 }}>Orchid</Text>
    </View>
  );
};

const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ tabBarLabel: "Home", headerLeft: header, headerTitle: "" }}
    />
    {/* <Stack.Screen
      name="FavoritesList"
      component={FavoritesList}
      options={{ tabBarLabel: "Favorites", headerLeft: header, headerTitle: "" }}
    /> */}
    <Stack.Screen
      name="DetailScreen"
      component={DetailScreen}
      options={{ tabBarLabel: "Detail", headerTitle: "Detail" }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-home" color={color} size={size} />
            ),
            headerShown: false,
          }}
          component={HomeStack}
        />
        <Tab.Screen
          name="FavoritesList"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-heart" color={color} size={size} />
            ),
            tabBarLabel: "Favorites",
          }}
          component={FavoritesList}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
