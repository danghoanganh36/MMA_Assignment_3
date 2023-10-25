import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./components/screens/HomeScreen";
import DetailScreen from "./components/screens/DetailScreen";
import FavoritesList from "./components/screens/FavoritesList";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
    <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ tabBarLabel: 'Detail' }} />
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
          }}
          component={FavoritesList}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
