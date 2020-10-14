import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import WS from '../../api/ws';
import Icon from 'react-native-vector-icons/MaterialIcons'
import images from '../../assets/images'
import RootNavigation from '../../routes/RootNavigation';
import api from '../../api';

class ChatScreen extends Component {
    state = {
        user: this.props.route.params?.user,
        message: '',
        roomInfo: null
    }

    _randomId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
    _onChangeText = (text) => {
        this.setState({
            message: text
        })
    }
    _sendMessage = async () => {
        const { message, roomInfo, user } = this.state
        const msgData = {
            _id: this._randomId(),
            rid: roomInfo._id,
            msg: message
        }
        // const msg = {
        //     msg: "method",
        //     method: "sendMessage",
        //     id: "42",
        //     params: [
        //         {
        //             _id: roomInfo._id,
        //             rid: roomInfo._id,
        //             msg: message
        //         }
        //     ]
        // }
        console.log(JSON.stringify(msgData), 'msgData')
        // WS.sendMessage(JSON.stringify(msg))
        try {
            const response = await api.post('chat.sendMessage', { message: msgData })
            console.log(response, 'response')
        } catch (error) {
            console.log(error, 'error')
        }
    }

    render() {
        const { message, user } = this.state
        return (
            <View style={{
                flex: 1
            }}>
                <View style={{
                    width: '100%',
                    height: 50,
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 16,
                    backgroundColor: 'red'
                }}>
                    <TouchableOpacity style={{ padding: 4 }} onPress={RootNavigation.pop}>
                        <Image
                            style={{
                                width: 18,
                                height: 18,
                                resizeMode: 'contain',
                                tintColor: 'white'
                            }}
                            source={images.ic_back}
                        />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>{user.name}</Text>
                    </View>
                    <View style={{ width: 18, height: 18 }} />
                </View>
                <View style={{
                    flex: 1
                }}>

                </View>
                <View style={{
                    width: '100%',
                    padding: 12,
                    height: 60,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <TextInput
                        placeholder='Type a message'
                        onChangeText={this._onChangeText}
                        value={message}
                        style={{
                            flex: 1,
                            padding: 5,
                            alignItems: 'stretch',
                            borderRadius: 6,
                            borderWidth: 0.5
                        }}
                    />
                    <TouchableOpacity
                        style={{
                            padding: 4
                        }}
                        onPress={this._sendMessage}
                    >
                        <Icon name='send' size={24} color='blue' />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    componentDidMount() {
        console.log(WS.ws.readyState, 'STATE')
        const { user } = this.state
        api.post('im.create', {
            username: user.username
        })
            .then(res => {
                this.setState({
                    roomInfo: res.room
                })
            })
            .catch(err => {
                console.log(err, 'ABCCCCC')
            })
        // console.log(user, 'USER HERE')
        // const directMsg = {
        //     msg: "method",
        //     method: "createDirectMessage",
        //     id: "42",
        //     params: [{ username: user.username }]
        // }
        // console.log(JSON.stringify(directMsg), 'directMsg')
        // WS.sendMessage(JSON.stringify(directMsg))
    }
}

export default ChatScreen;
