import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Container from '../../components/Container';
import { AuthContext } from '../../routes/MainNavigator';
import RootNavigation from '../../routes/RootNavigation';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            email: '',
        };
    }

    _onChangeText = (key) => (value) => {
        this.setState({
            [key]: value.trimLeft()
        })
    }

    render() {
        return (
            <AuthContext.Consumer>
                {(authContext) => (
                    <Container>
                        <TextInput
                            placeholder='Full name'
                            onChangeText={this._onChangeText('name')}
                            style={{
                                width: '70%',
                                marginTop: 24,
                                padding: 5,
                                borderWidth: 1,
                                borderRadius: 6
                            }}
                        />
                        <TextInput
                            placeholder='Username'
                            onChangeText={this._onChangeText('username')}
                            style={{
                                width: '70%',
                                marginTop: 24,
                                padding: 5,
                                borderWidth: 1,
                                borderRadius: 6
                            }}
                        />
                        <TextInput
                            placeholder='password'
                            onChangeText={this._onChangeText('password')}
                            style={{
                                width: '70%',
                                marginTop: 24,
                                padding: 5,
                                borderWidth: 1,
                                borderRadius: 6
                            }}
                        />
                        <TextInput
                            placeholder='Email'
                            onChangeText={this._onChangeText('email')}
                            style={{
                                width: '70%',
                                marginTop: 24,
                                padding: 5,
                                borderWidth: 1,
                                borderRadius: 6
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                width: 100,
                                height: 45,
                                borderRadius: 8,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#13AF',
                                marginTop: 36
                            }}
                            onPress={() => authContext.register(this.state)}
                        >
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                color: 'white'
                            }}>REGISTER</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                padding: 8,
                                marginTop: 24
                            }}
                            onPress={() => {
                                RootNavigation.navigate('LoginScreen')
                            }}
                        >
                            <Text style={{
                                fontSize: 14,
                                color: 'blue'
                            }}>Login</Text>
                        </TouchableOpacity>
                    </Container>
                )}
            </AuthContext.Consumer>

        );
    }
}

export default RegisterScreen;
