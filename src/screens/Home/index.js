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
    ListArea, 
    SearchArea,
    InputSearch,
    ButtonSearch
} from './styles';

import MyLocationIcon from '../../assets/my_location.svg';
import SearchIcon from '../../assets/search.svg';

export default () => {

    const [loading, setLoading] = useState(false);
    const [listaProdutos, setListaProdutos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [pesquisa, setPesquisa] = useState('');

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

    const listaFiltro = (listaProdutos) => {
        return listaProdutos.filter(item => item.nome.toLowerCase().includes(pesquisa.toLowerCase()));
    }

    return (
        <Container>
            <HeaderArea>
                <HeaderTitle numberOfLines={2}>Produtos</HeaderTitle>
            </HeaderArea>

            <SearchArea>
                <InputSearch placeholder="Procure um produto" value={pesquisa} onChangeText={t => setPesquisa(t)}></InputSearch>
                <ButtonSearch>
                    <SearchIcon width="20" height="20" fill="#FA7921" />
                </ButtonSearch>
            </SearchArea>

            <Scroller refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

                {loading &&
                    <LoadingIcon size="large" color="#FA7921" />
                }

                <ListArea>
                    {
                        listaFiltro(listaProdutos).map((item, index) => (
                            <ProdutoItem key={index} data={item}/>
                        ))
                    }
                </ListArea>
            </Scroller>
        </Container>
    );
}