import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';

import Home from '../screens/Home';
import Pedidos from '../screens/Pedidos';
import Perfil from '../screens/Perfil';
import Sacola from '../screens/Pedido';
import { useCart } from '../contexts/CartContext';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default () => (
        <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Pedidos" component={Pedidos} />
            <Tab.Screen name="Sacola" component={Sacola} />
            <Tab.Screen name="Perfil" component={Perfil} />
        </Tab.Navigator>
);