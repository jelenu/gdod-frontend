import React from 'react';
import { View, StyleSheet } from 'react-native';

import SelectDicePhase from '../../../game/components/containers/phases/SelectDicePhase';
import AttackPhase from '../../../game/components/containers/phases/AttackPhase';
import TurnDisplay from '../../../game/components/display/TurnDisplay';
import HealthBar from '../../../game/components/display/health/HealthBar'
import { useGameContext } from '../../../game/context/GameContext';

const LocalModeScreen = () => {
  const { isAttackPhase, players } = useGameContext();

  const playerOne = players[1];
  const playerTwo = players[2];
  return (
    <View style={styles.container}>
            <TurnDisplay />
            <HealthBar player={playerTwo} />

      {isAttackPhase ? <AttackPhase /> : <SelectDicePhase />}

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

export default LocalModeScreen;
