import React, { useState, useEffect, startTransition } from 'react';
import { View, StyleSheet } from 'react-native';
import Dice from './Dice'; 
import DiceButton from '../../controls/dice/DiceButton';
import SelectDiceButton from '../../controls/dice/SelectDiceButton';

const DiceSet = ({ player, turn }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectable, setSelectable] = useState(false);
  const [visibleButton, setVisibleButton] = useState(true);
  const [selectDiceButtonVisible, setSelectDiceButtonVisible] = useState(false);
  const [initialDiceArray, setInitialDiceArray] = useState([]);

  const startSpin = () => {
    startTransition(() => {
      setVisibleButton(false);
      setIsSpinning(true);
    });

    setTimeout(() => {
      setIsSpinning(false);
      setSelectable(true);
      setSelectDiceButtonVisible(true);
    }, 1500);  // Detiene el giro después de 1.5 segundos
  };

  useEffect(() => {
    const diceCount = 6 - player.selectedDice.length;
    setInitialDiceArray([...Array(diceCount)]);
    setVisibleButton(true);
    setSelectDiceButtonVisible(false);

  }, [turn]);



  return (
    <View>
      {/* Contenedor separado para los botones */}
      <View style={styles.buttonContainer}>
        {turn === 2 && turn === player.id && visibleButton && <DiceButton onPress={startSpin} />}
        {turn === 2 && turn === player.id && selectDiceButtonVisible && <SelectDiceButton setSelectable={setSelectable} />}
      </View>

      {/* Contenedor separado para los dados */}
      <View style={styles.diceContainer}>
        {initialDiceArray.map((_, index) => (
          <Dice key={index} spinning={isSpinning} selectable={selectable} playerId={player.id} turn={turn} />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        {turn === 1 && turn === player.id && visibleButton && <DiceButton onPress={startSpin} />}
        {turn === 1 && turn === player.id && selectDiceButtonVisible && <SelectDiceButton setSelectable={setSelectable} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Centra los botones horizontalmente
    marginBottom: 10, // Añade espacio entre los botones y los dados
  },
  diceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
});

export default DiceSet;
