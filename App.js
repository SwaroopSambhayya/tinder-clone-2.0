import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './hooks/AuthProvider';
import StackNavigator from './StackNavigator';

export default function App() {
  return( <NavigationContainer>
    <AuthProvider> 
    <StackNavigator/>
    </AuthProvider>
    </NavigationContainer>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
