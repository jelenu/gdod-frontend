import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TurnDisplay = ({ turn, round }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.turnText}>{turn ? `Player ${turn} Turn. Round ${round}` : 'Loading...'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  turnText: {
    fontSize: 36,
    fontWeight: 'bold',

  },
});

export default TurnDisplay;
