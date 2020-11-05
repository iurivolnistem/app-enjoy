import React, {useEffect, useContext} from 'react';
import {Text} from 'react-native'
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'

import {UserContext} from '../../contexts/UserContext';

import Api from '../../Api';

import Food from '../../assets/arroz.svg';

export default () => {

    const {dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(() => {
        const verificarToken = async () => {
            const token = await AsyncStorage.getItem('id');
            if(token !== null){
                let response = await Api.checkID(token)
                if(response.status == 'true'){
                    await AsyncStorage.setItem('id', response.cliente.id.toString())
                    userDispatch({
                        type: 'setNome',
                        payload: {
                            nome: response.cliente.nome
                        }
                    });
                    userDispatch({
                        type: 'setId',
                        payload: {
                            id: response.cliente.id
                        }
                    });
                    userDispatch({
                        type: 'setEmail',
                        payload: {
                            email: response.cliente.email
                        }
                    });

                    navigation.reset({
                        routes:[{name: 'MainTab'}]
                    });
                }
                else{
                    navigation.reset({
                        routes:[{name: 'Login'}]
                    });
                }
            }
            else{
                navigation.reset({
                    routes:[{name: 'Login'}]
                });
            }
        }
        verificarToken();
    }, []);

    return (
        <Container>
            <Food width="100%" height="160" />
            <LoadingIcon size="large" color="#fff" />
        </Container>
    );
}