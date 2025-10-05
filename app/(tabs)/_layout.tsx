import { Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
  return (
    <Tabs>
        <Tabs.Screen name='home'
          options={{
            tabBarLabel: 'Home',
          }}
        
        
        />
        <Tabs.Screen name='explore'
          options={{
            tabBarLabel: 'Explore',
          }}
        />
        <Tabs.Screen name='profile'
          options={{
            tabBarLabel: 'Profile',
          }}
        />
    </Tabs>
  )
}