import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PopularBusinessCard({ business }) {

  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        router.push("/businessdetail/"+business?.id);
      }}
    >
      <Image
        source={{ uri: business?.imageUrl }}
        style={styles.imgBusiness}
      />

      <View style={{ marginTop: 7, gap: 5 }}>
        <Text style={styles.name}>{business?.name}</Text>
        <Text style={styles.address}>{business?.address}</Text>

        <View style={styles.ratingContainer}>
          <View style={styles.ratingSubContainer}>
            <Image
              source={require('../../assets/images/star.png')}
              style={styles.star}
            />
            <Text style={styles.ratingText}>
              {business?.rating ?? 4.5}
            </Text>
          </View>
          <Text style={styles.category}>{business?.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
  },
  imgBusiness: {
    width: 200,
    height: 130,
    borderRadius: 15,
  },
  name: {
    fontFamily: 'outfit-bold',
    fontSize: 17,
  },
  address: {
    fontFamily: 'outfit',
    fontSize: 13,
    color: Colors.GRAY,
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
  category: {
    fontFamily: 'outfit',
    fontSize: 10,
    backgroundColor: Colors.PRIMARY,
    color: '#fff',
    padding: 3,
    borderRadius: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
