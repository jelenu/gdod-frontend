// Importing necessary React and React Native modules
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

// DiceButton functional component representing a button for rolling dice
const DiceButton = ({ onPress }) => {
  return (
    // Pressable component that triggers the onPress function when pressed
    <Pressable onPress={onPress} style={styles.button}>
      {/* Displaying the button text */}
      <Text style={styles.buttonText}>Roll Dice</Text>
    </Pressable>
  );
};



// Styles for the DiceButton component using StyleSheet
const styles = StyleSheet.create({
  button: {
    paddingVertical: 5, // Padding inside the button
    paddingHorizontal: 10,
    backgroundColor: '#efb910', // Background color of the button
    borderRadius: 5, // Rounded corners for the button
  },
  buttonText: {
    color: '#FFFFFF', // Text color of the button
    fontSize: 16, // Font size of the button text
  },
});

// Exporting the DiceButton component to be used in other parts of the app
export default DiceButton;
