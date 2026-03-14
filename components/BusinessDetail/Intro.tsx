import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function intro({ business }) {
  const router = useRouter();
  return (
    <View>
      <View style={styles.subContainer}> 
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color="white" />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={40} color="white" />
      </View>

      <Image source={{ uri: business.imageUrl }} style={styles.imageStyle} />

      <View style={styles.subContainer2}>
        <Text style={styles.businessName}>{business.name}</Text>
        <Text style={styles.businessAddress}>{business.address}</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  subContainer: {
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
  },
  imageStyle: {
    width: '100%',
    height: 340,
  },
  subContainer2: {
    padding: 20,
    marginTop: -20, // l'element va remonter de 20px pour se superposer à l'image
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  businessName: {
    fontSize: 26,
    fontFamily: 'outfit-bold',
  },
  businessAddress: {
    fontFamily: 'outfit',
    fontSize: 18,
  }
})