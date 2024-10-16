import React, { useState, startTransition } from 'react';
import { View, StyleSheet } from 'react-native';
import Dice from './Dice';
import DiceButton from './DiceButton';

const DiceSet = () => {
  // Single state to handle spinning state for all dice
  const [isSpinning, setIsSpinning] = useState(false);

  const startSpin = () => {
    // Initiates a transition to start spinning
    startTransition(() => {
      setIsSpinning(true); // Set spinning state to true
    });

    // Stops spinning after 1500 ms (1.5 seconds)
    setTimeout(() => {
      setIsSpinning(false); // Reset spinning state to false
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* Button to trigger dice spin */}
      <DiceButton onPress={startSpin} />
      <View style={styles.diceContainer}>
        {/* Renders 6 dice */}
        {[...Array(6)].map((_, index) => (
          <Dice key={index} spinning={isSpinning} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  diceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
});

export default DiceSet;
