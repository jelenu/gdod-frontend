// Importing necessary React and React Native modules
import React, { useState, useEffect, startTransition } from 'react';
import { View, StyleSheet } from 'react-native';
// Importing Dice component to represent individual dice
import Dice from './Dice'; 
// Importing buttons for interacting with the dice
import DiceButton from '../../controls/dice/DiceButton';
import SelectDiceButton from '../../controls/dice/SelectDiceButton';
import { useGameContext } from "../../../context/GameContext";

// DiceSet functional component to manage a set of dice for a player
const DiceSet = ({ player, turn }) => {
  const { endTurn } = useGameContext();

  // State to manage whether the dice are spinning
  const [isSpinning, setIsSpinning] = useState(false);
  // State to control whether the dice can be selected
  const [selectable, setSelectable] = useState(false);
  // State to manage visibility of the "Spin Dice" button
  const [visibleButton, setVisibleButton] = useState(true);
  // State to manage visibility of the "Select Dice" button
  const [selectDiceButtonVisible, setSelectDiceButtonVisible] = useState(false);
  // State to track the initial array of dice based on how many can still be rolled
  const [initialDiceArray, setInitialDiceArray] = useState([]);

  // Function to start the spinning animation of the dice
  const startSpin = () => {
    startTransition(() => {
      setVisibleButton(false); // Hide the spin button when spinning starts
      setIsSpinning(true); // Set spinning state to true
    });

    // Stop spinning after 1.5 seconds and update the state accordingly
    setTimeout(() => {
      setIsSpinning(false); // Stop the spinning animation
      setSelectable(true); // Allow the player to select dice
      setSelectDiceButtonVisible(true); // Show the select button
    }, 1500);
  };

  // Effect to initialize the dice array based on the player's selected dice
  useEffect(() => {
    const diceCount = 6 - player.selectedDice.length; // Calculate how many dice can still be rolled
    if(diceCount === 0 && turn === player.id){
      endTurn();
    }else{
      setInitialDiceArray([...Array(diceCount)]); // Create an array of the available dice
      setVisibleButton(true); // Reset the visibility of the spin button
      setSelectDiceButtonVisible(false); // Reset the visibility of the select button
    }
    
  }, [turn]); // Re-run this effect when the turn changes

  return (
    <View>
      {/* Container for the action buttons */}
      <View style={styles.buttonContainer}>
        {/* Display the Spin button for player 2 */}
        {turn === 2 && turn === player.id && visibleButton && <DiceButton onPress={startSpin} />}
        {/* Display the Select Dice button for player 2 */}
        {turn === 2 && turn === player.id && selectDiceButtonVisible && <SelectDiceButton setSelectable={setSelectable} />}
      </View>

      {/* Container for the dice */}
      <View style={styles.diceContainer}>
        {initialDiceArray.map((_, index) => (
          // Render a Dice component for each available die
          <Dice key={index} spinning={isSpinning} selectable={selectable} playerId={player.id} turn={turn} />
        ))}
      </View>

      {/* Container for the action buttons */}
      <View style={styles.buttonContainer}>
        {/* Display the Spin button for player 1 */}
        {turn === 1 && turn === player.id && visibleButton && <DiceButton onPress={startSpin} />}
        {/* Display the Select Dice button for player 1 */}
        {turn === 1 && turn === player.id && selectDiceButtonVisible && <SelectDiceButton setSelectable={setSelectable} />}
      </View>
    </View>
  );
};

// Styles for the DiceSet component using StyleSheet
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'center', // Center the buttons horizontally
    marginBottom: 10, // Add space between buttons and dice
  },
  diceContainer: {
    flexDirection: 'row', // Arrange dice in a row
    flexWrap: 'wrap', // Allow dice to wrap to the next line if they overflow
    justifyContent: 'center', // Center the dice horizontally
    width: '100%', // Ensure the container takes the full width
  },
});

// Exporting the DiceSet component for use in other parts of the application
export default DiceSet;
