import React, { useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useGameContext } from "../../../context/GameContext";
import { getDiceImage } from "../../logic/attackPhase/attackDiceSetLogic";

const AttackDiceSet = () => {
  const { players, takeDamage, stealCoins } = useGameContext();

  const playerOneDiceSet = players[1].selectedDice;
  const playerTwoDiceSet = players[2].selectedDice;

  useEffect(() => {
    // Establecemos un temporizador para ejecutar el efecto después de 1 segundo
    const timeoutId = setTimeout(() => {
      playerOneDiceSet.forEach((diceBlock, blockIndex) => {
        diceBlock.forEach((die, dieIndex) => {
          // Verificamos si el número del dado es 0 o 1
          if (die && (die.number === 0 || die.number === 1)) {
            // Obtenemos el dado correspondiente del oponente (player 2)
            const opponentDie = playerTwoDiceSet[blockIndex]?.[dieIndex] ?? null;
  
            // Verificamos si el dado del oponente es `null`
            if (opponentDie === null) {
              takeDamage(2, 1);
            }
          } else if (die && die.number === 4) {
            console.log("robar");
            stealCoins(1, 2, 1);
          }
        });
      });
    
      playerTwoDiceSet.forEach((diceBlock, blockIndex) => {
        diceBlock.forEach((die, dieIndex) => {
          // Verificamos si el número del dado es 0 o 1
          if (die && (die.number === 0 || die.number === 1)) {
            const opponentDie = playerOneDiceSet[blockIndex]?.[dieIndex] ?? null;
  
            // Verificamos si el dado del oponente es `null`
            if (opponentDie === null) {
              takeDamage(1, 1);
            }
          } else if (die && die.number === 4) {
            console.log("robar");
            stealCoins(2, 1, 1);
          }
        });
      });
    }, 1000); // Retardo de 1 segundo (1000 ms)

    // Limpiar el temporizador en caso de desmontaje del componente
    return () => clearTimeout(timeoutId);
  }, []);

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
