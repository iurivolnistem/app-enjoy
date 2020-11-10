import React, {useContext} from 'react';
import styled from 'styled-components/native';

import { UserContext } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';

import HomeIcon from '../assets/home.svg';
import AccountIcon from '../assets/account.svg';
import OrderIcon from '../assets/checklist.svg';
import BagIcon from '../assets/bag.svg';

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
    position: relative;
`;

const BadgeSacola = styled.Text`
    position: absolute;
    background-color: #fff;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    bottom: 3px;
    right: 24px;
    justify-content: center;
    align-items:center;
    text-align:center;
    color: red;
    font-size 16px;
    font-weight: bold;
`;

export default ({state, navigation}) => {

    const {state:user} = useContext(UserContext);
    const {cart} = useCart();

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
            <TabItem onPress={() => goTo('Sacola')}>
                {Object.keys(cart).length > 0 ?
                <BadgeSacola style={{opacity: state.index === 2 ? 1 : 0.5}}>{Object.keys(cart).length}</BadgeSacola>
                :
                <BadgeSacola style={{opacity: Object.keys(cart).length > 0 ? 1 : 0.0}}></BadgeSacola>
                }
                <BagIcon style={{opacity: state.index === 2 ? 1 : 0.5}} width="24" height="24" fill="#fff" />
            </TabItem>
            <TabItem onPress={() => goTo('Perfil')}>
                <AccountIcon style={{opacity: state.index === 3 ? 1 : 0.5}} width="24" height="24" fill="#fff" />
            </TabItem>
        </TabArea>
    );
}