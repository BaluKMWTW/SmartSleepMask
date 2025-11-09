// Page1.js
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, StatusBar, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDreams } from './DreamContext';

const Page1 = ({ activeTab, setActiveTab }) => {
  const { dreams } = useDreams();
  const navigation = useNavigation();
  const [alarms, setAlarms] = useState({
    "6:00 AM": false,
    "6:30 AM": false,
    "7:15 AM": false,
    "10:30 AM": false,
  });

  const toggleAlarm = (time) => {
    setAlarms(prev => ({
      ...prev,
      [time]: !prev[time]
    }));
  };

  return (
    <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.settings}>Settings</Text>
          <Text style={styles.profileTitle}>Profile</Text>
          <Text style={styles.logout}>Logout</Text>
        </View>
        <View style={styles.profileSection}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileMantra}>Dream Big!!</Text>

          <View style={styles.segmentControl}>
            <TouchableOpacity
              style={[styles.segmentButton, activeTab === 'Dreams' && styles.activeSegment]}
              onPress={() => setActiveTab('Dreams')}
            >
              <Text style={[styles.segmentText, activeTab === 'Dreams' && styles.activeSegmentText]}>Dreams</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.segmentButton, activeTab === 'Alarms' && styles.activeSegment]}
              onPress={() => setActiveTab('Alarms')}
            >
              <Text style={[styles.segmentText, activeTab === 'Alarms' && styles.activeSegmentText]}>Alarms</Text>
            </TouchableOpacity>
          </View>

        {/* Dynamically rendered dreams when the Dreams tab is active */}
        {activeTab === 'Dreams' && (
          <View style={styles.dreamsContainer}>
            {dreams.map((dream, index) => (
              <View key={index} style={styles.dreamEntry}>
                <Text style={styles.dreamTitle}>{`Dream ${index + 1}`}</Text>
                <Text style={styles.dreamDescription}>{dream}</Text>
              </View>
            ))}
          </View>
        )}

          {activeTab === 'Alarms' && (
            <View style={styles.alarmsContainer}>
              {["6:00 AM", "6:30 AM", "7:15 AM", "10:30 AM"].map((alarmTime, index) => (
                <View key={index} style={styles.alarmEntry}>
                  <Text style={styles.alarmText}>{alarmTime}</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#321f71" }}
                    thumbColor={alarms[alarmTime] ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={() => toggleAlarm(alarmTime)}
                    value={alarms[alarmTime]}
                    style={styles.alarmToggle}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  // ... styles related to the first page ...
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#321f71',
    paddingTop: StatusBar.currentHeight,
    height: 300, // Set the header height to 300
    justifyContent: 'flex-start', // Align children to the start
    alignItems: 'flex-start', // Align children to the start
    paddingTop: StatusBar.currentHeight, // Ensure it's not covered by the status bar
  },
  settings: {
    color: '#FFF',
    position: 'absolute', // Position settings absolutely
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 85 : 85, // Position from the top plus status bar height if it exists
    left: 20, // Distance from the left
    // Add any additional styling here
  },
  logout: {
    color: '#FFF',
    position: 'absolute', // Position logout absolutely
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 85 : 85, // Position from the top plus status bar height if it exists
    right: 20, // Distance from the right
    // Add any additional styling here
  },
  profileTitle: {
    color: '#FFF',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center', // Centers the title in the flex container
    position: 'absolute', // Keep the title positioned absolutely
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 65 : 65, // Adjust the top position
  },
  profileSection: {
    flex: 1, // Take up all available space
    justifyContent: 'flex-start', // Align children to the start vertically
    alignItems: 'center', // Align children to the center horizontally
    paddingTop: 45, // Push content down below the header
  },
  profileName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 16, // Provide some space above the profile name, adjust as needed
  },
  profileMantra: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#000',
    marginTop: 8, // Provide some space above the profile name, adjust as needed
  },
  segmentControl: {
    flexDirection: 'row',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#000',
    margin: 20,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  activeSegment: {
    backgroundColor: '#321f71',
  },
  segmentText: {
    color: '#000',
    fontWeight: '600',
  },
  activeSegmentText: {
    color: '#FFF',
    fontWeight: '600',
  },

  dreamsContainer: {
    // Assuming you have a container for all dreams, ensure it has the necessary width if you're using percentages for dream entries
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20, // Add some padding at the bottom if needed
  },
  dreamEntry: {
    // Adjust the width here. For example, to make each dream entry take up 90% of its container's width:
    width: '90%',
    // Other styling for the dream entry...
    padding: 20, // Example padding
    marginVertical: 10, // Space between each dream entry
    backgroundColor: '#e9ecef', // Example background color
    borderRadius: 10, // Example border radius for rounded corners
  },
  dreamTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10, // Space between the title and the description
    textAlign: 'center', // Center-align the dream titles
  },
  dreamDescription: {
    fontSize: 14,
    textAlign: 'justify', // Justify-align the dream descriptions for better readability
  },
    alarmEntry: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between', // Space between items
    alignItems: 'center', // Align items vertically
    width: '90%', // Specifies the width of the alarm entries
    paddingVertical: 30, // Increase vertical padding for larger touch area
    paddingHorizontal: 20, // Padding on the sides
    marginVertical: 5, // Increase vertical margin for more space between entries
    backgroundColor: '#e9ecef', // Sets a light gray background color
    borderRadius: 10, // Rounds the corners
  },
  alarmText: {
    fontSize: 24, // Increase the font size for better readability
    fontWeight: 'bold',
  },
  alarmToggle: {
    // Optional styling for toggle switch if needed
  },
  // Remaining styles...
});

export default Page1;
