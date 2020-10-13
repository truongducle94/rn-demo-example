import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/routes/MainNavigator';
import { navigationRef } from './src/routes/RootNavigation';
import WS from './src/api/ws';

export default function App() {
  useEffect(() => {
    WS.init()
    WS.ws.addEventListener('open', () => {
      console.log('connected server')
      const data = {
        msg: "connect",
        version: "1",
        support: ["1"]
      }
      WS.sendMessage(JSON.stringify(data))
    })
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <MainNavigator />
    </NavigationContainer>
  );
}