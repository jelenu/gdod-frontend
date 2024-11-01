// Importing React to use React features
import React from 'react';

// Importing necessary components and utilities from React Native
import { View, StyleSheet } from 'react-native';

// Importing components for different phases of the game
import SelectDicePhase from '../../../game/components/containers/phases/SelectDicePhase';
import AttackPhase from '../../../game/components/containers/phases/AttackPhase';
import TurnDisplay from '../../../game/components/display/turn/TurnDisplay';
import HealthBar from '../../../game/components/display/health/HealthBar';

// Importing the custom hook to access the game context
import { useGameContext } from '../../../game/context/GameContext';
import CoinDisplay from '../../../game/components/display/coins/CoinDisplay';

// LocalModeScreen functional component representing the local gameplay mode
const LocalModeScreen = () => {
  // Accessing game context values: isAttackPhase and players
  const { isAttackPhase, players } = useGameContext();

  // Extracting player one and player two from the players array
  const playerOne = players[1]; // Assuming player index starts from 1
  const playerTwo = players[2]; // Assuming player index starts from 2

  return (
    // Main container for the LocalModeScreen, styled with flexbox
    <View style={styles.container}>
      {/* Displaying the current turn information */}
      {!isAttackPhase && <TurnDisplay /> }
      {/* Displaying health bar for player two */}
      <HealthBar player={playerTwo} />
      <CoinDisplay coin={playerTwo.coin}/>

      {/* Conditional rendering based on the attack phase */}
      {isAttackPhase ? <AttackPhase /> : <SelectDicePhase />}

      <CoinDisplay coin={playerOne.coin}/>
      {/* Displaying health bar for player one */}
      <HealthBar player={playerOne} />

    </View>
  );
};

// Styles for the LocalModeScreen component using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the full height of the screen
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
});

// Exporting the LocalModeScreen component to be used in other parts of the app
export default LocalModeScreen;
