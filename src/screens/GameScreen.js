// Importing React to use React features
import React from 'react';
// Importing necessary components and utilities from React Native
import { View, StyleSheet } from 'react-native';
// Importing components for different phases of the game
import SelectDicePhase from '../game/components/containers/SelectDicePhase';
import AttackPhase from '../game/components/containers/AttackPhase';
import TurnDisplay from '../game/components/display/turn/TurnDisplay';
import HealthBar from '../game/components/display/health/HealthBar';
// Importing the custom hook to access the game context
import { useGameContext } from '../game/context/GameContext';
import CoinDisplay from '../game/components/display/coins/CoinDisplay';
import SelectGodsPhase from '../game/components/containers/SelectGodsPhase';
import WinnerDisplay from '../game/components/display/winner/WinnerDisplay'; // Importar el nuevo componente

// GameScreen functional component representing the local gameplay mode
const GameScreen = () => {
  // Accessing game context values: phase, players, and whoWins
  const { phase, players, whoWins } = useGameContext();

  // Extracting player one and player two from the players array
  const playerOne = players[1]; // Assuming player index starts from 1
  const playerTwo = players[2]; // Assuming player index starts from 2

  // Mostrar solo WinnerDisplay si alguien ha ganado
  if (whoWins) {
    return <WinnerDisplay winnerId={whoWins} />;
  }

  // Mostrar la interfaz normal si no hay un ganador aún
  return (
    <View style={styles.container}>
      {phase === 1 && <TurnDisplay />}

      <View style={styles.playerInfoContainer}>
        <HealthBar player={playerTwo} />
        <CoinDisplay coin={playerTwo.coin} />
      </View>

      {phase === 1 && <SelectDicePhase />}
      {phase === 2 && <SelectGodsPhase />}
      {phase === 3 && <AttackPhase />}

      <View style={styles.playerInfoContainer}>
        <CoinDisplay coin={playerOne.coin} />
        <HealthBar player={playerOne} />
      </View>
    </View>
  );
};

// Styles for the GameScreen component using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the full height of the screen
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  playerInfoContainer: {
    flexDirection: 'row', // Aligns children in a row
    alignItems: 'center', // Centers children vertically in the row
    marginBottom: 10, // Adds some spacing below the player info
  },
});

// Exporting the GameScreen component to be used in other parts of the app
export default GameScreen;
