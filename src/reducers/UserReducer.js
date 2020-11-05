export const initialState = {
    id: '',
    nome: '',
    email: '',
    pedidos: [],
};

export const UserReducer = (state, action) => {
    switch(action.type){
        case 'setNome':
            return { ...state, nome: action.payload.nome }
        break;
        case 'setId': 
            return {...state, id: action.payload.id}
        break;
        case 'setEmail': 
            return {...state, email: action.payload.email}
        break;
        default:
            return state;
    }
}