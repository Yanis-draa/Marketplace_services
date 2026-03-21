import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function BusinessListCard( { business } ) {
  const router = useRouter();
  return (
    <TouchableOpacity 
      onPress={() => {
        router.push('/businessdetail/'+business?.id);
      }}
      style={{
        backgroundColor: '#fff',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginTop: 15,
      }}
    >
      <Image
        source={{ uri: business?.imageUrl }}
        style={{
          width: '100%',
          height: 150,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }} 
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontFamily: 'outfit-bold' }}>{business?.name}</Text>
        <Text style={{ color: Colors.GRAY, fontFamily: 'outfit' }}>{business?.address}</Text>
      </View>
    </TouchableOpacity>
  )
}
    
