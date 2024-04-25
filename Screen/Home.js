import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ImageBackground, SafeAreaView, Image, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
  FlatList
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import AddressContext from './AddressContext';
import { ListItem } from '@rneui/base';

const urlAPI = "https://first2905zb.github.io/API/food.json";

const HomeScreen = (props) => {
  // const [selectedLocation, setSelectedLocation] = useState('บ้าน');
  const [locations, setLocations] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showViewAllDropdown, setShowViewAllDropdown] = useState(false);
  // const viewAllOptions = ['Option 1', 'Option 2', 'Option 3'];
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fullData, setFullData] = useState([]);
  const { datas } = useContext(AddressContext)
  const [fulldatas, setFulldatas] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(urlAPI)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('fetch Successful');
        setData(data.result);
        // console.log(data)
        setFullData(data.result);
        setFulldatas(data.result);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []);

  useEffect(() => {
    const formattedQuery = searchQuery.toLowerCase();
    const filteredData = fullData.filter(item => contains(item.storeName, formattedQuery));
    setData(filteredData);
  }, [searchQuery, fullData]);

  const contains = (storeName, query) => {
    return storeName.toLowerCase().includes(query);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color="#5500dc" />
      </View>
    )
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDropdownSelect = (location) => {
    setLocations(location);
    setShowDropdown(false);
  };
  // console.log(fulldatas)

  return (
    <ScrollView style={styles.container}>
      {/* <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100} // Adjust this value as needed
      > */}
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
            <Text style={styles.deliveryText}>ควยหมา ▼</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileContainer} onPress={() => props.navigation.navigate('Sidebar')}>
            <ImageBackground source={require('../assets/profile.jpg')} style={styles.profileImage} />
          </TouchableOpacity>
        </View>
        <Text style={styles.dropdownText}>{locations}</Text>

        {showDropdown && (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.dropdownContainer}>
              {datas.map((item, index) => (
                <TouchableOpacity key={index.toString()} onPress={() => handleDropdownSelect(item.addressName)}>
                  <Text style={{ color: "#000" }}>{item.addressName}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={() => props.navigation.navigate("Address")}>
                <Text style={{ color: "#000" }}>เพิ่มที่อยู่</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Text style={styles.orderText}>What would you like to order ?</Text>
        <View style={styles.searchContainer}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
            <TextInput
              placeholder="🔍 ค้าหาร้านค้า..."
              style={styles.searchInput}
              autoCapitalize='none'
              clearButtonMode='always'
              autoCorrect={false}
              value={searchQuery}
              onChangeText={(query) => handleSearch(query)}
              width={300}
            />
            <View style={{ top: -5, left: -5 }}>
              <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
                <Icon name="shopping-cart" size={45} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.shotcut}>
              <Image source={require('../assets/อาหาร1.png')} style={styles.buttonImage} />
              <Text style={styles.buttonText}>สั่งอาหาร</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.shotcut, styles.shadow]} onPress={() => { props.navigation.navigate('Random', { data, locations }); }}>
              <Image source={require('../assets/random1.png')} style={styles.buttonImage} />
              <Text style={[styles.buttonText, { color: 'gray' }]}>สุ่มอาหาร</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.shotcut, styles.shadow]}>
              <Image source={require('../assets/code1.png')} style={styles.buttonImage} />
              <Text style={[styles.buttonText, { color: 'gray' }]}>เก็บโค้ด</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 30, justifyContent: 'space-between' }}>
          <Text style={styles.popularButtonTopText}>ร้านทั้งหมด</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('ร้านค้า', { data, locations })}>
            <Text style={styles.viewAllText}>View All ▼</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem>
              <ListItem.Content>
                <TouchableOpacity style={styles.popularButton} onPress={() => { props.navigation.navigate('Menu', { item }); }}>
                  <Image source={{ uri: item.bgimage }} style={styles.popularImage} />
                  <Text style={styles.popularButtonText}>{item.storeName}</Text>
                  <Text style={styles.popularSub1Text}>⛟ Free delivery ⏱︎ 10-15 min</Text>
                  <Text style={styles.popularSubText}>{item.storeName}</Text>
                </TouchableOpacity>
              </ListItem.Content>
            </ListItem>
          )}
        />
        <View style={{ flexDirection: "row", marginTop: 30, justifyContent: 'space-between' }}>
          <Text style={styles.popularButtonTopText}>ร้านอาหารไทย</Text>
        </View>
        <FlatList
          horizontal
          data={fulldatas.filter(item => item.type === 'thai')}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem>
              <ListItem.Content>
                <TouchableOpacity style={styles.popularButton} onPress={() => { props.navigation.navigate('Menu', { item }); }}>
                  <Image source={{ uri: item.bgimage }} style={styles.popularImage} />
                  <Text style={styles.popularButtonText}>{item.storeName}</Text>
                  <Text style={styles.popularSub1Text}>⛟ Free delivery ⏱︎ 10-15 min</Text>
                  <Text style={styles.popularSubText}>{item.storeName}</Text>
                </TouchableOpacity>
              </ListItem.Content>
            </ListItem>
          )}
        />
        <View style={{ flexDirection: "row", marginTop: 30, justifyContent: 'space-between' }}>
          <Text style={styles.popularButtonTopText}>ร้านอาหารญี่ปุ่น</Text>
        </View>
        <FlatList
          horizontal
          data={fulldatas.filter(item => item.type === 'japan')}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem>
              <ListItem.Content>
                <TouchableOpacity style={styles.popularButton} onPress={() => { props.navigation.navigate('Menu', { item }); }}>
                  <Image source={{ uri: item.bgimage }} style={styles.popularImage} />
                  <Text style={styles.popularButtonText}>{item.storeName}</Text>
                  <Text style={styles.popularSub1Text}>⛟ Free delivery ⏱︎ 10-15 min</Text>
                  <Text style={styles.popularSubText}>{item.storeName}</Text>
                </TouchableOpacity>
              </ListItem.Content>
            </ListItem>
          )}
        />
        <View style={{ flexDirection: "row", marginTop: 30, justifyContent: 'space-between' }}>
          <Text style={styles.popularButtonTopText}>ร้านอาหารเกาหลี</Text>
        </View>
        <FlatList
          horizontal
          data={fulldatas.filter(item => item.type === 'korea')}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem>
              <ListItem.Content>
                <TouchableOpacity style={styles.popularButton} onPress={() => { props.navigation.navigate('Menu', { item }); }}>
                  <Image source={{ uri: item.bgimage }} style={styles.popularImage} />
                  <Text style={styles.popularButtonText}>{item.storeName}</Text>
                  <Text style={styles.popularSub1Text}>⛟ Free delivery ⏱︎ 10-15 min</Text>
                  <Text style={styles.popularSubText}>{item.storeName}</Text>
                </TouchableOpacity>
              </ListItem.Content>
            </ListItem>
          )}
        />
        <View style={{ flexDirection: "row", marginTop: 30, justifyContent: 'space-between' }}>
          <Text style={styles.popularButtonTopText}>ร้านอาหารจีน</Text>
        </View>
        <FlatList
          horizontal
          data={fulldatas.filter(item => item.type === 'china')}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem>
              <ListItem.Content>
                <TouchableOpacity style={styles.popularButton} onPress={() => { props.navigation.navigate('Menu', { item }); }}>
                  <Image source={{ uri: item.bgimage }} style={styles.popularImage} />
                  <Text style={styles.popularButtonText}>{item.storeName}</Text>
                  <Text style={styles.popularSub1Text}>⛟ Free delivery ⏱︎ 10-15 min</Text>
                  <Text style={styles.popularSubText}>{item.storeName}</Text>
                </TouchableOpacity>
              </ListItem.Content>
            </ListItem>
          )}
        />
        <View style={{ flexDirection: "row", marginTop: 30, justifyContent: 'space-between' }}>
          <Text style={styles.popularButtonTopText}>ร้านอาหารเวสเทิร์น</Text>
        </View>
        <FlatList
          horizontal
          data={fulldatas.filter(item => item.type === 'western')}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem>
              <ListItem.Content>
                <TouchableOpacity style={styles.popularButton} onPress={() => { props.navigation.navigate('Menu', { item }); }}>
                  <Image source={{ uri: item.bgimage }} style={styles.popularImage} />
                  <Text style={styles.popularButtonText}>{item.storeName}</Text>
                  <Text style={styles.popularSub1Text}>⛟ Free delivery ⏱︎ 10-15 min</Text>
                  <Text style={styles.popularSubText}>{item.storeName}</Text>
                </TouchableOpacity>
              </ListItem.Content>
            </ListItem>
          )}
        />
        <View style={{ flexDirection: "row", marginTop: 30, justifyContent: 'space-between' }}>
          <Text style={styles.popularButtonTopText}>ร้านของหวาน</Text>
        </View>
        <FlatList
          horizontal
          data={fulldatas.filter(item => item.type === 'dessert')}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem>
              <ListItem.Content>
                <TouchableOpacity style={styles.popularButton} onPress={() => { props.navigation.navigate('Menu', { item }); }}>
                  <Image source={{ uri: item.bgimage }} style={styles.popularImage} />
                  <Text style={styles.popularButtonText}>{item.storeName}</Text>
                  <Text style={styles.popularSub1Text}>⛟ Free delivery ⏱︎ 10-15 min</Text>
                  <Text style={styles.popularSubText}>{item.storeName}</Text>
                </TouchableOpacity>
              </ListItem.Content>
            </ListItem>
          )}
        />
      </View>
      {/* </KeyboardAvoidingView> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    padding: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
    width: 220,
    borderRadius: 10,
    borderWidth: 0.5
  },
  deliveryText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    color: '#6E0387',
    textAlign: "center",
    top: -24,
    marginBottom: -16
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  dropdownOption: {
    paddingVertical: 10,
    fontSize: 16,
    color: 'black'
  },
  selectedLocationText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    marginTop: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    paddingTop: 24,
  },
  shotcut: {
    backgroundColor: '#800080',
    alignItems: 'center',
    borderRadius: 50,
    height: 110,
    width: 70,
    flexDirection: 'column',
  },
  buttonImage: {
    width: 60,
    height: 60,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  popularContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: -104,
    position: 'absolute',
    top: 130
  },
  popularButton: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  popularImage: {
    width: 298,
    height: 120,
    position: 'absolute',
    bottom: 78,
    left: 0,
    borderRadius: 10,
  },

  popularButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 50,
    left: 10,
  },
  popularSub1Text: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 14,
    position: 'absolute',
    bottom: 30,
    left: 10,
  },
  popularSubText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },

  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  bottomMenuItem: {
    flex: 1,
    alignItems: 'center',
  },

  popularButtonTopText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  viewAllDropdown: {
    position: 'absolute',
    top: -70,
    right: -210,
  },
  viewAllText: {
    fontSize: 14,
    color: '#6E0387',
    top: 5
  },
  bottomMenuText: {
    fontSize: 15,
  },
  bottomMenuIcon: {
    fontSize: 25,
  },
  shadow: {
    borderWidth: 1,
    borderColor: '#ffff',
    backgroundColor: '#ffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default HomeScreen;
