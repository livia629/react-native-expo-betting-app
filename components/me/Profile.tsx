import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';

const Profile = () => {
  const [isVisible, setIsVisible] = useState(true); // State for balance visibility
  const [fontsLoaded] = useFonts({
    'NotoSansTC-Regular': require('../../assets/fonts/NotoSansTC-Regular.ttf'),
    'NotoSansTC-Bold': require('../../assets/fonts/NotoSansTC-Bold.ttf'),
  });
  const router = useRouter();

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
                    <Image 
                      source={require('../../assets/images/圖片_20250201123414.png')} 
                      style={{ width: 24, height: 24, resizeMode: 'contain' }} // Adjust size accordingly
                    /> : 
                    <Image 
                      source={require('../../assets/images/圖片_20250201015444.png')} 
                      style={{ width: 24, height: 24, resizeMode: 'contain' }} // Adjust size accordingly
                    />
                    }
                </TouchableOpacity>
            </View>
            <Text style={styles.balance}>{isVisible ? '$*****' : '$500'}</Text>
            <Text style={styles.account}>投注戶口號碼: 15339692</Text>
        </ImageBackground>
        <View style={styles.profileCenter}>
            <View style={styles.profileCenterDiv}>
                <View style={styles.profileCenterBox}>
                    <Image 
                      source={require('../../assets/images/圖片_20250201015446.png')} 
                      style={{ width: 52, height: 52, resizeMode: 'contain' }} // Adjust size accordingly
                    />
                    <Text style={styles.myCouponsText}>轉賬服務</Text>
                </View>
                <View style={styles.profileCenterBox}>
                    <Image 
                      source={require('../../assets/images/圖片_20250201015442.png')} 
                      style={{ width: 52, height: 52, resizeMode: 'contain' }} // Adjust size accordingly
                    />
                    <Text style={styles.myCouponsText}>是次交易紀錄</Text>
                </View>
                <View style={styles.profileCenterBox}>
                    <Image 
                      source={require('../../assets/images/圖片_20250201015440.png')} 
                      style={{ width: 52, height: 52, resizeMode: 'contain' }} // Adjust size accordingly
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
                  style={{ width: 28, height: 28, resizeMode: 'contain' }} // Adjust size accordingly
                />
                <Text style={styles.myCouponsText}>我的優惠券</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/routers/EditProfile')}>
              <View style={styles.suggestion}>
                  <View style={styles.suggestionView}>
                      <Image 
                        source={require('../../assets/images/圖片_20250201015436.png')} 
                        style={{ width: 28, height: 28, resizeMode: 'contain' }} // Adjust size accordingly
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
    height: 180,
    paddingHorizontal: 30,
  },
  profileBalance: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  profileButton: {
    padding: 10,
  },
  balanceText: {
    fontFamily: 'NotoSansTC-Regular',
    fontSize: 16,
    color: '#fff',
  },
  balance: {
    marginTop: -5,
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  account: {
    fontFamily: 'NotoSansTC-Regular',
    fontSize: 14,
    color: '#fff',
  },
  profileCenter: {
    flexDirection: 'row',
    marginHorizontal: 15,
    backgroundColor: 'transparent',
    marginTop: -50
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
    marginTop: 20
  },
  myHkjc: {
    fontFamily: 'NotoSansTC-Regular',
    fontSize: 20,
    fontWeight: '800',
    color: '#000'
  },
  myCouponsBox: {
    width: '50%', 
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 10,
    marginTop: 10,
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
    fontFamily: 'NotoSansTC-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555'
  },
  suggestion: {
    width: '100%', 
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 10,
    marginTop: 30,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  suggestionView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestionText: {
    fontFamily: 'NotoSansTC-Regular',
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
    fontWeight: 'bold'
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
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  logoutText: {
    fontFamily: 'NotoSansTC-Regular',
    fontSize: 16,
    color: '#191970',
  }
  
});

export default Profile;
