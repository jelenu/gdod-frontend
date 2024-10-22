import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RotatingDice from './RotatingDice';
import { useGameContext } from '../../../context/GameContext';

const Dice = ({ spinning, selectable, playerId, turn }) => {
  const { addSelectedDice, removeSelectedDice, round } = useGameContext();

  const [selected, setSelected] = useState(false); // Estado para determinar si el dado está seleccionado
  const [finalFace, setFinalFace] = useState(null); // Estado para rastrear la cara final
  const isTouching = useRef(false); // Ref para rastrear si se está tocando

  const handleClick = (e) => {
    if (selectable) { // Solo cambia el estado si selectable es true
      e.preventDefault(); // Prevenir comportamientos por defecto si es necesario
      setSelected((prev) => !prev); // Cambia el estado al hacer clic
      if (selected) {
        removeSelectedDice(playerId, finalFace);
      } else {
        addSelectedDice(playerId, finalFace);
      }
    }
  };

  const handleTouchStart = (e) => {
    isTouching.current = true; // Marca que se está tocando
    handleClick(e); // Llama a la función handleClick
  };

  const handleTouchEnd = (e) => {
    isTouching.current = false; // Restablece la referencia
  };

  useEffect(() => {
    setSelected(false);
  }, [turn]);

  useEffect(() => {
    if (round === 3 && finalFace !== null) {
      addSelectedDice(playerId, finalFace); // Añadir automáticamente cuando round es 3 y finalFace no es null
    }
  }, [finalFace]);

  return (
    <Canvas
      style={styles.canvas}
      onClick={(e) => {
        // Solo manejar click si no se está tocando
        if (!isTouching.current) {
          handleClick(e);
        }
      }}
      onTouchStart={handleTouchStart} // Cambiado a onTouchStart
      onTouchEnd={handleTouchEnd} // Añadido onTouchEnd para restablecer
      onPointerOver={(e) => {
        e.stopPropagation(); // Evita que el evento se propague
        if (selectable) {
          document.body.style.cursor = 'pointer'; // Cambia el cursor
        }
      }}
      onPointerOut={(e) => {
        e.stopPropagation(); // Evita que el evento se propague
        document.body.style.cursor = 'auto'; // Restaura el cursor original
      }}
    >
      <OrbitControls enableRotate={false} enableZoom={false} />
      <ambientLight intensity={5} />
      <RotatingDice 
        spinning={spinning} 
        selected={selected} 
        finalFace={finalFace} 
        setFinalFace={setFinalFace} 
      />
    </Canvas>
  );
};

const styles = StyleSheet.create({
  canvas: {
    display: 'block',
    margin: 0,
    padding: 0,
    width: 100,
    height: 100,
  },
});

export default Dice;
