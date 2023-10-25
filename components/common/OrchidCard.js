import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const addedIcon = require('../../assets/add-to-favorites.png');
const removedIcon = require('../../assets/heart.png');

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    checkIsExisting();
  }, []);

  const checkIsExisting = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const favoriteProducts = JSON.parse(favorites);
        const isProductLiked = favoriteProducts.some(
          (favProduct) => favProduct.id === product.id
        );
        setIsLiked(isProductLiked);
      }
    } catch (error) {
      console.error('Error checking favorites:', error);
    }
  };

  const toggleLike = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let favoriteProducts = favorites ? JSON.parse(favorites) : [];

      const productIndex = favoriteProducts.findIndex((favProduct) => favProduct.id === product.id);

      if (isLiked) {
        if (productIndex !== -1) {
          favoriteProducts.splice(productIndex, 1);
          await AsyncStorage.setItem('favorites', JSON.stringify(favoriteProducts));
        }
      } else {
        if (productIndex === -1) {
          favoriteProducts.push(product);
          await AsyncStorage.setItem('favorites', JSON.stringify(favoriteProducts));
        }
      }
      setIsLiked(!isLiked); // Toggle the liked state
    } catch (error) {
      console.error('Error setting favorites:', error);
    }
  };


  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
        <Image source={isLiked ? addedIcon : removedIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  likeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default ProductCard;
