import React from 'react';
import styled from 'styled-components/native';
import TextInputMask from 'react-native-text-input-mask';

const InputArea = styled.View`
    width: 100%;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.4);
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`;

export default ({IconSvg, placeholder, value, onChangeText, password, mascara, lenght}) => {
    return (
        <InputArea>
            <IconSvg width="24" height="24" fill="#ffffff" />
            <TextInputMask
                style={{color: '#fff', width: '100%'}} 
                placeholder={placeholder} 
                placeholderTextColor="#fff"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={password}
                mask={mascara}
                maxLength={lenght}
            />
        </InputArea>
    );
}