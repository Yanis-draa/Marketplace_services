import { db } from '@/configs/FirebaseConfig';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CategoryItem from './CategoryItem';

export default function Category( {explore = false, onCategorySelect} ) {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
      setCategoryList([]);

      const q = query(collection(db, 'Category'));
      const querySnapshot = await getDocs(q);

      const categories = [];
      querySnapshot.forEach((doc) => {
        categories.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setCategoryList(categories);
    } catch (error) {
      console.log('Erreur lors du chargement des catégories:', error);
    }
  };

  const onCategoryPressHandler = (item) => {
    if (!explore) {
      router.push('/businesslist/'+item.name);
    } else {
      onCategorySelect(item.name);
    }
  }

  return (
    <View>
      {!explore &&(
        <View style={styles.container}>
          <Text style={styles.title}>Category</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>
      )}

      <FlatList
        horizontal
        data={categoryList}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20 }}
        renderItem={({ item }) => (
          <CategoryItem
            category={item}
            onCategoryPress={( category ) =>
              onCategoryPressHandler(item)
            }
          />
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
  },
  viewAll: {
    color: Colors.PRIMARY,
    fontFamily: 'outfit-medium',
  },
});
