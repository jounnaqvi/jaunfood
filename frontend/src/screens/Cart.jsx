import React, { useState } from 'react';
import axios from 'axios';
import Delete from '@material-ui/icons/Delete';
import { useCart, useDispatchCart } from '../components/contextReducer';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

export default function Cart() {
  const [checkoutError, setCheckoutError] = useState(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  
  let data = useCart();
  let dispatch = useDispatchCart();
  const navigate = useNavigate();  // Initialize useNavigate hook
  
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 text-white'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    try {
      let userEmail = localStorage.getItem("userEmail");
      
      let response = await axios.post("http://localhost:5000/api/orderdata", {
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        dispatch({ type: "DROP" });
        setCheckoutSuccess(true);
        navigate("/payment");  // Redirect to the payment page
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      setCheckoutError("An error occurred during checkout. Please try again.");
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover text-white'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col' className='text-white'>#</th>
              <th scope='col' className='text-white'>Name</th>
              <th scope='col' className='text-white'>Quantity</th>
              <th scope='col' className='text-white'>Option</th>
              <th scope='col' className='text-white'>Amount</th>
              <th scope='col' className='text-white'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row' className='text-white'>{index + 1}</th>
                <td className='text-white'>{food.name}</td>
                <td className='text-white'>{food.qty}</td>
                <td className='text-white'>{food.size}</td>
                <td className='text-white'>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn p-0 text-white d-flex align-items-center justify-content-center"
                    onClick={() => { dispatch({ type: "REMOVE", index: index }) }}
                  >
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2 text-white'>Total Price: {totalPrice.toFixed(2)}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 text-white' onClick={handleCheckOut}>Check Out</button>
        </div>
        {checkoutSuccess && <div className='alert alert-success mt-3'>Checkout successful!</div>}
        {checkoutError && <div className='alert alert-danger mt-3'>{checkoutError}</div>}
      </div>
    </div>
  );
}
