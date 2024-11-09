import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './screens/Home';
import Login from './screens/Login';
import Cart from './screens/Cart';
import Signup from './screens/Signup';
import { CartProvider } from './components/contextReducer';
import Payment from './components/Payment';
import MyOrder from './screens/MyOrder';

function App() {
  return (
    <CartProvider>
      <Router>
    <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/myOrder" element={<MyOrder />} />
          

          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/payment" element={<Payment />} />
        </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
