// Cart.js
import React, { useContext } from 'react';
import { ShoeContext } from './ShoeContext';
import './Cart.css';

const Cart = () => {
    const { state, dispatch } = useContext(ShoeContext);

    // Check if state.cart is undefined or not an array
    if (!state.cart || !Array.isArray(state.cart)) {
        return <div>Loading...</div>; // or any other fallback UI
    }

    // Calculate total price of all items in the cart
    const totalPrice = state.cart.reduce((total, item) => {
        return total + item.shoe.price;
    }, 0);

    const handlePlaceOrder = async () => {
        // Implement logic for placing the order
        // Send details to CRUD API
        try {
            const response = await fetch('https://crudcrud.com/api/fc30805ea64e44f396ab6d28a5f8e5a2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(state.cart),
            });

            if (response.ok) {
                console.log('Order placed!');
                // Optionally, you can clear the cart after placing the order
                dispatch({ type: 'CLEAR_CART' });
            } else {
                console.error('Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    const handleCancelOrder = () => {
        // Implement logic for canceling the order
        console.log('Order canceled!');
    };

    const handleRemoveItem = async (index) => {
        // Dispatch an action to remove the item from the cart
        dispatch({ type: 'REMOVE_FROM_CART', payload: { index } });

        // Optionally, you can update the shoe list by fetching the latest data from the server
        // Example: fetchShoeList();
    };

    return (
        <center>
            <div>
                <h2>Shopping Cart</h2>
                <ul>
                    {state.cart.map((item, index) => (
                        <li key={index}>
                            <strong>{item.shoe.name}</strong> - Size: {item.size} - ${item.shoe.price}
                            <button onClick={() => handleRemoveItem(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <div>
                    <p>Total Price: ${totalPrice}</p>
                    <button onClick={handlePlaceOrder}>Place Order</button>
                    <button onClick={handleCancelOrder}>Cancel Order</button>
                </div>
            </div>
        </center>
    );
};

export default Cart;
