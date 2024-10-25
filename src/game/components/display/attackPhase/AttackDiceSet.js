import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useGameContext } from "../../../context/GameContext";
import { reorderDiceSets, getDiceImage } from "../../logic/attackPhase/attackDiceSetLogic";

const AttackDiceSet = () => {
  const { players, turn } = useGameContext();

  const playerOneDiceSet = players[1].selectedDice;
  const playerTwoDiceSet = players[2].selectedDice;

  const attackerDiceSet = turn === 1 ? playerOneDiceSet : playerTwoDiceSet;
  const defenderDiceSet = turn === 1 ? playerTwoDiceSet : playerOneDiceSet;

  const [reorderedAttackerDiceSet, reorderedDefenderDiceSet] = reorderDiceSets(
    attackerDiceSet,
    defenderDiceSet
  );

  const reorderedPlayerOneDiceSet =
    turn === 1 ? reorderedAttackerDiceSet : reorderedDefenderDiceSet;
  const reorderedPlayerTwoDiceSet =
    turn === 1 ? reorderedDefenderDiceSet : reorderedAttackerDiceSet;

  return (
    <View style={styles.container}>
      <Text>Player 2</Text>
      <View style={styles.diceSet}>
        {reorderedPlayerTwoDiceSet.map((dieValue, index) => {
          const imageSource = getDiceImage(dieValue);
          return (
            <View key={index} style={styles.diceContainer}>
              {imageSource ? (
                <Image source={imageSource} style={styles.diceImage} />
              ) : (
                <View style={styles.emptySpace} />
              )}
            </View>
          );
        })}
      </View>

      <Text>Player 1</Text>
      <View style={styles.diceSet}>
        {reorderedPlayerOneDiceSet.map((dieValue, index) => {
          const imageSource = getDiceImage(dieValue);
          return (
            <View key={index} style={styles.diceContainer}>
              {imageSource ? (
                <Image source={imageSource} style={styles.diceImage} />
              ) : (
                <View style={styles.emptySpace} />
              )}
            </View>
          );
        })}
      </View>
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
  diceContainer: {
    width: 60, // Ajustar el ancho de la imagen
    height: 60, // Ajustar la altura de la imagen
    margin: 5, // Agregar un margen entre las imágenes
  },
  diceImage: {
    width: 60, // Ajustar el ancho de la imagen
    height: 60, // Ajustar la altura de la imagen
    margin: 5, // Agregar un margen entre las imágenes
  },
  emptySpace: {
    width: 60, // El mismo ancho que la imagen
    height: 60, // El mismo alto que la imagen
    margin: 5, // El mismo margen que las imágenes
    backgroundColor: "transparent", // Color transparente para que no se vea
  },
});

export default AttackDiceSet;
