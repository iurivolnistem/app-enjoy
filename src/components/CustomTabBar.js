import React, {useContext} from 'react';
import styled from 'styled-components/native';

import { UserContext } from '../contexts/UserContext';

import HomeIcon from '../assets/home.svg';
import AccountIcon from '../assets/account.svg';
import OrderIcon from '../assets/checklist.svg';

import Home from '../screens/Home';

const TabArea = styled.View`
    height: 60px;
    background-color: #FA7921;
    flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default ({state, navigation}) => {

    const {state:user} = useContext(UserContext);

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return(
        <TabArea>
            <TabItem onPress={() => goTo('Home')}>
                <HomeIcon style={{opacity: state.index === 0 ? 1 : 0.5}} width="24" height="24" fill="#fff" />
            </TabItem>
            <TabItem onPress={() => goTo('Pedidos')}>
                <OrderIcon style={{opacity: state.index === 1 ? 1 : 0.5}} width="24" height="24" fill="#fff" />
            </TabItem>
            <TabItem onPress={() => goTo('Perfil')}>
                <AccountIcon style={{opacity: state.index === 2 ? 1 : 0.5}} width="24" height="24" fill="#fff" />
            </TabItem>
        </TabArea>
    );
}