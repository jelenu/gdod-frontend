// Importing React to use React features
import React from "react";
// Importing necessary components and utilities from React Native
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
// Importing components for different phases of the game
import SelectDicePhase from "../game/components/containers/SelectDicePhase";
import AttackPhase from "../game/components/containers/AttackPhase";
import HealthBar from "../game/components/display/health/HealthBar";
import { useGameContext } from "../game/context/GameContext";
import CoinDisplay from "../game/components/display/coins/CoinDisplay";
import SelectGodsPhase from "../game/components/containers/SelectGodsPhase";
import WinnerDisplay from "../game/components/display/winner/WinnerDisplay"; // Importar el nuevo componente

// GameScreen functional component representing the local gameplay mode
const GameScreen = () => {
  // Accessing game context values: phase, players, and whoWins
  const { phase, players, whoWins } = useGameContext();

  // Extracting player one and player two from the players array
  const playerOne = players[1]; // Assuming player index starts from 1
  const playerTwo = players[2]; // Assuming player index starts from 2

  // Show WinnerDisplay if someone has won
  if (whoWins) {
    return <WinnerDisplay winnerId={whoWins} />;
  }

  const backgroundImage = require("../../assets/background.png");

  const backgroundImage2 = require("../../assets/background2.png");

  // Show the normal interface if there is no winner yet
  return (
    <View style={styles.container}>
      <View style={styles.playerContainer}>
        <ImageBackground
          source={backgroundImage}
          style={styles.backgroundImage}
          resizeMode="stretch"
        >
          <View style={styles.playerInfoContainer}>
            <HealthBar player={playerTwo} />
            <CoinDisplay coin={playerTwo.coin} />
          </View>
        </ImageBackground>
      </View>

      <View style={styles.phaseContainer}>
        {phase === 1 && <SelectDicePhase />}
        {phase === 2 && <SelectGodsPhase />}
        {phase === 3 && <AttackPhase />}
      </View>

      <View style={styles.playerContainer}>
        <ImageBackground
          source={backgroundImage2}
          style={styles.backgroundImage}
          resizeMode="stretch"
        >
          <View style={styles.playerInfoContainer}>
            <HealthBar player={playerOne} />
            <CoinDisplay coin={playerOne.coin} />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};
const screenHeight = Dimensions.get('window').height;

// Styles for the GameScreen component using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the full height of the screen
    justifyContent: "space-between", // Distributes items between top and bottom
    alignItems: "center", // Centers content horizontally
    backgroundColor: "black",
  },
  playerContainer: {
    width: "100%", // Full width for the background image
    height: screenHeight > 900 ? "25%": "30%",
    },

  backgroundImage: {
    width: "100%", // Full width for the background image
    height: "100%",
  },

  playerInfoContainer: {
    flexDirection: "row", // Aligns children in a row
    alignItems: "center", // Centers children vertically in the row
    justifyContent: "space-between", // Distributes items between top and bottom

  },
  phaseContainer: {
    width: "100%",
    height: screenHeight > 900 ? "50%": "40%",
    alignItems: "center",
  },
});

// Exporting the GameScreen component to be used in other parts of the app
export default GameScreen;
