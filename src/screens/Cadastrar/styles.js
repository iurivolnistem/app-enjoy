import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #FA7921;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
`;

export const TextoLogo = styled.Text`
    color: #FA7921;
    font-size: 30px;
    font-weight: bold;
    text-transform: uppercase;
    background-color: #fff;
    padding: 10px
    border-radius: 10px
`;

export const InputArea = styled.ScrollView`
    width: 100%;
    padding: 20px 40px;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    text-transform: uppercase;
    color: #FA7921;
`;

export const MensagemButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    padding: 0
`;

export const MensagemButtonText = styled.Text`
    font-size: 16px;
    color: #fff;
`;

export const MensagemButtonTextBold = styled.Text`
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    margin-left: 5px;
`;

