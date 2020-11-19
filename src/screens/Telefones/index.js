import React, {useState, useEffect, useContext} from 'react';

import Api from '../../Api';
import { Platform, RefreshControl } from 'react-native'
import {UserContext} from '../../contexts/UserContext';
import { useNavigation } from '@react-navigation/native'

import TelefoneModal from '../../components/TelefoneModal';
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
    const [listaTelefones, setListaTelefones] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const OpenModal = () => setShowModal(true);
    const CloseModal = () => {
        getTelefones();    
        setShowModal(false);
    };

    const getTelefones = async () => {
        setLoading(true);
        setListaTelefones([]);

        let res = await Api.getTelefones(user.id)
        if(res.error == ''){
            setListaTelefones(res.telefones);
        }
        else{
            alert(res.error)
        }

        setLoading(false);
    }

    useEffect(() => {
        getTelefones();
    }, [])

    const voltar = () => {
        navigation.goBack();
    }

    const onRefresh = () => {
        setRefreshing(false);
        getTelefones();
    }

    const ativarTelefone = async (id) => {
        let res = await Api.activeTelefone(id, user.id);
        if(res.error == ''){
            alert(res.mensagem)
        }
        else{
            alert(res.error)
        }
    }

    const removerTelefone = async(id) => {
        let res = await Api.excluirTelefone(id, user.id);
        if(res.error == ''){
            alert(res.mensagem);
            getTelefones();
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
                    <HeaderTitle numberOfLines={2}>Seus telefones</HeaderTitle>
                </HeaderArea>

                <NovoEnderecoArea>
                    <NovoEnderecoButton onPress={OpenModal}>
                        <NovoEnderecoButtonText>Novo telefone</NovoEnderecoButtonText>
                    </NovoEnderecoButton>
                </NovoEnderecoArea>

                {loading &&
                    <LoadingIcon size="large" color="#FA7921" />
                }

                <ListArea>
                    {listaTelefones.map((item, index) => (

                        <Area key={index} onPress={ () => { 
                            ativarTelefone(item.id)
                            getTelefones()
                        } } style={{borderColor: item.status == 1 ? '#FA7921' : 'rgba(0,0,0,0.4)'}}>
                            <InfoArea>
                                <EnderecoNomeArea>
                                    <EnderecoNome>Telefone {item.nome}</EnderecoNome>
                                    <EnderecoInfos>
                                        {
                                            item.status == 1 ? 
                                            <CheckedIcon width="14" height="14" fill="#FA7921" /> :
                                            <UncheckedIcon width="14" height="14" fill="#FA7921" />
                                        }

                                        <EnderecoExcluir onPress={() => { removerTelefone(item.id) }}>
                                            <RemoveIcon width="14" height="14" fill="#FA7921" />
                                        </EnderecoExcluir>

                                    </EnderecoInfos>
                                </EnderecoNomeArea>
                                <EnderecoTexto>
                                    {item.numero}
                                </EnderecoTexto>
                            </InfoArea>
                        </Area>

                    ))}
                </ListArea>
            </Scroller>

            <TelefoneModal visible={showModal} closeModal={CloseModal}/>
        </Container>
    );
}