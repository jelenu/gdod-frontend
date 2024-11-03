import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const GodsSet = ({ player, onSelect, onPass }) => { // Añade onPass como prop

  return (
    <View style={styles.container}>
      <Text>Player {player.id}</Text>
      {player.gods.map((god, index) => (
        <View key={index} style={styles.godContainer}>
          <Text style={styles.godName}>{god.name}</Text>
          <Text>{god.description} (Gold: {god.gold})</Text>
          {god.damage && <Text> - Damage: {god.damage}</Text>}
          {god.heal && <Text> - Heal: {god.heal}</Text>}
          
          {/* Solo muestra el botón si el jugador tiene suficiente oro */}
          {player.coin >= god.gold && (
            <Pressable 
              style={styles.button} 
              onPress={() => onSelect(player.id, god.id)}
            >
              <Text style={styles.buttonText}>Select</Text>
            </Pressable>
          )}
        </View>
      ))}
      
      {/* Botón Pass para cerrar el GodSet */}
      <Pressable 
        style={styles.passButton} 
        onPress={onPass} // Llama a la función onPass
      >
        <Text style={styles.passButtonText}>Pass</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 10,
  },
  godContainer: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  godName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    aligngods: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  passButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFC107', // Color diferente para el botón Pass
    borderRadius: 5,
    aligngods: 'center',
  },
  passButtonText: {
    color: '#000', // Color de texto para el botón Pass
    fontWeight: 'bold',
  },
});

export default GodsSet;
