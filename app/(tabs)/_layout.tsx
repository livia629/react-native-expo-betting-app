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
        headerStyle: { backgroundColor: '#01326D', height: 110 },
        headerTintColor: 'white',
        headerTitleStyle: { fontSize: 20, fontFamily: 'NotoSansTC-Bold' },
        headerTitleAlign: 'center',
        tabBarStyle: Platform.select({
          ios: { 
            height: 80,
            position: 'absolute',
            backgroundColor: 'white',
            borderWidth: 0
          },
          default: {
            borderWidth: 0,
            backgroundColor: 'white',
          },
        }),
      }}
    >
      <Tabs.Screen name="index" options={{ ...tabOptions('图标1.png', '主頁'), title: '主頁' }} />
      <Tabs.Screen name="discover" options={{ ...tabOptions('图标2.png', '馬上發現'), title: '馬上發現' }} />
      <Tabs.Screen name="betslip" options={{ ...tabOptions('图标3.png', '投注區'), title: '投注區' }} />
      <Tabs.Screen name="ewallet" options={{ ...tabOptions('图标4.png', '電子錢包'), title: '電子錢包' }} />
      <Tabs.Screen name="more" options={{ ...tabOptions('图标5.png', '更多'), title: '更多' }} />
      <Tabs.Screen name="me" options={{ ...tabOptions('图标6.png', '我'), headerShown: false }} />
    </Tabs>
  );
}

const imageMap: { [key: string]: any } = {
  '图标1.png': require('../../assets/images/图标1.png'),
  '图标2.png': require('../../assets/images/图标2.png'),
  '图标3.png': require('../../assets/images/图标3.png'),
  '图标4.png': require('../../assets/images/图标4.png'),
  '图标5.png': require('../../assets/images/图标5.png'),
  '图标6.png': require('../../assets/images/图标6.png'),
};

const tabOptions = (imagePath: string, label: string) => ({
  tabBarLabel: "",
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <View style={styles.tabContainer}>
      <View style={[styles.icon, focused && styles.focusedTab]}>
        <Image source={imageMap[imagePath]} style={{width: 22, height: 22, resizeMode: 'contain',}}  />
      </View>      
      <Text style={styles.tabText}>{label}</Text>
    </View>
  ),
});

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    marginTop: 12,
    width: 80,
  },
  icon: {
    width: 60,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center'
    
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
    marginTop: -2
  },
});
