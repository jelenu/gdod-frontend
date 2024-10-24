import * as THREE from 'three';
import { Platform } from 'react-native';

// Function to load dice textures based on random gold textures
const DiceTextureLoader = async (randomGoldTextures) => {
  const textureLoader = new THREE.TextureLoader(); // Create a new texture loader instance

  // Paths for normal and gold textures
  const texturePaths = {
    shield: {
      normal: require("../../../../../assets/dice/shield_face.png"),
      gold: require("../../../../../assets/dice/shield_face_gold.png")
    },
    arrow: {
      normal: require("../../../../../assets/dice/arrow_face.png"),
      gold: require("../../../../../assets/dice/arrow_face_gold.png")
    },
    steal: {
      normal: require("../../../../../assets/dice/steal_face.png"),
      gold: require("../../../../../assets/dice/steal_face_gold.png")
    },
    sword: {
      normal: require("../../../../../assets/dice/sword_face.png"),
      gold: require("../../../../../assets/dice/sword_face_gold.png")
    },
    helmet: {
      normal: require("../../../../../assets/dice/helmet_face.png"),
      gold: require("../../../../../assets/dice/helmet_face_gold.png")
    }
  };

  // Load textures using the random list
  const textures = await Promise.all([
    textureLoader.loadAsync(Platform.select({
      ios: randomGoldTextures[3] ? texturePaths.shield.gold : texturePaths.shield.normal,
      android: randomGoldTextures[3] ? texturePaths.shield.gold : texturePaths.shield.normal,
      web: randomGoldTextures[3] ? "../../../../../assets/dice/shield_face_gold.png" : "../../../../../assets/dice/shield_face.png",
    })),
    textureLoader.loadAsync(Platform.select({
      ios: randomGoldTextures[1] ? texturePaths.arrow.gold : texturePaths.arrow.normal,
      android: randomGoldTextures[1] ? texturePaths.arrow.gold : texturePaths.arrow.normal,
      web: randomGoldTextures[1] ? "../../../../../assets/dice/arrow_face_gold.png" : "../../../../../assets/dice/arrow_face.png",
    })),
    textureLoader.loadAsync(Platform.select({
      ios: randomGoldTextures[4] ? texturePaths.steal.gold : texturePaths.steal.normal,
      android: randomGoldTextures[4] ? texturePaths.steal.gold : texturePaths.steal.normal,
      web: randomGoldTextures[4] ? "../../../../../assets/dice/steal_face_gold.png" : "../../../../../assets/dice/steal_face.png",
    })),
    textureLoader.loadAsync(Platform.select({
      ios: randomGoldTextures[4] ? texturePaths.steal.gold : texturePaths.steal.normal,
      android: randomGoldTextures[4] ? texturePaths.steal.gold : texturePaths.steal.normal,
      web: randomGoldTextures[4] ? "../../../../../assets/dice/steal_face_gold.png" : "../../../../../assets/dice/steal_face.png",
    })),
    textureLoader.loadAsync(Platform.select({
      ios: randomGoldTextures[0] ? texturePaths.sword.gold : texturePaths.sword.normal,
      android: randomGoldTextures[0] ? texturePaths.sword.gold : texturePaths.sword.normal,
      web: randomGoldTextures[0] ? "../../../../../assets/dice/sword_face_gold.png" : "../../../../../assets/dice/sword_face.png",
    })),
    textureLoader.loadAsync(Platform.select({
      ios: randomGoldTextures[2] ? texturePaths.helmet.gold : texturePaths.helmet.normal,
      android: randomGoldTextures[2] ? texturePaths.helmet.gold : texturePaths.helmet.normal,
      web: randomGoldTextures[2] ? "../../../../../assets/dice/helmet_face_gold.png" : "../../../../../assets/dice/helmet_face.png",
    })),
  ]);

  return textures; // Return the loaded textures
};

export default DiceTextureLoader;
