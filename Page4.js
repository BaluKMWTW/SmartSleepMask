import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Page4 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const menuItems = [
    { name: 'Alarms', screen: 'Alarms' },
    { name: 'White noise', screen: 'WhiteNoise' },
    { name: 'Information', screen: 'Information' },
    { name: 'Credit', screen: 'Credit' },
    { name: 'Settings', screen: 'Settings' },
    { name: 'Logout', screen: 'Logout' },
    // ... add other menu items here
  ];

  // Function to render each item
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item}
      onPress={() => navigation.navigate(item.screen)} // Navigate to the screen associated with the item
    >
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Content</Text>
      <TextInput
        style={styles.searchBox}
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
        placeholder="Search..."
      />
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    marginTop: 90,
  },
  searchBox: {
    height: 40,
    marginHorizontal: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    borderColor: '#ddd',
    backgroundColor: '#f0f0f0',
  },
  item: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 1, // for shadow on Android
    // iOS-only shadow properties:
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 18,
  },
});

export default Page4;
