import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { deleteDoc } from 'firebase/firestore';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function intro({ business }) {
  const router = useRouter();
  const onDelete = () => {
    Alert.alert('Do you want to Delete?','Do you really want to Delete this business ?',[
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteBusiness()
      }
    ])
  }
  const deleteBusiness = async () => {
    console.log("Delete Business")
    await deleteDoc(doc(db,'BusinessList'))
  }
  return (
    <View>
      <View style={styles.subContainer}> 
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color="white" />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={40} color="white" />
      </View>

      <Image source={{ uri: business.imageUrl }} style={styles.imageStyle} />

      <view style={styles.container2}>
        <View style={styles.subContainer3}>
          <Text style={styles.businessName}>{business.name}</Text>
          <Text style={styles.businessAddress}>{business.address}</Text>
        </View>
        <TouchableOpacity onPress={() => onDelete()}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
        
      </view>

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
  container2: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    marginTop: -20, // l'element va remonter de 20px pour se superposer à l'image
    justifyContent: 'space-between',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  subContainer3: {
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