import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Animated, Easing } from 'react-native';

const RandomFoodScreen = (props) => {
  const img1 = require('../assets/random1.png');
  const [randomFood, setRandomFood] = useState({ name: '', img: img1 });
  const [showNearbyRestaurants, setShowNearbyRestaurants] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));
  const data = props.route.params.types;
  // console.log("----------------------------------------------------------------------------------------");
  const details = data.map(item => item.storeDetails).flat();
  const name = details.map(item => item.name).flat();
  const deta = data.map(item => item.storeDetails.map(item2 => item2.name));
  const selectStore = [];

  for (let i = 0; i < deta.length; i++) {
    for (let k = 0; k < deta[i].flat().length; k++) {
      if (deta[i].flat()[k] === randomFood.name) {
        selectStore.push(data[i]);
        break;
      }
    }
  }
  console.log(selectStore)
  async function randomFoodHandler() {
    const randomIndex = Math.floor(Math.random() * name.length);
    const randomFoodItem = details[randomIndex];
    setRandomFood({ name: name[randomIndex], img: { uri: randomFoodItem.image } });
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
            <Image source={randomFood.img} style={styles.foodImage} />
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.randomFoodText}>{randomFood.name}</Text>
      </View>

      {showNearbyRestaurants && (
        <View style={styles.nearbyRestaurantsContainer}>
          <Text style={styles.nearbyRestaurantsTitle}>ร้านอาหารใกล้เคียง</Text>
          <FlatList
            data={selectStore}
            horizontal renderItem={({ item }) => (
              <TouchableOpacity style={styles.nearbyRestaurantContainer}>
                <Image source={{ uri: item.bgimage }} style={styles.nearbyRestaurantImage} />
                <Text style={styles.nearbyRestaurantName}>{item.storeName}</Text>
                <Text style={styles.nearbyRestaurantInfo}>ประเภท: {item.type}</Text>
                <Text style={{ color: 'red' }}>ปิด</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(index) => index.toString()}
          />
          <Text>{data.name}</Text>
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

