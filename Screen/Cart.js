import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CartContext from './CartContext';

const Cart = (props) => {
    // const { addonQuantities, quantity, data } = props.route.params;
    const [promoCode, setPromoCode] = useState('');
    const { datas } = useContext(CartContext);
    console.log(datas)
    console.log(datas[0].addonQuantities)
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        var mainTotal = 0;
        var addonsTotal = 0;
        var subTotal = 0;
        var taxTotal = 0;
        var toTal = 0;

        for (let i = 0; i < datas.length; i++) {
            // Calculate the total price of the main item
            mainTotal += datas[i].quantity * datas[i].data.price;

            // Calculate the total price of addons
            const addonQuantities = datas[i].addonQuantities;
            const addons = datas[i].data.addons;
            for (const addon in addonQuantities) {
                const quantity = addonQuantities[addon];
                const addonPrice = addons.find(item => item.name === addon)?.price || 0;
                addonsTotal += addonPrice * quantity;
            }
        }

        // Calculate subtotal and tax
        subTotal = mainTotal + addonsTotal;
        taxTotal = subTotal * 7 / 100;
        toTal = subTotal + taxTotal + 15;

        // Update state variables
        setSubtotal(subTotal);
        setTax(taxTotal);
        setTotal(toTal)
    
        // console.log('Main Total:', maintotal);
        // console.log('Addons Total:', addonstotal);
        // console.log('Sub Total:', subtotal);
        // console.log('Tax Total:', tax);
    
    }, []);
    
    return (
        <View style={styles.container}>
            <View style={styles.orderList}>
                <FlatList
                    data={datas}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#E0E0E0', padding: 8 }}>
                            {/* <Text>{item.data.name}</Text> */}
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={{ uri: item.data.image }} style={styles.img} />
                                <View style={{ padding: 8, justifyContent: 'space-evenly', paddingLeft: 16 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>{item.data.name}</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: "#6E0387" }}>{item.data.price} B</Text>
                                    {/* {console.log(item.addonQuantitie    s)} */}
                                    <FlatList
                                        data={Object.entries(item.addonQuantities)}
                                        keyExtractor={(addonItem, index) => `${addonItem[0]}_${index}`}
                                        renderItem={({ item: [addon, quantity] }) => (
                                            <View key={`${addon}_${quantity}`}>
                                                <Text style={{ paddingLeft: 8 }}>- {addon}: {quantity} </Text>
                                                {item.data.addons.map(addonItem => (
                                                    addonItem.name === addon &&
                                                    <Text key={`${addonItem.name}_${addonItem.price}`} style={{ paddingLeft: 24 }}>- {addonItem.price} B</Text>
                                                ))}
                                            </View>
                                        )}
                                    />



                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: 100 }}>
                                <View style={styles.quantityButtonAdd} onPress={() => handleQuantityChange(item.data.name, 1)}>
                                    <Text style={{color: "#ffffff"}}>{item.quantity}</Text>
                                </View>
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
                        placeholder="Promo Code..."
                    />
                    <TouchableOpacity style={{ backgroundColor: '#6E0387', width: 65, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
                        <Text style={{ color: '#ffffff' }}>Apply</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
            <View style={styles.containerConList}>
                <View style={styles.monList}>
                    <Text style={styles.monListItemText}>Subtotal</Text>
                    <Text style={styles.monListItemText}>{subtotal} Bath</Text>
                </View>
                <View style={styles.monList}>
                    <Text style={styles.monListItemText}>Tax and Fees</Text>
                    <Text style={styles.monListItemText}>{tax} Bath</Text>
                </View>
                <View style={styles.monList}>
                    <Text style={styles.monListItemText}>Delivery</Text>
                    <Text style={styles.monListItemText}>15 Bath</Text>
                </View>
                <View style={styles.monList}>
                    <Text style={styles.monListItemText}>Total</Text>
                    <Text style={styles.monListItemText}>{total} Bath</Text>
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={styles.checkOut}>
                    <Text style={{ color: '#ffffff' }}>CHECKOUT</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};


export default Cart

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#f7e6ff',
        flex: 1
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
        backgroundColor: '#f7e6ff'
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
        gap: 16,
        marginBottom: 16
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
    },
    checkOut: {
        // position: 'fixed',
        // top: 200, 
        backgroundColor: '#6E0387',
        width: 250,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    }
})
