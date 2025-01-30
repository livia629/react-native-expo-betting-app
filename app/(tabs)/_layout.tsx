import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "", // Hide default label to prevent duplication
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center', paddingBottom: 10, marginTop: 20 }}>
              <Ionicons size={20} name="home-outline" color="black" />
              <Text style={{ fontSize: 10, color: 'black' }} numberOfLines={1}>{'主頁'}</Text>
            </View>
          ),
        }}
      />;
      <Tabs.Screen
        name="discover"
        options={{
          tabBarLabel: "", // Hide default label to prevent duplication
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center', paddingBottom: 10, marginTop: 20 }}>
              <Ionicons size={20} name="search-outline" color="black" />
              <Text style={{ fontSize: 10, color: 'black' }} numberOfLines={1}>{'馬上發現'}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="betslip"
        options={{
          tabBarLabel: "", // Hide default label to prevent duplication
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center', paddingBottom: 10, marginTop: 20 }}>
              <Ionicons size={20} name="document-text-outline" color="black" />
              <Text style={{ fontSize: 10, color: 'black' }} numberOfLines={1}>{'投注區'}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ewallet"
        options={{
          tabBarLabel: "", // Hide default label to prevent duplication
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center', paddingBottom: 10, marginTop: 20 }}>
              <Ionicons size={20} name="wallet-outline" color="black" />
              <Text style={{ fontSize: 10, color: 'black' }} numberOfLines={1}>{'電子錢包'}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          tabBarLabel: "", // Hide default label to prevent duplication
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center', paddingBottom: 10, marginTop: 20 }}>
              <Ionicons size={20} name="ellipsis-horizontal" color="black" />
              <Text style={{ fontSize: 10, color: 'black' }} numberOfLines={1}>{'更多'}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          tabBarLabel: "", // Hide default label to prevent duplication
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center', paddingBottom: 10, marginTop: 20 }}>
              <Ionicons size={20} name="person-circle-outline" color="black" />
              <Text style={{ fontSize: 10, color: 'black' }} numberOfLines={1}>{'我'}</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
