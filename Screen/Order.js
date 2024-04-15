import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import OrderContext from './OrderContext';

const OrderHistoryScreen = () => {
  const { datasOrder } = useContext(OrderContext)
  console.log(datasOrder);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Order</Text>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.upcomingButton]}>
            <Text style={[styles.buttonText, styles.boldText]}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button]}>
            <Text style={[styles.buttonText, styles.boldText, styles.historyButtonText]}>History</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={datasOrder}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderInfoContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={{ uri: item.bg }} style={{ width: 60, height: 60, borderRadius: 10, marginRight: 8 }} />
              <View>
                <Text style={styles.restaurantName}>{item.name}</Text>
                <Text style={styles.deliveryTime}>Delivery Time: 12:00 PM</Text>
              </View>
              <Text>{item.price}</Text>
            </View>
            <View style={styles.actionButtonContainer}>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'white' }]}>
                <Text style={[styles.actionButtonText, styles.boldText, styles.cancelText]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'purple' }]}>
                <Text style={[styles.actionButtonText, styles.boldText]}>Track Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 240,
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 10,
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
    color: 'purple',
    fontWeight: 'bold',
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