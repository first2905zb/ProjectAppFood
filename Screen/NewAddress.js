import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import AddressContext from './AddressContext';


const NewAddress = (props) => {
    const { updateData } = useContext(AddressContext)

    const [addressName, setAddressName] = useState();
    const [mobileNum, setMobileNum] = useState();
    const [address1, setAddress1] = useState();
    const [address2, setAddress2] = useState();

    const handleSave = () => {
        updateData({
            addressName: addressName, mobileNum: mobileNum, address1: address1,
            adrress2: address2
        });
        props.navigation.navigate('Home');
    }   

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>เพิ่มที่อยู่ใหม่</Text>
            </View>
            <Text style={styles.txt}>ชื่อที่อยู๋</Text>
            <TextInput
                style={styles.input}
                placeholder='บ้าน, ที่ทำงาน, โรงเรียน'
                onChangeText={setAddressName}
                value={addressName}
            />
            <Text style={styles.txt}>เบอร์โทรศัพท์</Text>
            <TextInput
                style={styles.input}
                placeholder='หมายเลขโทรศัพท์...'
                onChangeText={setMobileNum}
                value={mobileNum}
            />
            <Text style={styles.txt}>ที่อยู่ปัจจุบัน</Text>
            <TextInput
                style={styles.input}
                placeholder='บ้านเลขที่ ซอย ถนน...'
                onChangeText={setAddress1}
                value={address1}
            />
            <Text style={styles.txt}>Street(Include house number)</Text>
            <TextInput
                style={styles.input}
                placeholder='แขวง เขต จังหวัด รหัสไปรษณีย์...'
                onChangeText={setAddress2}
                value={address2}
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