import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, FlatList } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import AddressContext from './AddressContext';
import { ListItem } from '@rneui/base';


const NewAddress = (props) => {
    const { updateDataAdd } = useContext(AddressContext)

    const [addressName, setAddressName] = useState();
    const [mobileNum, setMobileNum] = useState();
    const [address1, setAddress1] = useState();
    const [address2, setAddress2] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [amphures, setAmphures] = useState([]);
    const [tombon, setTombon] = useState([]);

    // useEffect(() => {
    //     fetch('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json')
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             console.log('fetch Successful');
    //             setData(data)
    //             setProvinces(data);
    //             setAmphures(data.map(item => item.amphure).flat());
    //             setTombon(data.map(item => item.amphure).flat().map(item => item.tambon).flat())
    //             setIsLoading(false);
    //         })
    //         .catch(error => {
    //             console.error('Fetch error:', error);
    //         });
    // }, []);
    // let bangkok = data.filter(item => item.name_en === "Bangkok")
    // console.log(bangkok);
    // // bangkok-------------------------------
    // let bangkok_amp = bangkok.map(item => item.amphure).flat();
    // console.log(bangkok_amp);
    // // amp-----------------------------------
    // let KhetPhraNakhon = bangkok_amp.filter(item => item.name_en === "Khet Phra Nakhon")
    // console.log(KhetPhraNakhon);
    // // khet----------------------------------
    // let tambon = KhetPhraNakhon.map(item => item.tambon).flat()
    // console.log(tambon)
    // // tambon--------------------------------
    // let final = tambon.map(item => item.name_en);
    // console.log(final)
    // console.log(data.map(item => item.amphure).flat())

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} color="#5500dc" />
            </View>
        )
    }
    const handleSave = () => {
        updateDataAdd({
            addressName: addressName
        });
        props.navigation.navigate('Home');
    }
    useEffect(() => {
        
    })

    const selectProvinces = (provincess) => {
        setAmphures(provinces.filter(f => f.name_th === provincess).map(i => i.amphure).flat().map(item => item.name_th));
    }
    console.log(amphures)
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <FlatList
                    data={provinces}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => selectProvinces(item.name_th)}>
                            {/* {console.log(item.name_th)} */}
                            <Text>{index + 1}: {item.name_th}</Text>
                        </TouchableOpacity>
                    )}
                />
                <FlatList
                    data={amphures}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                                <TouchableOpacity>
                                    {/* {console.log(item.name_th)} */}
                                    <Text>{index + 1}: {item.name_th}</Text>
                                </TouchableOpacity>
                    )}
                />
                {/* <FlatList
                    data={provinces}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => selectProvinces(item)}>
                            <Text>{item.name_th}</Text>
                        </TouchableOpacity>
                    )}
                />

                <FlatList
                    data={amphures}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <Text>{item.name_th}</Text>
                        </TouchableOpacity>
                    )}
                />

                <FlatList
                    data={tombon}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.name_th}</Text>
                        </View>
                    )}
                /> */}

            </View>
            {/* <Text>{amp.flat().map(item => item.name_en)}</Text> */}
            {/* <View style={styles.head}>
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
            <Text style={styles.txt}>ที่อยู่ปัจจุบันต่อ</Text>
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
            </View> */}
        </View>
    )
}

export default NewAddress

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 24,
        // backgroundColor: "#f7e6ff"
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