import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Animated, Easing } from 'react-native';

const RandomFoodScreen = (props) => {
  const img1 = require('../assets/random1.png');
  const [randomFood, setRandomFood] = useState(img1);
  const [showNearbyRestaurants, setShowNearbyRestaurants] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));
  const data = props.route.params.type;
  const storeName = props.route.params.type;
  // console.log(data);

  const randomFoodHandler = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomFoodItem = data[randomIndex];
    setRandomFood({uri: randomFoodItem.image});

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
      {/* <View style={styles.contentContainer}>
        <Text style={styles.title}>สุ่มเมนูอาหาร</Text>
        <TouchableOpacity style={styles.randomFoodContainer} onPress={randomFoodHandler}>
          <Animated.View style={[styles.randomFoodContainer, { transform: [{ scale: scaleValue }] }]}>
            <Image source={randomFood} style={styles.foodImage} />
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.randomFoodText}>{randomFood.name}</Text>
      </View> */}

    {/* <View>{data.storeName}</View> */}
    {console.log(data.storeName)}
      {showNearbyRestaurants && (
        <View style={styles.nearbyRestaurantsContainer}>
          <Text style={styles.nearbyRestaurantsTitle}>ร้านอาหารใกล้เคียง</Text>
          {/* <FlatList
            data={storeName}
            horizontal renderItem={({ item }) => (
              <TouchableOpacity style={styles.nearbyRestaurantContainer}>
                <Image source={{uri: item.bgimage}} style={styles.nearbyRestaurantImage} />
                <Text style={styles.nearbyRestaurantName}>{item.storeName}</Text>
                <Text style={styles.nearbyRestaurantInfo}>ประเภท: {item.cuisine}</Text>
                <Text style={{ color: 'red' }}>ปิด</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            // contentContainerStyle={styles.nearbyRestaurantsList}
          /> */}
          <Text>{data.name}</Text>
        </View>
      )}

      {/* <TouchableOpacity style={styles.randomButton} onPress={randomFoodHandler}>
        <Text style={styles.buttonText}>สุ่มเมนูอาหารใหม่</Text>
      </TouchableOpacity> */}
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

