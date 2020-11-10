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
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
`;

export const HeaderTitle = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #000;
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

export const AreaButton = styled.View`
    width: 100%;
    flex: 1;
    position: absolute;
    bottom: 0
    justify-content: space-around;
    align-items:center;
    flex-direction: row;
    border: 0.5px solid rgba(0,0,0,0.5);
    z-index: 10000;
    background-color: #fff;
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

export const AreaFinalizarPedido = styled.View``;

export const AreaPagamento = styled.View``;