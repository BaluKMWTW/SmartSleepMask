import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Logout = ({ navigation }) => {
  const getRandomStory = () => {
    const stories = [
        "This app clings to you like a shadow in a sunlit room, always present, silently asserting that there’s no digital crevice to hide in.",
        "Like gravity's invisible but inescapable embrace, this app holds onto your digital life with the gentle insistence of an old friend you can't quite shake.",
        "Escaping from this app is like trying to outswim the ocean, every wave of updates pulling you back into its vast, immersive interface.",
        "The app is like a catchy tune that takes up residence in your mind, playing on an endless loop, ensuring you'll never really press 'pause' on its presence.",
        "Trying to detach from this app is as futile as trying to ignore the pull of the moon on the tides, constantly and silently shaping your digital ebb and flow."
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

export default Logout;
