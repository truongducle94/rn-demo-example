import React, { Component } from 'react';
import { View, Text, ToastAndroid, ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../example/Home';
import RocketChat from '../example/RocketChat';
import ChatScreen from '../example/RocketChat/ChatScreen';
import ListChatScreen from '../example/RocketChat/ListChatScreen';
import RegisterScreen from '../example/Authen/RegisterScreen';
import LoginScreen from '../example/Authen/LoginScreen';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../api';
import RootNavigation from './RootNavigation';
import Container from '../components/Container';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
export const AuthContext = React.createContext()

const MainDrawer = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} />
            <Stack.Screen name="RocketChat" component={ListChatScreen} />
        </Drawer.Navigator>
    )
}

class MainNavigator extends Component {
    state = {
        isLogin: false,
        isLoading: true
    }

    _getUserInfo = async () => {
        const user = await AsyncStorage.getItem('user')
        if (user) {
            api.setDefaultHeader(JSON.parse(user))
            this.setState({
                isLoading: false,
                isLogin: true
            })
        } else {
            this.setState({
                isLoading: false,
            })
        }
    }

    authContext = () => ({
        login: async ({ user, password }) => {
            try {
                const loginData = await api.login({ user, password })
                if (loginData.status === 'success') {
                    this.setState({
                        isLogin: true
                    })
                }
            } catch (error) {

            }
        },
        logout: async () => {
            const [logoutResponse, removeAsync] = await Promise.all([
                api.post('logout'),
                AsyncStorage.removeItem('user')
            ])
            if (logoutResponse.status === 'success') {
                this.setState({
                    isLogin: false
                })
            } else {
                alert('Logout failure')
            }
        },
        register: async data => {
            try {
                const registerData = await api.post('users.create', data)
                alert('Register Success')
                RootNavigation.navigate('LoginScreen')
            } catch (error) {
                alert('Register Failure')
            }
        },
    })

    componentDidMount = async () => {
        await this._getUserInfo()
    }

    render() {
        const { isLoading, isLogin } = this.state
        if (isLoading) {
            return (
                <Container>
                    <ActivityIndicator size='small' />
                </Container>
            )
        }
        return (

            <AuthContext.Provider value={this.authContext()}>
                {isLogin ? (
                    <Stack.Navigator headerMode={'none'}>
                        <Stack.Screen name="MainStack" component={MainDrawer} />
                        <Stack.Screen name="ChatScreen" component={ChatScreen} />
                        {/* <Stack.Screen name="ListChatScreen" component={ListChatScreen} /> */}
                    </Stack.Navigator>
                ) : (
                        <Stack.Navigator headerMode='none' initialRouteName='LoginScreen'>
                            <Stack.Screen
                                name="LoginScreen"
                                component={LoginScreen}
                                options={{
                                    title: 'Sign in',
                                    animationTypeForReplace: isLogin ? 'push' : 'pop',
                                }}
                            />
                            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                        </Stack.Navigator>
                    )}

            </AuthContext.Provider>
        );
    }
}

export default MainNavigator;



