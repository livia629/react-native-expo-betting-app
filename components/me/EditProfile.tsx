import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const EditProfile = () => {
  const [balance, setBalance] = useState('');
  const [account, setAccount] = useState('');

  const handleSubmit = () => {
    Alert.alert('Form Submitted', `Balance: ${balance}\nAccount: ${account}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>這裡是您的意見和建議頁面。</Text>
      <View style={styles.form}>
        <Text style={styles.label}>$$</Text>
        <TextInput 
          style={styles.input}
          placeholder="輸入您的餘額"
          value={balance}
          onChangeText={setBalance}
        />

        <Text style={styles.label}>投注戶口號碼</Text>
        <TextInput 
          style={styles.input}
          placeholder="輸入您的帳戶"
          value={account}
          onChangeText={setAccount}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
          <Text style={styles.buttonText}>提交</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginTop: 20,
    borderWidth: 3,
    borderColor: '#ddd',
    padding: 10
  },
  form: {
    padding: 10
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  submit: {
    backgroundColor: '#888', // Black background
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // White text for contrast
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfile;
