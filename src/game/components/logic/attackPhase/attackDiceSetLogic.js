// Function to reorder the attacker and defender dice sets
export const reorderDiceSets = (attackerDiceSet, defenderDiceSet) => {
  const swordsAttacker = attackerDiceSet.filter((die) => die.number === 0);
  const helmetsDefender = defenderDiceSet.filter((die) => die.number === 2);

  const arrowsAttacker = attackerDiceSet.filter((die) => die.number === 1);
  const shieldsDefender = defenderDiceSet.filter((die) => die.number === 3);

  const swordsDefender = defenderDiceSet.filter((die) => die.number === 0);
  const helmetsAttacker = attackerDiceSet.filter((die) => die.number === 2);

  const arrowsDefender = defenderDiceSet.filter((die) => die.number === 1);
  const shieldsAttacker = attackerDiceSet.filter((die) => die.number === 3);

  // Function to equalize the lengths of two arrays
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

  const stealAttacker = attackerDiceSet.filter((die) => die.number === 4);
  const stealDefender = defenderDiceSet.filter((die) => die.number === 4);

  // Desired total length (the sum of both lengths)
  const totalLength = stealAttacker.length + stealDefender.length;

  // Fill `stealAttacker` with 'null' at the end to make its length equal to the total
  const equalStealAttacker = [
    ...stealAttacker,
    ...new Array(totalLength - stealAttacker.length).fill(null),
  ];

  // Fill `stealDefender` with 'null' at the beginning to make its length equal to the total
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

// Function to get the image of the die based on its value
export const getDiceImage = (die) => {
  if (!die) return null; // If the die is null, return null

  switch (die.number) {
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
    default:
      return null; // Return null if it doesn't match
  }
};
