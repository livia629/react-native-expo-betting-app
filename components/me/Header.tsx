import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const Header = () => {
  const [fontsLoaded] = useFonts({
    'NotoSansTC-Regular': require('../../assets/fonts/NotoSansTC-Regular.ttf'),
    'NotoSansTC-Bold': require('../../assets/fonts/NotoSansTC-Bold.ttf'),
  });

  return (
    <View style={styles.header}>
        <Text style={styles.headerText}>我</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#191970',
    paddingVertical: 20
  },
  headerText: {
    fontFamily: 'NotoSansTC-Regular',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default Header;
