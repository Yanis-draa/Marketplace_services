import { Colors } from '@/constants/theme';
import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function AddBusiness() {

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add New Business',
      headerShown: true,
    })
  },[])

  return (
    <View style={{padding: 20}}>
      <Text style={{fontFamily: 'outfit-bold', fontSize: 25}}>Add New Business</Text>
      <Text style={{fontFamily: 'outfit', color: Colors.GRAY}}>Fill all details in order to add new business </Text>
    </View>
  )
}