import { db } from '@/configs/FirebaseConfig';
import { Colors } from '@/constants/theme';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PopularBusinessCard from './PopularBusinessCard';


export default function PopularBusiness() {

  const [businessList, setBusinessList] = React.useState([]);

  useEffect(()=>{
    GetBusinessList();
  }, [])

  const GetBusinessList = async () => {
    
    setBusinessList([]); // Réinitialiser la liste avant de charger de nouvelles données
    const q = query(collection(db,'BusinessList'),limit(10));
    const querySnapshot = await getDocs(q);

    querySnapshot. forEach((doc)=>{
      console.log (doc.data());
      setBusinessList((prev)=>[...prev, { id: doc.id, ...doc.data() }]);
    });
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Popular Business</Text>
        <Text style={styles.viewAll}> View All</Text>
      </View>

      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index})=>(
          <PopularBusinessCard business={item} key={index} />
        )}
      />
    
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    // paddingLeft: 20,
    // paddingRight: 20,
    padding: 20,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
  },
  viewAll: {
    color: Colors.PRIMARY,
    fontFamily: 'outfit-medium',
  }

})