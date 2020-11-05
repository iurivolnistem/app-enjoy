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
    }
};