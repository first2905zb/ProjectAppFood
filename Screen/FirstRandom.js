import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';


const FirstRandom = (props) => {
    const [selectedLocation, setSelectedLocation] = useState('บ้าน');
    const locations = ['บ้าน', 'ที่ทำงาน', 'มหาวิทยาลัยศรีปทุม'];
    const [showDropdown, setShowDropdown] = useState(false);
    console.log(props.route.params.data);
    const type = props.route.params.data[0];
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
                        <View style={styles.dropdownContainer}>
                            {locations.map((location, index) => (
                                <TouchableOpacity key={index} onPress={() => handleDropdownSelect(location)}>
                                    <Text style={styles.dropdownOption}>{location}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.orderText}>What would you like to order ?</Text>
                    <View style={styles.searchContainer}>
                        <TextInput
                            placeholder="🔍 Find for food or restaurant.."
                            style={styles.searchInput}
                            // keyboardShouldPersistTaps="never"
                            autoCapitalize='none'
                            clearButtonMode='always'
                            autoCorrect={false}
                            keyboardType='default'
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.shotcut, styles.shadow]} onPress={() => props.navigation.navigate('Home')}>
                                <Image source={require('../assets/อาหาร1.png')} style={styles.buttonImage} />
                                <Text style={[styles.buttonText, { color: "grey" }]}>สั่งอาหาร</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.shotcut}>
                                <Image source={require('../assets/random1.png')} style={styles.buttonImage} />
                                <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>สุ่มอาหาร</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.shotcut, styles.shadow]}>
                                <Image source={require('../assets/code1.png')} style={styles.buttonImage} />
                                <Text style={[styles.buttonText, { color: 'gray' }]}>เก็บโค้ด</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 30, justifyContent: 'space-between' }}>
                        <Text style={styles.popularButtonTopText}>ประเภทอาหาร</Text>
                    </View>
                    <View style={styles.buttonContainer2}>
                        <TouchableOpacity style={[styles.shotcut, styles.shadow]} onPress={() => {props.navigation.navigate('Random1', {type}); }}>
                            <Image source={require('../assets/อาหาร1.png')} style={styles.buttonImage} />
                            <View style={{ width: 60, top: -8  }}>
                                <Text style={[styles.buttonText, { color: "grey" }]}>อาหารไทย</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.shotcut, styles.shadow]} onPress={() => navigation.navigate('Random1')}>
                            <Image source={require('../assets/random1.png')} style={styles.buttonImage} />
                            <View style={{ width: 60, top: -8  }}>
                                <Text style={[styles.buttonText, { color: "grey" }]}>อาหารญี่ปุ่น</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.shotcut, styles.shadow]} onPress={() => navigation.navigate('Random1')}>
                            <Image source={require('../assets/code1.png')} style={styles.buttonImage} />
                            <View style={{ width: 60, top: -8  }}>
                                <Text style={[styles.buttonText, { color: 'gray' }]}>อาหารเกาหลี</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.shotcut, styles.shadow]} onPress={() => navigation.navigate('Random1')}>
                            <Image source={require('../assets/code1.png')} style={styles.buttonImage} />
                            <View style={{ width: 60, top: -8  }}>
                                <Text style={[styles.buttonText, { color: 'gray' }]}>อาหารจีน</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer3}>
                        <TouchableOpacity style={[styles.shotcut, styles.shadow]} onPress={() => navigation.navigate('Random1')}>
                            <Image source={require('../assets/อาหาร1.png')} style={styles.buttonImage} />
                            <View style={{ width: 60, top: -8  }}>
                                <Text style={[styles.buttonText, { color: "grey" }]}>อาหารตะวันตก</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.shotcut, styles.shadow]} onPress={() => navigation.navigate('Random1')}>
                            <Image source={require('../assets/random1.png')} style={styles.buttonImage} />
                            <View style={{ width: 60, top: -8 }}>
                                <Text style={[styles.buttonText, { color: "grey" }]}>เครื่องดื่มและขนม</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default FirstRandom

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
        right: 190,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        zIndex: 1,
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
        paddingVertical: 10
        ,
        paddingHorizontal: 20,
        fontSize: 16,
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
        marginTop: -104
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
    buttonContainer2: {
        paddingTop: 24,
        paddingHorizontal: 8,
        flexDirection: 'row',
        justifyContent: "space-evenly"
    },
    buttonContainer3: {
        paddingTop: 24,
        paddingHorizontal: 8,
        flexDirection: 'row',
        justifyContent: "flex-start",
        paddingLeft: 23,
        gap: 14
    },
});