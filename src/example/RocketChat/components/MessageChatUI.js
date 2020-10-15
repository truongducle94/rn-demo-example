import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { userInfo } from '../../../routes/MainNavigator';

class MessageChatUI extends Component {
    _renderMsgItem = ({ item, index }) => {
        const isMyMsg = item.u.username === userInfo.me.username
        return (
            <View style={{
                width: '100%',
                padding: 16,
            }}>
                <View style={{
                    width: '50%',
                    alignItems: isMyMsg ? 'flex-end' : 'flex-start',
                    alignSelf: isMyMsg ? 'flex-end' : 'flex-start'
                }}>
                    <View style={{
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        borderRadius: 8,
                        backgroundColor: isMyMsg ? 'blue' : 'white'
                    }}>
                        <Text style={{
                            fontSize: 14,
                            color: isMyMsg ? 'white' : 'black'
                        }}>{item.msg}</Text>
                    </View>
                </View>
            </View >
        )
    }

    render() {
        const { data } = this.props
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    ref={refs => { this.listMsg = refs }}
                    data={data}
                    inverted
                    renderItem={this._renderMsgItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

export default MessageChatUI;
