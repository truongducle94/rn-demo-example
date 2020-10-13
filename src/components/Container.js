import React from 'react';
import { Text, View } from 'react-native';

const Container = (props) => (
    <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        {props.children}
    </View>
);

export default Container;

