import React, {useState, useContext} from 'react';
import styled from 'styled-components/native';

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
    padding: 10px 20px 40px 20px;
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
    const[cep, setCep] = useState('');
    const[logradouro, setLogradouro] = useState('');
    const[bairro, setBairro] = useState('');
    const[cidade, setCidade] = useState('');
    const[estado, setEstado] = useState('');
    const[numero, setNumero] = useState('');
    const[complemento, setComplemento] = useState('');

    const fecharModal = () =>{
        setShow(false);
    }

    const buscarCep = async () => {
        let response = await Api.buscarCep(cep)

        setLogradouro(response.logradouro);
        response.bairro == '' ? setBairro('Centro') : setBairro(response.bairro);
        setCidade(response.localidade);
        setEstado(response.uf);
    }

    const cadastrarEndereco = async () => {
        if(cep != '' && logradouro != '' && numero != '' && cidade != '' && estado != ''){
            let response = await Api.cadastraEndereco({nome: nome, cep: cep, logradouro: logradouro, bairro: bairro, numero: numero, cidade: cidade, estado: estado, complemento: complemento, id_cliente: user.id});

            if(response.error == ''){
                alert('Sucesso', response.mensagem)
                closeModal();
            }
            else{
                alert('Error');
            }
        }
        else{
            alert('Erro', response.mensagem);
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
                            <EnderecoInput style={{width: '100%'}} placeholder="Digite um nome: Ex - Casa" value={nome} onChangeText={t => setNome(t)} />
                        </LinhaForm>
                        
                        <LinhaForm>
                            <EnderecoInput style={{width: '50%'}} placeholder="Digite seu Cep" maxLength={8} value={cep} onChangeText={t => setCep(t)} onBlur={buscarCep} />
                            <EnderecoInput style={{width: '45%'}} placeholder="Digite o número" value={numero} onChangeText={t => setNumero(t)} />
                        </LinhaForm>

                        <LinhaForm>
                            <EnderecoInput style={{width: '100%'}} placeholder="Digite seu Logradouro" value={logradouro} onChangeText={t => setLogradouro(t)} />
                        </LinhaForm>

                        <LinhaForm>
                            <EnderecoInput style={{width: '100%'}} placeholder="Digite seu Bairro" value={bairro} onChangeText={t => setBairro(t)} />
                        </LinhaForm>

                        <LinhaForm>
                            <EnderecoInput style={{width: '60%'}} placeholder="Digite sua Cidade" value={cidade} onChangeText={t => setCidade(t)} />
                            <EnderecoInput style={{width: '35%'}} placeholder="Digite o Estado" value={estado} onChangeText={t => setEstado(t)} />
                        </LinhaForm>
                        
                        <LinhaForm>
                            <EnderecoInput style={{width: '100%'}} placeholder="Digite o Complemento" value={complemento} onChangeText={t => setComplemento(t)} />
                        </LinhaForm>
                        
                        <CadastrarButton onPress={cadastrarEndereco}>
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