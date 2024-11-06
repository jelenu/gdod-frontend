// Importing necessary React and React Native modules
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
// Importing the custom hook to access the game context
import { useGameContext } from '../../../context/GameContext';

// SelectDiceButton functional component representing a button to end the turn
const SelectDiceButton = ({ setSelectable }) => {
    // Destructuring the endTurn function from the game context
    const { endTurn } = useGameContext();

    // Function to handle the button press event
    const handlePress = () => {
        endTurn();           // Calls the endTurn function from the context to end the player's turn
        setSelectable(false); // Updates the selectable state to false, indicating no more dice can be selected
    };

    return (
        // Pressable component that triggers handlePress when pressed
        <Pressable onPress={handlePress} style={styles.button}>
            {/* Displaying the button text */}
            <Text style={styles.buttonText}>End Turn</Text>
        </Pressable>
    );
};

// Styles for the SelectDiceButton component using StyleSheet
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

// Exporting the SelectDiceButton component to be used in other parts of the app
export default SelectDiceButton;
