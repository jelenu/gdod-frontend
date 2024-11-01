// Importing necessary React functions to create context and manage state
import React, { createContext, useState, useContext } from "react";
import { reorderDiceSets } from "../components/logic/attackPhase/attackDiceSetLogic";

// Creating a GameContext to manage game state globally
const GameContext = createContext();

// GameProvider component to provide game context to its children
export const GameProvider = ({ children }) => {
  // State to manage player data, including ID, name, health, and selected dice
  const [players, setPlayers] = useState({
    1: { id: 1, name: "Player 1", health: 15, selectedDice: [], coin: 0 },
    2: { id: 2, name: "Player 2", health: 15, selectedDice: [], coin: 0 },
  });

  // Function to randomly determine which player starts first
  const getRandomTurn = () => (Math.random() < 0.5 ? 1 : 2);

  // State to manage the current turn, round number, winner, and attack phase
  const [turn, setTurn] = useState(getRandomTurn());
  const [round, setRound] = useState(1);
  const [whoWins, setWhoWins] = useState(""); // Stores the winning player ID
  const [turnsThisRound, setTurnsThisRound] = useState(0);
  const [isAttackPhase, setIsAttackPhase] = useState(false); // Flag for attack phase


  const reorderSelectedDice = () => {
    setPlayers((prevPlayers) => {
      const playerOneDiceSet = prevPlayers[1].selectedDice;
      const playerTwoDiceSet = prevPlayers[2].selectedDice;
  
      // Reordenar dependiendo de quién tiene el turno
      const [reorderedPlayerOneDiceSet, reorderedPlayerTwoDiceSet] = 
        turn === 1
          ? reorderDiceSets(playerOneDiceSet, playerTwoDiceSet)
          : reorderDiceSets(playerTwoDiceSet, playerOneDiceSet);
  
      // Actualizar el estado `selectedDice` en función de quién ataca primero
      return {
        ...prevPlayers,
        1: { ...prevPlayers[1], selectedDice: turn === 1 ? reorderedPlayerOneDiceSet : reorderedPlayerTwoDiceSet },
        2: { ...prevPlayers[2], selectedDice: turn === 1 ? reorderedPlayerTwoDiceSet : reorderedPlayerOneDiceSet },
      };
    });
  };


  // Function to apply damage to a player and check for victory
  const takeDamage = (playerId, damage) => {
    setPlayers((prevPlayers) => {
      const updatedPlayer = {
        ...prevPlayers[playerId],
        health: prevPlayers[playerId].health - damage, // Reducing player health
      };
      // Check if the player's health is zero or below to declare a winner
      if (updatedPlayer.health <= 0) {
        setWhoWins(playerId === 1 ? "2" : "1"); // Set winner based on player ID
      }
      return { ...prevPlayers, [playerId]: updatedPlayer }; // Return updated players object
    });
  };

  // Function to end the current player's turn and manage turn progression
  const endTurn = () => {
    // Switches the turn between players
    setTurn((prevTurn) => (prevTurn === 1 ? 2 : 1));

    // Updates the count of turns taken in this round
    setTurnsThisRound((prevTurns) => {
      if (prevTurns === 1) {
        // Both players have completed their turns, increment round
        setRound((prevRound) => prevRound + 1);
        checkIfisAttackPhase(); // Check if it's time to enter the attack phase
        return 0; // Reset turn counter for the new round
      }
      return prevTurns + 1; // Increment turn counter if only one turn has occurred
    });
  };

  // Function to check if the game should transition to the attack phase
  const checkIfisAttackPhase = () => {
    const playerOne = players[1]; // Reference to player one
    const playerTwo = players[2]; // Reference to player two
    // Check if both players have selected 6 dice or if 3 rounds have been completed
    if ((playerOne.selectedDice.length === 6 && playerTwo.selectedDice.length === 6) || round  === 3) {
      reorderSelectedDice();
      setIsAttackPhase(true); // Move to attack phase
    }
    
  };

  // Function to add selected dice to a player's selection
  const addSelectedDice = (playerId, dice, gold) => {
    setPlayers((prevPlayers) => {
      const updatedPlayer = {
        ...prevPlayers[playerId],
        selectedDice: [
          ...prevPlayers[playerId].selectedDice,
          { number: dice, gold: gold } // Add a new object with the dice number and gold status
        ].slice(0, 6), // Limit the selection to 6 dice
      };
      return { ...prevPlayers, [playerId]: updatedPlayer }; // Return updated players object
    });
  };

  // Function to remove selected dice from a player's selection
  const removeSelectedDice = (playerId, dice) => {
    setPlayers((prevPlayers) => {
      const updatedPlayer = {
        ...prevPlayers[playerId],
        selectedDice: prevPlayers[playerId].selectedDice.filter((d) => {
          // Compare both the dice number and gold status
          return d.number !== dice.number || d.gold !== dice.gold;
        }),
      };
      return { ...prevPlayers, [playerId]: updatedPlayer }; // Return updated players object
    });
  };

  // Function to add coins to a player's total
  const addCoins = (playerId, coins) => {
    setPlayers((prevPlayers) => {
      const updatedPlayer = {
        ...prevPlayers[playerId],
        coin: prevPlayers[playerId].coin + coins, // Increment the player's coins
      };
      return { ...prevPlayers, [playerId]: updatedPlayer }; // Return updated players object
    });
  };

  // Function to steal coins from another player
  const stealCoins = (stealerId, targetId, amount) => {
    setPlayers((prevPlayers) => {
      const targetPlayer = prevPlayers[targetId];
      const stealerPlayer = prevPlayers[stealerId];
      
      // Determine the actual amount to steal (cannot exceed what target has)
      const coinsToSteal = Math.min(amount, targetPlayer.coin);

      // Update the players' coin totals
      const updatedStealer = {
        ...stealerPlayer,
        coin: stealerPlayer.coin + coinsToSteal, // Increment the stealer's coins
      };

      const updatedTarget = {
        ...targetPlayer,
        coin: targetPlayer.coin - coinsToSteal, // Decrement the target's coins
      };

      return {
        ...prevPlayers,
        [stealerId]: updatedStealer, // Update stealer's coins
        [targetId]: updatedTarget,     // Update target's coins
      };
    });
  };

  return (
    // Providing context values to children components
    <GameContext.Provider
      value={{
        players, // Current state of players
        turn, // Current player's turn
        turnsThisRound, // Number of turns taken in the current round
        isAttackPhase, // Flag indicating if it's the attack phase
        round, // Current round number
        whoWins, // ID of the winning player
        takeDamage, // Function to apply damage to a player
        endTurn, // Function to end the current turn
        addSelectedDice, // Function to add dice to a player's selection
        removeSelectedDice, // Function to remove dice from a player's selection
        addCoins, // Function to add coins to a player's total
        stealCoins, // Function to steal coins from another player

      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the GameContext in other components
export const useGameContext = () => {
  return useContext(GameContext); // Return the context value
};
