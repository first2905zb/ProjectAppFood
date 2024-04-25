import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Sidebar = (props) => {
    return (
        <View style={styles.container}>
            <View style={{ padding: 16 }}>
                <Image source={require('../assets/profile.jpg')} style={styles.profile} />
            </View>
            <View>
                <Text style={{ fontSize: 20, fontWeight: "100", color: "#000000" }}>แงวซ่า</Text>
                <Text>Meowza@gmail.com</Text>
            </View>
            <View style={{marginTop: 16}}>
                <TouchableOpacity style={styles.ll} onPress={() => props.navigation.navigate('Order')}>
                    <Icon name={'list-alt'} size={20}></Icon>
                    <Text style={{left: 8, color: '#000'}}>My Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ll} onPress={() => props.navigation.navigate('Profile')}>
                    <Icon name={'user'} size={20}></Icon>
                    <Text style={{left: 14, color: '#000'}}>My Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ll} onPress={() => props.navigation.navigate('Order')}>
                    <Icon name={'map-pin'} size={20}></Icon>
                    <Text style={{left: 18, color: '#000'}}>Delivery Address</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ll} onPress={() => props.navigation.navigate('Order')}>
                    <Icon name={'money'} size={20}></Icon>
                    <Text style={{left: 10, color: '#000'}}>Payment Methods</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ll} onPress={() => props.navigation.navigate('Order')}>
                    <Icon name={'gears'} size={20}></Icon>
                    <Text style={{left: 14, color: '#000'}}>Setting</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Sidebar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 100
    },
    ll: {
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ddd'
    }
})