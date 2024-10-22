export const getRotationAngles = (face) => {
  const faceAngles = [
    { x: 0, y: 0, z: 0 },                     // Face 1 (front)
    { x: 0, y: Math.PI / 2, z: 0 },           // Face 2 (right)
    { x: 0, y: Math.PI, z: 0 },               // Face 3 (back)
    { x: 0, y: -Math.PI / 2, z: 0 },          // Face 4 (left)
    { x: -Math.PI / 2, y: 0, z: 0 },          // Face 5 (top)
    { x: Math.PI / 2, y: 0, z: 0 },           // Face 6 (bottom)
  ];
  return faceAngles[face]; // Returns the corresponding angles for the given face
};
