import React from 'react'; // Importing React library
import { View, Text, StyleSheet } from 'react-native'; // Importing necessary components from React Native
import { useGameContext } from '../../context/GameContext'; // Importing context to access game state

// TurnDisplay functional component to show the current player's turn and round
const TurnDisplay = () => {
  const { turn, round } = useGameContext(); // Destructuring turn and round from the game context

  return (
    <View style={styles.container}>
      <Text style={styles.turnText}>
        {turn ? `Player ${turn} Turn. Round ${round}` : 'Loading...'} {/* Displaying player's turn and round */}
      </Text>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    // Container styles can be added here if needed
  },
  turnText: {
    fontSize: 36, // Font size for the turn text
    fontWeight: 'bold', // Making the text bold
  },
});

// Exporting the TurnDisplay component for use in other parts of the application
export default TurnDisplay;
