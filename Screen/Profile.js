import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'

const Profile = () => {
    const [name, setName] = useState('แงวซ่า กล้าๆหน่อย');
    const [email, setEmail] = useState('Meowza@gmail.com');
    const [phone, setPhone] = useState('088-999-9898');

    const save = () => {
        Alert.alert(
            'Save!',
            'Edit complete!!!',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
        );
    }
    return (
        <View style={{ flex: 1, padding: 16, backgroundColor: '#f7e6ff' }}>
            <View style={styles.imgCon}>
                <Image source={require('../assets/profile.jpg')} style={styles.profile} />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 8 }}>
                <Text style={{ color: '#000', fontSize: 16 }}>แงวซ่า</Text>
            </View>
            <View style={styles.listIn}>
                <View>
                    <Text style={{ color: '#000' }}>Full name</Text>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder={name}
                />
            </View>
            <View style={styles.listIn}>
                <View>
                    <Text style={{ color: '#000' }}>E-mail</Text>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder={email}
                />
            </View>
            <View style={styles.listIn}>
                <View>
                    <Text style={{ color: '#000' }}>Phone Number</Text>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={setPhone}
                    value={phone}
                    placeholder={phone}
                />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 32 }}>
                <TouchableOpacity style={styles.save} onPress={() => save()}>
                    <Text style={{ color: '#fff' }}>SAVE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    imgCon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 64
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 100
    },
    input: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        padding: 8,
        paddingLeft: 16,
    },
    listIn: {
        paddingVertical: 16,
    },
    save: {
        backgroundColor: "#6E0387",
        width: 250,
        height: 55,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    }
})