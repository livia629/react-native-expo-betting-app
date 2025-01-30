import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = () => {
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
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default Header;
