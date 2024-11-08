import React from "react"; // Importing React
import { View, Text, StyleSheet, Dimensions } from "react-native"; // Importing necessary components from React Native

// HealthBar functional component to display player's health
const HealthBar = ({ player }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Health: {player.health} / 15</Text>
    </View>
  );
};

const { width } = Dimensions.get('window');

// Styles for the component
const styles = StyleSheet.create({
  container:{
    width: "40%",
    alignItems: "center"
  },
  text:{
    fontSize: width > 600 ? 28 : 20, // Cambiar el tamaño de la fuente basado en el ancho de la pantalla
    fontWeight: 'bold', // Making the text bold
    color:"#cfcfcf",
  }
});

// Exporting the HealthBar component for use in other parts of the application
export default HealthBar;
