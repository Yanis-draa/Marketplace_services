import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { db } from './../../configs/FirebaseConfig';

export default function MyBusiness() {
  
  const {user} = useUser()
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    user&&GetUserBusiness()
  },[user])

  // Used to get business list by user email
  const GetUserBusiness = async() => {
    const q = query(collection(db, 'BusinessList'), where('userEmail','==',user?.primaryEmailAddress?.emailAddress))

    const querySnapshpt = await getDocs(q)
    querySnapshpt.forEach((doc) => {
      console.log(doc.data())
      setBusinessList(prev => [...prev, {id: doc.id, ...doc.data()}])
    })
    
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Business</Text>
      <FlatList 
        data={businessList}
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