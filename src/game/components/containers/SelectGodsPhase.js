import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useGameContext } from '../../context/GameContext';
import GodsSet from '../display/gods/GodsSet';

// SelectGodsPhase functional component representing the phase where players select gods
const SelectGodsPhase = () => {
  // Accessing players and the current turn from the game context
  const { players, endPhase, selectGod } = useGameContext();
  
  // State to manage whether a player has passed their turn
  const [passedPlayers, setPassedPlayers] = useState({
    1: false,
    2: false,
  });

  // Function to handle the pass action for a player
  const handlePass = (playerId) => {
    setPassedPlayers((prev) => ({ ...prev, [playerId]: true })); // Mark player as passed
  };

  const handleSelect = (playerId, godId) =>{
    selectGod(playerId,godId)
    setPassedPlayers((prev) => ({ ...prev, [playerId]: true })); // Mark player as passed

  }

  useEffect(() => {
    if (passedPlayers[1] && passedPlayers[2]) {
      endPhase();
    }
  }, [passedPlayers]);

  return (
    <View style={styles.container}>
      {!passedPlayers[2] && (
        <GodsSet 
          player={players[2]} 
          onSelect={(playerId, godId) => handleSelect(playerId, godId)}
          onPass={() => handlePass(2)} // Pass action for Player 2
        />
      )}
      {!passedPlayers[1] && (
        <GodsSet 
          player={players[1]} 
          onSelect={(playerId, godId) => handleSelect(playerId, godId)}
          onPass={() => handlePass(1)} // Pass action for Player 1
        />
      )}
    </View>
  );
};

// Styles for the SelectGodsPhase component using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Exporting the SelectGodsPhase component to be used in other parts of the app
export default SelectGodsPhase;
