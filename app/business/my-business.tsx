import BusinessListCard from '@/components/Explore/BusinessListCard';
import { Colors } from '@/constants/theme';
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { db } from './../../configs/FirebaseConfig';

export default function MyBusiness() {
  
  const {user} = useUser()
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'My Business',
      headerStyle: {
        backgroundColor: Colors.PRIMARY
      }

    })
    user&&GetUserBusiness()
  },[user])

  // Used to get business list by user email
  const GetUserBusiness = async() => {
    setLoading(true)
    setBusinessList([])
    const q = query(collection(db, 'BusinessList'), where('userEmail','==',user?.primaryEmailAddress?.emailAddress))

    const querySnapshpt = await getDocs(q)
    querySnapshpt.forEach((doc) => {
      console.log(doc.data())
      setBusinessList(prev => [...prev, {id: doc.id, ...doc.data()}])
    })
    setLoading(false)
    
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Business</Text>
      <FlatList 
        data={businessList}
        onRefresh={GetUserBusiness}
        refreshing={loading}
        renderItem={({item, index}) => (
          <BusinessListCard business={item} key={index} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 30
  }

  
})