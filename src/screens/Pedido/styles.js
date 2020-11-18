import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #fff;
`;

export const AreaPedido = styled.SafeAreaView`
    flex: 2;
    padding-bottom: 60px;
`;


export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 20px;
`;

export const HeaderArea = styled.View`
    width: 100%;
    justify-content: center;
    align-items:center;
    padding: 10px 0;
    background-color: #fff;
`;

export const HeaderTitle = styled.Text`
    font-size: 18px;
    text-transform: uppercase;
    font-weight: bold;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const ListArea = styled.View`
    margin-top: 30px;
    margin-bottom: 20px;
`;

export const ItemArea = styled.View`
    flex: 1;
    flex-direction: row;
    border: 0.5px solid rgba(0,0,0,0.5);
    margin-bottom: 10px;
    position: relative;
`;
export const Imagem = styled.Image`
    width: 120px;
    height: 100%;
    
`;

export const ItemAreaInfo = styled.View`
    flex: 1;
    margin-left: 10px;
    padding: 10px 0;
`;

export const ItemNome = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
`;

export const ItemValor = styled.Text`
    font-size: 16px;
    color: rgb(0, 112, 0);
    margin-bottom: 5px;
    font-weight: bold;
`;

export const ItemQuantidade = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

export const AreaFinalizarPedido = styled.View`
    flex: 1;
    justify-content: center;
    position: absolute;
    bottom:0;
    left: 0;
    right: 0;
`;

export const AreaButton = styled.View`
    flex-direction: row;
    width: 100%;
    padding: 10px;
    justify-content: space-between;
    border-top-width: 0.5px;
`;

export const AreaPagamento = styled.View`
    background-color: #fff;
    padding: 10px 20px
    z-index: 1000;
    border-top-width: 0.5px;
`;

export const SelectOpcao = styled.Picker`
    width: 100%;
    padding: 20px;
    align-items:center;
`;

export const InputTroco = styled.TextInput`
    padding: 10px;
    border: 0.5px solid #000;
    border-radius: 5px;
`;

export const ButtonPedido = styled.TouchableOpacity`
    background-color: #FA7921;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    border-radius: 10px;
`;

export const ButtonPedidoText = styled.Text`
    font-weight: bold;
    font-size: 18px;
    color: #fff;
`;

export const AreaTotal = styled.View`
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

export const AreaTotalText = styled.Text`
    font-size: 18px;
    color: red;
`;

export const VazioMensagemArea = styled.View`
    flex: 1;
    background-color: #fff;
    padding: 20px;
    align-items:center;
    justify-content: center;
`;

export const VazioMensagemText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #FA7921;
    text-align: center;
`;

export const DeleteItemButton = styled.TouchableOpacity`
    position: absolute;
    width: 15px;
    height: 15px;
    right: 10px;
    top: 10px;
`;
