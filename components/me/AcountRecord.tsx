import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useRoute, RouteProp } from '@react-navigation/native'; // Import useRoute
import { useRouter } from 'expo-router';

type RouteParams = {
    currentTime: string;
    account: string;
    balance: string;
};

const AcountRecord = () => {
    const router = useRouter();
    const route = useRoute<RouteProp<{ params: RouteParams }>>();
    const { currentTime, account, balance } = route.params;
    const [fontsLoaded] = useFonts({
        'NotoSansTC-Regular': require('../../assets/fonts/NotoSansTC-Regular.ttf'),
        'NotoSansTC-Bold': require('../../assets/fonts/NotoSansTC-Bold.ttf'),
        'NotoSansTC-Medium': require('../../assets/fonts/NotoSansTC-Medium.ttf'),
    });
    const [selectedButton, setSelectedButton] = useState('今日');
    const [dateRange, setDateRange] = useState('');
    const formatDate = (date: Date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are 0-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const updateDateRange = (button: string) => {
        const currentDate = new Date();
        let startDate: Date;

        switch (button) {
            case '今日':
                startDate = currentDate;
                setDateRange(`${formatDate(startDate)}-${formatDate(startDate)}`);
                break;
            case '最近2日':
                startDate = new Date(currentDate);
                startDate.setDate(currentDate.getDate() - 1); // 1 day ago
                setDateRange(`${formatDate(startDate)}-${formatDate(currentDate)}`);
                break;
            case '最近8日':
                startDate = new Date(currentDate);
                startDate.setDate(currentDate.getDate() - 7); // 7 days ago
                setDateRange(`${formatDate(startDate)}-${formatDate(currentDate)}`);
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        updateDateRange(selectedButton); // Initialize date range on component mount
    }, [selectedButton]);

    const handlePress = (button: string) => {
        setSelectedButton(button);
        updateDateRange(button); // Update date range when button is pressed
    };

    return (
        <>
            <View style={styles.topContainer}>
                <Text style={styles.text}>時間: {currentTime}</Text>
                <Text style={styles.text}>投注戶口號碼: {account}</Text>
                <Text style={styles.text}>結餘: ${balance}</Text>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.text}>每次最多可以搜尋過去30天內其中8天。 (以香港時間計算）</Text>
                <View style={styles.dateBtns}>
                    <TouchableOpacity style={[styles.dateBtn, selectedButton === "今日" && styles.selectedDateBtn]} onPress={() => handlePress("今日")}>
                        <Text style={[styles.dateBtnText, selectedButton === '今日' && styles.selectedDateBtnText]}>今日</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.dateBtn, selectedButton === "最近2日" && styles.selectedDateBtn]} onPress={() => handlePress("最近2日")}>
                        <Text style={[styles.dateBtnText, selectedButton === '最近2日' && styles.selectedDateBtnText]}>最近2日</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.dateBtn, selectedButton === "最近8日" && styles.selectedDateBtn]} onPress={() => handlePress("最近8日")}>
                        <Text style={[styles.dateBtnText, selectedButton === '最近8日' && styles.selectedDateBtnText]}>最近8日</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.boxBtn} onPress={() => router.push('/routers/EditProfile')}>
                    <Text style={styles.boxBtnLeftText}>時段</Text>
                    <Text style={styles.boxBtnRightText}>{dateRange}</Text>
                </TouchableOpacity>
                <View style={styles.horizonLine}></View>
                <View style={[styles.boxBtn, { marginBottom: 10 }]}>
                    <Text style={styles.boxBtnLeftText}>交易種類</Text>
                    <Text style={styles.boxBtnRightText}>所有</Text>
                </View>
                <View style={styles.boxBtn}>
                    <Text style={styles.boxBtnLeftText}>顯示種類</Text>
                    <Text style={styles.boxBtnRightText}>所有</Text>
                </View>
                <TouchableOpacity style={styles.logout}>
                    <Text style={styles.logoutText}>傳送</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    topContainer: { backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 10, borderBottomColor: '#ddd', borderBottomWidth: 3, },
    text: { fontFamily: 'NotoSansTC-Medium', lineHeight: 20, fontSize: 14, color: 'black', },
    bottomContainer: { backgroundColor: '#eee', paddingHorizontal: 15, paddingVertical: 10 },
    dateBtns: { flexDirection: 'row', alignItems: 'center', marginVertical: 15, gap: 10 },
    dateBtn: { borderColor: '#022f66', borderWidth: 2, borderRadius: 20, paddingHorizontal: 15, paddingVertical: 5 },
    dateBtnText: { fontFamily: 'NotoSansTC-Medium', lineHeight: 20, fontSize: 15, color: '#022f66', },
    selectedDateBtn: { backgroundColor: '#022f66', },
    selectedDateBtnText: { color: 'white' },
    boxBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 15, borderColor: '#aaa', borderWidth: 2, borderRadius: 5 },
    boxBtnLeftText: { fontFamily: 'NotoSansTC-Medium', lineHeight: 24, fontSize: 18, color: 'black', },
    boxBtnRightText: { fontFamily: 'NotoSansTC-Medium', lineHeight: 24, fontWeight: 'bold', fontSize: 18, color: 'black', },
    horizonLine: { borderBottomWidth: 1, borderColor: "#ccc", height: 20, marginBottom: 20 },
    logout: { width: '100%', backgroundColor: '#022f66', borderRadius: 20, marginTop: 25, padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent:'center'},
    logoutText: { fontFamily: 'NotoSansTC-Medium', lineHeight: 20, fontSize: 16, color: '#fff', }
});

export default AcountRecord;
