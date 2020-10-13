import React, { Component } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import api from '../../api';
import WS from '../../api/ws';
import RootNavigation from '../../routes/RootNavigation';

class RocketChat extends Component {
    state = {
        server: ''
    }

    _onChangeText = (text) => {
        this.setState({ server: text })
    }

    _connectServer = () => {
        
    }

    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TextInput
                    style={{
                        width: '70%',
                        padding: 5,
                        borderRadius: 4,
                        borderColor: '#9D9D9D',
                        borderWidth: 1
                    }}
                    placeholder='Connect to server'
                    onChangeText={this._onChangeText}
                />
                <Pressable
                    style={{
                        height: 40,
                        justifyContent: 'center',
                        paddingHorizontal: 24,
                        marginTop: 24
                    }}
                    onPress={this._connectServer}
                >
                    <Text>Connect</Text>
                </Pressable>
            </View>
        );
    }
}

export default RocketChat;
