import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #fff;
`; 

export const HeaderArea = styled.View`
    width: 100%;
    flex: 1;
    justify-content: center;
    align-items:center;
    padding: 10px 0;
    background-color: #fff;
    position: relative;
`;

export const HeaderText = styled.Text`
    font-size: 18px;
    text-transform: uppercase;
    font-weight: bold;
`;

export const BackButtom = styled.TouchableOpacity`
    width: 32px;
    height: 32px;
    position: absolute;
    left: 10px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    color: #fa7921;
`;

export const StatusArea = styled.View`
    padding: 15px;
`; 

export const PedidoDataText = styled.Text`

`;

export const PedidoEntregueArea = styled.View`
    width: 100%;
    background-color: #EEF0F2;
    padding: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 5px;
    margin-top: 15px;
`;

export const PedidoAreaText = styled.Text`
    margin-left: 5px;
`;

export const NumeroPedidoArea = styled.View`
    width: 100%;
    margin-top: 5px;
    padding: 15px 0px;
    border-bottom-width: 0.5px;
`;

export const NumeroPedidoText = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding-bottom: 20px;
`;

export const ItemArea = styled.View`
    padding: 15px;
    flex-direction: row;
    justify-content: space-between;
    border-bottom-width: 0.5px;
`;

export const ItemQuantidade = styled.Text`
    padding: 5px;
    border: 0.4px solid #000;

`; 
export const ItemNome = styled.Text`
    padding: 5px;
    font-size: 16px;
`; 
export const ItemValor = styled.Text`
    padding: 5px;
    font-weight: bold;
`;

export const AreaPagamento = styled.View`
    padding: 10px 0;
    border-bottom-width: 0.5px;
`; 

export const ItemSubtotal = styled.View`
    width: 100%;
    flex-direction: row;
    padding: 0 15px;
    justify-content: space-between;
`;

export const ItemText = styled.Text`
    font-size: 16px;
`;

export const ItemTextBold = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

export const ItemTotal = styled.View`
    width: 100%;
    flex-direction: row;
    padding: 0 15px;
    justify-content: space-between;
`;

export const AreaFormaPagamento = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px;
    border-bottom-width: 0.5px;
`;

export const AreaFormaPagamentoText = styled.Text``;

export const ConfirmaEntregaButton = styled.TouchableOpacity``;