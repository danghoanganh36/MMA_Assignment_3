import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Chip } from "react-native-paper"; // Import the Chip component
import ProductCard from "../common/OrchidCard";
import Swiper from "react-native-swiper";

const apiUrl = "https://633c28adf11701a65f705dd1.mockapi.io";

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Initial category
  const navigation = useNavigation();

  useEffect(() => {
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

  const filterDataByCategory = (category) => {
    // Filter the data based on the selected category
    if (category === "All") {
      return data; // Show all products
    }
    return data.filter((item) => item.category === category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.swiper}>
        <Swiper style={styles.wrapper} showsButtons={false}>
          {data.map((item) => (
            <View style={styles.slide} key={item.id}>
              <Image style={styles.productImage} source={{ uri: item.image }} />
            </View>
          ))}
        </Swiper>
      </View>
      <Text style={styles.productListTitle}>Orchid Favorites</Text>

      <View style={styles.categoryList}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <Chip
            icon="format-list-bulleted"
            selected={selectedCategory === "All"}
            onPress={() => setSelectedCategory("All")}
            mode="flat"
            style={styles.chip}
          >
            All
          </Chip>
          <Chip
            icon="flower"
            selected={selectedCategory === "Saprophytes"}
            onPress={() => setSelectedCategory("Saprophytes")}
            mode="flat"
            style={styles.chip}
          >
            Saprophytes
          </Chip>

          <Chip
            icon="flower"
            selected={selectedCategory === "Terestrials"}
            onPress={() => setSelectedCategory("Terestrials")}
            mode="flat"
            style={styles.chip}
          >
            Terestrials
          </Chip>

          <Chip
            icon="flower"
            selected={selectedCategory === "Epiphytes"}
            onPress={() => setSelectedCategory("Epiphytes")}
            mode="flat"
            style={styles.chip}
          >
            Epiphytes
          </Chip>
        </ScrollView>
      </View>
      <View style={styles.productList}>
        <FlatList
          style={{ width: "100%" }}
          data={filterDataByCategory(selectedCategory)}
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
  },
  productListTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  productList: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  swiper: {
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
    paddingBottom: 30,
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
  },
  categoryList: {
    height: 50,
  },
  chip: {
    margin: 5,
  },
});

export default HomeScreen;
