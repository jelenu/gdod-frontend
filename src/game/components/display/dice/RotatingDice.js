// Importing necessary React and React Three Fiber modules
import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber'; // Hook to create a render loop
import DiceTextureLoader from '../../logic/dice/DiceTextureLoader'; // Function to load dice textures
import { getRotationAngles } from '../../logic/dice/DiceLogic';  // Function to get rotation angles for the final face

// RotatingDice functional component to represent a 3D rotating dice
const RotatingDice = ({ spinning, selected, finalFace, setFinalFace }) => {
  const meshRef = useRef(); // Reference to the dice mesh for direct manipulation
  const [textures, setTextures] = useState([]); // State to hold the loaded dice textures
  const [rotationSpeed, setRotationSpeed] = useState(0.5); // Initial rotation speed of the dice

  // Load textures when the component mounts
  useEffect(() => {
    const loadTextures = async () => {
      try {
        const loadedTextures = await DiceTextureLoader(); // Asynchronously load dice textures
        setTextures(loadedTextures); // Update state with the loaded textures
      } catch (error) {
        console.error("Error loading textures:", error); // Log an error if loading fails
      }
    };

    loadTextures(); // Call the texture loading function
  }, []); // Empty dependency array ensures this runs only once on mount

  // Continuous rotation logic during the spinning state
  useFrame(() => {
    if (spinning && meshRef.current) {
      // Rotate the dice while spinning
      meshRef.current.rotation.x += rotationSpeed; // Rotate around the X-axis
      meshRef.current.rotation.y += rotationSpeed; // Rotate around the Y-axis
      meshRef.current.rotation.z += rotationSpeed; // Rotate around the Z-axis
    } else if (meshRef.current && finalFace !== null) {
      // Stop at the final face when spinning ends
      const angles = getRotationAngles(finalFace); // Get the angles for the specified face
      meshRef.current.rotation.x = angles.x; // Set the rotation around the X-axis
      meshRef.current.rotation.y = angles.y; // Set the rotation around the Y-axis
      meshRef.current.rotation.z = angles.z; // Set the rotation around the Z-axis
    }
  });

  // Effect to handle the final face and rotation speed after spinning
  useEffect(() => {
    if (!spinning) {
      // When spinning stops, choose a random face
      const randomFace = Math.floor(Math.random() * 5); // Generate a random number between 0 and 4
      setFinalFace(randomFace); // Set the random face as the final face
      setRotationSpeed(0); // Stop the rotation speed
    } else {
      setFinalFace(null); // Reset the final face while still spinning
      setRotationSpeed(0.5); // Restart the rotation speed
    }
  }, [spinning]); // Depend on the spinning state to trigger this effect

  return (
    <mesh ref={meshRef}>
      {/* Set the geometry of the dice with different sizes based on selection state */}
      <boxGeometry args={selected ? [3.5, 3.5, 3.5] : [3, 3, 3]} /> 
      {/* Map through loaded textures and create mesh materials for each */}
      {textures.map((texture, index) => (
        <meshStandardMaterial
          attach={`material-${index}`} // Attach the texture as a material to the mesh
          map={texture} // Use the loaded texture
          key={index} // Use index as the key for each material
        />
      ))}
    </mesh>
  );
};

// Exporting the RotatingDice component for use in other parts of the application
export default RotatingDice;
