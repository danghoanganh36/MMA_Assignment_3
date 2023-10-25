import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "../common/OrchidCard";

const apiUrl = "https://633c28adf11701a65f705dd1.mockapi.io";

const HomeScreen = () => {
  const [data, setData] = React.useState([]);
  const navigation = useNavigation();

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(apiUrl + "/orchid");
      const json = await response.json();
      setData(json);
    };
    fetchData();
  }, []);

  const onItemPress = (item) => {
    navigation.navigate("DetailScreen", {item} );
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => onItemPress(item)}>
            <ProductCard product={item} />
          </Pressable>
        )}
      />
    </View>
  );
};

export default HomeScreen;
