import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>意見/建議</Text>
      <Text style={styles.description}>這裡是您的意見和建議頁面。</Text>
      
      {/* Go Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>返回</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#191970',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#191970',
    borderRadius: 5,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EditProfile;
