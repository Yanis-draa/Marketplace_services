import About from '@/components/BusinessDetail/About';
import ActionButton from '@/components/BusinessDetail/ActionButton';
import Reviews from '@/components/BusinessDetail/Reviews';
import { Colors } from '@/constants/theme';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text } from 'react-native';
import Intro from '../../components/BusinessDetail/Intro';
import { db } from '../../configs/FirebaseConfig';

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (businessid) {
      getBusinessDetailById(businessid);
    }
  }, [businessid]);

  const getBusinessDetailById = async (id) => {
    setLoading(true);
    const docRef = doc(db, 'BusinessList', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setBusiness({ id: docSnap.id, ...docSnap.data() });
    } else {
      console.log('No such document!');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <ActivityIndicator
        style={{ marginTop: '70%' }}
        size="large"
        color={Colors.PRIMARY}
      />
    );
  }

  if (!business) {
    return (
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'outfit-bold',
          color: Colors.GRAY,
          textAlign: 'center',
          marginTop: '50%',
        }}
      >
        Business not found
      </Text>
    );
  }

  return (
    // style={{ flex: 1 }}
    <ScrollView>
      {/* Intro Section */}
      <Intro business={business} />
      {/* Action Buttons */}
      <ActionButton business={business} />
      {/* About Section */}
      <About business={business} />
      {/* Reviews Section */}
      <Reviews business={business} />
    </ScrollView>
  );
}