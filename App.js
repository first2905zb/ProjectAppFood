import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Order from './Screen/Order'
import Massage from './Screen/Massage'
import Menu from './Screen/Menu'
import Home from './Screen/Home'
import Random from './Screen/Random'
import Finrandom from './Screen/Finrandom'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import FirstRandom from './Screen/FirstRandom'
import FoodDetails from './Screen/FoodDetails'
import Cart from './Screen/Cart'



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Random" component={FirstRandom} options={{ headerShown: false}} />
      <Stack.Screen name="Random1" component={Random} options={{title: "Random"}}/>
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Finrandom" component={Finrandom} />
      <Stack.Screen name="FoodDetails" component={FoodDetails} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='หน้าแรก' component={StackHome} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name='คำสั่งซื้อ' component={Order} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-bag" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name='กล่องข้อความ' component={Massage} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell" color={color} size={size} />
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
