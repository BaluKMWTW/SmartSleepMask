import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Settings = ({ navigation }) => {
  const getRandomStory = () => {
    const stories = [
        "The 'Settings' button in this app is like a mirage in a desert; you can see it, but you can't change anything—it's just there for looks.",
        "In a bold move against the tyranny of choice, our app’s settings are like a statue in the park: admired for their constancy, untouched by the whims of change.",
        "Our app’s settings are set in stone, offering the kind of permanence in a world of change that even the ancient pyramids would envy.",
        "The settings in this app are like a secret society—elusive, unchangeable, and shrouded in mystery, with members (features) that never seem to do anything different.",
        "This app takes 'user-friendly' to new heights—so confident in its perfection that the settings are like a puzzle box with no pieces, beautifully simple and utterly unchangeable."
    ];
    return stories[Math.floor(Math.random() * stories.length)];
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Back"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.center}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.text}>{getRandomStory()}</Text>
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

export default Settings;
