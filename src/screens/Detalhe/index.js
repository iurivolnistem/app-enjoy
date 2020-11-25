import React, {useState, useContext, useEffect} from 'react';
import {Alert, View} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native';
import MomentTz from 'moment-timezone';
import Moment from 'moment/min/moment-with-locales';
import { Container, HeaderArea, BackButtom, HeaderText, LoadingIcon, StatusArea, PedidoDataText, PedidoEntregueArea, PedidoAreaText, NumeroPedidoArea, NumeroPedidoText, Scroller, ItemArea, ItemQuantidade, ItemNome, ItemValor, PedidoArea, AreaPagamento, ItemSubtotal, ItemTotal, AreaFormaPagamento, AreaFormaPagamentoText, ItemText, ItemTextBold, ConfirmaEntregaButton, AreaCancelar, ButtonCancelar, ButtonCancelarText } from './styles';

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
        setListaProdutos([]);

        let response = await Api.getPedido(route.params.id);
        if(response.error == ''){
            setPedido(response.pedido)

            setListaProdutos(Object.values(response.pedido.produtos))
        }
        else{
            Alert.alert('Ocorreu algum erro',response.mensagem)
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
        Alert.alert('Obrigado pelo feedback',res.mensagem);
        getPedido();
    }

    const cancelarEntrega = async (pedidoID) => {
        let res = await Api.cancelarPedido(pedidoID);
        if(res.error == ''){
            Alert.alert('Pedido cancelado', res.mensagem);
        }
        else{
            Alert.alert('Erro ao cancelar', res.mensagem);
        }
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
                    <PedidoEntregueArea style={{backgroundColor: '#EEF0F2'}}>
                        <CheckedIcon width="20" height="20" fill="#63A088" style={{marginLeft: 10}} />
                        <PedidoAreaText style={{backgroundColor: '#EEF0F2', padding: 0, marginBottom: 0}}>Pedido concluido às {formataDatatoHora(itemPedido.updated_at)}</PedidoAreaText>
                    </PedidoEntregueArea>
                    : itemPedido.status == 2 ?
                    <PedidoEntregueArea>
                        <ConfirmaEntregaButton onPress={() => confirmarEntrega(itemPedido.id) } style={{width: '100%'}}>
                            <PedidoAreaText style={{backgroundColor: '#EEF0F2', color: '#63A088', fontWeight: 'bold'}}>Confirmar Entrega</PedidoAreaText>
                        </ConfirmaEntregaButton>
                    </PedidoEntregueArea>
                    :
                    <PedidoEntregueArea style={{flexDirection: 'column'}}>
                        <PedidoAreaText style={{backgroundColor: '#EEF0F2', width: '100%'}}>{itemPedido.status == 0 ? 'Aguardando' : itemPedido.status == 1 ? 'Preparando' : itemPedido.status == 4 ? 'Cancelado' : 'Devolução'}</PedidoAreaText>
                        {
                        itemPedido.status == 0 || itemPedido.status == 1 ?
                        <AreaCancelar>
                            <ButtonCancelar onPress={() => cancelarEntrega(itemPedido.id) }>
                                <ButtonCancelarText style={{width: '100%'}}>Cancelar Pedido</ButtonCancelarText>
                            </ButtonCancelar>
                        </AreaCancelar>
                        :
                        <AreaCancelar></AreaCancelar>
                        }
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
                        itemPedido.pagamento == 1 ? 'Cartão de crédito (entregador)' : itemPedido.pagamento == 2 ? 'Dinheiro sem troco' : itemPedido.pagamento == 3 ? 'Dinheiro com troco' : 'Outro' 
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