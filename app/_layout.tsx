import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
      'NotoSansTC-Regular': require('../assets/fonts/NotoSansTC-Regular.ttf'),
      'NotoSansTC-Bold': require('../assets/fonts/NotoSansTC-Bold.ttf'),
      'NotoSansTC-Medium': require('../assets/fonts/NotoSansTC-Medium.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#022f77' },
          headerTintColor: 'white',
          headerTitleStyle: { fontSize: 20, fontFamily: 'NotoSansTC-Bold', },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={ styles.backBtn }>
              <MaterialIcons name="chevron-left" size={24} color="white" style={{marginTop: 5, fontWeight: 'bold'}} />
              <Text style={styles.backText}>返回</Text>
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="routers/EditProfile" options={{ title: '意見/建議' }} />
        <Stack.Screen name="routers/AcountRecord" options={{ title: '戶口紀錄' }} />
        <Stack.Screen name="routers/DatePicker" options={{ title: '搜尋時段' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    flexDirection: 'row',
    alignItems: "center",
  },
  backText: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 16
  }
})
