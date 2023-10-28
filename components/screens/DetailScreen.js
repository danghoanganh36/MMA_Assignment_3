import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
const addedIcon = require("../../assets/add-to-favorites.png");
const removedIcon = require("../../assets/heart.png");

const DetailScreen = ( isLiked ) => {
  const route = useRoute();
  const product = route.params.item;
  console.log(isLiked);
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={{ flexDirection: "row", borderBottomColor: "#ccc", borderBottomWidth: 1, marginBottom: 10 }}>
          <Text style={styles.name}>{product.name}</Text>
          <TouchableOpacity style={styles.likeButton}>
            <Image
              source={isLiked ? addedIcon : removedIcon}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
