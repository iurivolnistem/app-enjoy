import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';

import Home from '../screens/Home';
import Pedidos from '../screens/Pedidos';
import Perfil from '../screens/Perfil';

const Tab = createBottomTabNavigator();

export default () => (
        <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Pedidos" component={Pedidos} />
            <Tab.Screen name="Perfil" component={Perfil} />
        </Tab.Navigator>
);