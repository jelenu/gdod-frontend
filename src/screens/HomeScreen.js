// Importing React to use React features
import React from 'react';

// Importing necessary components and utilities from React Native
import { View, Text, Pressable, StyleSheet } from 'react-native';

// HomeScreen functional component that receives navigation as a prop
const HomeScreen = ({ navigation }) => {
  return (
    // Main container for the HomeScreen, styled with flexbox
    <View style={styles.container}>
      {/* Title of the game displayed at the top of the screen */}
      <Text style={styles.title}> Gods: Dice of destiny</Text>

      {/* Button for local play */}
      <Pressable 
        // Styling the button with conditional background color based on pressed state
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#ddd' : '#6200EE' } // Changes color when pressed
        ]}
        // Navigating to GameBoard screen with 'Local' mode when pressed
        onPress={() => navigation.navigate('GameBoard', { gameModeScreen: 'Local' })} 
      >
        {/* Button text for local play */}
        <Text style={styles.buttonText}>Jugar Local</Text>
      </Pressable>

      {/* Button for playing against AI */}
      <Pressable 
        // Styling the button with conditional background color based on pressed state
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#ddd' : '#6200EE' } // Changes color when pressed
        ]}
        // Navigating to GameBoard screen with 'AI' mode when pressed
        onPress={() => navigation.navigate('GameBoard', { gameModeScreen: 'AI' })} 
      >
        {/* Button text for playing against AI */}
        <Text style={styles.buttonText}>Jugar contra la IA</Text>
      </Pressable>

      {/* Button for online play */}
      <Pressable 
        // Styling the button with conditional background color based on pressed state
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#ddd' : '#6200EE' } // Changes color when pressed
        ]}
        // Navigating to GameBoard screen with 'Online' mode when pressed
        onPress={() => navigation.navigate('GameBoard', { gameModeScreen: 'Online' })} 
      >
        {/* Button text for online play */}
        <Text style={styles.buttonText}>Jugar Online</Text>
      </Pressable>
    </View>
  );
};

// Styles for the HomeScreen component using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the full height of the screen
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    padding: 20, // Adds padding around the container
  },
  title: {
    fontSize: 24, // Sets font size for the title
    marginBottom: 20, // Adds space below the title
  },
  button: {
    padding: 15, // Adds padding inside the button
    borderRadius: 5, // Rounds the corners of the button
    marginVertical: 10, // Adds vertical margin between buttons
    width: '100%', // Sets button width to 100% of its container
    alignItems: 'center', // Centers text inside the button
  },
  buttonText: {
    color: 'white', // Sets text color to white
    fontSize: 16, // Sets font size for button text
  },
});

// Exporting the HomeScreen component to be used in other parts of the app
export default HomeScreen;
