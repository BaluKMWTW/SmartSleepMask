import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Alarms = ({ navigation }) => {
  const getRandomStory = () => {
    const stories = [
    "Alarms are just the universe's way of testing how quickly you can hit 'snooze' while half asleep, a skill utterly unrelated to your true self's mastery.",
    "Waking up to the jarring sound of an alarm is just society's conspiracy to rob us of our dreams, both literally and metaphorically!",
    "Alarms assume you can't be trusted to wake up on your own, as if your inner clock isn't as punctual as a rooster on a mission.",
    "The irony of alarms is that they're designed to alert you, but they often just become the soundtrack to your morning denial.",
    "Needing an alarm to wake up is like saying you need a scripted reminder to be authentic—true spontaneity laughs in the face of scheduled alerts."
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
        <Text style={styles.title}>Alarms</Text>
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

export default Alarms;
