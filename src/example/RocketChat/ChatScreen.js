import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import WS from '../../api/ws';
import Icon from 'react-native-vector-icons/MaterialIcons'
import images from '../../assets/images'
import RootNavigation from '../../routes/RootNavigation';
import api from '../../api';
import { userInfo } from '../../routes/MainNavigator';
import MessageChatUI from './components/MessageChatUI';

class ChatScreen extends Component {
    state = {
        user: this.props.route.params?.user,
        newMessage: '',
        roomInfo: null,
        messageData: []
    }
    _subId = null;

    _randomId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
    _onChangeText = (text) => {
        this._onLogEventTyping(!!text)
        this.setState({
            newMessage: text
        })
    }
    _sendMessage = async () => {
        try {
            const { newMessage, roomInfo } = this.state
            const msgData = {
                _id: this._randomId(),
                rid: roomInfo._id,
                msg: newMessage,
            }

            console.log(JSON.stringify(msgData), 'msgData')
            await api.post('chat.sendMessage', { message: msgData })
            this.setState({
                newMessage: '',
            })
        } catch (error) {
            console.log(error, 'error')
        }
    }

    _loadMsgData = () => {
        const { roomInfo } = this.state
        api.fetch('im.history', {
            roomId: roomInfo._id
        })
            .then(res => {
                if (res.success) {
                    this.setState({
                        messageData: res.messages
                    })
                }
            })
            .catch(err => {
                console.log(err, 'get msg err')
            })
    }

    _subscribeRoom = () => {
        try {
            this._loadMsgData()
            this._listenNewMessageComing()
            const { roomInfo, user } = this.state
            this._subId = `${this._randomId()}-${this._randomId()}`

            const subRoomNotify = {
                msg: "sub",
                id: this._subId,
                name: "stream-room-messages",
                params: [
                    roomInfo._id,
                    true
                ]
            }
            WS.ws.send(JSON.stringify(subRoomNotify))
        } catch (error) {
            console.log(error, 'eroroerere')
        }
    }

    _listenNewMessageComing = () => {
        WS.onMessage((event) => {
            const msgData = JSON.parse(event.data)
            if (msgData.msg === 'changed') {
                console.log(msgData, 'msgData')
                const newMsg = msgData.fields.args
                this.setState(prev => {
                    return {
                        messageData: [...newMsg, ...prev.messageData]
                    }
                })
            }
        })
    }

    _onLogEventTyping = (flag) => {
        const { roomInfo } = this.state
        const msgNotifyRoom = {
            msg: "method",
            method: "stream-notify-room",
            id: "42",
            params: [
                `${roomInfo._id}/typing`,
                userInfo?.me.username,
                flag
            ]
        }

        WS.sendMessage(JSON.stringify(msgNotifyRoom))
    }

    render() {
        const { newMessage, user, messageData } = this.state
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
                {messageData.length ? (<MessageChatUI data={messageData} />) : (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                        <ActivityIndicator />
                    </View>
                )}
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
                        value={newMessage}
                        style={{
                            flex: 1,
                            padding: 8,
                            alignItems: 'stretch',
                            borderRadius: 6,
                            borderWidth: 0.5
                        }}
                        autoCorrect={false}
                        onSubmitEditing={this._sendMessage}
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
        const { user } = this.state
        api.post('im.create', {
            username: user.username
        })
            .then(res => {
                this.setState({
                    roomInfo: res.room
                }, this._subscribeRoom)
            })
            .catch(err => {
                console.log(err, 'ABCCCCC')
            })
    }
}

export default ChatScreen;
