import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Information = ({ navigation }) => {
 

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Back"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.center}>
        <Text style={styles.title}>Its a sleep mask...</Text>
        <Text style={styles.date}>with some technology involved</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 70, // Adjusted marginTop to lower the button
    marginLeft: 20,
    color: '#321f71',
    alignSelf: 'flex-start',
  },
  center: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    marginTop: 10,
  },
  date: {
    fontSize: 20,
    marginTop: 15,
  },
  text: {
    fontSize: 24,
    marginTop: 15,
    textAlign: 'Left',
  },
});

export default Information;
