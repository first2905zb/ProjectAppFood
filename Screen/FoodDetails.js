import { StyleSheet, Text, View, Image, Button, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const FoodDetails = (props) => {
    const [quantity, setQuantity] = useState(0); // Initial quantity

    const handleQuantityChange = (change) => {
        const newQuantity = Math.max(0, quantity + change); // Ensure quantity doesn't go below 0
        setQuantity(newQuantity);
    };

    console.log(props.route.params.item)
    const data = props.route.params.item;

    console.log(data)

    const [addonQuantities, setAddonQuantities] = useState({});

    const handleAddonQuantityChange = (addon, change) => {
        const newQuantities = { ...addonQuantities };
        const currentQuantity = newQuantities[addon] || 0;
        newQuantities[addon] = Math.max(0, currentQuantity + change);
        setAddonQuantities(newQuantities);
    };

    return (
        <View style={styles.container}>
            <View style={{ justifyContent: "center", alignItems: 'center' }}>
                <Image source={{ uri: data.image }} style={{ width: 350, height: 200, borderRadius: 15 }} />
            </View>
            <View style={{ paddingVertical: 24 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 30 }}>{data.name}</Text>
                <Text style={{ fontSize: 16 }}>4.5 (30+) See Review</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16 }}>{data.price} B</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 100 }}>
                        <TouchableOpacity style={styles.quantityButtonSub} onPress={() => handleQuantityChange(-1)}>
                            <Text style={{ color: "#6E0387" }}>-</Text>
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center' }}>
                            <Text>{quantity}</Text>
                        </View>
                        <TouchableOpacity style={styles.quantityButtonAdd} onPress={() => handleQuantityChange(1)}>
                            <Text style={{ color: '#ffffff' }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 22, height: 250, marginBottom: 30 }}>
                    <View style={{ paddingRight: 16, marginBottom: 46, height: 55 }}>
                        <Text>{data.details}</Text>
                    </View>
                    <Text>Choice of Add On</Text>
                    <FlatList
                        data={data.addon}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                <Text style={{ paddingTop: 8, marginBottom: 8 }}>{item}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: 100 }}>
                                    <TouchableOpacity style={styles.quantityButtonSub} onPress={() => handleAddonQuantityChange(item, -1)}>
                                        <Text style={{ color: "#6E0387" }}>-</Text>
                                    </TouchableOpacity>
                                    <View style={{ justifyContent: "center", alignItems: 'center' }}>
                                        <Text>{addonQuantities[item] || 0}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.quantityButtonAdd} onPress={() => handleAddonQuantityChange(item, 1)}>
                                        <Text style={{ color: "#ffffff" }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />

                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.add}>
                        <View style={styles.cart}>
                            <Icon name='shoppingcart' size={30} color={"#6E0387"} />
                        </View>
                        <Text style={{ paddingRight: 8, color: '#ffffff' }}>Add to chart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default FoodDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 27,
        paddingHorizontal: 22,
    },
    quantityButtonSub: {
        // backgroundColor: '#ccc', // Adjust background color as needed
        borderRadius: 100, // Create a circle
        borderWidth: 0.5,
        borderColor: '#6E0387',
        paddingHorizontal: 12, // Adjust padding for button text
        paddingVertical: 2, // Adjust padding for button text
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantityButtonAdd: {
        backgroundColor: '#6E0387', // Adjust background color as needed
        borderRadius: 100, // Create a circle
        paddingHorizontal: 12, // Adjust padding for button text
        paddingVertical: 2, // Adjust padding for button text
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    add: {
        width: 160,
        height: 60,
        backgroundColor: "blue",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#6E0387'
    },
    cart: {
        borderWidth: 0.5,
        borderRadius: 100,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    }
});
