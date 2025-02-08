import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { I18nManager } from 'react-native';

// Set RTL to false for Chinese layout
I18nManager.forceRTL(false);

export default function App() {
    const today = new Date();
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
    const [formattedDateRange, setFormattedDateRange] = useState(""); 

    // Format the date as DD/MM/YYYY
    const formatDate = (date: Date | null) =>
        date
            ? `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
                .toString()
                .padStart(2, '0')}/${date.getFullYear()}`
            : '';
    
    // Get today's date formatted
    const todayDate = formatDate(today);

    // Effect to update formattedDateRange when selected dates change
    useEffect(() => {
        if (selectedStartDate && selectedEndDate) {
            setFormattedDateRange(`${formatDate(selectedStartDate)} - ${formatDate(selectedEndDate)}`);
        } else if (selectedStartDate) {
            setFormattedDateRange(formatDate(selectedStartDate)); // Show selected single date
        } else {
            setFormattedDateRange(todayDate); // Show today's date if nothing is selected
        }
    }, [selectedStartDate, selectedEndDate]);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.dateText}>{formattedDateRange}</Text>
            <CalendarPicker
                allowRangeSelection={true}
                allowBackwardRangeSelect={true} // Allows selecting end date before start date
                showDayStragglers={true}
                selectedDayColor="#022f66"
                selectedDayTextColor="#fff"
                onDateChange={(date: Date, type: string) => {
                    if (type === 'START_DATE') {
                        setSelectedStartDate(date);
                        setSelectedEndDate(null); // Reset end date for single date selection
                    } else if (type === 'END_DATE') {
                        setSelectedEndDate(date);
                    }
                }}
                maxDate={today}
                textStyle={{ color: '#000' }}
                previousTitle="<"
                nextTitle=">"
                width={350}
                height={400}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    dateText: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});
