import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const ImageHeader = styled.Image`
    width: 100%;
    height: 200px
`;

export const PageProduto = styled.View`
    border: 0.5px solid rgba(0,0,0,0.4);
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
`;

export const ProdutoNome = styled.Text`
    font-size: 20px;
    font-weight: bold;
`;

export const ProdutoDescricao = styled.View`
`;

export const DescricaoText = styled.Text`
    font-size: 16px;
    color: rgba(0,0,0,0.6)
`;

export const ProdutoValor = styled.View`
    margin-top: 20px;
`;

export const ValorText = styled.Text`
    font-size: 16px;
    color: rgb(0, 112, 0);
`;

export const AreaValor = styled.View`
    width: 100%;
    flex-direction: row;
    position: absolute;
    bottom: 0px;
    padding: 10px;
    border: 0.5px solid rgba(0,0,0,0.4);
    align-items: center;
    justify-content: space-evenly
`;

export const AreaQuantidade = styled.Text`
    font-size: 20px;
    border: 0.5px solid rgba(0,0,0,0.4);
    padding: 10px;
    font-weight: bold
`;

export const ProdutoValorInput = styled.TouchableOpacity`
    background-color: #FA7921;
    color: #fff;
    padding: 10px;
    border-radius: 3px;
    height: 50px;
    width: 200px;
    align-items: center;
    justify-content: center
`;

export const InputText = styled.Text`
    color: #fff;
    font-size: 18px;
    font-weight: bold
`;

export const BotaoDiminuir = styled.TouchableOpacity``;
export const BotaoAdicionar = styled.TouchableOpacity``;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    top: 15px;
    left: 0;
`;

