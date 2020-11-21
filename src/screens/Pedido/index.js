import React, {useState, useEffect, useContext} from 'react';

import Api from '../../Api';
import { Platform, RefreshControl, View, Image, Text, Alert } from 'react-native'
import { useCart } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';
import AsyncStorage from '@react-native-community/async-storage';

import { Container, HeaderArea, HeaderTitle, MensagemArea, MensagemText, AreaPedido, Scroller, AreaPagamento, AreaSelectPagamento, AreaLabel, AreaSelect, SelectPagamento, AreaFinalizar, AreaTotal, AreaTotalText, ButtonFinalizar, ButtonFinalizarText, InputTroco, ItemArea, ImagemItem, ItemInfo, ItemText, DeleteButton, ItemQuantidadeArea, ButtonQuantidade, ItemQuantidadeText} from './styles';

import RemoveIcon from '../../assets/delete.svg';
import MinusIcon from '../../assets/remove.svg';
import PlusIcon from '../../assets/plus.svg';

export default () => {

    const { add, cart, remove, removeTodosItems } = useCart();
    const {state:user} = useContext(UserContext);
    const [selectedValue, setSelectedValue] = useState('1');
    const [troco, setTroco] = useState('');
    const [aberto, setAberto] = useState(false);
    const [carrinho, setCarrinho] = useState(cart);
    const [total, setTotal] = useState(0);


    useEffect(() => {
        checkHorario();

        let value = 0
        cart.map((item) => {
            value = value + (item.valor * item.quantidade)
        })
        setTotal(value);

    }, [cart, carrinho])


    const checkHorario = async () => {
        let response = await Api.verificarHorario();
        if(response.status == true){
            setAberto(true);
        }
        else{
            setAberto(false);
        }
    }

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

    const aumentaQuantidade = (index) => {
        const currentCart = [...cart];
        let value = 0;
        if(currentCart[index].quantidade < 10){
            currentCart[index].quantidade += 1;
        }
        else{
            Alert.alert("Quantidade excedida", 'Não é possível aumentar a quantidade');
        }
        cart.map((item) => {
            value = value + (item.valor * item.quantidade)
        })
        setTotal(value);
    }

    const diminuiQuantidade = (index) => {
        const currentCart = [...cart];
        let value = 0;
        if(currentCart[index].quantidade > 1){
            currentCart[index].quantidade -= 1;
        }
        else{
            Alert.alert("Quantidade excedida", 'Não é possível diminuir mais a quantidade');
        }
        cart.map((item) => {
            value = value + (item.valor * item.quantidade)
        })
        setTotal(value);
    }

    return (
        <Container>
            <HeaderArea>
                <HeaderTitle numberOfLines={2}>Sacola</HeaderTitle>
            </HeaderArea>
            {
                aberto == false ?  
                <MensagemArea>
                    <MensagemText>Pedidos só podem serem feitos após as 18:00 horas!</MensagemText>
                </MensagemArea>

                :

                <AreaPedido>
                    <Scroller>
                    {
                        cart.map((item, index) => (
                            <ItemArea key={index}>
                                <ImagemItem source={{uri: 'http://10.0.2.2:8000/' + item.imagem}} />
                                <ItemInfo>
                                    <ItemText style={{fontSize: 18}}>{item.nome}</ItemText>
                                    <ItemText style={{color: 'rgb(0, 112, 0)'}}>R${item.valor}</ItemText>
                                    <ItemQuantidadeArea>
                                        <ButtonQuantidade onPress={() => diminuiQuantidade(index)}>
                                            <MinusIcon width="15" height="15" fill="#FA7921" />
                                        </ButtonQuantidade>
                                        <ItemQuantidadeText>{item.quantidade}</ItemQuantidadeText>
                                        <ButtonQuantidade onPress={() => aumentaQuantidade(index)}>
                                            <PlusIcon width="15" height="15" fill="#FA7921" />
                                        </ButtonQuantidade>
                                    </ItemQuantidadeArea>
                                </ItemInfo>
                                <DeleteButton>
                                    <RemoveIcon width="15" height="15" fill="#FA7921" />
                                </DeleteButton>
                            </ItemArea>
                        ))
                    }

                    </Scroller>
                    <AreaPagamento>
                        <AreaSelectPagamento>
                            <AreaLabel>Formas de pagamento</AreaLabel>
                            <AreaSelect>
                                <SelectPagamento style={{width: selectedValue == '1' ? '72%' : '52%'}} selectedValue={selectedValue} onValueChange={(itemValue, index) => setSelectedValue(itemValue)}>
                                    <SelectPagamento.Item label="Cartão de Crédito (entregador)" value="1" />
                                    <SelectPagamento.Item label="Dinheiro sem troco" value="2"/>
                                    <SelectPagamento.Item label="Dinheiro com troco" value="3"/>
                                </SelectPagamento>
                                {
                                    selectedValue == '3' &&
                                    <InputTroco value={troco} onChangeText={t => setTroco(t)} placeholder="Insira seu troco" />
                                }
                            </AreaSelect>
                        </AreaSelectPagamento>
                        <AreaFinalizar>
                            <AreaTotal>
                                <AreaTotalText>R${total.toFixed(2)}</AreaTotalText>
                            </AreaTotal>
                            <ButtonFinalizar onPress={verificarPedidoEnviar}>
                                <ButtonFinalizarText>Finalizar Pedido</ButtonFinalizarText>
                            </ButtonFinalizar>
                        </AreaFinalizar>
                    </AreaPagamento>
                </AreaPedido>
                
            }
        </Container>
    );
}