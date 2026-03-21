import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { Image, Text, View } from 'react-native';

export default function UserIntro() {
  const { user } = useUser();
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
    }}>
      <Image
        source={{ uri: user?.imageUrl }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 99,
        }} 
      />
      <Text style={{ fontSize: 20, fontFamily: 'outfit-bold' }}>{user?.fullName}</Text>
      <Text style={{ fontFamily: 'outfit', fontSize: 16 }}>{user?.emailAddresses[0]?.emailAddress}</Text>
    </View>
  )
}