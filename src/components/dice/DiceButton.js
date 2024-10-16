import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const DiceButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {/* Button text indicating the action to be taken */}
      <Text style={styles.buttonText}>Girar dado</Text> {/* "Roll Dice" in Spanish */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default DiceButton;
