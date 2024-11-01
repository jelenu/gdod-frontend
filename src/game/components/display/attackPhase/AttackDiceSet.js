import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useGameContext } from "../../../context/GameContext";
import { getDiceImage } from "../../logic/attackPhase/attackDiceSetLogic";

const AttackDiceSet = () => {
  const { players } = useGameContext();

  const playerOneDiceSet = players[1].selectedDice;
  const playerTwoDiceSet = players[2].selectedDice;


  return (
    <View style={styles.container}>
      <Text>Player 2</Text>
      <View style={styles.diceSet}>
        {playerTwoDiceSet.map((diceBlock, blockIndex) => (
          <View key={`block-${blockIndex}`} style={styles.diceBlock}>
            {diceBlock.map((dieValue, index) => {
              const imageSource = dieValue ? getDiceImage(dieValue) : null;
              return (
                <View key={`die-${index}`} style={styles.diceContainer}>
                  {imageSource ? (
                    <Image source={imageSource} style={styles.diceImage} />
                  ) : (
                    <View style={styles.emptySpace} />
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </View>

      <Text>Player 1</Text>
      <View style={styles.diceSet}>
        {playerOneDiceSet.map((diceBlock, blockIndex) => (
          <View key={`block-${blockIndex}`} style={styles.diceBlock}>
            {diceBlock.map((dieValue, index) => {
              const imageSource = dieValue ? getDiceImage(dieValue) : null;
              return (
                <View key={`die-${index}`} style={styles.diceContainer}>
                  {imageSource ? (
                    <Image source={imageSource} style={styles.diceImage} />
                  ) : (
                    <View style={styles.emptySpace} />
                  )}
                </View>
              );
            })}
          </View>
        ))}
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
  diceBlock: {
    flexDirection: "row",
    marginVertical: 10,
  },
  diceContainer: {
    width: 60,
    height: 60,
    margin: 5,
  },
  diceImage: {
    width: 60,
    height: 60,
  },
  emptySpace: {
    width: 60,
    height: 60,
    margin: 5,
    backgroundColor: "transparent",
  },
});

export default AttackDiceSet;
