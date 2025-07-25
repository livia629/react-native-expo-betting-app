import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, { Circle, Line } from 'react-native-svg';
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from '@react-native-picker/picker';

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
                        <MaterialIcons name="chevron-left" size={20} color="white" style={{marginTop: 5, fontWeight: 'bold'}} />
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

    // Function to format current time as "DD-MM-YYYY HH:mm"
    const formatCurrentTime = (currentTime: string) => {
        const [datePart, timePart] = currentTime.split(' '); // Separate date and time
        const [day, month, year] = datePart.split('/').map(num => num.padStart(2, '0')); // Ensure 2-digit format

        return `${day}-${month}-${year} ${timePart}`;
    };

    // Function to update date range based on button selection
    const updateDateRange = (button: string) => {
        const currentDate = new Date();
        let startDate: Date;

        switch (button) {
            case '今日':
                startDate = currentDate;
                setDateRange(`${formatDate(startDate)} - ${formatDate(startDate)}`);
                break;
            case '最近2日':
                startDate = new Date(currentDate);
                startDate.setDate(currentDate.getDate() - 1);
                setDateRange(`${formatDate(startDate)} - ${formatDate(currentDate)}`);
                break;
            case '最近8日':
                startDate = new Date(currentDate);
                startDate.setDate(currentDate.getDate() - 7);
                setDateRange(`${formatDate(startDate)} - ${formatDate(currentDate)}`);
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
            const currentDate = new Date();
            setDateRange(`${selectedDateRange} - ${formatDate(currentDate)}`);// Update date range when returning from DatePicker
            setSelectedButton(null); // Reset selected button to remove styling
        }
    }, [selectedDateRange]);

    const handlePress = (button: string) => {
        setSelectedButton(button);
        updateDateRange(button);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showShareButton, setShowShareButton] = useState("No");
    const [newRecord, setNewRecord] = useState({
        參考編號: '',
        日期時間: '',
        投注類別: '',
        細節: '',
        支出: '',
        存入: '',
        showShare: "No",
    });

    const [acountDatas, setAcountDatas] = useState([
        [
            { key: '參考編號', value: '-' },
            { key: '日期 / 時間', value: '-' },
            { key: '投注類別', value: '-' },
            { key: '細節', value: '2025年7月25日03:11 之戶口結餘: $54.60' },
            { key: '支出', value: '-' },
            { key: '存入', value: '-' },
        ],
        [
            { key: '參考編號', value: '5580' },
            { key: '日期 / 時間', value: '25-07-2025 08:35' },
            { key: '投注類別', value: '-' },
            { key: '細節', value: '總費盡即時存款至投注戶口 (參考編號: 2025062900000411)' },
            { key: '支出', value: '-' },
            { key: '存入', value: '$500.0' },
        ],
    ]);

    const handleAddRecord = () => {
        const newEntry = [
            { key: '參考編號', value: newRecord.參考編號 || '-', showShare: showShareButton },
            { key: '日期 / 時間', value: newRecord.日期時間 || '-' },
            { key: '投注類別', value: newRecord.投注類別 || '-' },
            { key: '細節', value: newRecord.細節 || '-' },
            { key: '支出', value: newRecord.支出 || '-' },
            { key: '存入', value: newRecord.存入 || '-' },
        ];

        setAcountDatas([...acountDatas, newEntry]);
        setIsModalVisible(false); // Close modal
        setNewRecord({ 參考編號: '', 日期時間: '', 投注類別: '', 細節: '', 支出: '', 存入: '', showShare: "No" }); // Reset form
        setShowShareButton("No");
    };

    const imageMap: { [key: string]: any } = {
      '圖片_20250201015452.png': require('../../assets/images/圖片_20250201015452.png'),
      '圖片_20250201015432.png': require('../../assets/images/圖片_20250201015432.png'),
      '圖片_20250201015430.png': require('../../assets/images/圖片_20250201015430.png'),
      '圖片_20250201015427.png': require('../../assets/images/圖片_20250201015427.png'),
      '圖片_20250201015418.png': require('../../assets/images/圖片_20250201015418.png'),
      '圖片_20250201015434.png': require('../../assets/images/圖片_20250201015434.png'),
    };
    
    const tabOptions = (imagePath: string, label: string) => ({
      tabBarLabel: "",
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <View style={styles.tabContainer}>
          <Image source={imageMap[imagePath]} style={[styles.icon, focused && styles.focusedTab]} />
          <Text style={styles.tabText}>{label}</Text>
        </View>
      ),
    });

    const [isTradeTypePickerVisible, setIsTradeTypePickerVisible] = useState(false);
    const [selectedTradeType, setSelectedTradeType] = useState("所有");

    const [isTypePickerVisible, setIsTypePickerVisible] = useState(false);
    const [selectedType, setSelectedType] = useState("所有");


    return (
        <View style={styles.entireContainer}>
            <View style={styles.headerTop}></View>
            <View style={styles.topContainer}>
                <Text style={styles.text}>時間: {formatCurrentTime(currentTime)}</Text>
                <Text style={styles.text}>投注戶口號碼: {account}</Text>
                <Text style={styles.text}>結餘: ${balance}</Text>
            </View>
            <LinearGradient
                colors={["#ccc", "#eee"]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.gradientBox}
            />
            {!isCompleteScreen ? (
                <View style={styles.bottomContainer}>
                    <Text style={styles.destext}>每次最多可以搜尋過去30天內其中8天。 (以香港時間計算）</Text>
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
                    <TouchableOpacity style={[styles.boxBtn, { marginBottom: 10 }]} onPress={() => setIsTradeTypePickerVisible(true)}>
                        <Text style={styles.boxBtnLeftText}>交易種類</Text>
                        <Text style={styles.boxBtnRightText}>{selectedTradeType}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxBtn} onPress={() => setIsTypePickerVisible(true)}>
                        <Text style={styles.boxBtnLeftText}>顯示種類</Text>
                        <Text style={styles.boxBtnRightText}>{selectedType}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.send} onPress={() => setIsCompleteScreen(true)}>
                        <Text style={styles.sendText}>傳送</Text>
                    </TouchableOpacity>

                    <Modal
                        visible={isTradeTypePickerVisible}
                        transparent
                        animationType="slide"
                        onRequestClose={() => setIsTradeTypePickerVisible(false)}
                    >
                        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                            <View style={{ backgroundColor: 'white', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                                    <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>交易種類</Text>
                                    <TouchableOpacity onPress={() => setIsTradeTypePickerVisible(false)} style={{ position: 'absolute', right: 0, padding: 5 }}>
                                        <Text style={{ fontSize: 22, color: '#888' }}>×</Text>
                                    </TouchableOpacity>
                                </View>
                                <Picker
                                    selectedValue={selectedTradeType}
                                    onValueChange={(itemValue) => setSelectedTradeType(itemValue)}
                                    style={{ width: '100%', marginBottom: 20 }}
                                >
                                    <Picker.Item label="所有" value="所有" />
                                    <Picker.Item label="賽馬" value="賽馬" />
                                    <Picker.Item label="足球" value="足球" />
                                    <Picker.Item label="六合彩" value="六合彩" />
                                </Picker>
                                <TouchableOpacity
                                    style={{ marginTop: 10, backgroundColor: "#022f77", borderRadius: 10, padding: 12, alignItems: 'center' }}
                                    onPress={() => setIsTradeTypePickerVisible(false)}
                                >
                                    <Text style={{ color: "white", fontSize: 16 }}>完成</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        visible={isTypePickerVisible}
                        transparent
                        animationType="slide"
                        onRequestClose={() => setIsTypePickerVisible(false)}
                    >
                        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                            <View style={{ backgroundColor: 'white', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                                    <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>顯示種類</Text>
                                    <TouchableOpacity onPress={() => setIsTypePickerVisible(false)} style={{ position: 'absolute', right: 0, padding: 5 }}>
                                        <Text style={{ fontSize: 22, color: '#888' }}>×</Text>
                                    </TouchableOpacity>
                                </View>
                                <Picker
                                    selectedValue={selectedType}
                                    onValueChange={(itemValue) => setSelectedType(itemValue)}
                                    style={{ width: '100%', marginBottom: 20 }}
                                >
                                    <Picker.Item label="所有" value="所有" />
                                    <Picker.Item label="已派彩 / 已退款 / 已扣扣之交易" value="已派彩 / 已退款 / 已扣扣之交易" />
                                </Picker>
                                <TouchableOpacity
                                    style={{ marginTop: 10, backgroundColor: "#022f77", borderRadius: 10, padding: 12, alignItems: 'center' }}
                                    onPress={() => setIsTypePickerVisible(false)}
                                >
                                    <Text style={{ color: "white", fontSize: 16 }}>完成</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                </View>
            ) : (
                <>
                    <View style={styles.comDescriptionBox}>
                        <Text style={styles.text}>搜尋時段: {dateRange.replace('-', ' 至 ')}</Text>
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
                        <MaterialIcons name="add" size={20} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.comContent}>
                        <ScrollView contentContainerStyle={{ paddingBottom: 180 }}>
                            {acountDatas.map((acountdata, index) => (
                                <View key={index} style={styles.tableContainer}>
                                    {acountdata.map((row, rowIndex) => (
                                    <View key={rowIndex} style={[styles.row, rowIndex === 0 && styles.headerRow]}>
                                        <Text style={rowIndex === 0 ? styles.headerText : styles.cellText}>{row.key}</Text>
                                        <Text style={rowIndex === 0 ? styles.headerValueText : styles.cellValueText}>{row.value}</Text>
                                        {row.key === "參考編號" && row?.showShare === "Yes" && (
                                            <TouchableOpacity style={styles.shareButton}>
                                                <Svg width="20" height="20" viewBox="0 0 40 40" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                    <Circle cx="30" cy="10" r="5" />
                                                    <Circle cx="10" cy="20" r="5" />
                                                    <Circle cx="30" cy="30" r="5" />
                                                    <Line x1="25" y1="10" x2="15" y2="20" />
                                                    <Line x1="25" y1="30" x2="15" y2="20" />
                                                </Svg>
                                                <Text style={styles.shareText}>分享注項</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    ))}
                                </View>
                            ))}
                        </ScrollView>
                        
                        
                        <Modal visible={isModalVisible} transparent={true} animationType="slide">
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>新增記錄</Text>
                                    {Object.keys(newRecord).map((key, index) => (
                                        key !== "showShare" && ( // ✅ Prevent showing "showShare" in inputs
                                            <TextInput
                                                key={index}
                                                style={styles.input}
                                                placeholder={key}
                                                value={newRecord[key as keyof typeof newRecord]}
                                                onChangeText={(text) => setNewRecord({ ...newRecord, [key]: text })}
                                                multiline={true} 
                                                numberOfLines={4}
                                                textAlignVertical="top"
                                                returnKeyType="default"
                                            />
                                        )
                                    ))}
                                    <Text style={styles.label}>是否顯示 分享注項?</Text>
                                    <Picker
                                        selectedValue={showShareButton}
                                        onValueChange={(itemValue) => setShowShareButton(itemValue)}
                                        style={styles.picker}
                                    >
                                        <Picker.Item label="否" value="No" />
                                        <Picker.Item label="是" value="Yes" />
                                    </Picker>
                                    <View style={styles.modalButtons}>
                                        <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
                                            <Text style={styles.modalButtonText}>取消</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.modalButton} onPress={handleAddRecord}>
                                            <Text style={styles.modalButtonText}>確定</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </>
            )}

            <View style={styles.bottomTabs}>
                <View style={styles.bottomTabAlign}>
                    <TouchableOpacity>{tabOptions('圖片_20250201015452.png', '主頁').tabBarIcon({ focused: false })}</TouchableOpacity>
                    <TouchableOpacity>{tabOptions('圖片_20250201015432.png', '馬上發現').tabBarIcon({ focused: false })}</TouchableOpacity>
                    <TouchableOpacity>{tabOptions('圖片_20250201015430.png', '投注區').tabBarIcon({ focused: false })}</TouchableOpacity>
                    <TouchableOpacity>{tabOptions('圖片_20250201015427.png', '電子錢包').tabBarIcon({ focused: false })}</TouchableOpacity>
                    <TouchableOpacity>{tabOptions('圖片_20250201015418.png', '更多').tabBarIcon({ focused: false })}</TouchableOpacity>
                    <TouchableOpacity>{tabOptions('圖片_20250201015434.png', '我').tabBarIcon({ focused: false })}</TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    entireContainer: {height: '100%', position: 'relative'},
    headerTop: {height: 8, backgroundColor: '#022f77'},
    topContainer: { backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 10,  },
    text: { fontFamily: 'NotoSansTC-Medium', lineHeight: 20, fontSize: 14, color: 'black' },
    destext: { fontFamily: 'NotoSansTC-Regular', lineHeight: 20, fontSize: 14, color: 'black' },
    bottomContainer: { backgroundColor: '#eee', paddingHorizontal: 15, paddingVertical: 8,   },
    dateBtns: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 15, gap: 10 },
    dateBtn: { borderColor: '#022f77', borderWidth: 1, borderRadius: 20, paddingHorizontal: 15, paddingVertical: 3 },
    dateBtnText: { fontFamily: 'NotoSansTC-Medium', lineHeight: 20, fontSize: 15, color: '#022f77' },
    selectedDateBtn: { backgroundColor: '#022f77' },
    selectedDateBtnText: { color: 'white' },
    boxBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 15, borderColor: '#888', borderWidth: 1.3, borderRadius: 5 },
    boxBtnLeftText: { fontFamily: 'NotoSansTC-Medium', lineHeight: 24, fontSize: 18, color: 'black' },
    boxBtnRightText: { fontFamily: 'NotoSansTC-bold', lineHeight: 24, fontWeight: 'bold', fontSize: 18, color: 'black' },
    horizonLine: { borderBottomWidth: 1, borderColor: "#888", height: 25, marginBottom: 25 },
    send: { width: '100%', backgroundColor: '#022f77', borderRadius: 20, marginTop: 25, padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent:'center'},
    sendText: { fontFamily: 'NotoSansTC-Medium', lineHeight: 20, fontSize: 16, color: '#fff' },
    completeBtnText: { fontFamily: 'NotoSansTC-bold', fontSize: 14, color: 'white', fontWeight: 'bold', marginTop: 5 },
    backBtn: { flexDirection: 'row', alignItems: "center", },
    backText: { color: 'white', fontWeight: 'bold', marginTop: 5 },
    comDescriptionBox: {backgroundColor: "#F6F6F6", paddingHorizontal: 15, paddingVertical: 8, },
    comContent: {backgroundColor: 'eee', paddingHorizontal: 15, paddingVertical: 10, },
    tableContainer: { marginBottom: 10, backgroundColor: '#F0F0F0', borderRadius: 10, overflow: 'hidden', width: '100%', maxWidth: 380, alignSelf: 'center', borderWidth: 1, borderColor: '#ddd' },
    row: { flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 5, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' },
    headerRow: { backgroundColor: '#888', height: 42, paddingVertical: 5, verticalAlign: 'middle' },
    headerText: { width: 130, fontFamily: 'NotoSansTC-Medium', fontWeight: '600', lineHeight: 42, fontSize: 17, color: 'white' },
    headerValueText: { flex: 1, flexWrap: 'wrap', paddingLeft: 15, fontFamily: 'NotoSansTC-Medium', lineHeight: 40, fontSize: 16, color: 'white' },
    cellText: { paddingVertical: 5, width: 130, borderRightColor: '#ddd', borderRightWidth: 1, fontFamily: 'NotoSansTC-Medium', lineHeight: 20, fontSize: 16, color: 'black' },
    cellValueText: { paddingVertical: 5, flex: 1, flexWrap: 'wrap', paddingLeft: 15, fontFamily: 'NotoSansTC-Medium', lineHeight: 20, fontSize: 16, color: 'black' },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFD700', // Gold/yellow color
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3, // For Android shadow
    },
    shareIcon: {
        marginRight: 5,
    },
    shareText: {
        fontFamily: 'NotoSansTC-Medium',
        fontSize: 14,
        color: 'black',
        fontWeight: '600',
        includeFontPadding: false
    },
    addButton: {
        position: 'absolute',
        right: 20,
        top: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent: { width: 300, backgroundColor: 'white', padding: 20, borderRadius: 10 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 10, borderRadius: 5 },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
    modalButton: { padding: 10, backgroundColor: '#022f77', borderRadius: 5 },
    modalButtonText: { color: 'white' },
    bottomTabs: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        width: '100%'
    },
    bottomTabAlign: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    tabContainer: {
        alignItems: 'center',
        marginVertical: 3,
        flex: 1,
    },
    icon: {
        width: 30, // Reduced to avoid overlap
        height: 30,
        resizeMode: "contain",
    },
    focusedTab: {
        backgroundColor: '#E1EBEE',
        borderRadius: 20,
    },
    tabText: {
        fontSize: 12,
        color: 'black',
        fontFamily: 'NotoSansTC-Regular',
        fontWeight: 'bold',
    },
    gradientBox: {
        height: 5, // ✅ Set height to 5px
        width: "100%", // ✅ Full width
    },
    picker: { height: 50, width: "100%", marginBottom: 10 },
    label: { fontSize: 16, fontWeight: "bold", marginTop: 10, marginBottom: 5 },
});

export default AcountRecord;
