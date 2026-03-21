import Category from '@/components/Home/Category'
import Header from '@/components/Home/Header'
import PopularBusiness from '@/components/Home/PopularBusiness'
import Slider from '@/components/Home/Slider'
import React from 'react'
import { ScrollView, View } from 'react-native'


export default function Home() {
  return (
    <ScrollView>
      {/* Header */}
      <Header/>
      {/* Slider */}
      <Slider/>
      {/* Category */}
      <Category onCategorySelect={(category) => {
        console.log('Selected category:', category);
      }}/>
      {/* Popular Business List */}
      <PopularBusiness/>

      <View style={{height: 50}}>
        
      </View>
      
    </ScrollView>
  )
}