import React, { useState, useEffect } from "react"; // Importing necessary React modules
import { View, StyleSheet, Image } from "react-native"; // Importing components from React Native

// SelectedDice functional component to display the dice selected by the player
const SelectedDice = ({ player, turn }) => {
  // State to hold the selected dice values for the player
  const [selectedDice, setSelectedDice] = useState(player.selectedDice);

  // Function to get the corresponding image for each die value
  const getDiceImage = (dieValue) => {
    switch (dieValue) {
      case 0:
        return require('../../../../../assets/dice/shield_face.png'); // Shield face image
      case 1:
        return require('../../../../../assets/dice/helmet_face.png'); // Helmet face image
      case 2:
        return require('../../../../../assets/dice/steal_face.png'); // Steal face image
      case 3:
        return require('../../../../../assets/dice/arrow_face.png'); // Arrow face image
      case 4:
        return require('../../../../../assets/dice/sword_face.png'); // Sword face image
      default:
        return null; // Return null if dieValue doesn't match any case
    }
  };

  // Effect to update the selected dice when the turn changes
  useEffect(() => {
    setSelectedDice(player.selectedDice); // Update the selectedDice state with player's selectedDice
  }, [turn]); // Only runs when the turn changes

  return (
    <View style={styles.container}>
      {selectedDice.map((die, index) => (
        <Image
          key={index} // Unique key for each image to help React identify which items have changed
          style={styles.image}
          source={getDiceImage(die)} // Get the corresponding image for the die value
        />
      ))}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
    justifyContent: 'center', // Center items horizontally
  },
  image: {
    margin: 5, // Margin around each die image
    width: 60, // Width of each die image
    height: 60, // Height of each die image
  },
});

// Exporting the SelectedDice component for use in other parts of the application
export default SelectedDice;
