import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HealthBar = ({ player }) => {
  return (
    <View style={styles.container}>
      <Text>{player.name}</Text>
      <View style={styles.healthBar}>
        <View
          style={[styles.health, { width: `${(player.health / 15) * 100}%` }]}
        />
      </View>
      <Text>{player.health} / 15</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: 'center',
  },
  healthBar: {
    width: 150,
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  health: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
});

export default HealthBar;
