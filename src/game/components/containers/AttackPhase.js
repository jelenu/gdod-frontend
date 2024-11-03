import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import AttackDiceSet from "../display/attackPhase/AttackDiceSet";
import { useGameContext } from "../../context/GameContext";
import GodsAttack from "../display/attackPhase/GodsAttack";

const AttackPhase = () => {
  const { players, addCoins, endPhase, turn } = useGameContext();
  const [modalsQueue, setModalsQueue] = useState([]); // Cola de modales
  const [currentModalIndex, setCurrentModalIndex] = useState(0); // Índice del modal actual
  const [timeElapsed, setTimeElapsed] = useState(false); // Estado para verificar si el tiempo ha pasado

  // Calcular la cantidad de oro al inicio de la fase
  useEffect(() => {
    Object.keys(players).forEach((playerId) => {
      const player = players[playerId];
      const goldDiceCount = player.selectedDice
        .filter((diceBlock) => diceBlock)
        .flat()
        .filter((dice) => dice?.gold)
        .length;

      addCoins(playerId, goldDiceCount);
    });
  }, []);

  // Iniciar el temporizador de la fase
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTimeElapsed(true); // Marcar que el tiempo ha pasado
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Actualizar la cola de modales cuando cambian los jugadores o el turno y el tiempo ha pasado
  useEffect(() => {
    if (timeElapsed) {
      const queue = [];
      if (players[1]?.selectedGod) queue.push(1);
      if (players[2]?.selectedGod) queue.push(2);

      // Priorizar el turno actual
      const prioritizedQueue = queue.slice().sort((a, b) => (a === turn ? -1 : 1));
      setModalsQueue(prioritizedQueue);

      // Si no hay modales que mostrar, finalizar la fase
      if (prioritizedQueue.length === 0) {
        endPhase();
      }
    }
  }, [timeElapsed, players, turn, endPhase]);

  const handleClose = () => {
    // Pasar al siguiente modal en la cola o finalizar la fase si no hay más
    setCurrentModalIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= modalsQueue.length) {
        endPhase(); // Finalizar la fase si no hay más modales
      }
      return nextIndex;
    });
  };

  return (
    <View style={styles.container}>
      <Text>ATTACK PHASE</Text>
      <AttackDiceSet />
      {timeElapsed && modalsQueue[currentModalIndex] && (
        <GodsAttack
          player={players[modalsQueue[currentModalIndex]]}
          isVisible={true}
          onClose={handleClose}
        />
      )}
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
  diceSet: {
    flexDirection: "row",
  },
  diceImage: {
    width: 60,
    height: 60,
    margin: 5,
  },
});

export default AttackPhase;
