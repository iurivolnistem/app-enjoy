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
    SelectOpcao,
    InputTroco
} from './styles';

import RemoveIcon from '../../assets/delete.svg';

export default () => {

    const { add, cart, total, remove, removeTodosItems } = useCart();
    const {state:user} = useContext(UserContext);
    const [selectedValue, setSelectedValue] = useState('1');
    const [troco, setTroco] = useState('');

    useEffect(() => {
    }, [cart])

    const verificarPedidoEnviar = async () => {
        if(selectedValue == '3'){
            if(troco != '' && troco > 0 && troco > total){
                enviarPedido()
            }
            else{
                alert('O campo de troco precisa ser maior que o valor do pedido');
            }
        }
        else{
            enviarPedido();
        }
    }

    const enviarPedido = async () => {
        let array = [];
        let produtos = {
            'id': '',
            'qtde': ''
        };
        let pedido = {
            id_cliente: user.id,
            valor: total,
            pagamento: selectedValue,
            troco: troco,
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
            alert('Pedido Enviado!');
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
                    <AreaPagamento style={{flexDirection: selectedValue == '3' ? 'row' : 'column'}}>
                        <SelectOpcao style={{width: selectedValue == '3' ? '55%' : '100%'}} selectedValue={selectedValue} onValueChange={(itemValue, index) => setSelectedValue(itemValue)}>
                            <SelectOpcao.Item label="Cartão de crédito" value="1"></SelectOpcao.Item>
                            <SelectOpcao.Item label="Dinheiro sem troco" value="2"></SelectOpcao.Item>
                            <SelectOpcao.Item label="Dinheiro com troco" value="3"></SelectOpcao.Item>
                        </SelectOpcao>
                        {
                            selectedValue == '3'  &&
                            <InputTroco style={{width: '45%'}} value={troco} onChangeText={t => setTroco(t)} placeholder="Troco" ></InputTroco>
                        }
                    </AreaPagamento>
                    <AreaButton>
                        <AreaTotal>
                            <AreaTotalText>Total: R${total.toFixed(2)}</AreaTotalText>
                        </AreaTotal>
                        <ButtonPedido onPress={verificarPedidoEnviar}>
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