import React, {createContext, useContext, useEffect, useReducer, useState} from 'react';

const CartContext = createContext()

export default function CartProvider ({children}){

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState();

    useEffect(() => {
        let value = 0
        cart.map((item) => {
            value = value + (item.valor * item.quantidade)
        })

        setTotal(value)
    }, [cart, total])

    function add (item) {
        let newCart = cart;

        const extistItem = newCart.find((element) => {
            return item.id === element.id;
        })
        
        if(extistItem){
            extistItem.quantidade += item.quantidade;
        }
        else{
            newCart.push(item);
        }

        setCart([...newCart]);
    }

    function removeTodosItems (){
        setCart([]);
    }

    function remove(index){
        let newCart = cart.filter((item, i) => i !== index)
        
        setCart([...newCart]);
    }

    const store = {
        add,
        cart, 
        total,
        remove,
        removeTodosItems
    }

    return (
        <CartContext.Provider value={store}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart(){
    const context = useContext(CartContext)

    const {
        cart,
        add,
        total,
        remove,
        removeTodosItems
    } = context

    return {
        cart,
        add,
        total,
        remove,
        removeTodosItems
    }
}