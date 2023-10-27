import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "../common/OrchidCard";
import Swiper from "react-native-swiper";

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
    navigation.navigate("DetailScreen", { item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.swiper}>
        <Swiper style={styles.wrapper} showsButtons={false}>
          {data.map(
            (item) => (
              (
                <View style={styles.slide}>
                  <Image
                    style={styles.productImage}
                    source={{ uri: item.image }}
                  />
                </View>
              )
            )
          )}
        </Swiper>
      </View>
      <Text style={styles.productListTitle}>Orchid Favorites</Text>
      <View style={styles.productList}>
        <FlatList
          data={data}
          indicatorStyle="white"
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => onItemPress(item)}>
              <ProductCard product={item} />
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  productListTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  productList: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  swiper: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
});

export default HomeScreen;
