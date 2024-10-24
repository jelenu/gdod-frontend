// Función para reordenar los sets de dados de atacante y defensor
export const reorderDiceSets = (attackerDiceSet, defenderDiceSet) => {
    const swordsAttacker = attackerDiceSet.filter((num) => num === 0);
    const helmetsDefender = defenderDiceSet.filter((num) => num === 2);
  
    const arrowsAttacker = attackerDiceSet.filter((num) => num === 1);
    const shieldsDefender = defenderDiceSet.filter((num) => num === 3);
  
    const swordsDefender = defenderDiceSet.filter((num) => num === 0);
    const helmetsAttacker = attackerDiceSet.filter((num) => num === 2);
  
    const arrowsDefender = defenderDiceSet.filter((num) => num === 1);
    const shieldsAttacker = attackerDiceSet.filter((num) => num === 3);
  
    const equalizeLength = (array1, array2) => {
      const lengthDiff = array1.length - array2.length;
  
      if (lengthDiff > 0) {
        return [array1, [...array2, ...Array(lengthDiff).fill(null)]];
      } else if (lengthDiff < 0) {
        return [[...array1, ...Array(-lengthDiff).fill(null)], array2];
      } else {
        return [array1, array2];
      }
    };
  
    const [equalSwordsAttacker, equalHelmetsDefender] = equalizeLength(
      swordsAttacker,
      helmetsDefender
    );
    const [equalArrowsAttacker, equalShieldsDefender] = equalizeLength(
      arrowsAttacker,
      shieldsDefender
    );
  
    const [equalSwordsDefender, equalHelmetsAttacker] = equalizeLength(
      swordsDefender,
      helmetsAttacker
    );
    const [equalArrowsDefender, equalShieldsAttacker] = equalizeLength(
      arrowsDefender,
      shieldsAttacker
    );
  
    const stealAttacker = attackerDiceSet.filter((num) => num === 4);
    const stealDefender = defenderDiceSet.filter((num) => num === 4);
  
    // Longitud total deseada (la suma de ambas longitudes)
    const totalLength = stealAttacker.length + stealDefender.length;
  
    // Rellena `stealAttacker` con 'null' al final para que su longitud sea la total
    const equalStealAttacker = [
      ...stealAttacker,
      ...new Array(totalLength - stealAttacker.length).fill(null),
    ];
  
    // Rellena `stealDefender` con 'null' al principio para que su longitud sea la total
    const equalStealDefender = [
      ...new Array(totalLength - stealDefender.length).fill(null),
      ...stealDefender,
    ];
  
    const reorderedAttackerDiceSet = [
      ...equalSwordsAttacker,
      ...equalArrowsAttacker,
      ...equalHelmetsAttacker,
      ...equalShieldsAttacker,
      ...equalStealAttacker,
    ];
  
    const reorderedDefenderDiceSet = [
      ...equalHelmetsDefender,
      ...equalShieldsDefender,
      ...equalSwordsDefender,
      ...equalArrowsDefender,
      ...equalStealDefender,
    ];
  
    return [reorderedAttackerDiceSet, reorderedDefenderDiceSet];
  };
  
  // Función para obtener la imagen del dado según su valor
  export const getDiceImage = (dieValue) => {
    switch (dieValue) {
      case 0:
        return require("../../../../../assets/dice/sword_face.png");
      case 1:
        return require("../../../../../assets/dice/arrow_face.png");
      case 2:
        return require("../../../../../assets/dice/helmet_face.png");
      case 3:
        return require("../../../../../assets/dice/shield_face.png");
      case 4:
        return require("../../../../../assets/dice/steal_face.png");
      case null:
        return null; // Retornar null si dieValue no coincide
    }
  };
  