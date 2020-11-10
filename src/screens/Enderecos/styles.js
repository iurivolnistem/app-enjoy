import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #fff;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 20px;
`;

export const HeaderArea = styled.View`
    flex-direction: row;
    align-items:center;
`;

export const BackButton = styled.TouchableOpacity``;

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

export const Area = styled.TouchableOpacity`
    width: 100%;
    background-color: #fff;
    margin-bottom: 20px;
    border-radius: 5px;
    padding: 15px;
    flex-direction: row;
    border: 1px solid;
`;

export const InfoArea = styled.View`
    width: 100%
    justify-content: space-between;
    padding: 0 10px;
`;

export const EnderecoNomeArea = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const EnderecoNome = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

export const EnderecoInfos = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const EnderecoTexto = styled.Text`
    color: rgba(0,0,0,0.5);
`;

export const EnderecoExcluir = styled.TouchableOpacity`
    margin-left: 10px;
`;

export const NovoEnderecoArea = styled.View`
    flex: 1;
    height: 40px;
    justify-content: center;
    align-items:center;
    margin-top: 20px;
`;

export const NovoEnderecoButton = styled.TouchableOpacity`
    background-color: #FA7921;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items:center;
    border-radius: 5px;
`;

export const NovoEnderecoButtonText = styled.Text`
    font-size: 16px;
    color: #fff;
    font-weight: bold;
`;
