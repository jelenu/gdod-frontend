import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const HealthBar = ({ player }) => {
  const healthPercentage = (player.health / 15) * 100; // Porcentaje de salud actual

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.healthBar,
            {
              width: `${healthPercentage}%`,
              backgroundColor:
                healthPercentage > 50 ? "#4caf50" : healthPercentage > 20 ? "#ffeb3b" : "#f44336",
            },
          ]}
        />
        <Text style={styles.text}>Health: {player.health} / 15</Text>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

// Estilos para el componente
const styles = StyleSheet.create({
  container: {
    width: "40%",
    marginTop: 40,
    marginLeft: 15,
    alignItems: "center",
  },
  barContainer: {
    width: "100%",
    height: 20,
    backgroundColor: "#555",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  healthBar: {
    height: "100%",
    borderRadius: 10,
    position: "absolute",
    left: 0,
    top: 0,
  },
  text: {
    fontSize: width > 600 ? 18 : 14,
    fontWeight: "bold",
    color: "#fff",
    zIndex: 1, // Asegura que el texto esté encima de la barra de salud
  },
});

export default HealthBar;
