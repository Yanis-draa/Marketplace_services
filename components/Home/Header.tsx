import { useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../../constants/theme';

export default function Header() {

  const {user} = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.leftPart}>
        <Image source={{uri:user?.imageUrl}}
            style={{width:45, height:45, borderRadius:99}}
        
        />
        <View>
            <Text style={{color: "#fff"}}>Welcome,</Text>
            <Text style={{fontSize: 19, fontFamily: 'outfit-medium', color: "#fff"}}>
              {user?.fullName}
            </Text>

            
        </View>
      </View>
      {/* Search Bar */}
      <View style={styles.containerSearchBar}>
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder='Search...' style={{fontFamily:'outfit', fontSize:16}}/>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:20,
        paddingTop:40,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
    },
    leftPart:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
    },
    containerSearchBar:{
      flexDirection:'row',
      alignItems:'center',
      gap:10,
      backgroundColor: "#fff",
      padding:10,
      marginVertical:10,
      marginTop:15,
      borderRadius:8,
    }
})