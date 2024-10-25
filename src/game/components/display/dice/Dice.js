// Importing necessary React and React Native modules
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
// Importing Canvas and related controls from Three.js and React Three Fiber
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// Importing the RotatingDice component for rendering the dice
import RotatingDice from "./RotatingDice";
// Importing the custom hook to access the game context
import { useGameContext } from "../../../context/GameContext";

// Dice functional component representing a 3D dice
const Dice = ({ spinning, selectable, playerId, turn }) => {
  // Destructuring functions from the game context for adding/removing selected dice and accessing round info
  const { addSelectedDice, removeSelectedDice, round } = useGameContext();

  // State to determine if the dice is selected
  const [selected, setSelected] = useState(false);
  // State to track the final face of the dice
  const [finalFace, setFinalFace] = useState(null);
  // Ref to track if a touch event is ongoing
  const isTouching = useRef(false);

    // State to hold the random gold textures
    const [randomGoldTextures, setRandomGoldTextures] = useState([]);

  // Effect to generate random gold textures when the component mounts
  useEffect(() => {
    const textures = Array.from({ length: 5 }, () => Math.random() > 0.5);
    setRandomGoldTextures(textures);
  }, []); // Empty dependency array ensures this runs only on mount
  
  // Function to handle dice click events
  const handleClick = (e) => {
    if (selectable) {
      // Only proceed if the dice is selectable
      e.preventDefault(); // Prevent default actions if necessary
      setSelected((prev) => !prev); // Toggle the selected state
      // Add or remove the dice based on the current selection state
      if (selected) {
        removeSelectedDice(playerId, finalFace, randomGoldTextures[finalFace]); // Remove dice if it was previously selected
      } else {
        addSelectedDice(playerId, finalFace, randomGoldTextures[finalFace]); // Add dice if it is newly selected
        console.log(
          finalFace,
          randomGoldTextures[finalFace],
          randomGoldTextures
        );
      }
    }
  };

  // Function to handle touch start events
  const handleTouchStart = (e) => {
    isTouching.current = true; // Mark that a touch interaction has started
    handleClick(e); // Call the click handler
  };

  // Function to handle touch end events
  const handleTouchEnd = (e) => {
    isTouching.current = false; // Reset the touch state
  };

  // Effect to reset the selected state when the turn changes
  useEffect(() => {
    setSelected(false);
  }, [turn]);

  // Effect to automatically add the selected dice when the round is 3 and finalFace is set
  useEffect(() => {
    if (round === 3 && finalFace !== null) {
      addSelectedDice(playerId, finalFace, randomGoldTextures[finalFace]); // Automatically add the final face to the selected dice
    }
  }, [finalFace]);

  return (
    // Canvas component to render 3D content
    <Canvas
      style={styles.canvas}
      onClick={(e) => {
        // Only handle click if not currently touching
        if (!isTouching.current) {
          handleClick(e);
        }
      }}
      onTouchStart={handleTouchStart} // Handler for touch start events
      onTouchEnd={handleTouchEnd} // Handler for touch end events to reset touch state
      onPointerOver={(e) => {
        e.stopPropagation(); // Prevent the event from bubbling up
        if (selectable) {
          document.body.style.cursor = "pointer"; // Change cursor style to pointer when hovering
        }
      }}
      onPointerOut={(e) => {
        e.stopPropagation(); // Prevent the event from bubbling up
        document.body.style.cursor = "auto"; // Reset cursor style to default
      }}
    >
      <OrbitControls enableRotate={false} enableZoom={false} />
      {/* Controls for camera movement */}
      <ambientLight intensity={5} />
      {/* Ambient light for better visibility of the dice */}
      {/* RotatingDice component that visually represents the dice */}
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

// Styles for the Dice component using StyleSheet
const styles = StyleSheet.create({
  canvas: {
    display: "block", // Ensures block display for the canvas
    margin: 0, // Removes default margin
    padding: 0, // Removes default padding
    width: 100, // Set width of the canvas
    height: 100, // Set height of the canvas
  },
});

// Exporting the Dice component to be used in other parts of the app
export default Dice;
