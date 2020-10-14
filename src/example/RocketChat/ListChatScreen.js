import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import api from '../../api';
import WS from '../../api/ws';
import RootNavigation from '../../routes/RootNavigation';

class ListChatScreen extends Component {
    state = {
        listUser: [],
        isLoading: true
    }

    componentDidMount() {
        console.log(WS.ws.readyState, 'STATE LIST CHAT')
        api.fetch('users.list')
            .then(async (res) => {
                const myInfo = await AsyncStorage.getItem('user')
                this.setState({
                    listUser: [...res.users],
                    isLoading: false
                })
                console.log(res.users, 'res user list')
            })
            .catch(err => {
                this.setState({ isLoading: false })
                console.log(err, 'err get list')
            })
    }

    render() {
        const { listUser, isLoading } = this.state
        return (
            <FlatList
                data={listUser}
                extraData={listUser}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                RootNavigation.navigate('ChatScreen', { user: item })
                            }}
                            style={{
                                flex: 1,
                                borderBottomWidth: 0.5,
                                paddingVertical: 16,
                                paddingHorizontal: 24,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <View style={{
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                borderWidth: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 16
                            }}>
                                <Text>{item.name.substr(0, 2)}</Text>
                            </View>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )
                }}
                ListEmptyComponent={() => (
                    isLoading ? (
                        <View style={{ marginTop: 16 }}>
                            <ActivityIndicator size='small' />
                        </View>
                    ) : (
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }} >
                                <Text>User Not Found</Text>
                            </View>
                        )
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}

export default ListChatScreen;
