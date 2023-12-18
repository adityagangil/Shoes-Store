import React, { useContext, useState } from 'react';
import { ShoeContext } from './ShoeContext';
import './AddShoeForm.css';

const AddShoeForm = () => {
    const { addShoe } = useContext(ShoeContext);
    const [shoe, setShoe] = useState({
        name: '',
        description: '',
        price: 0,
        sizes: {
            small: 0,
            medium: 0,
            large: 0,
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShoe((prevShoe) => ({
            ...prevShoe,
            [name]: value,
        }));
    };

    const handleSizeChange = (e) => {
        const { name, value } = e.target;
        setShoe((prevShoe) => ({
            ...prevShoe,
            sizes: {
                ...prevShoe.sizes,
                [name]: parseInt(value, 10),
            },
        }));
    };

    const handleAddShoe = () => {
        addShoe(shoe);
        setShoe({
            name: '',
            description: '',
            price: 0,
            sizes: {
                small: 0,
                medium: 0,
                large: 0,
            },
        });
    };

    return (
        <center>
            <div>
                <h2>Add Shoe</h2>
                <label>
                    <span>Shoe Name:</span><br/>
                    <input type="text" name="name" value={shoe.name} onChange={handleInputChange} />
                </label>
                <label>
                    <span>Description:</span><br/>
                    <input type="text" name="description" value={shoe.description} onChange={handleInputChange} />
                </label>
                <label>
                    <span>Price:</span><br/>
                    <input type="number" name="price" value={shoe.price} onChange={handleInputChange} />
                </label>
                <label>
                    <span>Small:</span><br/>
                    <input type="number" name="small" value={shoe.sizes.small} onChange={handleSizeChange} />
                </label>
                <label>
                    <span>Medium:</span><br/>
                    <input type="number" name="medium" value={shoe.sizes.medium} onChange={handleSizeChange} />
                </label>
                <label>
                    <span>Large:</span><br/>
                    <input type="number" name="large" value={shoe.sizes.large} onChange={handleSizeChange} />
                </label>
                <button onClick={handleAddShoe}>Add Product</button>
            </div>
        </center>
    );
};

export default AddShoeForm;
