import React, { Component } from 'react';
import { View, Text } from 'react-native';
import WS from '../../api/ws';

class ChatScreen extends Component {
    state = {
        user: this.props.route.params?.user
    }

    render() {
        return (
            <View>
                <Text> ChatScreen </Text>
            </View>
        );
    }

    componentDidMount() {
        console.log(WS.ws.readyState, 'STATE')
        console.log(this.state.user, 'USER HERE')
    }
}

export default ChatScreen;
