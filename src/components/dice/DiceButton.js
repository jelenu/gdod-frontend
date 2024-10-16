import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const DiceButton = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      {/* Button text indicating the action to be taken */}
      <Text style={styles.buttonText}>Girar dado</Text>
    </Pressable>
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
