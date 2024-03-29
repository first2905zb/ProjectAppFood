import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const FoodDetails = () => {
    const [quantity, setQuantity] = useState(2); // Initial quantity

    const handleQuantityChange = (change) => {
        const newQuantity = Math.max(0, quantity + change); // Ensure quantity doesn't go below 0
        setQuantity(newQuantity);
    };

    return (
        <View style={styles.container}>
            <View style={{ justifyContent: "center", alignItems: 'center' }}>
                <Image source={{ uri: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg' }} style={{ width: 350, height: 200 }} />
            </View>
            <View style={{ paddingVertical: 24 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Ground Beef Taco</Text>
                <Text style={{ fontSize: 16 }}>4.5 (30+) See Review</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>169 B</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 100 }}>
                        <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(-1)}>
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <Text>{quantity}</Text>
                        <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(1)}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 22, marginBottom: 156 }}>
                    <View style={{ paddingRight: 16, marginBottom: 46 }}>
                        <Text>Brown the beef better. Lean ground beef – I like to use 85% lean angus. Garlic – use fresh  chopped. Spices – chili powder, cumin, onion powder.</Text>
                    </View>
                    <Text>Choice of Add On</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.add}>
                        <Text>hello</Text>
                        <Text>Add to chart</Text>
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
    quantityButton: {
        backgroundColor: '#ccc', // Adjust background color as needed
        borderRadius: 100, // Create a circle
        paddingHorizontal: 12, // Adjust padding for button text
        paddingVertical: 2, // Adjust padding for button text
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    add: {
        width: 160,
        height: 60,
        backgroundColor: "blue",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 100,
    }
});