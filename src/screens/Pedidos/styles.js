import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #fff;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 20px;
    background-color: #EEF0F2;
`;

export const HeaderArea = styled.View`
    width: 100%;
    justify-content: center;
    align-items:center;
    padding: 10px 0;
    background-color: #fff;
`;

export const HeaderAreaText = styled.Text`
    font-size: 18px;
    text-transform: uppercase;
    font-weight: bold;
`;

export const PedidoArea = styled.View`
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
`;

export const PedidoDataTexto = styled.Text`
    color: #000;
    text-transform: capitalize;
    font-weight: bold;
`;

export const PedidoHeader = styled.View`
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    background-color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

export const PedidoHeaderTexto = styled.Text`
    font-size: 15px;
    font-weight: bold;
    padding-bottom: 3px;
`;

export const PedidoHeaderSubTexto = styled.Text`
    font-size: 13px;
    color: rgba(0,0,0,0.4);
    padding-bottom: 3px;
    border-bottom-width: 0.5px
`;

export const PedidoItensArea = styled.View`
    width: 100%;
    padding: 0 10px
    background-color: #fff;
`;

export const ItemArea = styled.View`
    width: 100%;
    flex-direction: row;
    padding: 10px 0;
    border-bottom-width: 0.5px;
`;

export const ItemQuantidade = styled.Text`
    padding: 5px;
    border: 0.4px solid rgba(0,0,0,0.4);
    color: rgba(0,0,0,0.5);
`; 

export const ItemNomeTexto = styled.Text`
    font-size: 15px;
    padding: 5px;
    color: rgba(0,0,0,0.5);
`;

export const PedidoButtonArea = styled.View`
    width: 100%;
    padding: 10px;
    background-color: #fff;
    padding-top: 15px;
    padding-bottom: 15px;
    justify-content: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;
export const PedidoButton = styled.TouchableOpacity`
    flex: 1;
    align-items:center;
`;
export const PedidoButtonText = styled.Text`
    color: #FA7921;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const PedidosVazioArea = styled.View`
    flex: 1;
    background-color: #fff;
    padding: 20px;
    align-items:center;
    justify-content: center;
`;

export const PedidosVazioText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #FA7921;
    text-align: center;
`;