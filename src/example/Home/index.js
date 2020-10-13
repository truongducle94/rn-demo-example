import React, { Component } from 'react';
import { View, Text, Pressable } from 'react-native';
import ButtonLogout from '../RocketChat/components/ButtonLogout';

class Home extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Pressable
                    style={{ marginBottom: 30 }}
                    onPress={() => {
                        this.props.navigation.openDrawer()
                    }}>
                    <Text>Open Drawer</Text>
                </Pressable>
                <ButtonLogout />
            </View>
        );
    }
}

export default Home;
