import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import LocalModeScreen from "./src/screens/GameScreen";
import { GameProvider, useGameContext } from "./src/game/context/GameContext";

const AppContent = () => {
  const { gameStarted, startGame } = useGameContext();

  if (!gameStarted) {
    return (
      <View style={styles.container}>
        <Pressable style={styles.startButton} onPress={startGame}>
          <Text style={styles.buttonText}>Start Game</Text>
        </Pressable>
      </View>
    );
  }

  return <LocalModeScreen />;
};

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Color de fondo suave
  },
  startButton: {
    backgroundColor: "#6200ea", // Color púrpura
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff", // Texto blanco
    fontSize: 18,
  },
});
