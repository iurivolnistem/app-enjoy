import React, {useState, useEffect} from 'react';

import Api from '../../Api';
import { Platform, RefreshControl } from 'react-native'
import ProdutoItem from '../../components/ProdutoItem';

import {
    Container,
    Scroller,
    HeaderArea,
    HeaderTitle,
    LoadingIcon,
    ListArea
} from './styles';

import MyLocationIcon from '../../assets/my_location.svg';

export default () => {

    const [loading, setLoading] = useState(false);
    const [listaProdutos, setListaProdutos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getProdutos = async () => {
        setLoading(true);
        setListaProdutos([]);

        let res = await Api.getProdutos();
        if(res.error == ''){
            setListaProdutos(res.data);
        }
        else{
            alert('Erro', res.error)
        }

        setLoading(false);
    }

    useEffect(() => {
        getProdutos();
    }, [])

    const onRefresh = () => {
        setRefreshing(false);
        getProdutos();
    }

    return (
        <Container>
            <HeaderArea>
                <HeaderTitle numberOfLines={2}>Produtos</HeaderTitle>
            </HeaderArea>
            <Scroller refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

                {loading &&
                    <LoadingIcon size="large" color="#FA7921" />
                }

                <ListArea>
                    {listaProdutos.map((item, index) => (
                        <ProdutoItem key={index} data={item}/>
                    ))}
                </ListArea>
            </Scroller>
        </Container>
    );
}