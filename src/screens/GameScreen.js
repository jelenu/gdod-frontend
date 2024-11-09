import React from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
import SelectDicePhase from "../game/components/containers/SelectDicePhase";
import AttackPhase from "../game/components/containers/AttackPhase";
import HealthBar from "../game/components/display/health/HealthBar";
import { useGameContext } from "../game/context/GameContext";
import CoinDisplay from "../game/components/display/coins/CoinDisplay";
import SelectGodsPhase from "../game/components/containers/SelectGodsPhase";
import WinnerDisplay from "../game/components/display/winner/WinnerDisplay";

const GameScreen = () => {
  const { phase, players, whoWins } = useGameContext();
  const playerOne = players[1];
  const playerTwo = players[2];

  if (whoWins) {
    return <WinnerDisplay winnerId={whoWins} />;
  }

  const backgroundImage = require("../../assets/background.png");
  const backgroundImage2 = require("../../assets/background2.png");

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
  },
  playerContainer: {
    width: "100%",
    height: screenHeight > 900 ? "25%" : "30%",
    position: "relative", // Para que los elementos absolutos dentro puedan posicionarse con referencia al contenedor
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  playerInfoContainer: {
    position: "absolute",
    bottom: 0, // Coloca el contenedor al fondo de playerContainer
    height: "80%", // Hace que ocupe el 80% de la altura de playerContainer
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  phaseContainer: {
    width: "100%",
    height: screenHeight > 900 ? "50%" : "40%",
    alignItems: "center",
  },
});

export default GameScreen;
