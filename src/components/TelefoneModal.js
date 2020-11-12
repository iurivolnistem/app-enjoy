import React, {useState, useContext} from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import TextInputMask from 'react-native-text-input-mask';

import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';

import Api from '../Api';

import ExpandIcon from '../assets/expand.svg';
import UserIcon from '../assets/account.svg';

const Modal = styled.Modal``;

const ModalArea = styled.View`
    flex: 1;
    background-color: rgba(0,0,0,0.5);
    justify-content: flex-end;
`;

const ModalBody = styled.View`
    background-color: #FA7921;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    min-height: 300px;
    padding: 10px 20px 20px 20px;
`;

const Scroller = styled.ScrollView``;

const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`;

const LinhaForm = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const EnderecoInput = styled.TextInput`
    height: 40px;
    background-color: rgba(255, 255, 255, 0.4);
    flex-direction: row;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
    color: #fff;
    font-size: 16px;
`;

const CadastrarButton = styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`;

const CadastrarButtonText = styled.Text`
    color: #FA7921;
    font-weight: bold;
    font-size: 16px;
`;


export default ({visible, closeModal }) => {

    const {state:user} = useContext(UserContext);
    const[nome, setNome] = useState('');
    const[numero, setNumero] = useState('');

    const cadastrarTelefone = async () => {
        if(nome != '' && numero != ''){
            let response = await Api.cadastraTelefone({nome: nome, numero: numero, id_cliente: user.id});
            if(response.error == ''){
                alert(response.mensagem)
                closeModal();
            }
            else{
                Object.entries(response.erros).map(([key, value]) => {
                    alert(value);
                })
            }
        }
        else{
            alert('Os campos de nome e número não podem estar vazios!');
        }
    }


    return (

        <Modal transparent={true} visible={visible} animationType="slide">
            <ModalArea>
                <ModalBody>
                    <CloseButton onPress={closeModal}>
                        <ExpandIcon width="40" height="40" fill="#000" />
                    </CloseButton>
                    <Scroller>

                        <LinhaForm>
                            <EnderecoInput 
                            style={{width: '100%'}} 
                            placeholderTextColor="#fff" 
                            placeholder="Digite um nome: Ex - Casa" 
                            value={nome} 
                            onChangeText={t => setNome(t)} 
                            maxLength={20} />
                        </LinhaForm>
                        
                        <LinhaForm>
                            <TextInputMask 
                            placeholder="Digite o seu telefone"
                            placeholderTextColor="#fff"
                            style={{...styles.input, width: '100%'}}
                            value={numero}
                            onChangeText={t => setNumero(t)}
                            maxLength={14}
                            mask={"([00])[0000]-[00000]"}
                            keyboardType="numeric" />
                        </LinhaForm>
                        
                        <CadastrarButton onPress={cadastrarTelefone}>
                            <CadastrarButtonText>
                                Cadastrar
                            </CadastrarButtonText>
                        </CadastrarButton>
                    </Scroller>
                </ModalBody>
            </ModalArea>
        </Modal>
    );
}

const styles = StyleSheet.create({
    input:{
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        flexDirection: 'row',
        paddingLeft: 15,
        alignItems: 'center',
        marginBottom: 15,
        color: '#fff',
        fontSize: 16
    }
})