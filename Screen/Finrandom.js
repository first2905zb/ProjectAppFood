import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const MenuBox = ({ image, title, description, price, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuBox} onPress={onPress}>
      <Image source={image} style={styles.menuImage} resizeMode="cover" />
      <View style={styles.menuPriceContainer}>
        <Text style={styles.menuPrice}>{price}</Text>
      </View>
      <View style={styles.menuDetails}>
        <View style={styles.menuTextContainer}>
          <Text style={styles.menuTitle}>{title}</Text>
          <Text style={styles.menuDescription}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const RestaurantScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.restaurantInfo}>
        <Image 
          source={require('../assets/profile.jpg')}
          style={styles.restaurantImage}
          resizeMode="cover"
        />
        <View style={styles.restaurantDetails}>
          <Text style={styles.restaurantName}>อิคึอิไต</Text>
          <Text style={styles.restaurantDescription}>ร้านอาหารญี่ปุ่นชื่อดัง</Text>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <MenuBox 
          image={require('../assets/profile.jpg')} 
          title="เมนูที่ 1" 
          description="รายละเอียดเมนูที่ 1" 
          price="150 บาท" 
          onPress={() => navigation.navigate('MenuDetail', { menuItemId: 1 })}
        />
        <MenuBox 
          image={require('../assets/profile.jpg')} 
          title="เมนูที่ 2" 
          description="รายละเอียดเมนูที่ 2" 
          price="200 บาท" 
          onPress={() => navigation.navigate('MenuDetail', { menuItemId: 2 })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  restaurantInfo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  restaurantImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  restaurantDetails: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  restaurantDescription: {
    fontSize: 16,
    color: '#555',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  menuBox: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    marginBottom: 10,
    position: 'relative',
  },
  menuImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  menuDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuDescription: {
    fontSize: 14,
    color: '#888',
  },
  menuPriceContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default RestaurantScreen;
