import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { db } from '../../configs/FirebaseConfig';

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    getSliderList();
  }, []);

  // Récupérer la liste des sliders depuis Firestore
  const getSliderList = async () => {
    const q = query(collection(db, 'Slider'));
    const querySnapshot = await getDocs(q);

    const list = [];
    querySnapshot.forEach((doc) => {
      list.push({
        id: doc.id,       // clé unique pour FlatList
        ...doc.data(),    // contient imageUrl et name
      });
    });

    setSliderList(list);
  };

  return (
    <View>
      <Text style={styles.title}>#Special for you</Text>

      <FlatList
        data={sliderList}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 20 }}
        keyExtractor={(item) => item.id}   // clé unique
        renderItem={({ item }) =>
          item.imageUrl ? (                 // ne rien afficher si imageUrl manquante
            <Image source={{ uri: item.imageUrl }} style={styles.imgList} />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingLeft: 20,
    paddingTop: 20,
    marginBottom: 5,
    fontFamily: 'outfit-bold',
  },
  imgList: {
    width: 300,
    height: 160,
    borderRadius: 15,
    marginRight: 15,
  },
});
