import React from "react";
import { View, StyleSheet } from "react-native";
import AIModeScreen from "./modes/AIModeScreen";
import LocalModeScreen from "./modes/LocalModeScreen";
import OnlineModeScreen from "./modes/OnlineModeScreen";
import { GameProvider } from "../../game/context/GameContext";

const GameBoardScreen = ({ route }) => {
  const { gameModeScreen } = route.params;

  const renderGameMode = () => {
    switch (gameModeScreen) {
      case "Local":
        return <LocalModeScreen />;
      case "AI":
        return <AIModeScreen />;
      case "Online":
        return <OnlineModeScreen />;
      default:
        return null;
    }
  };

  return (
    <GameProvider>
      <View style={styles.container}>{renderGameMode()}</View>
    </GameProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Agrega un poco de padding alrededor
  },
});

export default GameBoardScreen;
