import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ImageBackground, SafeAreaView, Image, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator
} from 'react-native';

const urlAPI = "https://first2905zb.github.io/API/food.json";

const HomeScreen = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState('บ้าน');
  const locations = ['บ้าน', 'ที่ทำงาน', 'มหาวิทยาลัยศรีปทุม', 'เพิ่มที่อยู่'];
  const [showDropdown, setShowDropdown] = useState(false);
  const [showViewAllDropdown, setShowViewAllDropdown] = useState(false);
  const viewAllOptions = ['Option 1', 'Option 2', 'Option 3'];
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fullData, setFullData] = useState([]);

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
        setFullData(data.result);
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
      <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color="#5500dc" />
      </View>
    )
  }

  const handleDropdownSelect = (location) => {
    setSelectedLocation(location);
    setShowDropdown(false);
  };

  const handleViewAllPress = () => {
    setShowViewAllDropdown(!showViewAllDropdown);
  };

  const handleViewAllOptionSelect = (option) => {
    // Handle view all option selection
    setShowViewAllDropdown(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100} // Adjust this value as needed
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
              <Text style={styles.deliveryText}>Delivery to ▼</Text>
            </TouchableOpacity>
            <View style={styles.profileContainer}>
              <ImageBackground source={require('../assets/profile.jpg')} style={styles.profileImage} />
            </View>
          </View>
          <Text style={styles.dropdownText}>{selectedLocation}</Text>

          {showDropdown && (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.dropdownContainer}>
                {locations.map((location, index) => (
                  <TouchableOpacity key={index} onPress={() => handleDropdownSelect(location)}>
                    <Text style={styles.dropdownOption}>{location}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <Text style={styles.orderText}>What would you like to order ?</Text>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="🔍 Find for food or restaurant.."
              style={styles.searchInput}
              autoCapitalize='none'
              clearButtonMode='always'
              autoCorrect={false}
              value={searchQuery}
              onChangeText={(query) => handleSearch(query)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.shotcut}>
                <Image source={require('../assets/อาหาร1.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}>สั่งอาหาร</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.shotcut, styles.shadow]} onPress={() => {navigation.navigate('Random', {data}); }}>
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
            <Text style={styles.popularButtonTopText}>ร้านยอดนิยม</Text>
            <TouchableOpacity onPress={() => handleViewAllPress()}>
              <Text style={styles.viewAllText}>View All ▼</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.popularContainer}>
            {data.map((item, index) => (
              <TouchableOpacity key={index} style={styles.popularButton} onPress={() => { navigation.navigate('Menu', { item }); }}>
                <Image source={{ uri: item.bgimage }} style={styles.popularImage} />
                <Text style={styles.popularButtonText}>{item.storeName}</Text>
                <Text style={styles.popularSub1Text}>⛟ Free delivery ⏱︎ 10-15 min</Text>
                <Text style={styles.popularSubText}>{item.storeName}</Text>
                <View style={styles.viewAllDropdown}>
                  {showViewAllDropdown && (
                    <View style={styles.dropdownContainer}>
                      {viewAllOptions.map((option, index) => (
                        <TouchableOpacity key={index} onPress={() => handleViewAllOptionSelect(option)}>
                          <Text style={styles.dropdownOption}>{option}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7e6ff',
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
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f7e6ff",
    width: 300,
    borderRadius: 10
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
