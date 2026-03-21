import React from 'react'
import { FlatList, ScrollView, View } from 'react-native'
import BusinessListCard from './BusinessListCard'

export default function ExploreBusinessList( { businessList } ) {
  return (
    <ScrollView>
      <FlatList
        data={businessList}
        scrollEnabled
        // showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <BusinessListCard
              business={item}
              key={index}
            />
          </View>
        )}
      />
      <View style={{ height: 200 }}>
      </View>

     
    </ScrollView>     
  )
}