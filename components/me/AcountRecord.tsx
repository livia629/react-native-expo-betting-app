import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

type RouteParams = {
    currentTime: string;
    account: string;
    balance: string;
};

const AcountRecord = () => {
    const router = useRouter();
    const route = useRoute<RouteProp<{ params: RouteParams }>>();
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const selectedDateRange = params.selectedDateRange as string | undefined;
    const { currentTime, account, balance } = route.params;
    
    const [fontsLoaded] = useFonts({
        'NotoSansTC-Regular': require('../../assets/fonts/NotoSansTC-Regular.ttf'),
        'NotoSansTC-Bold': require('../../assets/fonts/NotoSansTC-Bold.ttf'),
        'NotoSansTC-Medium': require('../../assets/fonts/NotoSansTC-Medium.ttf'),
    });

    const [selectedButton, setSelectedButton] = useState<string | null>('今日');
    const [dateRange, setDateRange] = useState('');
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);

    useEffect(() => {
        if (isCompleteScreen) {
            navigation.setOptions({
                headerLeft: () => null, // Hide "返回" button
                headerBackVisible: false,
                headerRight: () => (
                    <TouchableOpacity onPress={() => setIsCompleteScreen(false)}>
                        <Text style={styles.completeBtnText}>完成</Text>
                    </TouchableOpacity>
                ),
            });
        } else {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <MaterialIcons name="chevron-left" size={18} color="white" />
                        <Text style={styles.backText}>返回</Text>
                    </TouchableOpacity>
                ),
                headerRight: () => null, // Hide "完成" button
            });
        }
    }, [isCompleteScreen, navigation]);

    // Function to format date with leading zero
    const formatDate = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0');  // Ensures 2-digit day
        const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Ensures 2-digit month
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Function to update date range based on button selection
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
                startDate.setDate(currentDate.getDate() - 1);
                setDateRange(`${formatDate(startDate)}-${formatDate(currentDate)}`);
                break;
            case '最近8日':
                startDate = new Date(currentDate);
                startDate.setDate(currentDate.getDate() - 7);
                setDateRange(`${formatDate(startDate)}-${formatDate(currentDate)}`);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        updateDateRange(selectedButton!); // Initialize date range
    }, [selectedButton]);

    useEffect(() => {
        if (selectedDateRange) {
            setDateRange(selectedDateRange); // Update date range when returning from DatePicker
            setSelectedButton(null); // Reset selected button to remove styling
        }
    }, [selectedDateRange]);

    const handlePress = (button: string) => {
        setSelectedButton(button);
        updateDateRange(button);
    };

    const acountDatas = [
        [
            { key: '參考編號', value: '-' },
            { key: '日期 / 時間', value: '-' },
            { key: '投注類別', value: '-' },
            { key: '細節', value: '2025年2月1日03:11 之戶口結餘: $54.60' },
            { key: '支出', value: '-' },
            { key: '存入', value: '-' },
        ],
        [
            { key: '參考編號', value: '5447' },
            { key: '日期 / 時間', value: '01-02-2025 03:11' },
            { key: '投注類別', value: '六合彩' },
            { key: '細節', value: '25/CNY 期 (金多寶) 4 + 10 + 16 + 28 + 36 + 46 $10(運財號碼)' },
            { key: '支出', value: '$10.00' },
            { key: '存入', value: '-' },
        ],
        [
            { key: '參考編號', value: '5448' },
            { key: '日期 / 時間', value: '01-02-2025 03:11' },
            { key: '投注類別', value: '六合彩' },
            { key: '細節', value: '25/CNY 期 (金多寶) 4 + 10 + 16 + 28 + 36 + 46 $10(運財號碼)' },
            { key: '支出', value: '$10.00' },
            { key: '存入', value: '-' },
        ],
        [
            { key: '參考編號', value: '5449' },
            { key: '日期 / 時間', value: '01-02-2025 03:11' },
            { key: '投注類別', value: '六合彩' },
            { key: '細節', value: '25/CNY 期 (金多寶) 4 + 10 + 16 + 28 + 36 + 46 $10(運財號碼)' },
            { key: '支出', value: '$10.00' },
            { key: '存入', value: '-' },
        ],
    ]

    return (
        <>
            <View style={styles.topContainer}>
                <Text style={styles.text}>時間: {currentTime}</Text>
                <Text style={styles.text}>投注戶口號碼: {account}</Text>
                <Text style={styles.text}>結餘: ${balance}</Text>
            </View>
            {!isCompleteScreen ? (
                <View style={styles.bottomContainer}>
                    <Text style={styles.text}>每次最多可以搜尋過去30天內其中8天。 (以香港時間計算）</Text>
                    <View style={styles.dateBtns}>
                        {['今日', '最近2日', '最近8日'].map((button) => (
                            <TouchableOpacity
                                key={button}
                                style={[styles.dateBtn, selectedButton === button && styles.selectedDateBtn]}
                                onPress={() => handlePress(button)}
                            >
                                <Text style={[styles.dateBtnText, selectedButton === button && styles.selectedDateBtnText]}>
                                    {button}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity style={styles.boxBtn} onPress={() => router.push('/routers/DatePicker')}>
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
                    <TouchableOpacity style={styles.send} onPress={() => setIsCompleteScreen(true)}>
                        <Text style={styles.sendText}>傳送</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <View style={styles.comDescriptionBox}>
                        <Text style={styles.text}>搜尋時段: {dateRange.replace('-', ' 至 ')}</Text>
                    </View>
                    <View style={styles.comContent}>
                        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
                            {acountDatas.map((acountdata, index) => (
                                <View key={index} style={styles.tableContainer}>
                                    {acountdata.map((row, rowIndex) => (
                                    <View key={rowIndex} style={[styles.row, rowIndex === 0 && styles.headerRow]}>
                                        <Text style={rowIndex === 0 ? styles.headerText : styles.cellText}>{row.key}</Text>
                                        <Text style={rowIndex === 0 ? styles.headerValueText : styles.cellValueText}>{row.value}</Text>
                                    </View>
                                    ))}
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    topContainer: { backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 10,  },
    text: { fontFamily: 'NotoSansTC-Medium', lineHeight: 20, fontSize: 14, color: 'black' },
    bottomContainer: { backgroundColor: '#eee', paddingHorizontal: 15, paddingVertical: 10, borderTopColor: '#ddd', borderTopWidth: 3 },
    dateBtns: { flexDirection: 'row', alignItems: 'center', marginVertical: 15, gap: 10 },
    dateBtn: { borderColor: '#022f66', borderWidth: 2, borderRadius: 20, paddingHorizontal: 15, paddingVertical: 5 },
    dateBtnText: { fontFamily: 'NotoSansTC-Medium', lineHeight: 20, fontSize: 15, color: '#022f66' },
    selectedDateBtn: { backgroundColor: '#022f66' },
    selectedDateBtnText: { color: 'white' },
    boxBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 15, borderColor: '#aaa', borderWidth: 2, borderRadius: 5 },
    boxBtnLeftText: { fontFamily: 'NotoSansTC-Medium', lineHeight: 24, fontSize: 18, color: 'black' },
    boxBtnRightText: { fontFamily: 'NotoSansTC-Medium', lineHeight: 24, fontWeight: 'bold', fontSize: 18, color: 'black' },
    horizonLine: { borderBottomWidth: 1, borderColor: "#ccc", height: 20, marginBottom: 20 },
    send: { width: '100%', backgroundColor: '#022f66', borderRadius: 20, marginTop: 25, padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent:'center'},
    sendText: { fontFamily: 'NotoSansTC-Medium', lineHeight: 20, fontSize: 16, color: '#fff' },
    completeBtnText: { fontFamily: 'NotoSansTC-Medium', fontSize: 14, color: 'white' },
    backBtn: { flexDirection: 'row', alignItems: "center", },
    backText: { color: 'white' },
    comDescriptionBox: {backgroundColor: "#F6F6F6", paddingHorizontal: 15, paddingVertical: 8, borderBottomColor: '#ddd', borderBottomWidth: 3},
    comContent: {backgroundColor: 'eee', paddingHorizontal: 15, paddingVertical: 10, },
    tableContainer: { marginBottom: 10, backgroundColor: '#F0F0F0', borderRadius: 10, overflow: 'hidden', width: '100%', maxWidth: 380, alignSelf: 'center', borderWidth: 1, borderColor: '#ddd' },
    row: { flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' },
    headerRow: { backgroundColor: '#999' },
    headerText: { width: 130, fontFamily: 'NotoSansTC-Medium', lineHeight: 20, fontSize: 16, color: 'white' },
    headerValueText: { flex: 1, flexWrap: 'wrap', paddingLeft: 15, fontFamily: 'NotoSansTC-Medium', lineHeight: 20, fontSize: 16, color: 'white' },
    cellText: { width: 130, borderRightColor: '#ddd', borderRightWidth: 1, fontFamily: 'NotoSansTC-Medium', lineHeight: 20, fontSize: 16, color: 'black' },
    cellValueText: { flex: 1, flexWrap: 'wrap', paddingLeft: 15, fontFamily: 'NotoSansTC-Medium', lineHeight: 20, fontSize: 16, color: 'black' },
});

export default AcountRecord;
