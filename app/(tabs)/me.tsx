import {
    StyleSheet,
    View,
  } from 'react-native';
  
  import Profile from '@/components/me/Profile';
  
  
  export default function HomeScreen() {
    return (
      <View style={styles.page}>
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
  