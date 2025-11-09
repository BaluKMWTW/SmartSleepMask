import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useDreams } from './DreamContext';

const Page3 = () => {
  const [dream, setDream] = useState('');
  const { addDream } = useDreams();

  const handlePost = () => {
    addDream(dream);
    setDream(''); // Clear the input after posting
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Title and Text Input remain unchanged and will not move with the keyboard */}
      <Text style={styles.title}>Dream Log</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDream}
        value={dream}
        placeholder="Remember your dreams here..."
        placeholderTextColor="grey"
        multiline={true}
      />

      {/* KeyboardAvoidingView wraps only the button to move it with the keyboard */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
    <TouchableOpacity style={styles.button} onPress={handlePost}>
      <Text style={styles.buttonText}>Post</Text>
    </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 30,
  },
  input: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    width: '95%',
    minHeight: 100, // Set a min height for the input area
    padding: 10,
    fontSize: 18,
    color: 'black',
  },
  keyboardAvoidingView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10, // Adjust this value as needed
  },
  button: {
    backgroundColor: '#321f71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // Center button horizontally
    width: '90%', // Set a width for the button
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
});

export default Page3;
