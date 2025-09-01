import { Stack } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MeStack() {
  const navigation = useNavigation();
  return (
    <Stack>
      <Stack.Screen name="index" 
        options={{ 
          title: "我", 
          headerStyle: { backgroundColor: '#022f77'},
          headerTintColor: 'white',
          headerTitleStyle: { fontSize: 20, fontFamily: 'NotoSansTC-Bold', },
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen name="editProfile" 
        options={{ title: '意見/建議',
          headerStyle: { backgroundColor: '#022f77'},
          headerTintColor: 'white',
          headerTitleStyle: { fontSize: 20, fontFamily: 'NotoSansTC-Bold', },
          headerTitleAlign: 'center',
          headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={ styles.backBtn }>
              <MaterialIcons name="chevron-left" size={24} color="white" style={{marginTop: 5, fontWeight: 'bold'}} />
              <Text style={styles.backText}>返回</Text>
          </TouchableOpacity>)
        }} 
      />
      <Stack.Screen name="acountRecord" 
        options={{
          title: '戶口紀錄', 
          headerStyle: { backgroundColor: '#022f77'},
          headerTintColor: 'white',
          headerTitleStyle: { fontSize: 20, fontFamily: 'NotoSansTC-Bold', },
          headerTitleAlign: 'center',
          headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={ styles.backBtn }>
              <MaterialIcons name="chevron-left" size={24} color="white" style={{marginTop: 5, fontWeight: 'bold'}} />
              <Text style={styles.backText}>返回</Text>
          </TouchableOpacity> )
          }} 
      />
      <Stack.Screen name="datePicker" 
        options={{ title: '搜尋時段',
          headerStyle: { backgroundColor: '#022f77'},
          headerTintColor: 'white',
          headerTitleStyle: { fontSize: 20, fontFamily: 'NotoSansTC-Bold', },
          headerTitleAlign: 'center',
          headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={ styles.backBtn }>
              <MaterialIcons name="chevron-left" size={24} color="white" style={{marginTop: 5, fontWeight: 'bold'}} />
              <Text style={styles.backText}>返回</Text>
          </TouchableOpacity>)
        }}
      /> 
    </Stack>
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