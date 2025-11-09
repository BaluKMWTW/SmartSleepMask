// Page2.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';

const StatisticItem = ({ label, value }) => {
  return (
    <View style={styles.statisticItem}>
      <Text style={styles.statisticLabel}>{label}</Text>
      <Text style={styles.statisticValue}>{value}</Text>
    </View>
  );
};

const Page2 = () => {
  return (
    <View style={styles.slide}>
      <View style={styles.sleepHeader}>
        <Text style={styles.lastSleepTitle}>Last Sleep</Text>
        <CircularProgress
          size={200}
          width={3}
          fill={100 * (6.52 / 8)} // Assuming 8 hours is the full circle
          tintColor="#321f71"
          backgroundColor="#eee"
          style={styles.progressCircle}
        >
          {(fill) => (
            <Text style={styles.hours}>{'6.52 Hours'}</Text>
          )}
        </CircularProgress>
      </View>
      <View style={styles.expensesSection}>
        <StatisticItem label="Rem Sleep Cycles:" value="N/A" />
        <StatisticItem label="Heart Rate:" value="N/A" />
        <StatisticItem label="OSA:" value="N/A" />
        <StatisticItem label="O2 Levels" value="N/A" />
        {/* ... more StatisticItem components as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sleepHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  lastSleepTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    marginTop: 100,
  },
  progressCircle: {
    // Include any specific styles for your progressCircle here
  },
  hours: {
    fontSize: 18,
    color: '#321f71',
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    marginTop: -10,
  },
  expensesSection: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  statisticItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%', // Ensure the item uses the full width
  },
  statisticLabel: {
    fontSize: 22,
    color: '#000',
    textAlign: 'left',
  },
  statisticValue: {
    fontSize: 16,
    color: '#000',
    textAlign: 'right',
  },
});

export default Page2;


