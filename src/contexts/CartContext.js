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
    }, [cart])

    function add (item) {
        const newCart = cart;
        newCart.push(item);

        setCart([...newCart]);
    }

    const store = {
        add,
        cart, total
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
    } = context

    return {
        cart,
        add,
        total
    }
}