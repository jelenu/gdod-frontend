import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useGameContext } from '../../../context/GameContext';

const SelectDiceButton = ({ setSelectable }) => {
    const { endTurn } = useGameContext();

    const handlePress = () => {
        endTurn();           // Llama a la función endTurn del contexto
        setSelectable(false); // Cambia el estado de setSelectable
    };

    return (
        <Pressable onPress={handlePress} style={styles.button}>
            <Text style={styles.buttonText}>Terminar Turno</Text>
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

export default SelectDiceButton;
