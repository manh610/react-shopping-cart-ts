import './App.css';
import 'antd/dist/antd.css'; 
import React from 'react';
import Shop from './components/shoping';
import Cart from './components/cart';
import ProductDetail from './components/product';
import Profile from './components/profile';
import Login from './components/login'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Register from './components/register';


function App() {
  document.title = "my-app";
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path='/product/:productId' element={<ProductDetail/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
  );
    
    
}

export default App;
