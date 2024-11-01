import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import AttackDiceSet from "../../display/attackPhase/AttackDiceSet";
import { useGameContext } from "../../../context/GameContext";

const AttackPhase = () => {
  const { players, addCoins } = useGameContext();

  useEffect(() => {
    // Iterate through each player and count gold dice
    Object.keys(players).forEach((playerId) => {
      const player = players[playerId];
      const goldDiceCount = player.selectedDice.filter(dice => dice.gold).length; // Count how many selected dice have gold set to true
      addCoins(playerId, goldDiceCount); // Add coins based on the gold dice count
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>ATTACK PHASE</Text>
      <AttackDiceSet />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  diceSet: {
    flexDirection: "row",
  },
  diceImage: {
    width: 60, // Set appropriate width
    height: 60, // Set appropriate height
    margin: 5, // Add some margin between images
  },
});

export default AttackPhase;
