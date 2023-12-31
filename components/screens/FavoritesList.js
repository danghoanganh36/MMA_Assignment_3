import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductCard from "../common/OrchidCard";

const FavoritesList = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem("favorites");
        if (favorites) {
          const parsedFavorites = JSON.parse(favorites);
          setFavoriteProducts(parsedFavorites);
          // console.log(parsedFavorites);
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };
    if (isFocused) {
      loadFavorites();
    }
  }, [isFocused]);

  const removeProduct = async (id) => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites);
        const updatedFavorites = parsedFavorites.filter(
          (product) => product.id !== id
        );
        await AsyncStorage.setItem(
          "favorites",
          JSON.stringify(updatedFavorites)
        );
        setFavoriteProducts(updatedFavorites);
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const removeAllProduct = async () => {
    try {
      await AsyncStorage.removeItem("favorites");
      setFavoriteProducts([]);
    } catch (error) {
      console.error("Error removing all products:", error);
    }
  };

  const onItemPress = (item) => {
    navigation.navigate("DetailScreen", { item, source: "FavoritesList" });
  };

  return favoriteProducts.length > 0 ? (
    <ScrollView>
      <Pressable style={styles.removeButton} onPress={() => removeAllProduct()}>
            <Text style={styles.removeButtonText}>Remove All</Text>
      </Pressable>
      {favoriteProducts.map((product, index) => (
        <TouchableOpacity key={index} style={styles.favoriteItem} onPress={() => onItemPress(product)} >
        {/* <View key={index} style={styles.favoriteItem}> */}
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <Text style={styles.productName}>{product.name}</Text>
          <Pressable style={styles.removeButton} onPress={() => removeProduct(product.id)}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </Pressable>
        {/* </View> */}
        </TouchableOpacity>
      ))}
    </ScrollView>
  ) : (
    <View style={styles.emptyItem}>
      {/* <Image source={{}} style={styles.productImage} /> */}
      <Text style={styles.emptyText}>No Favorites Yet</Text>
      <Text style={styles.emptyText}>Add some to your favorites!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  favoriteItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "white",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  productImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  emptyItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#bfbfbf",
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  removeButtonText: {
    color: 'white',
  },
});

export default FavoritesList;
