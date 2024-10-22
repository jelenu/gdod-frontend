import * as THREE from 'three';
import { Platform } from 'react-native';

const DiceTextureLoader = async () => {
  const textureLoader = new THREE.TextureLoader(); // Create a new texture loader instance

  // Load textures asynchronously for different platforms
  const textures = await Promise.all([
    textureLoader.loadAsync(Platform.select({
      ios: require("../../../../../assets/dice/arrow_face.png"), // Texture for arrow face
      android: require("../../../../../assets/dice/arrow_face.png"),
      web: "../../../../../assets/dice/arrow_face.png",
    })),
    textureLoader.loadAsync(Platform.select({
      ios: require("../../../../../assets/dice/helmet_face.png"), // Texture for helmet face
      android: require("../../../../../assets/dice/helmet_face.png"),
      web: "../../../../../assets/dice/helmet_face.png",
    })),
    textureLoader.loadAsync(Platform.select({
      ios: require("../../../../../assets/dice/steal_face.png"), // Texture for steal face
      android: require("../../../../../assets/dice/steal_face.png"),
      web: "../../../../../assets/dice/steal_face.png",
    })),
    textureLoader.loadAsync(Platform.select({
      ios: require("../../../../../assets/dice/sword_face.png"), // Texture for sword face
      android: require("../../../../../assets/dice/sword_face.png"),
      web: "../../../../../assets/dice/sword_face.png",
    })),
    textureLoader.loadAsync(Platform.select({
      ios: require("../../../../../assets/dice/shield_face.png"), // Texture for shield face
      android: require("../../../../../assets/dice/shield_face.png"),
      web: "../../../../../assets/dice/shield_face.png",
    })),
    textureLoader.loadAsync(Platform.select({
      ios: require("../../../../../assets/dice/steal_face.png"), // Duplicate texture for steal face
      android: require("../../../../../assets/dice/steal_face.png"),
      web: "../../../../../assets/dice/steal_face.png",
    })),
  ]);

  return textures; // Return the loaded textures
};

export default DiceTextureLoader;
