import React from 'react';
import { StyleSheet } from 'react-native';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RotatingDice from './RotatingDice';

const Dice = ({ spinning }) => {
  return (
    <Canvas style={styles.canvas}>
      {/* Disables rotation and zoom controls on the dice */}
      <OrbitControls enableRotate={false} enableZoom={false} />
      
      {/* Adds ambient lighting to the scene */}
      <ambientLight intensity={2} />

      {/* Passes the spinning prop to the RotatingDice component */}
      <RotatingDice spinning={spinning} />
    </Canvas>
  );
};

const styles = StyleSheet.create({
  canvas: {
    display: "block",
    margin: 0,
    padding: 0,
    width: 100,
    height: 100,
  },
});

export default Dice;
