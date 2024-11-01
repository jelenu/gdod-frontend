import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import AttackDiceSet from "../../display/attackPhase/AttackDiceSet";
import { useGameContext } from "../../../context/GameContext";

const AttackPhase = () => {
  const { players, addCoins } = useGameContext();

  useEffect(() => {
    // Recorre cada jugador y cuenta los dados de oro en todas las listas de `selectedDice`
    Object.keys(players).forEach((playerId) => {
      const player = players[playerId];
  
      // Aplana la lista de listas en `selectedDice`, ignora null y undefined, y cuenta los dados con `gold: true`
      const goldDiceCount = player.selectedDice
        .filter((diceBlock) => diceBlock) // Filtra bloques nulos o undefined
        .flat() // Aplana los bloques de dados en una sola lista
        .filter((dice) => dice?.gold) // Utiliza optional chaining para verificar si `gold` es true
        .length; // Cuenta los dados de oro
  
      // Agrega monedas al jugador en función de la cantidad de dados de oro
      addCoins(playerId, goldDiceCount);
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
