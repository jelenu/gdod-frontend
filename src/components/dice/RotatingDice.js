import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import TextureLoader from './TextureLoader';

const RotatingDice = ({ spinning }) => {
  const meshRef = useRef(); // Reference to the dice mesh
  const [textures, setTextures] = useState([]); // State to hold the dice textures
  const [finalFace, setFinalFace] = useState(null); // State to track the final face to land on
  const [rotationSpeed, setRotationSpeed] = useState(0.5); // Initial rotation speed

  // Load textures when the component mounts
  useEffect(() => {
    const loadTextures = async () => {
      try {
        const loadedTextures = await TextureLoader(); // Load textures asynchronously
        setTextures(loadedTextures); // Update state with loaded textures
      } catch (error) {
        console.error("Error loading textures:", error); // Log error if texture loading fails
      }
    };

    loadTextures();
  }, []);

  // Adjust the continuous rotation while spinning
  useFrame(() => {
    if (spinning && meshRef.current) {
      // Continuous rotation while spinning
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed;
      meshRef.current.rotation.z += rotationSpeed;
    } else if (meshRef.current && finalFace !== null) {
      // Stop on the exact face when spinning ends
      const angles = getRotationAngles(finalFace); // Get angles for the final face
      meshRef.current.rotation.x = angles.x;
      meshRef.current.rotation.y = angles.y;
      meshRef.current.rotation.z = angles.z;
    }
  });

  // Generate an angle based on the final face when the spin ends
  useEffect(() => {
    if (!spinning) {
      // When spinning stops, select a random face
      const randomFace = Math.floor(Math.random() * 6); // Random number between 0 and 5
      setFinalFace(randomFace); // Set the selected final face
      setRotationSpeed(0); // Gradually stop the rotation
    } else {
      setFinalFace(null); // Reset the final face while spinning
      setRotationSpeed(0.5); // Restart the rotation speed
    }
  }, [spinning]);

  // Function to get the rotation angles for each face
  const getRotationAngles = (face) => {
    const faceAngles = [
      { x: 0, y: 0, z: 0 },                     // Face 1 (front)
      { x: 0, y: Math.PI / 2, z: 0 },           // Face 2 (right)
      { x: 0, y: Math.PI, z: 0 },               // Face 3 (back)
      { x: 0, y: -Math.PI / 2, z: 0 },          // Face 4 (left)
      { x: -Math.PI / 2, y: 0, z: 0 },          // Face 5 (top)
      { x: Math.PI / 2, y: 0, z: 0 },           // Face 6 (bottom)
    ];
    return faceAngles[face]; // Return the angles for the selected face
  };

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[3, 3, 3]} />
      {textures.map((texture, index) => (
        <meshStandardMaterial
          attach={`material-${index}`} // Attach the texture as a material
          map={texture} // Map the loaded texture
          key={index} // Use index as the key
        />
      ))}
    </mesh>
  );
};

export default RotatingDice;
