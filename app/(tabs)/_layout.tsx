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
        headerStyle: { backgroundColor: '#191970' }, 
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
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "", // Hide default label to prevent duplication
          tabBarIcon: () => (
             <View style={{ alignItems: 'center', marginTop: 10, width: 80}}>
              <Image 
                source={require('../../assets/images/圖片_20250201015452.png')} 
                style={{ width: 22, height: 22, resizeMode: 'contain' }} // Adjust size accordingly
              />
              <Text style={styles.tabText}>{'主頁'}</Text>
            </View>
          ),
        }}
      />;
      <Tabs.Screen
        name="discover"
        options={{
          tabBarLabel: "", // Hide default label to prevent duplication
          tabBarIcon: () => (
             <View style={{ alignItems: 'center', marginTop: 10, width: 80 }}>
              <Image 
                source={require('../../assets/images/圖片_20250201015432.png')} 
                style={{ width: 24, height: 24, resizeMode: 'contain' }} // Adjust size accordingly
              />
              <Text style={styles.tabText}>{'馬上發現'}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="betslip"
        options={{
          tabBarLabel: "", // Hide default label to prevent duplication
          tabBarIcon: () => (
             <View style={{ alignItems: 'center', marginTop: 10, width: 80}}>
              <Image 
                source={require('../../assets/images/圖片_20250201015430.png')} 
                style={{ width: 24, height: 24, resizeMode: 'contain' }} // Adjust size accordingly
              />
              <Text style={styles.tabText}>{'投注區'}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ewallet"
        options={{
          tabBarLabel: "", // Hide default label to prevent duplication
          tabBarIcon: () => (
             <View style={{ alignItems: 'center', marginTop: 10, width: 80}}>
              <Image 
                source={require('../../assets/images/圖片_20250201015427.png')} 
                style={{ width: 24, height: 24, resizeMode: 'contain' }} // Adjust size accordingly
              />
              <Text style={styles.tabText}>{'電子錢包'}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          tabBarLabel: "", // Hide default label to prevent duplication
          tabBarIcon: () => (
             <View style={{ alignItems: 'center', marginTop: 10, width: 80}}>
              <Image 
                source={require('../../assets/images/圖片_20250201015418.png')} 
                style={{ width: 24, height: 24, resizeMode: 'contain' }} // Adjust size accordingly
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
          tabBarLabel: "", // Hide default label
          tabBarShowLabel: false, // Ensures no default text appears
          tabBarIcon: () => (
            <View style={{ alignItems: 'center', marginTop: 10, width: 80}}>
              <Image 
                source={require('../../assets/images/圖片_20250201015434.png')} 
                style={{ width: 24, height: 24, resizeMode: 'contain' }} 
              />
              <Text style={styles.tabText}>
                我
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabText: {
    fontSize: 12,
    color: 'black', 
    fontFamily: 'NotoSansTC-Regular', 
    fontWeight: 'bold'
  }
})
