import React from "react"; // Importing React
import { View, Text, StyleSheet } from "react-native"; // Importing necessary components from React Native

// HealthBar functional component to display player's health
const HealthBar = ({ player }) => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>{player.name}</Text>
        {/* Displaying the player's name */}
        <View style={styles.healthBar}>
          <View
            style={[styles.health, { width: `${(player.health / 15) * 100}%` }]} // Dynamic width based on player's health
          />
        </View>
        <Text>{player.health} / 15</Text>{/* Displaying current health out of max health */}
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    marginBottom: 10, // Space below the health bar
    alignItems: "center", // Centering items horizontally
  },
  healthBar: {
    width: 150, // Fixed width of the health bar
    height: 20, // Fixed height of the health bar
    backgroundColor: "#ccc", // Light grey background for the health bar
    borderRadius: 10, // Rounded corners
    overflow: "hidden", // Ensuring inner health bar doesn't overflow
  },
  health: {
    height: "100%", // Full height of the health bar
    backgroundColor: "#4CAF50", // Green color for the health fill
  },
});

// Exporting the HealthBar component for use in other parts of the application
export default HealthBar;
