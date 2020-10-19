import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator, { userInfo } from './src/routes/MainNavigator';
import { navigationRef } from './src/routes/RootNavigation';
import WS from './src/api/ws';
import { SafeAreaView } from 'react-native';

export default function App() {
  useEffect(() => {
    WS.init()
    WS.ws.addEventListener('message', (event) => {
      console.log('data message', event)
      const message = JSON.parse(event.data)
      if (message.msg === 'ping') {
        const pongMessage = {
          msg: 'pong'
        }
        WS.sendMessage(JSON.stringify(pongMessage))
      }

      if (message.msg === 'connected') {
        if (userInfo) {
          const wsLogin = {
            msg: "method",
            method: "login",
            id: "42",
            params: [
              { resume: userInfo.authToken }
            ]
          }

          WS.sendMessage(JSON.stringify(wsLogin))
        }
      }
    })

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
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <MainNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}