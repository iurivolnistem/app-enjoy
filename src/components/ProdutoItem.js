import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native'

const Area = styled.TouchableOpacity`
    background-color: rgb(250, 121, 33);
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
`;

const Imagem = styled.Image`
    width: 88px;
    height: 88px;
    border-radius: 20px;
`;

const InfoArea = styled.View`
    margin-left: 20px;
    justify-content: space-between;
`;

const ProdutoNome = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: #fff;
`;

const VerProdutoButton = styled.TouchableOpacity`
    width: 85px;
    height: 26px;
    border: 1px solid #fff;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

const VerProdutoButtonText = styled.Text`
    font-size: 13px;
    color: #fff
`;

export default ({data}) => {
    const navigation = useNavigation();
    const url = 'http://10.0.2.2:8000/';

    const irParaProduto = () => {
        navigation.navigate('Produto', {
            id: data.id,
            nome: data.nome,
            descricao: data.descricao,
            valor: data.valor,
            imagem: data.imagem
        });
    }

    return(
        <Area onPress={irParaProduto}>
            <Imagem source={{uri: url + data.imagem}} />
            <InfoArea>
                <ProdutoNome>{data.nome}</ProdutoNome>
                <ProdutoNome>R${data.valor}</ProdutoNome>
                <VerProdutoButton onPress={irParaProduto}>
                    <VerProdutoButtonText>Ver</VerProdutoButtonText>
                </VerProdutoButton>
            </InfoArea>
        </Area>
    );
}