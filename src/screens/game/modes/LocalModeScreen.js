import React from 'react';
import { View, StyleSheet } from 'react-native';

import SelectDicePhase from '../../../game/components/containers/phases/SelectDicePhase';
import AttackPhase from '../../../game/components/containers/phases/AttackPhase';

import { useGameContext } from '../../../game/context/GameContext';

const LocalModeScreen = () => {
  const { isAttackPhase } = useGameContext();

  return (
    <View style={styles.container}>
      {isAttackPhase ? <AttackPhase /> : <SelectDicePhase />}
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
