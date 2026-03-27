import MenuList from '@/components/Profile/MenuList';
import UserIntro from '@/components/Profile/UserIntro';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function profile() {
  return (
    <View style={{
      padding: 20,
      paddingTop: 35,
    }}>
      <Text style={styles.text}>profile</Text>
      {/* User Info */}
      <UserIntro />
      {/* Menu List */}
      <MenuList />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
    fontFamily: 'outfit-bold',
  }
});
