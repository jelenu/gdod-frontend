import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";

const SelectedDice = ({ player, turn }) => {
  const [selectedDice, setSelectedDice] = useState(player.selectedDice); // Estado para almacenar los dados seleccionados

  // Función para obtener la imagen según el valor del dado
  const getDiceImage = (dieValue) => {
    switch (dieValue) {
      case 0:
        return require('../../../../../assets/dice/sword_face.png');
      case 1:
        return require('../../../../../assets/dice/arrow_face.png');
      case 2:
        return require('../../../../../assets/dice/helmet_face.png');
      case 3:
        return require('../../../../../assets/dice/shield_face.png');
      case 4:
        return require('../../../../../assets/dice/steal_face.png');
    }
  };

  // Actualiza los dados seleccionados solo cuando el turno cambie
  useEffect(() => {
    setSelectedDice(player.selectedDice);
  }, [turn]); // Se ejecuta solo cuando el turno cambia

  return (
    <View style={styles.container}>
      {selectedDice.map((die, index) => (
        <Image
          key={index}
          style={styles.image}
          source={getDiceImage(die)} // Selecciona la imagen correspondiente al valor del dado
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    margin: 5,
    width: 60,
    height: 60,
  },
});

export default SelectedDice;
