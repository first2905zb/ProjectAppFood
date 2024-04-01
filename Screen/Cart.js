import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'

const Cart = (props) => {
    const { addonQuantities, quantity, data } = props.route.params;
    const [quantitys, setQuantity] = useState(quantity || 0); // Initial quantity
    const [promoCode, setPromoCode] = useState('');

    const handleQuantityChange = (change) => {
        const newQuantity = Math.max(0, quantitys + change); // Ensure quantity doesn't go below 0
        setQuantity(newQuantity);
    };

    const addonArray = Object.entries(addonQuantities).map(([addon, quantity]) => ({ addon, quantity }));

    const applyPromoCode = () => {
        // Logic to apply the promo code
        console.log('Promo Code Applied:', promoCode);
    };
    console.log(data)
    console.log(addonArray)

    return (
        <View style={styles.container}>
            <View style={styles.orderList}>
                <FlatList
                    data={[data]}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={{ uri: item.image }} style={styles.img} />
                                <View style={{ padding: 8, justifyContent: 'space-evenly', paddingLeft: 16 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>{item.name}</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: "#6E0387" }}>{item.price} B</Text>
                                    <FlatList
                                        data={addonArray}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <Text style={{ paddingLeft: 8 }}>- {item.addon}: {item.quantity}</Text>
                                        )}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 100 }}>
                                <TouchableOpacity style={styles.quantityButtonSub} onPress={() => handleQuantityChange(-1)}>
                                    <Text style={{ color: "#6E0387" }}>-</Text>
                                </TouchableOpacity>
                                <View>
                                    <Text>{quantitys}</Text>
                                </View>
                                <TouchableOpacity style={styles.quantityButtonAdd} onPress={() => handleQuantityChange(1)}>
                                    <Text style={{ color: '#ffffff' }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
            <KeyboardAvoidingView behavior="padding">
                <View style={styles.containers}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPromoCode}
                        value={promoCode}
                        placeholder="Promo Code"
                    />
                    <TouchableOpacity style={{ backgroundColor: '#6E0387', width: 65, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
                        <Text style={{ color: '#ffffff' }}>Apply</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
            <View style={styles.containerConList}>
                <View style={styles.monList}>
                    <Text style={styles.monListItemText}>Subtotal</Text>
                    <Text style={styles.monListItemText}>283 Bath</Text>
                </View>
                <View style={styles.monList}>
                    <Text style={styles.monListItemText}>Tax and Fees</Text>
                    <Text style={styles.monListItemText}>18 Bath</Text>
                </View>
                <View style={styles.monList}>
                    <Text style={styles.monListItemText}>Delivery</Text>
                    <Text style={styles.monListItemText}>15 Bath</Text>
                </View>
                <View style={styles.monList}>
                    <Text style={styles.monListItemText}>Total</Text>
                    <Text style={styles.monListItemText}>316 Bath</Text>
                </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={{ marginTop: 250, backgroundColor: '#6E0387', width: 250, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
                    <Text style={{color: '#ffffff'}}>CHECKOUT</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};


export default Cart

const styles = StyleSheet.create({
    container: {
        margin: 24,
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 25,
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
    containers: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 10,
    },
    input: {
        flex: 1,
        marginRight: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    containerConList: {
        paddingTop: 16,
        gap: 16
    },
    monList: {
        flexDirection: "row",
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingBottom: 8,
        marginBottom: 8
    },
    monListItemText: {
        fontSize: 16,
        color: "black"
    }
})
