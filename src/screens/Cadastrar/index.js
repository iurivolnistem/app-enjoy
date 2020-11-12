import React, { useState, useContext } from 'react';
import {Text} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Container, TextoLogo, InputArea, CustomButton, CustomButtonText, MensagemButton, MensagemButtonText, MensagemButtonTextBold } from './styles';
import AsyncStorage from '@react-native-community/async-storage';

import {UserContext} from '../../contexts/UserContext';

import Api from '../../Api';

import CompInput from '../../components/CompInput';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const[nome, setNome]   = useState('');
    const[cpf,  setCpf]    = useState('');
    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');
    const[confirmaSenha, setConfirmaSenha] = useState('');

    const botaoMensagemClick = () => {
        navigation.reset({
            routes: [{name: 'Login'}]
        })
    }

    const botaoLoginClick = async () => {
        if(nome != '' && cpf != '' && email != '' && senha != '' && confirmaSenha != ''){
            let response = await Api.cadastro({nome: nome, cpf: cpf, email: email,senha: senha, confirma_senha: confirmaSenha});
            if(response.status == 'sucesso'){
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
                alert('Erro', response.mensagem);
            }
        }
    }

    return (
        <Container>
            <TextoLogo>Enjoy Sushi Delivery</TextoLogo>
            <InputArea>

                <CompInput 
                    IconSvg={PersonIcon} 
                    placeholder="Digite seu nome" 
                    value={nome}
                    onChangeText={texto => setNome(texto)}
                    password={false}
                    lenght={100}
                    />

                <CompInput 
                    IconSvg={PersonIcon} 
                    placeholder="Digite seu cpf" 
                    value={cpf}
                    onChangeText={texto => setCpf(texto)}
                    password={false}
                    mascara={"[000].[000].[000]-[00]"}
                    lenght={14}
                    />

                <CompInput 
                    IconSvg={EmailIcon} 
                    placeholder="Digite seu email" 
                    value={email}
                    onChangeText={texto => setEmail(texto)}
                    password={false}
                    lenght={100}
                    />

                <CompInput 
                    IconSvg={LockIcon} 
                    placeholder="Digite sua senha" 
                    value={senha}
                    onChangeText={texto => setSenha(texto)}
                    password={true}
                    lenght={16}
                    />

                <CompInput 
                    IconSvg={LockIcon} 
                    placeholder="Confirme sua senha" 
                    value={confirmaSenha}
                    onChangeText={texto => setConfirmaSenha(texto)}
                    password={true}
                    lenght={16}
                    />

                <CustomButton onPress={botaoLoginClick}>
                    <CustomButtonText>Cadastrar</CustomButtonText>
                </CustomButton>
            </InputArea>

            <MensagemButton onPress={botaoMensagemClick}>
                <MensagemButtonText>Já possui uma conta?</MensagemButtonText>
                <MensagemButtonTextBold>Faça login</MensagemButtonTextBold>
            </MensagemButton>
        </Container>
    );
}