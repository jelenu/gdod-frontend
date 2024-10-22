// Importing React to use React features
import React from "react";

// Importing necessary components and utilities from React Native
import { View, StyleSheet } from "react-native";

// Importing different game mode screens for local, AI, and online gameplay
import AIModeScreen from "./modes/AIModeScreen";
import LocalModeScreen from "./modes/LocalModeScreen";
import OnlineModeScreen from "./modes/OnlineModeScreen";

// Importing GameProvider to provide game context to the component tree
import { GameProvider } from "../../game/context/GameContext";

// GameBoardScreen functional component that receives route parameters
const GameBoardScreen = ({ route }) => {
  // Extracting the game mode from route parameters
  const { gameModeScreen } = route.params;

  // Function to render the appropriate game mode screen based on the selected mode
  const renderGameMode = () => {
    switch (gameModeScreen) {
      case "Local":
        // Render the LocalModeScreen for local gameplay
        return <LocalModeScreen />;
      case "AI":
        // Render the AIModeScreen for AI gameplay
        return <AIModeScreen />;
      case "Online":
        // Render the OnlineModeScreen for online gameplay
        return <OnlineModeScreen />;
      default:
        // Return null if the game mode does not match any case
        return null;
    }
  };

  return (
    // Wrapping the entire screen in GameProvider to provide context to child components
    <GameProvider>
      <View style={styles.container}>
        {/* Rendering the appropriate game mode screen */}
        {renderGameMode()}
      </View>
    </GameProvider>
  );
};

// Styles for the GameBoardScreen component using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the full height of the screen
    padding: 20, // Adds padding around the container
  },
});

// Exporting the GameBoardScreen component to be used in other parts of the app
export default GameBoardScreen;
