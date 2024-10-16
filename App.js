import React from 'react';
import { SafeAreaView } from 'react-native';
import DiceSet from './src/components/dice/DiceSet';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DiceSet />
    </SafeAreaView>
  );
};

export default App;
