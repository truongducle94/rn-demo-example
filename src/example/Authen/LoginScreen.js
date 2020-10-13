import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Container from '../../components/Container';
import RootNavigation from '../../routes/RootNavigation';
import { AuthContext } from '../../routes/MainNavigator'

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
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
                {(authContext) => {
                    // console.log(authContext.login, 'auth context login')
                    return (
                        <Container>
                            <TextInput
                                placeholder='Username or Email'
                                onChangeText={this._onChangeText('user')}
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
                                onPress={() => {
                                    authContext.login(this.state)
                                }}
                            >
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    color: 'white'
                                }}>LOGIN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    padding: 8,
                                    marginTop: 24
                                }}
                                onPress={() => {
                                    RootNavigation.navigate('RegisterScreen')
                                }}
                            >
                                <Text style={{
                                    fontSize: 14,
                                    color: 'blue'
                                }}>Register</Text>
                            </TouchableOpacity>
                        </Container>
                    )
                }}
            </AuthContext.Consumer>
        );
    }
}

export default LoginScreen;

