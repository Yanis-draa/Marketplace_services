import { Colors } from '@/constants/theme';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { db } from '../../configs/FirebaseConfig';

export default function BusinessListByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      navigation.setOptions({ headerShown: true, title: category });
      getBusinessList();
    }
  }, [category]);

  const getBusinessList = async () => {
    setLoading(true);

    const q = query(
      collection(db, 'BusinessList'),
      where('category', '==', category)
    );

    const querySnapshot = await getDocs(q);

    // ✅ Construire le tableau complet et setState une seule fois
    const businesses = querySnapshot.docs.map(doc => ({
      id: doc.id,      // <-- document ID Firebase
      ...doc.data()
    }));

    setBusinessList(businesses);
    setLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: '60%' }}
          size="large"
          color={Colors.PRIMARY}
        />
      ) : businessList.length > 0 ? (
        <FlatList
          data={businessList}
          keyExtractor={(item) => item.id}
          onRefresh={getBusinessList}
          refreshing={loading}
          renderItem={({ item }) => <BusinessListCard business={item} />}
        />
      ) : (
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'outfit-bold',
            color: Colors.GRAY,
            textAlign: 'center',
            marginTop: '50%',
          }}
        >
          No Business Found
        </Text>
      )}
    </View>
  );
}