import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Container, ImageHeader, PageProduto, ProdutoDescricao, ProdutoValor, ProdutoValorInput, AreaValor, AreaQuantidade, DescricaoText, ValorText, ProdutoNome, BotaoDiminuir, BotaoAdicionar, InputText } from './styles';
import Api from '../../Api';

import MinusIcon from '../../assets/remove.svg';
import PlusIcon from '../../assets/plus.svg';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [produtoInfo, setProdutoInfo] = useState({
        id: route.params.id,
        nome: route.params.nome,
        descricao: route.params.descricao,
        valor: route.params.valor,
        imagem: route.params.imagem
    });

    const [loading, setLoading] = useState(false);
    const [valor, setValor] = useState(0.00);
    const [quantidade, setQuantidade] = useState(1);
    const [active, setActive] = useState(false);

    // setState(updater, [callback])

    useEffect(() => {
        console.log(quantidade)
        somarValor();
    }, [quantidade, valor]);

    const somarValor = () => {
        let soma = quantidade * produtoInfo.valor
        setValor(soma)
    }

    const aumentarQuantidade = () => {
        setQuantidade(quantidade + 1)
    }

    const diminuirQuantidade = () => {
        if(quantidade > 1){
            setQuantidade(quantidade - 1);
        }
    }

    return (
        <Container>
            <ImageHeader source={{uri: 'http://10.0.2.2:8000/'+produtoInfo.imagem}} />
            <PageProduto>
                <ProdutoNome>{produtoInfo.nome}</ProdutoNome>
                <ProdutoDescricao>
                    <DescricaoText>{produtoInfo.descricao}</DescricaoText>
                </ProdutoDescricao>
                <ProdutoValor>
                    <ValorText>R${produtoInfo.valor}</ValorText>
                </ProdutoValor>
            </PageProduto>

            <AreaValor>
                <BotaoDiminuir disabled={active} onPress={diminuirQuantidade}>
                    <MinusIcon width="20" height="20" fill="#FA7921" />
                </BotaoDiminuir>
                <AreaQuantidade>{quantidade}</AreaQuantidade>
                <BotaoAdicionar onPress={aumentarQuantidade}>
                    <PlusIcon width="20" height="20" fill="#FA7921" />
                </BotaoAdicionar>
                <ProdutoValorInput>
                    <InputText on>Adicionar R${valor.toFixed(2)}</InputText>
                </ProdutoValorInput>
            </AreaValor>
        </Container>
    );
}