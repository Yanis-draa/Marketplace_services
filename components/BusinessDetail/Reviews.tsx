import { Colors } from '@/constants/theme';
import { useUser } from '@clerk/clerk-expo';
import { Image } from 'expo-image';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { db } from '../../configs/FirebaseConfig';

export default function Reviews({ business }: { business: any }) {
  const [rating, setRating] = React.useState(4);
  const [userInput, setUserInput] = React.useState('');
  const { user } = useUser();

  const onSubmit = async () => {
    if (!business?.id || !user) return;

    const docRef = doc(db, 'BusinessList', business.id);

    try {
      await updateDoc(docRef, {
        reviews: arrayUnion({
          rating: rating,
          comment: userInput,
          userName: user?.fullName,
          userImage: user?.imageUrl,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: new Date(),
        }),
      });

      ToastAndroid.show('Comment ajouté avec succès', ToastAndroid.BOTTOM);

      // Reset après envoi
      setUserInput('');
      setRating(4);
    } catch (error) {
      console.log('Erreur:', error);
      ToastAndroid.show('Erreur lors de l’ajout', ToastAndroid.BOTTOM);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avis</Text>

      {/* Ajouter un avis */}
      <View>
        <Rating
          showRating={false}
          imageSize={20}
          startingValue={rating}
          onFinishRating={(value) => setRating(value)}
          style={{ paddingVertical: 10 }}
        />

        <TextInput
          placeholder="Écrivez votre avis ici..."
          value={userInput}
          onChangeText={(value) => setUserInput(value)}
          multiline
          style={styles.input}
        />

        <TouchableOpacity
          disabled={!userInput || !user}
          onPress={onSubmit}
          style={[
            styles.submitButton,
            { opacity: !userInput || !user ? 0.5 : 1 },
          ]}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Affichage des avis */}
      <View>
        {business?.reviews?.map((item: any, index: number) => (
          <View style={styles.reviewCard} key={item.userEmail + index}>
            <Image
              source={{ uri: item.userImage }}
              style={styles.userImage}
            />

            <View style={styles.reviewContainer}>
              <Text style={styles.userName}>{item.userName}</Text>

              <Rating
                readonly
                startingValue={item.rating}
                imageSize={18}
                style={{ alignItems: 'flex-start' }}
              />

              <Text style={styles.comment}>{item.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.GRAY,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  submitButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontFamily: 'outfit',
    textAlign: 'center',
  },
  reviewCard: {
    flexDirection: 'row',
    gap: 10,
    // alignItems: 'flex-start',
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 15,
    marginTop: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 99,
  },
  reviewContainer: {
    flex: 1,
    gap: 5,
  },
  userName: {
    fontFamily: 'outfit-medium',
  },
  comment: {
    fontFamily: 'outfit',
  },
});