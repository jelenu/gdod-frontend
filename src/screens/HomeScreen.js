import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Gods: Dice of destiny</Text>
      <Pressable 
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#ddd' : '#6200EE' } // Cambia el color al presionar
        ]}
        onPress={() => navigation.navigate('GameBoard', { gameModeScreen: 'Local' })} 
      >
        <Text style={styles.buttonText}>Jugar Local</Text>
      </Pressable>
      <Pressable 
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#ddd' : '#6200EE' } // Cambia el color al presionar
        ]}
        onPress={() => navigation.navigate('GameBoard', { gameModeScreen: 'AI' })} 
      >
        <Text style={styles.buttonText}>Jugar contra la IA</Text>
      </Pressable>
      <Pressable 
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#ddd' : '#6200EE' } // Cambia el color al presionar
        ]}
        onPress={() => navigation.navigate('GameBoard', { gameModeScreen: 'Online' })} 
      >
        <Text style={styles.buttonText}>Jugar Online</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
