import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Alarms from './Alarms';
import WhiteNoise from './WhiteNoise';
import Information from './Information';
import Credit from './Credit';
import Settings from './Settings';
import Logout from './Logout';
import { DreamProvider } from './DreamContext';
import FetchData from './src';
  
const Stack = createStackNavigator();

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Dreams');
  const StatisticItem = ({ label, value }) => {
    return (
      <View style={styles.statisticItem}>
        <Text style={styles.statisticLabel}>{label}</Text>
        <Text style={styles.statisticValue}>{value}</Text>
      </View>
    );
  };
  return (
    <Swiper style={styles.wrapper} showsButtons={false} loop={false} paginationStyle={styles.paginationStyle} dotStyle={styles.dotStyle} activeDotStyle={styles.activeDotStyle}>
      <Page1 activeTab={activeTab} setActiveTab={setActiveTab} />
      <FetchData/>
      <Page2 />
      <Page3 />
      <Page4 />
    </Swiper>
  );
};

const App = () => {
  return (
    <DreamProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false, // This hides the header for all screens
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Alarms" component={Alarms} />
          <Stack.Screen name="WhiteNoise" component={WhiteNoise} />
          <Stack.Screen name="Information" component={Information} />
          <Stack.Screen name="Credit" component={Credit} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Logout" component={Logout} />
          {/* Other screens go here */}
        </Stack.Navigator>
      </NavigationContainer>
    </DreamProvider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // Wrapper for the swiper component
  },
  /// BOTTOM BUTTONS BOTTOM BUTTONS BOTTOM BUTTONS BOTTOM BUTTONS BOTTOM BUTTONS
  paginationStyle: {
    position: 'absolute',
    bottom: 10, // Adjust the bottom position as needed
    left: 0,
    right: 0,
    justifyContent: 'center', // This centers the dots container
  },
  dotStyle: {
    width: 30, // Width of each dot
    height: 30, // Height of each dot
    borderRadius: 30, // Makes it circular
    marginHorizontal: 10000, // Spacing between dots
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Half-transparent white
  },
  activeDotStyle: {
    width: 30, // Width of each active dot
    height: 30, // Height of each active dot
    borderRadius: 30, // Makes it circular
    marginHorizontal: 1000, // Spacing between dots
    backgroundColor: '#321f71', // Solid white for the active dot
  },

});

export default App;