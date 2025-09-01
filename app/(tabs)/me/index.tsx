import React, { useState, useCallback  } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import CustomText from '../../../components/CustomText';

export default function ProfileScreen() {
  const [isVisible, setIsVisible] = useState(true); 
  const [balance, setBalance] = useState(''); 
  const [account, setAccount] = useState('');
  const [fontsLoaded] = useFonts({
    'NotoSansTC-Regular': require('../../../assets/fonts/NotoSansTC-Regular.ttf'),
    'NotoSansTC-Bold': require('../../../assets/fonts/NotoSansTC-Bold.ttf'),
    'NotoSansTC-Medium': require('../../../assets/fonts/NotoSansTC-Medium.ttf'),
  });
  const router = useRouter();
  const [savedBalance, setSavedBalance] = useState('');
  const [savedAccount, setSavedAccount] = useState('');

  // Load profile data every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadProfileData = async () => {
        try {
          const balanceFromStorage = await AsyncStorage.getItem('balance');
          const accountFromStorage = await AsyncStorage.getItem('account');
          if (balanceFromStorage) {
            setSavedBalance(balanceFromStorage);
            setBalance(balanceFromStorage);
          }
          if (accountFromStorage) {
            setSavedAccount(accountFromStorage);
            setAccount(accountFromStorage);
          }
        } catch (error) {
          console.error('Failed to load data', error);
        }
      };
      loadProfileData();
    }, [])
  );
  const handleAccountRecordPress = () => {
    const currentTime = new Date().toLocaleString('en-HK', {
      timeZone: 'Asia/Hong_Kong',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // Use 24-hour format
    });
    const formattedTime = currentTime.replace(/\/0/g, '/').replace(/, /g, ' ').replace(/:/g, ':').trim();
    router.push({
      pathname: "/(tabs)/me/acountRecord",
      params: {
        currentTime: formattedTime,
        account: savedAccount,
        balance: savedBalance,
      },
    });
  };

  return (
    <View style={{backgroundColor: '#F0F0F0'}}>
          <ImageBackground 
              source={require('../../../assets/images/圖片_20250205214818.jpg')} 
              style={styles.profileTop}
              resizeMode="cover" 
          >
            <View style={styles.profileBalance}>
                <Text style={styles.balanceText}>結餘</Text>
                <TouchableOpacity
                    style={styles.profileButton}
                    onPress={() => setIsVisible(!isVisible)}
                >
                    {isVisible ? 
                      <Image source={require('../../../assets/images/圖片_20250201123414.png')} style={styles.eyeIcon} /> : 
                      <Image source={require('../../../assets/images/圖片_20250201015444.png')} style={styles.eyeIcon} />
                    }
                </TouchableOpacity>
            </View>
            <Text style={styles.balance}>${isVisible ? ' *****' : balance}</Text>
            <Text style={styles.account}>投注戶口號碼: {account}</Text>
        </ImageBackground>
        <View style={styles.profileCenter}>
            <View style={styles.profileCenterDiv}>
                <TouchableOpacity style={styles.profileCenterBox}>
                  <Image 
                    source={require('../../../assets/images/圖片_20250201015446.png')} 
                    style={{ width: 64, height: 64, resizeMode: 'contain', borderRadius: 32 }} 
                  />
                  <Text style={styles.myCouponsText}>轉賬服務</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileCenterBox}>
                  <Image 
                    source={require('../../../assets/images/圖片_20250201015442.png')} 
                    style={{ width: 66, height: 66, resizeMode: 'contain' }} // Adjust size accordingly
                  />
                  <Text style={styles.myCouponsText}>是次交易紀錄</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileCenterBox} onPress={handleAccountRecordPress}>
                  <Image 
                    source={require('../../../assets/images/圖片_20250201015440.png')} 
                    style={{ width: 66, height: 66, resizeMode: 'contain' }} // Adjust size accordingly
                  />
                  <Text style={styles.myCouponsText}>戶口紀錄</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.profileBottom}>
        <Text style={styles.myHkjc}>我的HKJC</Text>
        <View style={styles.myCouponsView}>
            <View style={styles.myCouponsBox}>
                <Image 
                  source={require('../../../assets/images/圖片_20250201015438.png')} 
                  style={{ width: 32, height: 32, resizeMode: 'contain' }} // Adjust size accordingly
                />
                <Text style={styles.myCouponsText}>我的優惠券</Text>
            </View>
            <View style={{...styles.myCouponsBox, marginLeft: 12}}>
                <Image 
                  source={require('../../../assets/images/圖片_20250201015439.png')} 
                  style={{ width: 32, height: 32, resizeMode: 'contain' }} // Adjust size accordingly
                />
                <Text style={styles.myCouponsText}>我的預訂</Text>
            </View>
        </View>  
            
            <TouchableOpacity onPress={() => router.push("/(tabs)/me/editProfile")}>
              <View style={styles.suggestion}>
                  <View style={styles.suggestionView}>
                      <Image 
                        source={require('../../../assets/images/圖片_20250201015436.png')} 
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
    </View>
  );
};

const styles = StyleSheet.create({
  profileTop: {
    height: 177,
    paddingHorizontal: 24,
  },
  profileBalance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceText: {
    fontFamily: 'NotoSansTC-Bold',
    fontSize: 17,
    color: 'white',
  },
  profileButton: {
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 8
  },
  eyeIcon: { width: 22, height: 22, resizeMode: 'contain'},
  
  balance: {
    color: 'white',
    fontFamily: 'NotoSansTC-Medium',
    fontSize: 32,
    marginTop: -3,
  },
  balance1: {
    color: '#fff',
    fontFamily: 'NotoSansTC-Medium',
    fontSize: 32,
    textAlignVertical: 'center'
  },
  account: {
    fontFamily: 'NotoSansTC-Bold',
    marginTop: 3,
    fontSize: 14,
    color: '#fff',
  },
  profileCenter: {
    marginHorizontal: 12,
    backgroundColor: 'transparent',
    marginTop: -57,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  profileCenterDiv: {
    width: '100%',
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 10,
    paddingHorizontal: 0,
    paddingTop:12,
    paddingBottom: 13,
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
    borderRadius: 48,
  },
  profileBottom: {
    height: '100%',
    paddingHorizontal: 12,
    marginTop: 13
  },
  myHkjc: {
    fontFamily: 'NotoSansTC-Regular',
    fontSize: 18,
    color: 'black',
  },
  myCouponsView: {
    flexDirection: 'row'
  },
  myCouponsBox: {
    flex: 1, 
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 10,
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 12
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
    fontFamily: 'NotoSansTC-Regular',
    lineHeight: 22,
    fontSize: 17,
    color: '#555'
  },
  suggestion: {
    width: '100%', 
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 10,
    marginTop: 24,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  suggestionView: {
    flexDirection: 'row',
  },
  suggestionText: {
    fontFamily: 'NotoSansTC-Regular',
    fontSize: 17,
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
    marginTop: 40,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  logoutText: {
    fontFamily: 'NotoSansTC-Medium',
    lineHeight: 20,
    fontSize: 16,
    color: '#01326D',
  }
});
