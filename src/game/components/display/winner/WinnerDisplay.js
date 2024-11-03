import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Componente que muestra el mensaje de victoria
const WinnerDisplay = ({ winnerId }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`Player ${winnerId} Wins!`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo semitransparente
  },
  text: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WinnerDisplay;
