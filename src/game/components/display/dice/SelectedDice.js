import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";

const SelectedDice = ({ player, turn }) => {
  const [selectedDice, setSelectedDice] = useState(player.selectedDice); // State to store selected dice

  // Function to get the image based on the die value
  const getDiceImage = (dieValue) => {
    switch (dieValue) {
      case 0:
        return require('../../../../../assets/dice/sword_face.png');
      case 1:
        return require('../../../../../assets/dice/arrow_face.png');
      case 2:
        return require('../../../../../assets/dice/helmet_face.png');
      case 3:
        return require('../../../../../assets/dice/shield_face.png');
      case 4:
        return require('../../../../../assets/dice/steal_face.png');
      default:
        return null; // Return null for unsupported die values
    }
  };

  // Updates the selected dice only when the turn changes
  useEffect(() => {
    setSelectedDice(player.selectedDice);
  }, [turn]); // Executes only when the turn changes

  return (
    <View style={styles.container}>
      {selectedDice.map((die, index) => (
        <Image
          key={index}
          style={styles.image}
          source={getDiceImage(die.number)} // Selects the corresponding image for the die value
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    margin: 5,
    width: 60,
    height: 60,
  },
});

export default SelectedDice;
