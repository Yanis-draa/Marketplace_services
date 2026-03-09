import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BusinessListCard({ business }: any) {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push('businessdetail/' + business.id)}>
      <Image source={{ uri: business.imageUrl }} style={styles.imgView} />
      <View style={styles.infoContainer}>
        <Text style={styles.businessName}>{business.name}</Text>
        <Text style={styles.businessAddress}>{business.address}</Text>
        <View style={styles.ratingSubContainer}>
          <Image
            source={require('../../assets/images/star.png')}
            style={styles.star}
          />
          <Text style={styles.ratingText}>
            {business?.rating ?? 4.5}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  container: {
    padding: 10,
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 10,

  },
  imgView: {
    width: 120,
    height: 120,
    borderRadius: 15,
  },
  infoContainer: {
    flex: 1,
    gap: 7,
  },
  businessName: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
  businessAddress: {
    fontFamily: 'outfit', 
    color: Colors.GRAY,
    fontSize: 15,
  },
  ratingSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 5,
  },
  star: {
    width: 15,
    height: 15,
  },
  ratingText: {
    fontFamily: 'outfit',
    marginLeft: 4,
    fontSize: 13,
  },

})