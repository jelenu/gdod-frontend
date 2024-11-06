// Importing necessary React and React Native modules
import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, Dimensions } from "react-native";
// Importing Canvas and related controls from Three.js and React Three Fiber
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// Importing the RotatingDice component for rendering the dice
import RotatingDice from "./RotatingDice";
// Importing the custom hook to access the game context
import { useGameContext } from "../../../context/GameContext";

// Dice functional component representing a 3D dice
const Dice = ({ spinning, selectable, playerId, turn }) => {
  const { addSelectedDice, removeSelectedDice, round } = useGameContext();
  
  const [selected, setSelected] = useState(false);
  const [finalFace, setFinalFace] = useState(null);
  const isTouching = useRef(false);
  const [randomGoldTextures, setRandomGoldTextures] = useState([]);

  // Effect to generate random gold textures when the component mounts
  useEffect(() => {
    const textures = Array.from({ length: 5 }, () => Math.random() > 0.5);
    setRandomGoldTextures(textures);
  }, []);

  // Function to handle click/touch events
  const handleInteraction = useCallback((e) => {
    if (selectable) {
      e.preventDefault();
      const newSelected = !selected;
      setSelected(newSelected);
      if (newSelected) {
        addSelectedDice(playerId, finalFace, randomGoldTextures[finalFace]);
      } else {
        removeSelectedDice(playerId, finalFace, randomGoldTextures[finalFace]);
      }
    }
  }, [selectable, selected, finalFace, randomGoldTextures, playerId, addSelectedDice, removeSelectedDice]);

  // Effect to reset the selected state when the turn changes
  useEffect(() => {
    setSelected(false);
  }, [turn]);

  // Effect to automatically add the selected dice when the round is 3 and finalFace is set
  useEffect(() => {
    if (round === 3 && finalFace !== null) {
      addSelectedDice(playerId, finalFace, randomGoldTextures[finalFace]);
    }
  }, [round]);

  return (
    <Canvas
      style={styles.canvas}
      onClick={(e) => !isTouching.current && handleInteraction(e)}
      onTouchStart={(e) => {
        isTouching.current = true;
        handleInteraction(e);
      }}
      onTouchEnd={() => {
        isTouching.current = false;
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (selectable) {
          document.body.style.cursor = "pointer";
        }
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "auto";
      }}
    >
      <OrbitControls enableRotate={false} enableZoom={false} />
      <ambientLight intensity={3} />
      <RotatingDice
        spinning={spinning}
        selected={selected}
        finalFace={finalFace}
        setFinalFace={setFinalFace}
        randomGoldTextures={randomGoldTextures}
      />
    </Canvas>
  );
};
const { width } = Dimensions.get('window');

// Styles for the Dice component using StyleSheet
const styles = StyleSheet.create({
  canvas: {
    width: "100%",
    height: "100%",
  },
});

// Exporting the Dice component to be used in other parts of the app
export default Dice;
