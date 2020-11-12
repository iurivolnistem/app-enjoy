import React, {useState, useContext, useEffect} from 'react';
import { RefreshControl } from 'react-native'
import {UserContext} from '../../contexts/UserContext';
import Moment from 'moment/min/moment-with-locales';
import MomentTz from 'moment-timezone';
import {Container, HeaderArea, HeaderAreaText, Scroller, PedidoArea, PedidoDataTexto, PedidoHeader, PedidoHeaderTexto, PedidoHeaderSubTexto, PedidoItensArea, ItemArea ,ItemQuantidade, ItemNomeTexto, PedidoButtonArea, PedidoButton, PedidoButtonText, LoadingIcon} from './styles';

import Api from '../../Api';

export default () => {

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [listaPedidos, setListaPedidos] = useState([]);
    const {state:user} = useContext(UserContext);

    useEffect(() => {
        getPedidos();
    }, [])

    const getPedidos = async () => {
        setLoading(true);
        setListaPedidos([]);

        let res = await Api.getPedidos(user.id)
        if(res.error == ''){
            console.log(res)
            setListaPedidos(res.pedidos);
        }
        else{
            alert('Erro', res.error)
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

    return (
        <Container>
            <HeaderArea>
                <HeaderAreaText>
                    Pedidos
                </HeaderAreaText>
            </HeaderArea>
            {loading &&
                <LoadingIcon size="large" color="#FA7921" />
            }
            <Scroller refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {
                    listaPedidos.map((item, index) => (

                    <PedidoArea key={index}>
                        <PedidoDataTexto>{converterData(item.created_at)}</PedidoDataTexto>
                        <PedidoHeader>
                            <PedidoHeaderTexto>Pedido {item.id}#</PedidoHeaderTexto>
                            <PedidoHeaderSubTexto>Pedido {item.status}</PedidoHeaderSubTexto>
                        </PedidoHeader>
                        <PedidoItensArea>
                            {
                                item.produtos.map((produto, key) => (
                                    <ItemArea key={key}>
                                        <ItemQuantidade>{produto.pivot.quantidade}</ItemQuantidade>
                                        <ItemNomeTexto>{produto.nome}</ItemNomeTexto>
                                    </ItemArea>
                                ))
                            }
                        </PedidoItensArea>
                        <PedidoButtonArea>
                            <PedidoButton>
                                <PedidoButtonText>Detalhes</PedidoButtonText>
                            </PedidoButton>
                        </PedidoButtonArea>
                    </PedidoArea>

                    ))
                }
            </Scroller>
        </Container>
    );
}