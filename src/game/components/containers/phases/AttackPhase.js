import React from 'react'
import { View, StyleSheet,Text } from 'react-native';
import { useGameContext } from '../../../context/GameContext';
const AttackPhase = () => {
  const { players } = useGameContext();
  console.log(players)

  return (
    <View style={styles.container}>
        <Text>attack phase</Text>
        
      </View>
  )
  
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default AttackPhase