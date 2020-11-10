import React, {useContext} from 'react';
import { Text, Button } from 'react-native'
import { Container, AreaPerfil, HeaderInfo, HeaderTextInfo, HeaderSubText , Infos, InfosButton, InfosButtonText, SairButtonArea, SairButton, SairButtonText } from './styles';

import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';
import AsyncStorage from '@react-native-community/async-storage';

import NextIcon from '../../assets/next.svg';


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

    const meusEnderecos = () => {
        navigation.navigate('Enderecos')
    }

    return (
        <Container>
            <HeaderInfo>
                <HeaderTextInfo>{user.nome}</HeaderTextInfo>
                <HeaderSubText>Meus dados</HeaderSubText>
            </HeaderInfo>
            <AreaPerfil>
                <InfosButton>
                    <InfosButtonText>{user.email}</InfosButtonText>
                </InfosButton>
                <InfosButton onPress={meusEnderecos}>
                    <InfosButtonText>Meus endereços</InfosButtonText>
                    <NextIcon width="20" height="20" fill="#FA7921" />
                </InfosButton>
                <InfosButton>
                    <InfosButtonText>Meus telefones</InfosButtonText>
                    <NextIcon width="20" height="20" fill="#FA7921" />
                </InfosButton>
            </AreaPerfil>
            <SairButtonArea>
                <SairButton onPress={logout}>
                    <SairButtonText>Logout</SairButtonText>
                </SairButton>
            </SairButtonArea>
        </Container>
    );
}