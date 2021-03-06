import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../screens/Preload';
import Login from '../screens/Login';
import Cadastrar from '../screens/Cadastrar'
import MainTab from '../stacks/MainTab';
import Produto from '../screens/Produto';
import Detalhes from '../screens/Detalhe';
import Enderecos from '../screens/Enderecos';
import Telefones from '../screens/Telefones';

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator
        initialRouteName="Preload" 
        screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="Preload" component={Preload}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Cadastrar" component={Cadastrar}/>
            <Stack.Screen name="MainTab" component={MainTab}/>
            <Stack.Screen name="Produto" component={Produto}/>
            <Stack.Screen name="Detalhes" component={Detalhes}/>
            <Stack.Screen name="Enderecos" component={Enderecos}/>
            <Stack.Screen name="Telefones" component={Telefones}/>
        </Stack.Navigator>
    );
}