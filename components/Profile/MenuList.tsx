import { Colors } from '@/constants/theme';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  Share,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function MenuList() {
  const { signOut } = useAuth();
  const router = useRouter();

  const menuItems = [
    {
      id: 1,
      name: 'Add Business',
      icon: require('../../assets/images/add.png'),
      path: '/business/add-business'
    },
    {
      id: 2,
      name: 'My Businesses',
      icon: require('../../assets/images/business-and-trade.png'),
      path: '/business/my-business'
    },
    {
      id: 3,
      name: 'Share App',
      icon: require('../../assets/images/share_1.png'),
      path: 'share'
    },
    {
      id: 4,
      name: 'Log Out',
      icon: require('../../assets/images/logout.png'),
      path: 'logout'
    },
  ];

  const onMenuClick = (item) => {
    if (item.path === 'logout') {
      signOut();
      return;
    }

    if (item.path === 'share') {
      Share.share({
        message: 'Download the Business Directory App'
      });
      return;
    }

    router.push(item.path);
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onMenuClick(item)}
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 15,
        backgroundColor: '#fff'
      }}
    >
      <Image 
        source={item.icon} 
        style={{ width: 50, height: 50 }} 
      />
      <Text 
        style={{ 
          fontFamily: 'outfit-medium', 
          fontSize: 16, 
          flex: 1, 
          marginLeft: 10 
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ marginTop: 50 }}>
      <FlatList
        data={menuItems}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMenuItem}
      />
    </View>
  );
}