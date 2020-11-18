import React, {useState, useContext, useEffect} from 'react';
import {View} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native';
import MomentTz from 'moment-timezone';
import Moment from 'moment/min/moment-with-locales';
import { Container, HeaderArea, BackButtom, HeaderText, LoadingIcon, StatusArea, PedidoDataText, PedidoEntregueArea, PedidoAreaText, NumeroPedidoArea, NumeroPedidoText, Scroller, ItemArea, ItemQuantidade, ItemNome, ItemValor, PedidoArea, AreaPagamento, ItemSubtotal, ItemTotal, AreaFormaPagamento, AreaFormaPagamentoText, ItemText, ItemTextBold, ConfirmaEntregaButton } from './styles';

import Api from '../../Api';

import BackIcon from '../../assets/back.svg';
import CheckedIcon from '../../assets/checked.svg';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const [itemPedido, setPedido] = useState([]);
    const [listaProdutos, setListaProdutos] = useState([]);

    useEffect(() => {
        getPedido();
    }, [])

    const getPedido = async() => {
        setLoading(true);
        setPedido([]);

        let response = await Api.getPedido(route.params.id);
        if(response.error == ''){
            setPedido(response.pedido)
            response.pedido.produtos.map((item, index) => {
                listaProdutos.push(item);
            })

            console.log(response.pedido)
        }
        else{
            alert(response.mensagem)
        }
        setLoading(false);
    }

    const voltar = () => {
        navigation.goBack();
    }

    const formatarDataRealizado = (data) => {
        let dataTz = MomentTz(data).tz('America/Sao_Paulo');
        let newData = Moment(dataTz).locale('pt-br').format('lll');

        return newData;
    }

    const formataDatatoHora = (data) => {
        let dataTz = MomentTz(data).tz('America/Sao_Paulo');
        let newData = Moment(dataTz).locale('pt-br').format('LT');

        return newData;
    }

    const retornaTroco = () => {
        let newTroco = itemPedido.troco - itemPedido.valor;

        return newTroco.toFixed(2);
    }

    const confirmarEntrega = async (pedidoID) => {
        let res = await Api.confirmaEntrega(pedidoID);
        console.log(res);
        alert(res.mensagem);
        getPedido();
    }

    return(
        <Container>
            <Scroller>
            <HeaderArea>
                <BackButtom onPress={voltar}>
                    <BackIcon width="32" height="32" fill="#FA7921" />
                </BackButtom>
                <HeaderText>Detalhes do Pedido</HeaderText>
            </HeaderArea>
            <StatusArea>
                <PedidoDataText>Realizado {formatarDataRealizado(itemPedido.created_at)}</PedidoDataText>
                {
                    itemPedido.status == 3 ?
                    <PedidoEntregueArea>
                        <CheckedIcon width="20" height="20" fill="#63A088" />
                        <PedidoAreaText>Pedido concluido às {formataDatatoHora(itemPedido.updated_at)}</PedidoAreaText>
                    </PedidoEntregueArea>
                    : itemPedido.status == 2 ?
                    <PedidoEntregueArea>
                        <ConfirmaEntregaButton onPress={() => confirmarEntrega(itemPedido.id) }>
                            <PedidoAreaText style={{color: '#63A088', fontWeight: 'bold'}}>Confirmar Entrega</PedidoAreaText>
                        </ConfirmaEntregaButton>
                    </PedidoEntregueArea>
                    :
                    <PedidoEntregueArea>
                        <PedidoAreaText>{itemPedido.status == 0 ? 'Aguardando' : itemPedido.status == 1 ? 'Preparando' : ''}</PedidoAreaText>
                    </PedidoEntregueArea>
                    
                }
                
                <NumeroPedidoArea>
                    <NumeroPedidoText>Nº do pedido {itemPedido.id}</NumeroPedidoText>
                </NumeroPedidoArea>
            </StatusArea>     
            {
                loading &&
                <LoadingIcon size="large" color="#FA7921" />
            }
            {
                listaProdutos.map((item, key) => (
                    <ItemArea key={key}>
                        <ItemQuantidade>{item.pivot.quantidade}</ItemQuantidade>
                        <ItemNome>{item.nome}</ItemNome>
                        <ItemValor>R$ {item.valor}</ItemValor>
                    </ItemArea>
                ))
            }
            <AreaPagamento>
                <ItemSubtotal>
                    <ItemText>Subtotal</ItemText>
                    <ItemText>R$ {itemPedido.valor}</ItemText>
                </ItemSubtotal>
                <ItemTotal>
                    <ItemTextBold>Total</ItemTextBold>
                    <ItemTextBold>R$ {itemPedido.valor}</ItemTextBold>
                </ItemTotal>
            </AreaPagamento>
            <AreaFormaPagamento>
                <AreaFormaPagamentoText>Pagamento</AreaFormaPagamentoText>
                <AreaFormaPagamentoText>
                    {
                        itemPedido.pagamento == 1 ? 'Cartão de crédito' : itemPedido.pagamento == 2 ? 'Dinheiro sem troco' : itemPedido.pagamento == 3 ? 'Dinheiro com troco' : '' 
                    }
                </AreaFormaPagamentoText>
            </AreaFormaPagamento>
            {
                itemPedido.pagamento == 3 &&
                <AreaFormaPagamento>
                    <AreaFormaPagamentoText>Troco</AreaFormaPagamentoText>
                    <AreaFormaPagamentoText>R$ {retornaTroco()}</AreaFormaPagamentoText>
                </AreaFormaPagamento>
            }
            </Scroller>
        </Container>
    );
}