import { StyleSheet } from 'react-native'
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
import NewAddress from './Screen/NewAddress'
import { CartProvider } from './Screen/CartContext'
import { AddressContextProvider } from './Screen/AddressContext'
import Sidebar from './Screen/Sidebar'
import Profile from './Screen/Profile'
import { OrderProvider } from './Screen/OrderContext'
import Store from './Screen/Store'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Random" component={FirstRandom} options={{ headerShown: false }} />
      <Stack.Screen name="Random1" component={Random} options={{ headerTitle: '' }} />
      <Stack.Screen name="Menu" component={Menu} options={{ headerTitle: '' }} />
      <Stack.Screen name="Finrandom" component={Finrandom} options={{ headerTitle: '' }} />
      <Stack.Screen name="FoodDetails" component={FoodDetails} options={{ headerTitle: '' }} />
      <Stack.Screen name="Cart" component={Cart} options={{ headerTitle: '' }} />
      <Stack.Screen name="Address" component={NewAddress} options={{ headerTitle: '' }} />
      <Stack.Screen name="Sidebar" component={Sidebar} options={{ headerTitle: '' }} />
      <Stack.Screen name="Order" component={Order} options={{ headerTitle: '' }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerTitle: '' }} />
      <Stack.Screen name="ร้านค้า" component={Store} options={{ headerTitle: '' }} />
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <AddressContextProvider>
      <OrderProvider>
        <CartProvider>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen
                name='หน้าแรก'
                component={StackHome}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="home" color={color} size={size} />
                  ),
                  tabBarActiveTintColor: '#6E0387',
                }}
              />
              <Tab.Screen
                name='คำสั่งซื้อ'
                component={Order}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="shopping-bag" color={color} size={size} />
                  ),
                  tabBarActiveTintColor: '#6E0387',
                }}
              />
              <Tab.Screen
                name='กล่องข้อความ'
                component={Massage}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="bell" color={color} size={size} />
                  ),
                  tabBarActiveTintColor: '#6E0387',
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </CartProvider>
      </OrderProvider>
    </AddressContextProvider>
  )
}

export default App

const styles = StyleSheet.create({})
