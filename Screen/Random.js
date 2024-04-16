import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Animated, Easing, ImageBackground } from 'react-native';
import AddressContext from './AddressContext';

const RandomFoodScreen = (props) => {
  const img1 = require('../assets/random1.png');
  const [randomFood, setRandomFood] = useState({ name: '', img: img1 });
  const [showNearbyRestaurants, setShowNearbyRestaurants] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));
  const [showList, setShowList] = useState(false);
  const [locations, setLocations] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const { datas } = useContext(AddressContext);
  const data = props.route.params.types;
  const type = data.map(item => item.type)
  console.log(type)
  // console.log("----------------------------------------------------------------------------------------");
  const details = data.map(item => item.storeDetails).flat();
  const name = details.map(item => item.name).flat();
  const deta = data.map(item => item.storeDetails.map(item2 => item2.name));
  const selectStore = [];

const handleDropdownSelect = (location) => {
    setLocations(location);
    setShowDropdown(false);
};

  for (let i = 0; i < deta.length; i++) {
    for (let k = 0; k < deta[i].flat().length; k++) {
      if (deta[i].flat()[k] === randomFood.name) {
        selectStore.push(data[i]);
        break;
      }
    }
  }
  // console.log(selectStore)
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
          <Text style={styles.deliveryText}>Delivery to ▼</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileContainer} onPress={() => props.navigation.navigate('Sidebar')}>
          <ImageBackground source={require('../assets/profile.jpg')} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      {showDropdown && (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.dropdownContainer}>
                {/* {locations.map((location, index) => (
                  <TouchableOpacity key={index} onPress={() => handleDropdownSelect(location)}>
                    <Text style={styles.dropdownOption}>{location}</Text>
                  </TouchableOpacity>
                ))} */}
                <FlatList
                  data={datas}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleDropdownSelect(item.addressName)}>
                      <Text>{item.addressName}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity onPress={() => props.navigation.navigate("Address")}>
                  <Text>เพิ่มที่อยู่</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

      <Text style={styles.dropdownText}>{locations}</Text>
      <View style={styles.contentContainer}>
        <View style={styles.conTitle}>
          <Text style={styles.title}>วันนี้กินไรดี?</Text>
          <Text style={[styles.title, { marginBottom: 16 }]}>หมวดหมู่ อาหาร {type}</Text>
        </View>
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
              <TouchableOpacity style={styles.nearbyRestaurantContainer} onPress={() => props.navigation.navigate("Menu", { item })}>
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
    paddingTop: 15,
    paddingBottom: 20,
    // backgroundColor: '#f7e6ff',
  },
  conTitle: {
    paddingTop: 10,
    paddingBottom: 25,
    marginLeft: -80,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    // fontWeight: 'bold',
    marginBottom: -8,
    color: '#333',
  },
  randomFoodContainer: {
    position: 'relative',
    width: 300,
    backgroundColor: '#f7e6ff',
    borderRadius: 500,
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
    backgroundColor: '#6E0387',
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
  header: {
    flexDirection: 'row',
    justifyContent: "flex-end",
    paddingTop: 15
  },
  profileContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    marginLeft: 77
  },
  dropdownContainer: {
    borderRadius: 5,
    borderColor: 'gray',
    zIndex: 1,
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "#f7e6ff",
    width: 300,
    borderRadius: 10,
    borderWidth: 0.5
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  deliveryText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});

export default RandomFoodScreen;

