import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { getColors } from '@/lib/styles';

export default function TabLayout() {
  const colors = getColors()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primaryColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            backgroundColor: colors.backgroundColor,
            height: 120,
            borderTopWidth: .5,
            paddingTop: 8
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="holidays"
        options={{
          title: 'Holidays',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="calendar-heart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="format-list-text" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="converter"
        options={{
          title: 'Converter',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="atom-variant" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
