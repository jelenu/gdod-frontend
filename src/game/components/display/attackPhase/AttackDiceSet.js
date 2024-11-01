import React, { useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useGameContext } from "../../../context/GameContext";
import { getDiceImage } from "../../logic/attackPhase/attackDiceSetLogic";

const AttackDiceSet = () => {
  // Using the game context to access players and functions
  const { players, takeDamage, stealCoins } = useGameContext();

  // Getting the selected dice for Player 1 and Player 2
  const playerOneDiceSet = players[1].selectedDice; 
  const playerTwoDiceSet = players[2].selectedDice; 

  // Function to handle the logic of the dice set
  const handleDiceSet = (diceSet, opponentDiceSet, takeDamageFn, stealCoinsFn) => {
    // Iterating over each block of dice
    diceSet.forEach((diceBlock, blockIndex) => {
      // Iterating over each die within the block
      diceBlock.forEach((die, dieIndex) => {
        if (!die) return; // Skip if there is no die

        // Check for specific die numbers to determine actions
        if (die.number === 0 || die.number === 1) {
          const opponentDie = opponentDiceSet[blockIndex]?.[dieIndex]; // Get the corresponding opponent die
          if (!opponentDie) {
            takeDamageFn(); // If opponent die doesn't exist, apply damage
          }
        } else if (die.number === 4) {
          stealCoinsFn(); // If die number is 4, trigger stealing coins
        }
      });
    });
  };

  // useEffect hook to run logic after component mounts
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Handle the dice sets for both players after a delay
      handleDiceSet(playerOneDiceSet, playerTwoDiceSet, () => takeDamage(2, 1), () => stealCoins(1, 2, 1));
      handleDiceSet(playerTwoDiceSet, playerOneDiceSet, () => takeDamage(1, 1), () => stealCoins(2, 1, 1));
    }, 1000); // Delay of 1 second before executing

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array means this runs once on mount

  // Function to render each block of dice
  const renderDiceBlock = (diceBlock, blockIndex) => (
    <View key={`block-${blockIndex}`} style={styles.diceBlock}>
      {diceBlock.map((dieValue, index) => {
        // Get the image source for the die value
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
  );

  // Render the component's UI
  return (
    <View style={styles.container}>
      <Text>Player 2</Text>
      <View style={styles.diceSet}>{playerTwoDiceSet.map(renderDiceBlock)}</View>

      <Text>Player 1</Text>
      <View style={styles.diceSet}>{playerOneDiceSet.map(renderDiceBlock)}</View>
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
