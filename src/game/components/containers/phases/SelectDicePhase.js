import React from 'react';
import { View, StyleSheet } from 'react-native';
import TurnDisplay from '../../display/TurnDisplay';
import HealthBar from '../../display/health/HealthBar';
import { useGameContext } from '../../../context/GameContext';
import SelectedDice from '../../display/dice/SelectedDice';
import DiceSet from '../../display/dice/DiceSet';

const SelectDicePhase = () => {
  const { players, turn, round } = useGameContext();
  
  // Accediendo a los jugadores usando el ID
  const playerOne = players[1];
  const playerTwo = players[2];

  return (
    <View style={styles.container}>
      <TurnDisplay turn={turn} round={round} />

      {/* Mostrando el estado del jugador dos */}
      <HealthBar player={playerTwo} />
      <DiceSet turn={turn} player={playerTwo} />
      <SelectedDice player={playerTwo} turn={turn} />

      {/* Mostrando el estado del jugador uno */}
      <SelectedDice player={playerOne} turn={turn} />
      <DiceSet turn={turn} player={playerOne} />
      <HealthBar player={playerOne} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectDicePhase;
