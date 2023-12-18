import React from 'react';
import AddShoeForm from './components/AddShoeForm';
import ShoeList from './components/ShoeList';
import Cart from './components/Cart';
import './index.css';
import { ShoeProvider } from './components/ShoeContext';

const App = () => {
  return (
    <ShoeProvider>
      <div>
        <AddShoeForm />
        <ShoeList />
        <Cart />
      </div>
    </ShoeProvider>
  );
};

export default App;
