import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex:1;
`;

export const HeaderInfo = styled.View`
    width: 100%;
    text-align:center;
    font-size: 25px;
    border-bottom-width: 1px;
    border-bottom-color: rgba(0,0,0,0.3);
    padding: 10px;
`;

export const HeaderTextInfo = styled.Text`
    font-size: 18px;
    font-weight: bold;
`;

export const HeaderSubText = styled.Text`
    margin-top: 5px;
    color: rgba(0,0,0,0.6);
`;

export const AreaPerfil = styled.View`
    flex: 1;
    padding: 10px;
`;

export const Infos = styled.Text`
    font-size: 16px;
    width: 100%;
    border-bottom-width: 0.5px;
    border-bottom-color: rgba(0,0,0,0.3);
    padding: 20px 0;
`;

export const InfosButton = styled.TouchableOpacity`
    width: 100%;
    border-bottom-width: 0.5px;
    border-bottom-color: rgba(0,0,0,0.3);
    padding: 20px 0;
    flex-direction: row;
    justify-content: space-between;
`;

export const InfosButtonText = styled.Text`
    font-size: 16px;
`;

export const SairButtonArea = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const SairButton = styled.TouchableOpacity`
    padding: 10px;
    background-color: #FA7921;
    align-items:center
    margin-bottom: 20px;
    width: 70%;
    border-radius: 5px;
`;

export const SairButtonText = styled.Text`
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
`;

