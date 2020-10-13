import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../../routes/MainNavigator';

const ButtonLogout = () => {
    const { logout } = React.useContext(AuthContext);
    return (
        <TouchableOpacity
            style={{
                width: 60,
                height: 30,
                borderRadius: 4,
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onPress={logout}
        >
            <Text>Logout</Text>
        </TouchableOpacity>
    )
}

export default ButtonLogout;