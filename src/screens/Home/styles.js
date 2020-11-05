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