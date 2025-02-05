import React, { useState, useCallback  } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import CustomText from '../CustomText';

const Profile = () => {
  const [isVisible, setIsVisible] = useState(true); 
  const [balance, setBalance] = useState('$*****'); 
  const [account, setAccount] = useState('投注戶口號碼: 15339692');
  const [fontsLoaded] = useFonts({
    'NotoSansTC-Regular': require('../../assets/fonts/NotoSansTC-Regular.ttf'),
    'NotoSansTC-Bold': require('../../assets/fonts/NotoSansTC-Bold.ttf'),
    'NotoSansTC-Medium': require('../../assets/fonts/NotoSansTC-Medium.ttf'),
  });
  const router = useRouter();

  // Load profile data every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadProfileData = async () => {
        try {
          const savedBalance = await AsyncStorage.getItem('balance');
          const savedAccount = await AsyncStorage.getItem('account');
          if (savedBalance) setBalance(`$${savedBalance}`);
          if (savedAccount) setAccount(`投注戶口號碼: ${savedAccount}`);
        } catch (error) {
          console.error('Failed to load data', error);
        }
      };
      loadProfileData();
    }, [])
  );

  return (
    <>
          <ImageBackground 
              source={require('../../assets/images/圖片_20250201015406.jpg')} // Replace with your actual image path
              style={styles.profileTop}
              resizeMode="cover" 
          >
            <View style={styles.profileBalance}>
                <Text style={styles.balanceText}>結餘</Text>
                <TouchableOpacity
                    style={styles.profileButton}
                    onPress={() => setIsVisible(!isVisible)} // Toggle visibility
                >
                    {isVisible ? 
                      <Image source={require('../../assets/images/圖片_20250201123414.png')} style={styles.eyeIcon} /> : 
                      <Image source={require('../../assets/images/圖片_20250201015444.png')} style={styles.eyeIcon} />
                    }
                </TouchableOpacity>
            </View>
            <Text style={styles.balance}>{isVisible ? '$*****' : balance}</Text>
            <Text style={styles.account}>{account}</Text>
        </ImageBackground>
        <View style={styles.profileCenter}>
            <View style={styles.profileCenterDiv}>
                <View style={styles.profileCenterBox}>
                    <Image 
                      source={require('../../assets/images/圖片_20250201015446.png')} 
                      style={{ width: 68, height: 68, resizeMode: 'contain' }} // Adjust size accordingly
                    />
                    <Text style={styles.myCouponsText}>轉賬服務</Text>
                </View>
                <View style={styles.profileCenterBox}>
                    <Image 
                      source={require('../../assets/images/圖片_20250201015442.png')} 
                      style={{ width: 68, height: 68, resizeMode: 'contain' }} // Adjust size accordingly
                    />
                    <Text style={styles.myCouponsText}>是次交易紀錄</Text>
                </View>
                <View style={styles.profileCenterBox}>
                    <Image 
                      source={require('../../assets/images/圖片_20250201015440.png')} 
                      style={{ width: 68, height: 68, resizeMode: 'contain' }} // Adjust size accordingly
                    />
                    <Text style={styles.myCouponsText}>戶口紀錄</Text>
                </View>
            </View>
        </View>
        <View style={styles.profileBottom}>
        <Text style={styles.myHkjc}>我的HKJC</Text>
            <View style={styles.myCouponsBox}>
                <Image 
                  source={require('../../assets/images/圖片_20250201015438.png')} 
                  style={{ width: 32, height: 32, resizeMode: 'contain' }} // Adjust size accordingly
                />
                <Text style={styles.myCouponsText}>我的優惠券</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/routers/EditProfile')}>
              <View style={styles.suggestion}>
                  <View style={styles.suggestionView}>
                      <Image 
                        source={require('../../assets/images/圖片_20250201015436.png')} 
                        style={{ width: 32, height: 32, resizeMode: 'contain' }} // Adjust size accordingly
                      />
                      <Text style={styles.suggestionText}>意見/建議</Text>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logout}>
                <Text style={styles.logoutText}>登出</Text>
            </TouchableOpacity>
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  profileTop: {
    height: 190,
    paddingHorizontal: 30,
  },
  profileBalance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    padding: 10,
  },
  eyeIcon: { width: 24, height: 24, resizeMode: 'contain' },
  balanceText: {
    fontFamily: 'NotoSansTC-Medium',
    includeFontPadding: false,
    paddingVertical: 2,
    fontSize: 16,
    color: '#fff',
  },
  balance: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
  },
  account: {
    fontFamily: 'NotoSansTC-Medium',
    fontSize: 14,
    color: '#fff',
  },
  profileCenter: {
    flexDirection: 'row',
    marginHorizontal: 15,
    backgroundColor: 'transparent',
    marginTop: -60
  },
  profileCenterDiv: {
    width: '100%',
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 10,
    paddingHorizontal: 0,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  profileCenterBox: {
    width: '33%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  iconBackground: {
    backgroundColor: 'black', 
    padding: 12,
    borderRadius: 50,
  },
  profileBottom: {
    height: '100%',
    paddingHorizontal: 15,
    marginTop: 10
  },
  myHkjc: {
    fontFamily: 'NotoSansTC-Medium',
    includeFontPadding: false,
    paddingVertical:10,
    fontSize: 20,
    color: '#000',
  },
  myCouponsBox: {
    width: '50%', 
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 10,
    // marginTop: 10,
    padding: 15,
    gap: 10
  },
  iconContainer: {
    width: 25,
    height: 25,
    backgroundColor: '#FFD700',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myCouponsText: {
    fontFamily: 'NotoSansTC-Medium',
    includeFontPadding: false,
    paddingVertical: 1,
    fontSize: 18,
    color: '#555'
  },
  suggestion: {
    width: '100%', 
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 10,
    marginTop: 25,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  suggestionView: {
    flexDirection: 'row',
  },
  suggestionText: {
    fontFamily: 'NotoSansTC-Medium',
    includeFontPadding: false,
    fontSize: 18,
    color: '#000',
    marginLeft: 10,
  },
  suggestiondropIcon: {
    fontSize: 20,
    color: '#000',
  },
  logout: {
    width: '100%', 
    borderWidth: 0,
    borderRadius: 40,
    backgroundColor: '#fff',
    marginTop: 25,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  logoutText: {
    fontFamily: 'NotoSansTC-Medium',
    includeFontPadding: false,
    paddingVertical: 1,
    fontSize: 16,
    color: '#022f66',
  }
  
});

export default Profile;
