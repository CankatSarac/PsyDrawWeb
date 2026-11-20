import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TrialCounter() {
  const [daysLeft, setDaysLeft] = useState(7);

  useEffect(() => {
    checkTrialStatus();
  }, []);

  const checkTrialStatus = async () => {
    try {
      const trialStartDate = await AsyncStorage.getItem('trialStartDate');
      if (!trialStartDate) {
        const startDate = new Date().toISOString();
        await AsyncStorage.setItem('trialStartDate', startDate);
        setDaysLeft(7);
      } else {
        const start = new Date(trialStartDate);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const remainingDays = Math.max(0, 7 - diffDays);
        setDaysLeft(remainingDays);
      }
    } catch (error) {
      console.error('Error checking trial status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {daysLeft > 0
          ? `${daysLeft} days left in your trial`
          : 'Your trial has ended'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFB88E',
    borderRadius: 8,
    margin: 16,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}); 