import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #fff;
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

export const MensagemArea = styled.View`
    flex: 1;
    padding: 20px;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const MensagemText = styled.Text`
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    color: #FA7921;
`;

export const AreaPedido = styled.View`
    flex: 1;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 10px;
`;

export const AreaPagamento = styled.View`
    border-top-width: 0.5px;
    border-bottom-width: 0.5px;
`;

export const AreaSelectPagamento = styled.View`
    padding: 0 10px;
`;

export const AreaLabel = styled.Text`
    font-size: 15px;
    font-weight: bold;
    margin-left: 8px;
`;

export const AreaSelect = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;


export const SelectPagamento = styled.Picker`
    width: 52%;
`;

export const AreaFinalizar = styled.View`
    width: 100%;
    justify-content: space-between;
    padding: 10px 20px;
    border-top-width: 0.5px;
    flex-direction: row;
`; 
export const AreaTotal = styled.View`
    padding: 10px 5px;
    border-radius: 3px;
`; 
export const AreaTotalText = styled.Text`
    font-size: 18px;
    color: red;
    font-weight: bold;
`;

export const ButtonFinalizar = styled.TouchableOpacity`
    padding: 10px;
    background-color: #FA7921;
`;

export const ButtonFinalizarText = styled.Text`
    color: #fff;
    font-size: 18px;
    font-weight: bold;
`;

export const InputTroco = styled.TextInput`
    width: 45%;
    height: 40px;
    border: 0.5px solid #000;
    margin-bottom: 5px;
    border-radius: 3px;
`;

export const ItemArea = styled.View`
    border: 0.5px solid #000;
    padding: 10px;
    position: relative;
    flex-direction: row;
    margin-bottom: 20px;
`; 

export const ImagemItem = styled.Image`
    width: 100px;
    height: 100px;
`;

export const ItemInfo = styled.View`
    margin-left: 5px;
`;

export const ItemText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
`;

export const DeleteButton = styled.TouchableOpacity`
    position: absolute
    right: 10px;
    top: 10px;
    width: 15px;
    height: 15px;
`;

export const ItemQuantidadeArea = styled.View`
    width: 50%;
    flex-direction: row;
    align-items: center;
    padding: 5px 0;
    border-radius: 5px;
    justify-content: space-between;
`;

export const ButtonQuantidade = styled.TouchableOpacity`
    margin: 0 5px
    padding: 5px;
`;

export const ItemQuantidadeText = styled.Text`
    font-weight: bold;
    font-size: 16px;
`;