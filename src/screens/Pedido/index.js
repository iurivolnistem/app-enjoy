import React, {useState, useEffect, useContext} from 'react';

import Api from '../../Api';
import { Platform, RefreshControl, View, Image, Text } from 'react-native'
import { useCart } from '../../contexts/CartContext';
import {UserContext} from '../../contexts/UserContext';
import AsyncStorage from '@react-native-community/async-storage';

import {
    Container,
    Scroller,
    HeaderArea,
    HeaderTitle,
    ListArea,
    ItemArea,
    Imagem,
    ItemNome,
    ItemValor,
    ItemQuantidade,
    ItemAreaInfo,
    AreaButton,
    ButtonPedido,
    ButtonPedidoText,
    AreaTotal,
    AreaTotalText,
    AreaPedido,
    AreaFinalizarPedido,
    AreaPagamento,
    VazioMensagemArea,
    VazioMensagemText, 
    DeleteItemButton,
} from './styles';

import RemoveIcon from '../../assets/delete.svg';

export default () => {

    const { add, cart, total, remove, removeTodosItems } = useCart();
    const {state:user} = useContext(UserContext);

    useEffect(() => {
    }, [cart])

    const enviarPedido = async () => {
        let array = [];
        let produtos = {
            'id': '',
            'qtde': ''
        };
        let pedido = {
            id_cliente: user.id,
            valor: total,
            array
        }
        cart.map((item) => {
            array.push(produtos = {
                'id': item.id,
                'qtde': item.quantidade
            })      
        })
        let response = await Api.sendPedido(pedido);
        if(response.error == ''){
            removeTodosItems();
        }
        else{
            alert(response.mensagem);
        }
    }

    return (
        <Container>
            <HeaderArea>
                <HeaderTitle numberOfLines={2}>Sacola</HeaderTitle>
            </HeaderArea>
            { Object.keys(cart).length > 0 ?
                <AreaPedido>
                <Scroller>
                    <ListArea>
                        {cart.map((item, index) => (
                            <ItemArea key={index}>
                                <Imagem source={{uri: 'http://10.0.2.2:8000/' + item.imagem}} />
                                <ItemAreaInfo>
                                    <ItemNome>{item.nome}</ItemNome>
                                    <ItemValor>R${item.valor}</ItemValor>
                                    <ItemQuantidade>Quantidade: {item.quantidade}</ItemQuantidade>
                                </ItemAreaInfo>
                                <DeleteItemButton onPress={() => remove(index)}>
                                    <RemoveIcon width="15" height="15" fill="#FA7921"/>
                                </DeleteItemButton>
                            </ItemArea>
                        ))}
                    </ListArea>
                    
                    
                </Scroller>
                <AreaFinalizarPedido>
                    <AreaPagamento>
                    </AreaPagamento>
                    <AreaButton>
                        <AreaTotal>
                            <AreaTotalText>Total: R${total.toFixed(2)}</AreaTotalText>
                        </AreaTotal>
                        <ButtonPedido onPress={enviarPedido}>
                            <ButtonPedidoText>Finalizar Pedido</ButtonPedidoText>
                        </ButtonPedido>
                    </AreaButton>
                </AreaFinalizarPedido>
            </AreaPedido>
            :
            <VazioMensagemArea>
                <VazioMensagemText>Você ainda não tem produtos no carrinho :(</VazioMensagemText>
            </VazioMensagemArea>
            }
        </Container>
    );
}