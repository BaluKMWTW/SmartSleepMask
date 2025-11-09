import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Credit = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Back"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.center}>
        <Text style={styles.title}>Alpha Innavotors</Text>
        <Text style={styles.date}>Dreamer 1.0</Text>
        <Text style={styles.text}>Micahel Jakubowski</Text>
        <Text style={styles.text}>Abdi Shekhabdi</Text>
        <Text style={styles.text}>Ben Ramminger</Text>
        <Text style={styles.text}>Jan Komorowski</Text>
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
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 10,
  },
  date: {
    fontSize: 36,
    marginTop: 15,
  },
  text: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'Left',
  },
});

export default Credit;
