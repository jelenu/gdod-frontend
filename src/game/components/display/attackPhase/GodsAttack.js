import React from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { useGameContext } from "../../../context/GameContext";

const GodsAttack = ({ player, isVisible, onClose }) => {
  const { takeDamage, healPlayer } = useGameContext();

  // Busca el dios seleccionado por el jugador
  const selectedGod = player.gods.find(god => god.id === player.selectedGod);

  const handleGodAction = () => {
    if (!selectedGod) {
      console.warn("No god selected.");
      return;
    }

    if (selectedGod.typeId === 1) {
      // Tipo 1: Hacer daño al oponente
      const opponentId = player.id === 1 ? 2 : 1; // Determina al oponente
      takeDamage(opponentId, selectedGod.damage);
    } else if (selectedGod.typeId === 2) {
      // Tipo 2: Curar al propio jugador
      healPlayer(player.id, selectedGod.heal);
    }
    onClose(); // Cierra el modal después de aplicar la acción
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>{`Player ${player.id}`}</Text>

          {selectedGod && (
            <>
              <Text style={styles.text}>{selectedGod.name}</Text>
              <Text style={styles.text}>{selectedGod.description}</Text>
              {selectedGod.damage && <Text>- Damage: {selectedGod.damage}</Text>}
              {selectedGod.heal && <Text>- Heal: {selectedGod.heal}</Text>}

              <Pressable onPress={handleGodAction} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Use {selectedGod.name}</Text>
              </Pressable>
            </>
          )}

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  actionButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#28a745",
    borderRadius: 5,
  },
  actionButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default GodsAttack;
