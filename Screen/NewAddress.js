import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'


const NewAddress = (props) => {
    const [addNew, setAddnew] = useState({
        addressName: '', mobileNum: '',
        state: '', city: '', street: ''
    });
    const [addressName, setAddressName] = useState();
    const [mobileNum, setMobileNum] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState();
    const [street, setStreet] = useState();

    const handleSave = () => {
        setAddnew({
            addressName: addressName, mobileNum: mobileNum, state: state,
            city: city, street: street
        });
        props.navigation.navigate('Home',{addNew});
    }

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Add New address</Text>
            </View>
            <Text style={styles.txt}>Address name</Text>
            <TextInput
                style={styles.input}
                placeholder='e.g. Home, Office School'
                onChangeText={setAddressName}
                value={addressName}
            />
            <Text style={styles.txt}>Mobile number</Text>
            <TextInput
                style={styles.input}
                placeholder='Phone number...'
                onChangeText={setMobileNum}
                value={mobileNum}
            />
            <Text style={styles.txt}>State</Text>
            <TextInput
                style={styles.input}
                onChangeText={setState}
                value={state}
            />
            <Text style={styles.txt}>City</Text>
            <TextInput
                style={styles.input}
                onChangeText={setCity}
                value={city}
            />
            <Text style={styles.txt}>Street(Include house number)</Text>
            <TextInput
                style={styles.input}
                placeholder='Street'
                onChangeText={setStreet}
                value={street}
            />
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={styles.save} onPress={() => handleSave()}>
                    <Text style={{ color: '#ffffff' }}>SAVE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NewAddress

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#f7e6ff"
    },
    head: {
        paddingBottom: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        marginBottom: 32,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingLeft: 16,
    },
    txt: {
        fontSize: 14,
        color: 'black',
        marginBottom: 8,
    },
    save: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "#6E0387"
    }
})