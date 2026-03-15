import Category from '@/components/Home/Category';
import { Colors } from '@/constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function explore() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explorez Davantage</Text>
      {/* Search bar */}
      <View style={styles.containerSearchBar}>
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder='Search...' style={{fontFamily:'outfit', fontSize:16}}/>
      </View>
      {/* Categories */}
      <Category 
        explore={true}  
        onCategorySelect={(category) => {
          console.log("Selected category:", category.name);
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: 'outfit-bold',
  },
  containerSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    marginTop: 15,
    borderRadius: 8,
    borderColor: Colors.GRAY,
    borderWidth: 1,
  }

})