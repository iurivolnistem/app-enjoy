import React, {useContext} from 'react';
import { Text, Button } from 'react-native'
import {Container} from './styles';

import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';
import AsyncStorage from '@react-native-community/async-storage';


export default () => {

    const {state:user} = useContext(UserContext);
    const {dispatch: userDispatch } = useContext(UserContext);

    const navigation = useNavigation();

    const logout = async () => {
        await AsyncStorage.setItem('id', '')
        userDispatch({
            type: 'setNome',
            payload: {
                nome: null
            }
        });
        userDispatch({
            type: 'setId',
            payload: {
                id: null
            }
        });
        userDispatch({
            type: 'setEmail',
            payload: {
                email: null
            }
        });
        navigation.reset({
            routes: [{name: 'Login'}]
        })
    }

    return (
        <Container>
            <Text>Perfil - {user.nome}</Text>
            <Text>{user.email}</Text>
            <Button title="Sair" onPress={logout}></Button>
        </Container>
    );
}