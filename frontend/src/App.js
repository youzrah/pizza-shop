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
import UsersList from './Components/Admin/UsersList';

function App() {

  const [state, setState] = useState({
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  })

  const addItemToCart = async (id, quantity = 1, type = "addItem") => {

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
      if (type === "addItem") {
        success('Item Added Successfully')
      }
    } catch (err) {
      error("Error Occured")
    }

  }

  const removeAllFromCart = async () => {

    if (window.confirm("Are you sure you want to empty your cart? ")) {
      setState({
        ...state,
        cartItems: []
      })
      success("You have no items in cart")
    }
  }

  const removeItemFromCart = async (id) => {
    setState({
      ...state,
      cartItems: state.cartItems.filter(i => i.product !== id)
    })
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    success('Item Remove Successfully')
  }

  const saveShippingInfo = async (data) => {
    setState({
      ...state,
      shippingInfo: data
    })
    localStorage.setItem('shippingInfo', JSON.stringify(data))
  }

  const hideHeader = window.location.pathname.startsWith('/admin');

  return (
    <div className="App">
      <Router>
        {!hideHeader && <Header cartItems={state.cartItems} />}
        {/* <Header cartItems={state.cartItems} /> */}
        <Routes>

          {/* User Access */}
          <Route path="/" element={<Home cartItems={state.cartItems} addItemToCart={addItemToCart} />} exact="true" />
          <Route path="/login" element={<Login />} exact="true" />
          <Route path="/register" element={<Register />} exact="true" />
          <Route path='/forgot/password' element={<PasswordForgot />} exact="true" />
          <Route path='/reset/password/:token' element={<PasswordReset />} exact="true" />
          <Route path='/ako' element={<Profile />} exact="true" />
          <Route path='/cart' element={<Cart cartItems={state.cartItems} addItemToCart={addItemToCart} removeItemFromCart={removeItemFromCart} removeAllFromCart={removeAllFromCart} />} exact="true" />

          {/* Admin Access */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path='/admin/products/list' element={<ProductsList />} />
          <Route path='/admin/product/create' element={<ProductCreate />} />
          <Route path='/admin/product/update/:productId' element={<ProductUpdate />} />
          
          <Route path='/admin/users/list' element={<UsersList />} />

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
