import React from "react";
import { View, StyleSheet, Text } from "react-native";
import AttackDiceSet from "../../display/attackPhase/AttackDiceSet";

const AttackPhase = () => {
  

  return (
    <View style={styles.container}>
      <Text>ATTACK PHASE</Text>
      <AttackDiceSet/>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  diceSet:{
   flexDirection: "row",
  },
  
  diceImage: {
    width: 60, // Set appropriate width
    height: 60, // Set appropriate height
    margin: 5, // Add some margin between images
  },
});

export default AttackPhase;
