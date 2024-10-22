import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RotatingDice from './RotatingDice';
import { useGameContext } from '../../../context/GameContext';

const Dice = ({ spinning, selectable, playerId, turn }) => {
  const { addSelectedDice, removeSelectedDice, round } = useGameContext();

  const [selected, setSelected] = useState(false); // Estado para determinar si el dado está seleccionado
  const [finalFace, setFinalFace] = useState(null); // State to track the final face

  const handleClick = () => {
    if (selectable) { // Solo cambia el estado si selectable es true
      setSelected(!selected); // Cambia el estado al hacer clic
      if(selected){
        removeSelectedDice(playerId,finalFace);
      }else{
        addSelectedDice(playerId,finalFace)
      }
    }
  };

  useEffect(() => {
    setSelected(false)

  }, [turn]);

  useEffect(() => {
    if (round === 3 && finalFace !== null) {
      addSelectedDice(playerId, finalFace); // Añadir automáticamente cuando round es 3 y finalFace no es null
    }
  }, [finalFace]);
  return (
    <Canvas
      style={styles.canvas}
      onClick={handleClick} // Maneja el clic en el Canvas
      // Cambia el cursor al pasar el ratón sobre el canvas
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
      <RotatingDice spinning={spinning} selected={selected} finalFace={finalFace} setFinalFace={setFinalFace}/>
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
