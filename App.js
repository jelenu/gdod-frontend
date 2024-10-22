// Importing React library to use React components
import React from 'react';

// Importing NavigationContainer to manage navigation between screens
import { NavigationContainer } from '@react-navigation/native';

// Importing createNativeStackNavigator to create a stack-based navigator for the app
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importing HomeScreen component from the screens directory
import HomeScreen from './src/screens/HomeScreen';

// Importing GameBoardScreen component from the game subdirectory in screens
import GameBoardScreen from './src/screens/game/GameBoardScreen';

// Creating a stack navigator instance
const Stack = createNativeStackNavigator();

// Main application component
export default function App() {
  return (
    // Wrapping the entire application in NavigationContainer to enable navigation
    <NavigationContainer>
      {/* Setting up the stack navigator with initial route set to "Home" */}
      <Stack.Navigator initialRouteName="Home">
        {/* Defining the Home screen in the stack */}
        <Stack.Screen 
          name="Home" // Name of the route
          component={HomeScreen} // Component to be rendered for this route
          options={{ headerShown: false }} // Hiding the header for this screen
        />
        
        {/* Defining the GameBoard screen in the stack */}
        <Stack.Screen 
          name="GameBoard" // Name of the route
          component={GameBoardScreen} // Component to be rendered for this route
          options={{ headerShown: false }} // Hiding the header for this screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
