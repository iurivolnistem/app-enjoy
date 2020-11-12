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
    AreaPagamento
} from './styles';

export default () => {

    const { add, cart, total } = useCart();
    const {state:user} = useContext(UserContext);

    const enviarPedido = async () => {

        let produtos = {
            'id': '',
            'qtde': ''
        }
        let array = []
        cart.map((item) => {
            array.push(produtos = {
                'id': item.id,
                'qtde': item.quantidade
            })
                     
        })
        let pedido = {
            id_cliente: user.id,
            valor: total,
            array
        }
        let response = await Api.sendPedido(pedido);
        console.log(response);
    }

    return (
        <Container>
            <AreaPedido>
                <Scroller>
                    <HeaderArea>
                        <HeaderTitle numberOfLines={2}>Revise seu pedido:</HeaderTitle>
                    </HeaderArea>
                    <ListArea>
                        {cart.map((item, index) => (
                            <ItemArea key={index}>
                                <Imagem source={{uri: 'http://10.0.2.2:8000/' + item.imagem}} />
                                <ItemAreaInfo>
                                    <ItemNome>{item.nome}</ItemNome>
                                    <ItemValor>R${item.valor}</ItemValor>
                                    <ItemQuantidade>Quantidade: {item.quantidade}</ItemQuantidade>
                                </ItemAreaInfo>
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
                        {
                            total == 0 ? <Text>Nenhum produto na sacola</Text> :
                            <ButtonPedido onPress={enviarPedido}>
                                <ButtonPedidoText>Finalizar Pedido</ButtonPedidoText>
                            </ButtonPedido>
                        }
                    </AreaButton>
                </AreaFinalizarPedido>
            </AreaPedido>
        </Container>
    );
}