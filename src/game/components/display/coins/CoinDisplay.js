import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";

// Componente funcional CoinDisplay para mostrar las monedas
const CoinDisplay = ({ coin }) => {
  // Objeto con las rutas de las imágenes de monedas
  const goldImages = {
    1: require("../../../../../assets/gold/gold1.png"),
    2: require("../../../../../assets/gold/gold2.png"),
    3: require("../../../../../assets/gold/gold3.png"),
    4: require("../../../../../assets/gold/gold4.png"),
    5: require("../../../../../assets/gold/gold5.png"),
  };

  // Si el valor de coin es 0, no renderizar nada
  if (coin === 0) {
    return <View style={styles.container} />;
  }

  // Dividir el valor de coin en múltiplos de 5 e imágenes de 1
  const fivesCount = Math.floor(coin / 5); // Cantidad de monedas de 5
  const remainder = coin % 5; // Cantidad de monedas restantes (1-4)

  // Crear un arreglo con las imágenes a mostrar
  const imagesToDisplay = [];

  // Agregar la cantidad de monedas de 5 al arreglo
  for (let i = 0; i < fivesCount; i++) {
    imagesToDisplay.push(goldImages[5]);
  }

  // Si hay un residuo, agregar la imagen correspondiente al resto (1-4)
  if (remainder > 0) {
    imagesToDisplay.push(goldImages[remainder]);
  }

  return (
    <View style={styles.container}>
      {imagesToDisplay.map((image, index) => (
        <Image key={index} source={image} style={styles.goldImage} />
      ))}
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;


// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Muestra las imágenes en una fila
    justifyContent: "start",
    width:  screenWidth > 600 ? "40%" : "50%",
  },

  goldImage: {
    width: screenWidth > 600 ? 45 : 30, // Ajusta a un tamaño más pequeño
    height: screenWidth > 600 ? 135 : 90, // Ajusta a un tamaño más pequeño
    marginRight:  screenWidth > 600 ? 20 : 7, // Agrega un poco de espacio entre las imágenes
    marginTop: 10,
  },
});

// Exporta el componente CoinDisplay para su uso en otras partes de la aplicación
export default CoinDisplay;
