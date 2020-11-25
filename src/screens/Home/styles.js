import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #fff;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 10px 20px;
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
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const SearchArea  = styled.View`
    margin: 0 15px;
    height: 60px;
    padding: 0 15px;
    flex-direction: row;
    border-radius: 30px;
    align-items: center;
    margin-bottom: 15px;
    justify-content: space-between;
    border: 0.5px solid #000;
`;

export const InputSearch = styled.TextInput`
    height: 40px;
    padding: 10px;
`;

export const ButtonSearch = styled.TouchableOpacity`
    width: 20px;
    height: 20px;
`;