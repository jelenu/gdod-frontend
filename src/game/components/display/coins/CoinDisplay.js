import React from 'react'; // Importing React library
import { View, Text, StyleSheet } from 'react-native'; // Importing necessary components from React Native

// TurnDisplay functional component to show the current player's turn and round
const CoinDisplay = ({coin}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.turnText}>
        Gold: {coin}
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
export default CoinDisplay;
