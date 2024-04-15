import { StyleSheet, Text, View, Image, Button, TouchableOpacity, FlatList, Alert, Modal } from 'react-native';
import React, { useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import CartContext from './CartContext';

const FoodDetails = (props) => {
    const { updateData } = useContext(CartContext);
    const [quantity, setQuantity] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleQuantityChange = (change) => {
        const newQuantity = Math.max(0, quantity + change);
        setQuantity(newQuantity);
    };

    // console.log(props.route.params.item)
    const data = props.route.params.item;
    console.log(props.route.params.name)

    const nameNBg = { name: props.route.params.name, bg: props.route.params.bg };
    // console.log(data.addons);
    const closeModal = () => {
        setIsModalVisible(false);
    }
    const gotoCart = () => {
        if (quantity > 0) {
            updateData({ addonQuantities: addonQuantities, quantity: quantity, data: data })
            props.navigation.navigate('Cart', { nameNBg })
        }
        else {
                setIsModalVisible(true);
        }
    }

    const [addonQuantities, setAddonQuantities] = useState({});

    const handleAddonQuantityChange = (addon, change) => {
        const newQuantities = { ...addonQuantities };
        const currentQuantity = newQuantities[addon] || 0;
        const updatedQuantity = Math.max(0, currentQuantity + change);
        newQuantities[addon] = updatedQuantity;
        if (updatedQuantity === 0) {
            delete newQuantities[addon];
        }
        console.log(newQuantities)
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
                        data={data.addons}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                <Text style={{ paddingTop: 8, marginBottom: 8 }}>{item.name}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: 100 }}>
                                    <TouchableOpacity style={styles.quantityButtonSub} onPress={() => handleAddonQuantityChange(item.name, -1)}>
                                        <Text style={{ color: "#6E0387" }}>-</Text>
                                    </TouchableOpacity>
                                    <View style={{ justifyContent: "center", alignItems: 'center' }}>
                                        <Text>{addonQuantities[item.name] || 0}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.quantityButtonAdd} onPress={() => handleAddonQuantityChange(item.name, 1)}>
                                        <Text style={{ color: "#ffffff" }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />

                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.add}
                        onPress={() => gotoCart()}
                    >
                        <View style={styles.cart}>
                            <Icon name='shoppingcart' size={30} color={"#6E0387"} />
                        </View>
                        <Text style={{ paddingRight: 8, color: '#ffffff' }}>Add to chart</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                visible={isModalVisible}
                transparent={true}
            >
                <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }} onPress={closeModal}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#000' }}>ฮั่นแน่!!! ลืมใส่จำนวนนะ</Text>
                        <TouchableOpacity style={{ backgroundColor: '#6E0387', padding: 10, borderRadius: 5 }} onPress={closeModal}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View >
    );
};

export default FoodDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 27,
        paddingHorizontal: 22,
        // backgroundColor: '#f7e6ff',
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
