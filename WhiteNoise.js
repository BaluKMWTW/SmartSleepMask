import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WhiteNosie = ({ navigation }) => {
  const getRandomStory = () => {
    const stories = [
    "Why settle for a no-name app's white noise when you could be serenaded to sleep by the soothing sounds of Spotify's curated playlists, where each hiss and hum comes with a side of cool credibility?",
    "Choosing YouTube for your white noise experience is like having a personal DJ for your ears, with an endless mixtape of serene sounds just a click away, and the occasional ad to remind you you're still connected to civilization.",
    "Relying on a custom app for white noise is like trusting a stranger to whisper you lullabies—better to lean on Spotify's familiar interface, where the only surprises are in the Discover Weekly.",
    "With YouTube, not only do you get an ocean of white noise options, but also the chance to drift off to dreamland with a visual of waves gently crashing, because sometimes your ears need a little help from your eyes.",
    "The beauty of streaming white noise from an app like Spotify is that amidst the soundscapes of rain and rustling leaves, you might accidentally discover your new favorite ambient musician—serendipity at its finest."
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
        <Text style={styles.title}>About the white noise...</Text>
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

export default WhiteNosie;
