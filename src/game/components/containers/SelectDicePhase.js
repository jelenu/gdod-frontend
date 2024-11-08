// Importing necessary React and React Native modules
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

// Importing the custom hook to access the game context
import { useGameContext } from "../../context/GameContext";

// Importing components for displaying selected dice and the available dice set
import SelectedDice from "../display/dice/SelectedDice";
import DiceSet from "../display/dice/DiceSet";

// SelectDicePhase functional component representing the phase where players select dice
const SelectDicePhase = () => {
  // Accessing players and the current turn from the game context
  const { players, turn } = useGameContext();

  // Accessing players using their IDs
  const playerOne = players[1]; // Reference to player one
  const playerTwo = players[2]; // Reference to player two

  return (
    // Main container for the SelectDicePhase, styled with flexbox
    <View style={styles.container}>
      {/* Displaying the available dice set for player two */}
      <View style={styles.diceSet}>
        <DiceSet turn={turn} player={playerTwo} />
      </View>
      
      {/* Displaying the selected dice for player two */}
      <View style={styles.selectedDice}>
        <SelectedDice player={playerTwo} turn={turn} />
      </View>

      {/* Displaying the selected dice for player one */}
      <View style={styles.selectedDice}>
        <SelectedDice player={playerOne} turn={turn} />
      </View>
      {/* Displaying the available dice set for player one */}
      <View style={styles.diceSet}>
        <DiceSet turn={turn} player={playerOne} />
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

// Styles for the SelectDicePhase component using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the full height of the screen
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
    width: screenWidth > 600 ? "40%" : "100%",
  },
  diceSet: {
    height: "30%",
    width: "100%",


  },
  selectedDice: {
    height: "20%",
    width: "100%",


  },
});

// Exporting the SelectDicePhase component to be used in other parts of the app
export default SelectDicePhase;
