// ShoeList.js

import React, { useContext, useEffect } from 'react';
import { ShoeContext } from './ShoeContext';
import './ShoeList.css';

const ShoeList = () => {
    const { state, addToCart, fetchShoeList } = useContext(ShoeContext);

    useEffect(() => {
        // Fetch the shoe list when the component mounts
        fetchShoeList();
    }, [fetchShoeList]);

    const handleAddToCart = (shoe, size) => {
        addToCart(shoe, size);
    };

    return (
        <center>
            <div>
                <h2>Shoe List</h2>
                <ul>
                    {state.shoes.map((shoe, index) => (
                        <li key={index}>
                            <strong>{shoe.name}</strong> - {shoe.description} - ${shoe.price}{' '}
                            <SizesDisplay sizes={shoe.sizes} onSizeClick={(size) => handleAddToCart(shoe, size)} />
                        </li>
                    ))}
                </ul>
            </div>
        </center>
    );
};

const SizesDisplay = ({ sizes, onSizeClick }) => {
    const sizeButtons = Object.entries(sizes).map(([size, quantity]) => (
        <button key={size} onClick={() => onSizeClick(size)} disabled={quantity === 0}>
            {size} ({quantity})
        </button>
    ));

    return <div>{sizeButtons}</div>;
};

export default ShoeList;
