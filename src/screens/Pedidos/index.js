import React, {useState, useContext, useEffect} from 'react';
import { RefreshControl } from 'react-native'
import {UserContext} from '../../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import Moment from 'moment/min/moment-with-locales';
import MomentTz from 'moment-timezone';
import {Container, HeaderArea, HeaderAreaText, Scroller, PedidoArea, PedidoDataTexto, PedidoHeader, PedidoHeaderTexto, PedidoHeaderSubTexto, PedidoItensArea, ItemArea ,ItemQuantidade, ItemNomeTexto, PedidoButtonArea, PedidoButton, PedidoButtonText, LoadingIcon, PedidosVazioArea, PedidosVazioText} from './styles';

import Api from '../../Api';

export default () => {

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [listaPedidos, setListaPedidos] = useState([]);
    const [vazioMensagem,setVazioMensagem] = useState('');
    const {state:user} = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(() => {
        getPedidos();
    }, [])

    const getPedidos = async () => {
        setLoading(true);
        setListaPedidos([]);

        let res = await Api.getPedidos(user.id)
        if(res.error == ''){
            setListaPedidos(res.pedidos);
            setVazioMensagem('');
        }
        else{
            setListaPedidos([]);
            setVazioMensagem(res.mensagem);
        }
        setLoading(false);
    }

    const onRefresh = () => {
        setRefreshing(false);
        getPedidos();
    }

    const converterData = (data) => {
        let dataTz = MomentTz(data).tz('America/Sao_Paulo');
        let newData = Moment(dataTz).locale('pt-br').format('llll');

        return newData;
    }

    const verDetalhes = (pedidoID) => {
        navigation.navigate('Detalhes', {id: pedidoID})
    }

    return (
        <Container>
            <HeaderArea>
                <HeaderAreaText>
                    Pedidos
                </HeaderAreaText>
            </HeaderArea>
            <Scroller refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {

                listaPedidos == '' ?
                <PedidosVazioArea>
                    <PedidosVazioText>{vazioMensagem}</PedidosVazioText>
                </PedidosVazioArea>

                :

                listaPedidos.map((item, index) => (

                <PedidoArea key={index}>
                    <PedidoDataTexto>{converterData(item.created_at)}</PedidoDataTexto>
                    <PedidoHeader>
                        <PedidoHeaderTexto>Pedido #{item.id}</PedidoHeaderTexto>
                        <PedidoHeaderSubTexto>Pedido {item.status == 0 ? 'Aguardando' : item.status == 1 ? 'Preparando' : item.status == 2 ? 'Saiu para entrega' : item.status == 3 ? 'Entregue' : 'Cancelado'}</PedidoHeaderSubTexto>
                    </PedidoHeader>
                    <PedidoItensArea>
                        {
                            item.produtos.length > 2 ? 
                            
                            <ItemArea>
                                <ItemNomeTexto>{item.produtos.length} itens </ItemNomeTexto>
                            </ItemArea>

                            :

                            item.produtos.map((produto, key) => (
                                <ItemArea key={key}>
                                    <ItemQuantidade>{produto.pivot.quantidade}</ItemQuantidade>
                                    <ItemNomeTexto>{produto.nome}</ItemNomeTexto>
                                </ItemArea>
                            ))
                        }
                    </PedidoItensArea>
                    <PedidoButtonArea>
                        <PedidoButton onPress={() => verDetalhes(item.id)}>
                    <PedidoButtonText>Detalhes</PedidoButtonText>
                        </PedidoButton>
                    </PedidoButtonArea>
                </PedidoArea>

                )) 
            }
            {loading &&
                <LoadingIcon size="large" color="#FA7921" />
            }
        </Scroller>
        </Container>
    );
}