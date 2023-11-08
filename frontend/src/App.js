import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Components/Admin/Dashboard';
import ProductCreate from './Components/Admin/ProductCreate';
import { ToastContainer } from 'react-toastify';
import ProductsList from './Components/Admin/ProductsList';
import ProductUpdate from './Components/Admin/ProductUpdate';
import Home from './Components/Home';
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'
import Login from './Components/User/Login';
import Register from './Components/User/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>

          {/* User Access */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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
