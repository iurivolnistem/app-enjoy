const BASE_API = 'http://10.0.2.2:8000/api';

export default {
    checkID: async (token) => {
        const req = await fetch(`${BASE_API}/validar/${parseInt(token)}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await req.json();
        return json;
    },

    login: async (params) => {
        const req = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },            
            body: JSON.stringify(params)
        });
        const json = await req.json();
        return json;
    },

    cadastro: async (params) => {
        const req = await fetch(`${BASE_API}/cadastrar`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        const json = await req.json();
        return json;
    },

    getProdutos: async() => {
        const req = await fetch(`${BASE_API}/produtos`);

        const json = await req.json();
        return json;
    },

    getProduto: async (id) => {
        const req = await fetch(`${BASE_API}/produto/${id}`);
        const json = await req.json();
        return json;
    },

    sendPedido: async (pedido) => {
        const req = await fetch(`${BASE_API}/pedido`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        });
        const json = await req.json();
        return json;
    },

    getEnderecos: async(id) => {
        const req = await fetch(`${BASE_API}/enderecos/cliente/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await req.json();
        return json;
    },

    activeEndereco: async (id, id_cliente) => {
        const req = await fetch(`${BASE_API}/endereco/ativo/${id}/${id_cliente}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id, id_cliente)
        });
        const json = await req.json();
        return json;
    },

    buscarCep: async (cep) => {
        const req = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await req.json();
        return json;
    },

    cadastraEndereco: async (params) => {
        const req = await fetch(`${BASE_API}/cadastrar/endereco`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        const json = await req.json();
        return json;
    }, 

    excluirEndereco: async (id, id_cliente) => {
        const req = await fetch(`${BASE_API}/excluir/endereco/${id}/${id_cliente}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await req.json();
        return json;
    },

    getTelefones: async(id) => {
        const req = await fetch(`${BASE_API}/telefones/cliente/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await req.json();
        return json;
    },

    cadastraTelefone: async (params) => {
        const req = await fetch(`${BASE_API}/cadastrar/telefone`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        const json = await req.json();
        return json;
    },
    
    excluirTelefone: async (id, id_cliente) => {
        const req = await fetch(`${BASE_API}/excluir/telefone/${id}/${id_cliente}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await req.json();
        return json;
    },

    activeTelefone: async (id, id_cliente) => {
        const req = await fetch(`${BASE_API}/telefone/ativo/${id}/${id_cliente}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id, id_cliente)
        });
        const json = await req.json();
        return json;
    },

    getPedidos: async (id) => {
        const req = await fetch(`${BASE_API}/pedidos/cliente/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await req.json();
        return json;
    },

    getPedido: async (pedidoID) => {
        const req = await fetch(`${BASE_API}/pedido/${pedidoID}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await req.json();
        return json;
    },

    confirmaEntrega: async (pedidoID) => {
        const req = await fetch(`${BASE_API}/pedido/confirmarEntrega/${pedidoID}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await req.json();
        return json;
    }
};