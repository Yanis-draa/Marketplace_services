import ExploreBusinessList from '@/components/Explore/ExploreBusinessList';
import Category from '@/components/Home/Category';
import { db } from '@/configs/FirebaseConfig';
import { Colors } from '@/constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';


export default function explore() {

  const [businessList, setBusinessList] = React.useState([]);

  const GetBusinessByCategory = async (category) => {
    setBusinessList([]);
    const q = query(collection(db, 'BusinessList'), where('category', '==', category));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };
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
          GetBusinessByCategory(category);
        }}
      />
      {/* Business List */}

      <ExploreBusinessList businessList={businessList}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 35,
    // flex: 1,
    // backgroundColor: 'red'
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