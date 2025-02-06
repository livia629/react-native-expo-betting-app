import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text, Image, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    'NotoSansTC-Regular': require('../../assets/fonts/NotoSansTC-Regular.ttf'),
    'NotoSansTC-Bold': require('../../assets/fonts/NotoSansTC-Bold.ttf'),
  });

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#022f66' },
        headerTintColor: 'white',
        headerTitleStyle: { fontSize: 18, fontWeight: 'bold' },
        headerTitleAlign: 'center',
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      {/** Repeat this for each tab */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <Image 
                source={require('../../assets/images/圖片_20250201015452.png')} 
                style={[styles.icon, focused && styles.focusedTab]} 
              />
              <Text style={styles.tabText}>{'主頁'}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <Image 
                source={require('../../assets/images/圖片_20250201015432.png')} 
                style={[styles.icon, focused && styles.focusedTab]} 
              />
              <Text style={styles.tabText}>{'馬上發現'}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="betslip"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <Image 
                source={require('../../assets/images/圖片_20250201015430.png')} 
                style={[styles.icon, focused && styles.focusedTab]} 
              />
              <Text style={styles.tabText}>{'投注區'}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ewallet"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <Image 
                source={require('../../assets/images/圖片_20250201015427.png')} 
                style={[styles.icon, focused && styles.focusedTab]} 
              />
              <Text style={styles.tabText}>{'電子錢包'}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <Image 
                source={require('../../assets/images/圖片_20250201015418.png')} 
                style={[styles.icon, focused && styles.focusedTab]} 
              />
              <Text style={styles.tabText}>{'更多'}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: "我",
          tabBarLabel: "",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <Image 
                source={require('../../assets/images/圖片_20250201015434.png')} 
                style={[styles.icon, focused && styles.focusedTab]} 
              />
              <Text style={styles.tabText}>{'我'}</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    marginTop: 10,
    width: 80,
  },
  icon: {
    width: 60,
    height: 28,
    resizeMode: 'contain'
  },
  focusedTab: {
    backgroundColor: '#E1EBEE', // Change to your desired color
    borderRadius: 20, // Optional: add some rounding for better aesthetics
  },
  tabText: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'NotoSansTC-Regular',
    fontWeight: 'bold',
  },
});
