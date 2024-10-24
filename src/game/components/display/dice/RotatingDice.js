import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import DiceTextureLoader from '../../logic/dice/DiceTextureLoader';
import { getRotationAngles } from '../../logic/dice/DiceLogic';  // Imported from DiceLogic

const RotatingDice = ({ spinning, selected, finalFace, setFinalFace }) => {
  const meshRef = useRef(); // Reference to the dice mesh
  const [textures, setTextures] = useState([]); // State to hold the dice textures
  const [rotationSpeed, setRotationSpeed] = useState(0.5); // Initial rotation speed

  // Load textures when the component mounts
  useEffect(() => {
    const loadTextures = async () => {
      try {
        const loadedTextures = await DiceTextureLoader(); // Load textures asynchronously
        setTextures(loadedTextures); // Update state with loaded textures
      } catch (error) {
        console.error("Error loading textures:", error); // Log error if texture loading fails
      }
    };

    loadTextures();
  }, []);

  // Adjust continuous rotation while spinning
  useFrame(() => {
    if (spinning && meshRef.current) {
      // Continuous rotation while spinning
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed;
      meshRef.current.rotation.z += rotationSpeed;
    } else if (meshRef.current && finalFace !== null) {
      // Stop at the exact face when spinning ends
      const angles = getRotationAngles(finalFace); // Get angles for the final face
      meshRef.current.rotation.x = angles.x;
      meshRef.current.rotation.y = angles.y;
      meshRef.current.rotation.z = angles.z;
    }
  });

  // Generate a random angle based on the final face when the spin ends
  useEffect(() => {
    if (!spinning) {
      // When spinning stops, select a random face
      const randomFace = Math.floor(Math.random() * 5); // Random number between 0 and 4
      setFinalFace(randomFace); // Set the selected final face
      setRotationSpeed(0); // Gradually stop the rotation
    } else {
      setFinalFace(null); // Reset the final face while spinning
      setRotationSpeed(0.5); // Restart the rotation speed
    }
  }, [spinning]);

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={selected ? [3.5, 3.5, 3.5] : [3, 3, 3]} /> 
      {textures.map((texture, index) => (
        <meshStandardMaterial
          attach={`material-${index}`} // Attach texture as a material
          map={texture} // Map the loaded texture
          key={index} // Use index as the key
        />
      ))}
    </mesh>
  );
};

export default RotatingDice;
