export const initialState = {
    produto: {
        id: '',
        nome: '',
        descricao: '',
        valor: '',
        quantidade: ''
    }
}

export const CartReducer = (state, action) => {
    switch(action.type){
        case 'addCart': 
            return {...state, produto: {
                id: action.payload.id,
                nome: action.payload.nome,
                descricao: action.payload.descricao,
                valor: action.payload.descricao,
                quantidade: action.payload.quantidade
            }}
        break;
        default:
            return state;
    }
}