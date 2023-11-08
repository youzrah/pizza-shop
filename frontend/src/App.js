import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Components/Admin/Dashboard';
import ProductCreate from './Components/Admin/ProductCreate';
import { ToastContainer } from 'react-toastify';
import ProductsList from './Components/Admin/ProductsList';
import ProductUpdate from './Components/Admin/ProductUpdate';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/products/list' element={<ProductsList />} />
          <Route path='/product/create' element={<ProductCreate />} />
          <Route path='/product/update/:productId' element={<ProductUpdate />} />
        </Routes>
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
