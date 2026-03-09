import { Colors } from '@/constants/theme';
import { useSSO } from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser';

WebBrowser.maybeCompleteAuthSession(); //Compléter la session OAuth

export default function LoginScreen() {
  const router = useRouter();

  // Précharge le navigateur pour une connexion plus rapide
  useWarmUpBrowser();

  // ✅ Nouveau hook Clerk (remplace useOAuth)
  const { startSSOFlow } = useSSO();

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl: AuthSession.makeRedirectUri({
        scheme: 'yourapp', // ⚠️ Remplace "yourapp" par ton vrai schéma Expo (ex: myapp)
        }),
      });

      // ✅ Si la connexion a réussi, activer la session
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.push('/'); // redirige vers la page d’accueil
      } else {
        console.log('Session non créée — vérifier MFA ou permissions');
      }
    } catch (err) {
      console.error('Erreur OAuth:', JSON.stringify(err, null, 2));
    }
  }, [startSSOFlow]);

  return (
    <View>
      {/* Image d'en-tête */}
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={require('../assets/images/login.png')}
        />
      </View>

      {/* Contenu principal */}
      <View style={styles.container}>
        <Text style={styles.text}>
          Votre Application
          <Text style={{ color: Colors.PRIMARY }}> Ultime D’annuaire D’entreprises </Text>
          Communautaire
        </Text>

        <Text style={styles.subText}>
          Trouvez vos commerces préférés près de chez vous et ajoutez votre propre entreprise à votre communauté
        </Text>

        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={styles.btnText}>Commençons</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('11%'),
  },
  image: {
    width: wp('49%'),
    height: hp('49%'),
    resizeMode: 'contain',
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 6,
  },
  container: {
    backgroundColor: '#fff',
    padding: wp('4.5%'),
    marginTop: -hp('2%'),
  },
  text: {
    fontSize: hp('3%'),
    fontFamily: 'outfit-bold',
    textAlign: 'center',
  },
  subText: {
    fontSize: 15,
    fontFamily: 'outfit',
    textAlign: 'center',
    marginVertical: hp('1.5%'),
    color: Colors.GRAY,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: wp('3.7%'),
    borderRadius: 99,
    marginTop: hp('2%'),
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'outfit',
  },
});
