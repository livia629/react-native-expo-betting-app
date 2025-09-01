import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text, Image, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    'NotoSansTC-Regular': require('../../assets/fonts/NotoSansTC-Regular.ttf'),
    'NotoSansTC-Bold': require('../../assets/fonts/NotoSansTC-Bold.ttf'),
    'NotoSansTC-Medium': require('../../assets/fonts/NotoSansTC-Medium.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#022f77', height: 108 },
        headerTintColor: 'white',
        headerTitleStyle: { fontSize: 20, fontFamily: 'NotoSansTC-Bold' },
        headerTitleAlign: 'center',
        tabBarStyle: Platform.select({
          ios: { 
            height: 92,
            position: 'absolute',
            backgroundColor: 'white',
          },
          default: {
            backgroundColor: 'white',
          },
        }),
      }}
    >
      <Tabs.Screen name="index" options={{ ...tabOptions('圖片_20250201015452.png', '主頁'), title: '主頁' }} />
      <Tabs.Screen name="discover" options={{ ...tabOptions('圖片_20250201015432.png', '馬上發現'), title: '馬上發現' }} />
      <Tabs.Screen name="betslip" options={{ ...tabOptions('圖片_20250201015430.png', '投注區'), title: '投注區' }} />
      <Tabs.Screen name="ewallet" options={{ ...tabOptions('圖片_20250201015427.png', '電子錢包'), title: '電子錢包' }} />
      <Tabs.Screen name="more" options={{ ...tabOptions('圖片_20250201015418.png', '更多'), title: '更多' }} />
      <Tabs.Screen name="me" options={{ ...tabOptions('圖片_20250201015434.png', '我'), headerShown: false }} />
    </Tabs>
  );
}

const imageMap: { [key: string]: any } = {
  '圖片_20250201015452.png': require('../../assets/images/圖片_20250201015452.png'),
  '圖片_20250201015432.png': require('../../assets/images/圖片_20250201015432.png'),
  '圖片_20250201015430.png': require('../../assets/images/圖片_20250201015430.png'),
  '圖片_20250201015427.png': require('../../assets/images/圖片_20250201015427.png'),
  '圖片_20250201015418.png': require('../../assets/images/圖片_20250201015418.png'),
  '圖片_20250201015434.png': require('../../assets/images/圖片_20250201015434.png'),
};

const tabOptions = (imagePath: string, label: string) => ({
  tabBarLabel: "",
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <View style={styles.tabContainer}>
      <Image source={imageMap[imagePath]} style={[styles.icon, focused && styles.focusedTab]} />
      <Text style={styles.tabText}>{label}</Text>
    </View>
  ),
});

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    marginTop: 14,
    width: 80,
  },
  icon: {
    width: 60,
    height: 28,
    resizeMode: 'contain',
  },
  focusedTab: {
    backgroundColor: '#E1EBEE',
    borderRadius: 20,
  },
  tabText: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'NotoSansTC-Regular',
    fontWeight: 'bold',
  },
});
