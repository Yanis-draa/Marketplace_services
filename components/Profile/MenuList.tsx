import { Colors } from '@/constants/theme';
import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';


export default function MenuList() {

  const menuItems = [
    {
      id: 1,
      name: 'Add Business',
      icon: require('../../assets/images/add.png'),
    },
    {
      id: 2,
      name: 'My Businesses',
      icon: require('../../assets/images/business-and-trade.png'), 
    },
    {
      id: 3,
      name: 'Share App',
      icon: require('../../assets/images/share_1.png'), 
    },
    {
      id: 4,
      name: 'Log Out',
      icon: require('../../assets/images/logout.png'), 
    },
  ];
  return (
    <View style={{ marginTop: 50 }}>
      <FlatList 
        data={menuItems}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View
           style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10, 
            flex: 1,
            padding: 10, 
            borderWidth: 1,
            backgroundColor: '#fff',
            borderRadius: 15,
            margin: 10,
            borderColor: Colors.PRIMARY,
          }}>
            <Image
              source={item.icon}
              style={{ width: 50, height: 50 }}
            />
            <Text style={{fontFamily: 'outfit-medium', fontSize: 16, flex: 1}}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  )
}