import React from 'react'
import { Text, View } from 'react-native'


export default function About({ business }) {
  return (
    <View style={{
      padding: 20,
      backgroundColor: '#fff',
    }}>
      <Text style={{
        fontSize: 20,
        fontFamily: 'outfit-bold',
      }}>À propos</Text>
      <Text style={{
        lineHeight: 25,
        fontFamily: 'outfit',
      }}>
        {business?.about}
      </Text>
    </View>
  )
}