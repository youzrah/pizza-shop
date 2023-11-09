import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Components/Admin/Dashboard';
import ProductCreate from './Components/Admin/ProductCreate';
import { toast, ToastContainer } from 'react-toastify';
import { success, error } from './Components/Layout/Toast';
import ProductsList from './Components/Admin/ProductsList';
import ProductUpdate from './Components/Admin/ProductUpdate';
import Home from './Components/Home';
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import PasswordForgot from './Components/User/PasswordForgot';
import PasswordReset from './Components/User/PasswordReset';
import Profile from './Components/User/Profile';
import { useState } from 'react';
import axios from 'axios';
import Cart from './Components/Cart/Cart';

function App() {

  const [state, setState] = useState({
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  })

  const addItemToCart = async (id, quantity = 1) => {

    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/${id}`)
      console.log(data)
      const item = {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity: quantity
      }

      const isItemExist = state.cartItems.find(i => i.product === item.product)
      console.log(isItemExist, state)

      if (isItemExist) {
        setState({
          ...state,
          cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item : i)
        })
      }

      else {
        setState({
          ...state,
          cartItems: [...state.cartItems, item]
        })
      }

      success('Item Added Successfully')

    } catch (err) {
      error("Error Occured")
    }

  }

  const removeItemFromCart = async (id) => {
    setState({
      ...state,
      cartItems: state.cartItems.filter(i => i.product !== id)
    })
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
  }

  const saveShippingInfo = async (data) => {
    setState({
      ...state,
      shippingInfo: data
    })
    localStorage.setItem('shippingInfo', JSON.stringify(data))
  }


  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>

          {/* User Access */}
          <Route path="/" element={<Home cartItems={state.cartItems} addItemToCart={addItemToCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/forgot/password' element={<PasswordForgot />} />
          <Route path='/reset/password/:token' element={<PasswordReset />} />
          <Route path='/ako' element={<Profile />} />
          <Route path='/cart' element={<Cart cartItems={state.cartItems} addItemToCart={addItemToCart} removeItemFromCart={removeItemFromCart} />} />

          {/* Admin Access */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/products/list' element={<ProductsList />} />
          <Route path='/product/create' element={<ProductCreate />} />
          <Route path='/product/update/:productId' element={<ProductUpdate />} />
        </Routes>
        <Footer />
      </Router>





      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
