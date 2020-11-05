import React, {useState, useContext} from 'react';
import {Text} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Container, TextoLogo, InputArea, CustomButton, CustomButtonText, MensagemButton, MensagemButtonText, MensagemButtonTextBold } from './styles';
import AsyncStorage from '@react-native-community/async-storage';

import {UserContext} from '../../contexts/UserContext';

import Api from '../../Api';

import CompInput from '../../components/CompInput';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {

    const {dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');

    const botaoMensagemClick = () => {
        navigation.reset({
            routes: [{name: 'Cadastrar'}]
        })
    }

    const botaoLoginClick = async () => {
        if(email != '' && senha != ''){
            let response = await Api.login({email: email, senha: senha});
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
                alert(response.mensagem);
            }
        }
        else{
            alert('Preencha os campos!');
        }
    }

    return (
        <Container>
            <TextoLogo>Enjoy Sushi Delivery</TextoLogo>
            <InputArea>

                <CompInput 
                    IconSvg={EmailIcon} 
                    placeholder="Digite seu email" 
                    value={email}
                    onChangeText={t => setEmail(t)}
                    password={false}
                    />

                <CompInput 
                    IconSvg={LockIcon} 
                    placeholder="Digite sua senha" 
                    value={senha}
                    onChangeText={t => setSenha(t)}
                    password={true}
                    />

                <CustomButton onPress={botaoLoginClick}>
                    <CustomButtonText>Login</CustomButtonText>
                </CustomButton>
            </InputArea>

            <MensagemButton onPress={botaoMensagemClick}>
                <MensagemButtonText>Ainda não possuo conta</MensagemButtonText>
                <MensagemButtonTextBold>Cadastre-se</MensagemButtonTextBold>
            </MensagemButton>
        </Container>
    );
}