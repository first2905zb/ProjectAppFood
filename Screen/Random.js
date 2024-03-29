import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Animated, Easing } from 'react-native';

const RandomFoodScreen = () => {
  const [randomFood, setRandomFood] = useState({ name: '', image: require('../assets/random1.png') });
  const [showNearbyRestaurants, setShowNearbyRestaurants] = useState(false);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [scaleValue] = useState(new Animated.Value(1));

  const foodList = [
    { name: 'ข้าวผัด', image: require('../assets/food1.jpg') },
    { name: 'ผัดไทย', image: require('../assets/food2.jpg') },
    { name: 'ข้าวหน้าเป็ด', image: require('../assets/food3.jpg') },
    { name: 'ก๋วยเตี๋ยว', image: require('../assets/food4.jpg') },
    { name: 'ส้มตำ', image: require('../assets/food5.jpg') },
    { name: 'ข้าวมันไก่', image: require('../assets/food1.jpg') },
    { name: 'ปิ้งย่าง', image: require('../assets/food2.jpg') },
    { name: 'หมูกระทะ', image: require('../assets/food3.jpg') }
  ];

  const nearbyRestaurantsList = [
    { name: 'ร้านอาหาร C', image: require('../assets/popular.jpeg'), isOpen: true, cuisine: 'อาหารไทย', signatureDish: 'ผัดไทย' },
    { name: 'ร้านอาหาร D', image: require('../assets/chester.png'), isOpen: false, cuisine: 'อาหารไทย', signatureDish: 'ข้าวผัด' },
    { name: 'ร้านอาหาร E', image: require('../assets/yayoi.jpg'), isOpen: true, cuisine: 'อาหารจีน', signatureDish: 'ข้าวหน้าเป็ด' },
    { name: 'ร้านอาหาร F', image: require('../assets/mk.jpg'), isOpen: false, cuisine: 'อาหารไทย', signatureDish: 'ส้มตำ' },
    { name: 'ร้านอาหาร G', image: require('../assets/boost.jpg'), isOpen: true, cuisine: 'อาหารไทย', signatureDish: 'ก๋วยเตี๋ยว' }
  ];

  const randomFoodHandler = () => {
    const randomIndex = Math.floor(Math.random() * foodList.length);
    const randomFoodItem = foodList[randomIndex];
    setRandomFood(randomFoodItem);

    const shuffledRestaurants = [...nearbyRestaurantsList].sort(() => 0.5 - Math.random());
    setNearbyRestaurants(shuffledRestaurants.slice(0, 3));

    setShowNearbyRestaurants(true);

    animateButton();
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.8,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ]).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>สุ่มเมนูอาหาร</Text>
        <TouchableOpacity style={styles.randomFoodContainer} onPress={randomFoodHandler}>
          <Animated.View style={[styles.randomFoodContainer, { transform: [{ scale: scaleValue }] }]}>
            <Image source={randomFood.image} style={styles.foodImage} />
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.randomFoodText}>{randomFood.name}</Text>
      </View>

      {showNearbyRestaurants && (
        <View style={styles.nearbyRestaurantsContainer}>
          <Text style={styles.nearbyRestaurantsTitle}>ร้านอาหารใกล้เคียง</Text>
          <FlatList
            data={nearbyRestaurants}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.nearbyRestaurantContainer}>
                <Image source={item.image} style={styles.nearbyRestaurantImage} />
                <Text style={styles.nearbyRestaurantName}>{item.name}</Text>
                <Text style={styles.nearbyRestaurantInfo}>ประเภท: {item.cuisine}</Text>
                <Text style={{ color: item.isOpen ? 'green' : 'red' }}>{item.isOpen ? 'เปิด' : 'ปิด'}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.nearbyRestaurantsList}
          />
        </View>
      )}

      <TouchableOpacity style={styles.randomButton} onPress={randomFoodHandler}>
        <Text style={styles.buttonText}>สุ่มเมนูอาหารใหม่</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  randomFoodContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  randomFoodText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  foodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  nearbyRestaurantsContainer: {
    marginBottom: 20,
  },
  nearbyRestaurantsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  nearbyRestaurantContainer: {
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    width: 250,
    height: 220,
  },
  nearbyRestaurantImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  nearbyRestaurantName: {
    paddingVertical: 5,
    color: '#555',
    fontSize: 16,
    textAlign: 'center',
  },
  nearbyRestaurantInfo: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
  randomButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RandomFoodScreen;

