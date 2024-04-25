import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Massage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 30, }}>กล่องข้อความ</Text>
      </View>
      <View style={styles.content}>

      </View>
    </View>
  )
}

export default Massage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  header: {
    marginVertical: 16
  },
  content: {
    flex: 1,
    borderWidth: 0.5,
  },
})