import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-open-maps';
import { SafeAreaView } from 'react-native-safe-area-context'

const test = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
        <MapView></MapView>
    </SafeAreaView>
  )
}

export default test

const styles = StyleSheet.create({})