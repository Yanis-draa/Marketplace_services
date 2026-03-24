import { Colors } from '@/constants/theme';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from 'expo-router';
import { query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';


export default function AddBusiness() {
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null); 

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add New Business',
      headerShown: true,
    });
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) { 
      setImage(result.assets[0].uri); 
    }
  };

  const GetCategoryList = () => {
    const q = query(collection(db))
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }}>Add New Business</Text>
      <Text style={{ fontFamily: 'outfit', color: Colors.GRAY }}>
        Fill all details in order to add new business
      </Text>

      <TouchableOpacity style={{ marginTop: 20 }} onPress={onImagePick}> 
        {!image ? (
          <Image
            source={require('../../assets/images/placeholder.png')}
            style={{ width: 100, height: 100 }}
          />
        ) : (
          <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 15 }} />
        )}
      </TouchableOpacity>

      <View>
        <TextInput placeholder='Nom'
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: '#fff',
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: 'outfit'

          }}
        />
        <TextInput placeholder='Adresse'
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: '#fff',
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: 'outfit'

          }}
        />
        <TextInput placeholder='Contact'
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: '#fff',
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: 'outfit'

          }}
        />
        <TextInput placeholder='Email'
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: '#fff',
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: 'outfit'

          }}
        />
        <TextInput placeholder='About' multiline numberOfLines={5}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: '#fff',
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: 'outfit',
            height: 100

          }}
        />
        <View>
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
              { label: '', value: '' },


            ]}
          />

         
        </View>
      </View>
    </View>
  );
}