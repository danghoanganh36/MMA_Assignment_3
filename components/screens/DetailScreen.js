import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const addedIcon = require("../../assets/add-to-favorites.png");
const removedIcon = require("../../assets/heart.png");
import { Icon } from "react-native-paper";

const DetailScreen = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const product = route.params.item;
  const sourceScreen = route.params.source;
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem("favorites");
        if (favorites) {
          const parsedFavorites = JSON.parse(favorites);
          const isFavorite = parsedFavorites.some(
            (favoriteProduct) => favoriteProduct.id === product.id
          );
          setIsLiked(isFavorite);
          console.log("isFavorite", isFavorite);
        } else {
          // If there are no favorites in async storage, set isLiked to false
          setIsLiked(false);
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    if (isFocused) {
      loadFavorites();
    }
  }, [isFocused, product]);

  const removeProduct = async (id) => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites);
        const updatedFavorites = parsedFavorites.filter(
          (favoriteProduct) => favoriteProduct.id !== id
        );
        await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setIsLiked(false); // Update the isLiked state
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (sourceScreen === "Home") {
              navigation.navigate("HomeScreen");
            } else if (sourceScreen === "FavoritesList") {
              navigation.navigate("FavoritesList");
            }
          }}
          style={styles.backButton}
        >
          <Image
            source={require("../../assets/back.png")}
            style={{ width: 100, height: 100 }}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{product.name}</Text>
        <TouchableOpacity
          style={styles.cartIcon}
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
          <Icon name="shopping-cart" type="font-awesome" color="#000" />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: product.image }} style={styles.image} />
      <ScrollView style={styles.infoContainer}>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            marginBottom: 10,
          }}
        >
          <Text style={styles.name}>{product.name}</Text>
          {isLiked ? (
            <TouchableOpacity style={styles.likeButton} onPress={() => removeProduct(product.id)}>
              <Image
                source={addedIcon}
                style={styles.icon}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.likeButton}>
              <Image
                source={removedIcon}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.description}>{product.description}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 40,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartIcon: {
    fontSize: 20,
    marginRight: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
  },
  likeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default DetailScreen;
