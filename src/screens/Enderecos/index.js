import React, {useState, useEffect, useContext} from 'react';

import Api from '../../Api';
import { Platform, RefreshControl } from 'react-native'
import {UserContext} from '../../contexts/UserContext';
import { useNavigation } from '@react-navigation/native'

import CadastroModal from '../../components/CadastroModal';
import {
    Container,
    Scroller,
    HeaderArea,
    BackButton,
    HeaderTitle,
    LoadingIcon,
    ListArea,
    Area,
    InfoArea,
    EnderecoNomeArea,
    EnderecoNome,
    EnderecoInfos,
    EnderecoTexto,
    EnderecoExcluir,
    NovoEnderecoArea,
    NovoEnderecoButton,
    NovoEnderecoButtonText
} from './styles';

import CheckedIcon from '../../assets/checked.svg';
import UncheckedIcon from '../../assets/cancel.svg';
import RemoveIcon from '../../assets/delete.svg';
import BackIcon from '../../assets/back.svg';

export default () => {

    const navigation = useNavigation();
    const {state:user} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [listaEnderecos, setListaEnderecos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const OpenModal = () => setShowModal(true);
    const CloseModal = () => {
        getEnderecos();    
        setShowModal(false);
    };

    const getEnderecos = async () => {
        setLoading(true);
        setListaEnderecos([]);

        let res = await Api.getEnderecos(user.id)
        if(res.error == ''){
            setListaEnderecos(res.enderecos);
        }
        else{
            alert('Erro', res.error)
        }

        setLoading(false);
    }

    useEffect(() => {
        getEnderecos();
    }, [])

    const voltar = () => {
        navigation.goBack();
    }

    const onRefresh = () => {
        setRefreshing(false);
        getEnderecos();
    }

    const ativarEndereco = async (id) => {
        let res = await Api.activeEndereco(id, user.id);
        if(res.error == ''){
            console.log(res.mensagem);
        }
        else{
            alert(res.error)
        }
    }

    const removerEndereco = async(id) => {
        let res = await Api.excluirEndereco(id, user.id);
        if(res.error == ''){
            alert(res.mensagem);
            getEnderecos();
        }
        else{
            alert(res.mensagem);
        }
    }

    return (
        <Container>
            <Scroller refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <HeaderArea>
                    <BackButton onPress={voltar}>
                        <BackIcon width="32" height="32" fill="#000" />  
                    </BackButton>
                    <HeaderTitle numberOfLines={2}>Seus endereços</HeaderTitle>
                </HeaderArea>

                <NovoEnderecoArea>
                    <NovoEnderecoButton onPress={OpenModal}>
                        <NovoEnderecoButtonText>Novo endereço</NovoEnderecoButtonText>
                    </NovoEnderecoButton>
                </NovoEnderecoArea>

                {loading &&
                    <LoadingIcon size="large" color="#FA7921" />
                }

                <ListArea>
                    {listaEnderecos.map((item, index) => (

                        <Area key={index} onPress={ () => { 
                            ativarEndereco(item.id)
                            getEnderecos()
                        } } style={{borderColor: item.status == 1 ? '#FA7921' : 'rgba(0,0,0,0.4)'}}>
                            <InfoArea>
                                <EnderecoNomeArea>
                                    <EnderecoNome>Endereço {item.nome}</EnderecoNome>
                                    <EnderecoInfos>
                                        {
                                            item.status == 1 ? 
                                            <CheckedIcon width="14" height="14" fill="#FA7921" /> :
                                            <UncheckedIcon width="14" height="14" fill="#FA7921" />
                                        }

                                        <EnderecoExcluir onPress={() => { removerEndereco(item.id) }}>
                                            <RemoveIcon width="14" height="14" fill="#FA7921" />
                                        </EnderecoExcluir>

                                    </EnderecoInfos>
                                </EnderecoNomeArea>
                                <EnderecoTexto>
                                    {item.logradouro}, {item.numero} - {item.bairro}, {item.cidade} - {item.estado}
                                </EnderecoTexto>
                                {
                                    item.complemento != '' ?
                                    <EnderecoTexto>
                                        {item.complemento}
                                    </EnderecoTexto>
                                    :
                                    ''
                                }
                            </InfoArea>
                        </Area>

                    ))}
                </ListArea>
            </Scroller>

            <CadastroModal visible={showModal} closeModal={CloseModal}/>
        </Container>
    );
}