import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OrderHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Order</Text>
      <View style={{justifyContent:'center',alignItems: 'center'}}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.upcomingButton]}>
            <Text style={[styles.buttonText, styles.boldText]}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button]}>
            <Text style={[styles.buttonText, styles.boldText, styles.historyButtonText]}>History</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.orderInfoContainer}>
        <Text style={styles.restaurantName}>Starbuck</Text>
        <Text style={styles.deliveryTime}>Delivery Time: 12:00 PM</Text>
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'white' }]}>
            <Text style={[styles.actionButtonText, styles.boldText, styles.cancelText]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'purple' }]}>
            <Text style={[styles.actionButtonText, styles.boldText]}>Track Order</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.orderInfoContainer}>
        <Text style={styles.restaurantName}>Subway</Text>
        <Text style={styles.deliveryTime}>Delivery Time: 1:00 PM</Text>
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'white' }]}>
            <Text style={[styles.actionButtonText, styles.boldText, styles.cancelText]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'purple' }]}>
            <Text style={[styles.actionButtonText, styles.boldText]}>Track Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#f7e6ff',
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // เปลี่ยนจาก 'center' เป็น 'space-between'
    alignItems: 'center', // เพิ่มบรรทัดนี้
    width: 240,
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 10, // เพิ่มบรรทัดนี้
  },
  button: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 100,
    width: 120,
    alignItems: 'center',
  },
  upcomingButton: {
    backgroundColor: 'purple',
  },
  historyButton: {
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'white',
  },
  boldText: {
    fontWeight: 'bold',
  },
  actionButtonText: {
    color: 'white',
  },
  historyButtonText: {
    color: 'purple',
  },
  cancelText: {
    color: 'purple', // เปลี่ยนเป็นสีม่วง
    fontWeight: 'bold', // เพิ่ม fontWeight เป็น bold
  },
  orderInfoContainer: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    padding: 20,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  deliveryTime: {
    marginBottom: 20,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    padding: 10,
    borderRadius: 30,
    width: '45%',
    alignItems: 'center',
  },
});

export default OrderHistoryScreen;