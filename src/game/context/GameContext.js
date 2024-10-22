import React, { createContext, useState, useContext } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [players, setPlayers] = useState({
    1: { id: 1, name: "Player 1", health: 15, selectedDice: [] },
    2: { id: 2, name: "Player 2", health: 15, selectedDice: [] },
  });

  const getRandomTurn = () => (Math.random() < 0.5 ? 1 : 2);

  const [turn, setTurn] = useState(getRandomTurn());
  const [round, setRound] = useState(1);
  const [whoWins, setWhoWins] = useState("");
  const [turnsThisRound, setTurnsThisRound] = useState(0);
  const [isAttackPhase, setIsAttackPhase] = useState(false);

  const takeDamage = (playerId, damage) => {
    setPlayers((prevPlayers) => {
      const updatedPlayer = {
        ...prevPlayers[playerId],
        health: prevPlayers[playerId].health - damage,
      };
      if (updatedPlayer.health <= 0) {
        setWhoWins(playerId === 1 ? "2" : "1");
      }
      return { ...prevPlayers, [playerId]: updatedPlayer };
    });
  };

  const endTurn = () => {
    // Cambia el turno entre los jugadores
    setTurn((prevTurn) => (prevTurn === 1 ? 2 : 1));

    // Actualiza el número de turnos en esta ronda
    setTurnsThisRound((prevTurns) => {
      if (prevTurns === 1) {
        // Ambos jugadores han terminado, incrementa la ronda
        setRound((prevRound) => prevRound + 1);
        checkIfisAttackPhase();
        return 0; // Reinicia el contador de turnos para la nueva ronda
      }
      return prevTurns + 1; // Incrementa si solo ha habido un turno
    });
  };

  const checkIfisAttackPhase = () => {
    const playerOne = players[1];
    const playerTwo = players[2];
    // Verifica si ambos jugadores han seleccionado 6 dados o si se han completado 3 rondas
    if (playerOne.selectedDice.length === 6 && playerTwo.selectedDice.length === 6) {
      setIsAttackPhase(true); // Avanza a la siguiente fase
    }
    if (round === 3) {
      setIsAttackPhase(true); // Avanza a la siguiente fase si se completan 3 rondas
    }
  };

  const addSelectedDice = (playerId, dice) => {
    setPlayers((prevPlayers) => {
      const updatedPlayer = {
        ...prevPlayers[playerId],
        selectedDice: [...prevPlayers[playerId].selectedDice, dice].slice(0, 6), // Limitar a 6 dados
      };
      return { ...prevPlayers, [playerId]: updatedPlayer };
    });
  };

  const removeSelectedDice = (playerId, dice) => {
    setPlayers((prevPlayers) => {
      const updatedPlayer = {
        ...prevPlayers[playerId],
        selectedDice: prevPlayers[playerId].selectedDice.filter((d) => d !== dice),
      };
      return { ...prevPlayers, [playerId]: updatedPlayer };
    });
  };

  return (
    <GameContext.Provider
      value={{
        players,
        turn,
        turnsThisRound,
        isAttackPhase,
        round,
        whoWins,
        takeDamage,
        endTurn,
        addSelectedDice,
        removeSelectedDice,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};
