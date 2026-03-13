import { Colors } from '@/constants/theme';
import { useUser } from '@clerk/clerk-expo';
import { Image } from 'expo-image';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { db } from '../../configs/FirebaseConfig';




export default function Reviews({ business }: { business: any }) {
  const [rating, setRating] = React.useState(4);
  const [userInput, setUserInput] = React.useState('');
  const {user} = useUser();
  
  const onSubmit = async () => {
    const docRef = doc(db, 'BusinessList', business?.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        comment: userInput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      })

    })
    ToastAndroid.show('Comment Added Successfully', ToastAndroid.BOTTOM)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avis</Text>
      <View>
        <Rating
          showRating={false}
          imageSize={20}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput 
          placeholder='Ecriver votre avis ici...'
          numberOfLines={4}
          onChangeText={(value)=> setUserInput(value)}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.GRAY,
            marginBottom: 20,
            textAlignVertical: 'top',
          }}
        />
        <TouchableOpacity 
          disabled={!userInput}
          onPress={onSubmit}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      
      {/* Display Previous Reviews */}
      <View>
        {business?.reviews?.map((item, index) => (
          <View key={index} >
            <Image source={{ uri: item.userImage }} style={{ width: 50, height: 50, borderRadius: 99 }} />
            <View>
              <Text>{item.userName}</Text>
              <Text>{item.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
  },
  submitButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#fff',
    fontFamily: 'outfit',
    textAlign: 'center',
  }

});