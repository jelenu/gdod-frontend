import React from 'react'; // Importing React library
import { View, Text, StyleSheet , Dimensions} from 'react-native'; // Importing necessary components from React Native

// TurnDisplay functional component to show the current player's turn and round
const CoinDisplay = ({coin}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.turnText}>
        Gold: {coin}
      </Text>
    </View>
  );
};

const { width } = Dimensions.get('window');

// Styles for the component
const styles = StyleSheet.create({

  turnText: {
    fontSize: width > 600 ? 28 : 20, // Cambiar el tamaño de la fuente basado en el ancho de la pantalla
    fontWeight: 'bold', // Making the text bold
    color:"#cfcfcf",
  },
});

// Exporting the TurnDisplay component for use in other parts of the application
export default CoinDisplay;
