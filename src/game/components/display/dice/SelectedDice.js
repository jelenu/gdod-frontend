import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";

const SelectedDice = ({ player, turn }) => {
  const [selectedDice, setSelectedDice] = useState(player.selectedDice); // State to store selected dice

  // Function to get the image based on the die value and if it's gold
  const getDiceImage = (die) => {
    const { number, gold } = die;

    switch (number) {
      case 0:
        return gold
          ? require('../../../../../assets/dice/sword_face_gold.png')
          : require('../../../../../assets/dice/sword_face.png');
      case 1:
        return gold
          ? require('../../../../../assets/dice/arrow_face_gold.png')
          : require('../../../../../assets/dice/arrow_face.png');
      case 2:
        return gold
          ? require('../../../../../assets/dice/helmet_face_gold.png')
          : require('../../../../../assets/dice/helmet_face.png');
      case 3:
        return gold
          ? require('../../../../../assets/dice/shield_face_gold.png')
          : require('../../../../../assets/dice/shield_face.png');
      case 4:
        return gold
          ? require('../../../../../assets/dice/steal_face_gold.png')
          : require('../../../../../assets/dice/steal_face.png');
      default:
        return null; // Return null for unsupported die values
    }
  };

  // Updates the selected dice only when the turn changes
  useEffect(() => {
    setSelectedDice(player.selectedDice);
  }, [turn]); // Executes only when the turn changes

  return (
    <View style={styles.container}>
      {selectedDice.map((die, index) => (
        <Image
          key={index}
          style={styles.image}
          source={getDiceImage(die)} // Passes the die object to get the correct image
        />
      ))}
    </View>
  );
};
const { width } = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange dice in a row
    width: "100%",
    justifyContent: "center", // Centra los botones horizontalmente
    alignItems: "center", // Centra los botones verticalmente

  },
  image: {
    margin: 5,
    width: width > 600 ? 70:50,
    height:  width > 600 ? 70:50,
  },
});

export default SelectedDice;
