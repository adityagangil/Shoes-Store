// ShoeContext.js

import React, { createContext, useReducer, useEffect } from 'react';
import './ShoeContext.css';

const ShoeContext = createContext();

const initialState = {
    shoes: [],
    cart: [], // Make sure this is initialized as an empty array
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_SHOE':
            return {
                ...state,
                shoes: [...state.shoes, action.payload],
            };
        case 'ADD_TO_CART':
            const { shoe, size } = action.payload;
            const updatedCart = [...state.cart, { shoe, size }];
            const updatedShoes = state.shoes.map((shoeItem) => {
                if (shoeItem === shoe) {
                    const updatedSizes = { ...shoeItem.sizes, [size]: shoeItem.sizes[size] - 1 };
                    return { ...shoeItem, sizes: updatedSizes };
                }
                return shoeItem;
            });

            return {
                ...state,
                cart: updatedCart,
                shoes: updatedShoes,
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cart: [],
            };
        case 'SET_SHOES':
            return {
                ...state,
                shoes: action.payload,
            };
        default:
            return state;
    }
};

const ShoeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addShoe = (shoe) => {
        dispatch({ type: 'ADD_SHOE', payload: shoe });
    };

    const addToCart = (shoe, size) => {
        dispatch({ type: 'ADD_TO_CART', payload: { shoe, size } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const fetchShoeList = async () => {
        try {
            const response = await fetch('');
            const data = await response.json();
            dispatch({ type: 'SET_SHOES', payload: data });
        } catch (error) {
            console.error('Error fetching shoe list:', error);
        }
    };

    useEffect(() => {
        fetchShoeList();
    }, []);

    return (
        <ShoeContext.Provider value={{ state, addShoe, addToCart, clearCart, fetchShoeList }}>
            {children}
        </ShoeContext.Provider>
    );
};

export { ShoeContext, ShoeProvider };
