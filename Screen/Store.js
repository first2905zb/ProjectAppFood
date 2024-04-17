import {
    StyleSheet, Text, View, TouchableOpacity, ImageBackground, FlatList, SafeAreaView,
    KeyboardAvoidingView, TextInput, Image
} from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import AddressContext from './AddressContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const Store = (props) => {
    const { datas } = useContext(AddressContext);
    const [locations, setLocations] = useState(props.route.params.locations);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState(props.route.params.data)
    const [fullData, setFullData] = useState(props.route.params.data);

    useEffect(() => {
        const formattedQuery = searchQuery.toLowerCase();
        const filteredData = fullData.filter(item => contains(item.storeName, formattedQuery));
        setData(filteredData);
    }, [searchQuery, fullData]);

    const contains = (storeName, query) => {
        return storeName.toLowerCase().includes(query);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleDropdownSelect = (location) => {
        setLocations(location);
        setShowDropdown(false);
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
                        <TouchableOpacity style={styles.profileContainer} onPress={() => props.navigation.navigate('Sidebar')}>
                            <ImageBackground source={require('../assets/profile.jpg')} style={styles.profileImage} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.dropdownText}>{locations}</Text>

                    {showDropdown && (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.dropdownContainer}>
                                <FlatList
                                    data={datas}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => handleDropdownSelect(item.addressName)}>
                                            <Text style={{ color: "#000" }}>{item.addressName}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                                <TouchableOpacity onPress={() => props.navigation.navigate("Address")}>
                                    <Text style={{ color: "#000" }}>เพิ่มที่อยู่</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    <View style={{ marginVertical: 16 }}>
                        <Text style={{ color: "#000", fontSize: 30 }}>ร้านค้าทั้งหมด</Text>
                    </View>
                    <View style={{ paddingVertical: 10 }}>
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
                    </View>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.storeName}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.popularButton} onPress={() => { props.navigation.navigate('Menu', { item }); }}>
                                <ImageBackground source={{ uri: item.bgimage }} style={styles.popularImage}>
                                    <Text style={styles.popularButtonText}>{item.storeName}</Text>
                                    <Text style={styles.popularSub1Text}>⛟ Free delivery ⏱︎ 10-15 min</Text>
                                    <Text style={styles.popularSubText}>{item.storeName}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Store

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    searchInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    popularButton: {
        width: '100%',
        height: 250,
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
        width: '100%',
        height: '100%',
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
    },

    popularButtonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 80,
        left: 10,
        zIndex: 1, // เพิ่มบรรทัดนี้
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 5,
        borderRadius: 5,
    },
    popularSub1Text: {
        color: '#000',
        textAlign: 'center',
        fontSize: 14,
        position: 'absolute',
        bottom: 45,
        left: 10,
        zIndex: 1, // เพิ่มบรรทัดนี้
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 5,
        borderRadius: 5,
    },
    popularSubText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 14,
        position: 'absolute',
        bottom: 10,
        left: 10,
        zIndex: 1, // เพิ่มบรรทัดนี้
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 5,
        borderRadius: 5,
    },
})
