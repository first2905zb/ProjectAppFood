import { ImageBackground, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { ListItem } from '@rneui/themed';
import React, { useState } from 'react'

const Menu = (props) => {
  const data = props.route.params.item;
  console.log(data)
  // console.log(data.storeDetails);
  return (
    <ScrollView>
      <ImageBackground source={{ uri: data.bgimage }} style={styles.head}>
        <View style={styles.wrapTxt}>
          <Text style={styles.headTxt}>{data.storeName}</Text>
          <Text style={styles.totype}>25 Type of MEALS</Text>
        </View>
      </ImageBackground>
      {data.storeDetails.map((item, index) => (
        <ListItem key={index} containerStyle={{ backgroundColor: '#f7e6ff' }}>
          <ListItem.Content style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity style={styles.selectMenu} onPress={() => props.navigation.navigate("FoodDetails", {item})}>
                <ImageBackground source={{ uri: item.image }} style={styles.menuImg} >
                  <View style={styles.price}>
                    <Text style={{fontWeight: "bold", color: "purple"}}>{item.price} B</Text>
                  </View>
                </ImageBackground>
                <View style={styles.botTxt}>
                  <ListItem.Title style={{fontWeight: 'bold', fontSize: 22}}>{item.name}</ListItem.Title>
                  <ListItem.Title>{item.details}</ListItem.Title>
                </View>
              </TouchableOpacity>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>

  )
}

export default Menu

const styles = StyleSheet.create({
  head: {
    height: 222
  },
  headTxt: {
    color: '#ffffff',
    fontSize: 45,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10
  },
  wrapTxt: {
    justifyContent: 'flex-end',
    alignItems: "flex-start",
    height: 222,
    paddingVertical: 8,
    paddingLeft: 16
  },
  totype: {
    color: '#ffffff',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10
  },
  body: {
    flex: 0.7,
  },
  selectMenu: {
    borderWidth: 1,
    borderRadius: 30,
    height: 255,
    width: 350,
    borderColor: "#fff2e6",
    backgroundColor: "#ffffff",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  menuImg: {
    width: 350,
    height: 160,
  },
  botTxt: {
    paddingTop: 16,
    paddingBottom: 8,
    paddingLeft: 16
  },
  price: {
    margin: 16,
    marginLeft: 24,
    backgroundColor: "#ffffff",
    width: 60,
    height: 30,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 20
  },
})
