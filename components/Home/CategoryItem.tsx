import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/theme';


export default function CategoryItem({ category, onCategoryPress }: any) {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)}>
        <View style={styles.container}>
            <Image source={{uri: category.icon}} style={styles.imgCategory}/>
            <Text style={styles.categoryName}>{category.name}</Text>
        </View>  
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

    imgCategory:{
        width: 40,
        height: 40,
        borderRadius: 99,
        margin: 10,
    },
    categoryName:{
        textAlign: 'center',
        fontFamily: 'outfit-medium',
        fontSize: 12,
        marginTop: 5,
    },
    container:{
        padding: 15,
        backgroundColor: Colors.ICON_BG,
        borderRadius: 99,
        marginRight: 15,
    },
})