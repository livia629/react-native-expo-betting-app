import {
    StyleSheet,
    View,
  } from 'react-native';
  
  import Header from '@/components/me/Header';
  import Profile from '@/components/me/Profile';
  
  
  export default function HomeScreen() {
    return (
      <View style={styles.page}>
          <Header />
          <Profile />
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    page: {
      position:'relative',
      flex: 1,
      minHeight:'100%',
      backgroundColor: '#eee',
    }
  });
  