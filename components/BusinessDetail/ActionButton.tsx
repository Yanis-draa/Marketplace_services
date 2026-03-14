import React from 'react';
import { FlatList, Image, Linking, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ActionButton({ business }) {

  // Créer un tableau d'objets pour les boutons d'action au lieu de créer chaque bouton manuellement

  const actionButtonMenu = [
    {
      id: 1,
      name: 'Appeler',
      icon: require('./../../assets/images/call.png'),
      url: `tel:${business?.contact}`
    },
    {
      id: 2,
      name: 'Localisation',
      icon: require('./../../assets/images/pin.png'),
      // url: `google_maps://?q=${business?.address}`
    },
    {
      id: 3,
      name: 'Site Web',
      icon: require('./../../assets/images/web.png'),
      url: business?.website
    },
    {
      id: 4,
      name: 'Partager',
      icon: require('./../../assets/images/share.png'),
      url: business?.website
    }
  ];

  const OnPressHandle = (item) => {
    if (item.name =='Partager') {

      Share.share({
        message: business?.name+"\n Address:"+business?.address+"\n Find more details on Business Marketplace App by yanis !",
      })
      return;
    }
    Linking.openURL(item?.url);
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={actionButtonMenu}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              OnPressHandle(item);
            }}
            style={{
              alignItems: 'center',
            }}
          >
            <Image source={item?.icon}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text style={styles.buttonText}>{item?.name}</Text>
            
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
    },
    buttonText: {
        fontFamily: 'outfit-medium',
        marginTop: 3,
    }

})