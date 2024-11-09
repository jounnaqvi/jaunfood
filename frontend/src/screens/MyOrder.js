import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            const data = await response.json();
            console.log("Order Data received from API:", data); // Ensure this shows correct structure
            setOrderData(data.orderData); // Update this to store the nested 'orderData' directly
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    }

    useEffect(() => {
        fetchMyOrder();
    }, []);

    // If orderData is null, display a loading message or "No orders found"
    if (!orderData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData.order_data.length > 0 ? (
                        orderData.order_data.slice(0).reverse().map((itemArray, index) => (
                            <div key={index}>
                                {itemArray.map((arrayData, idx) => (
                                    <div key={idx}>
                                        {arrayData.Order_date ? (
                                            <div className='m-auto mt-5'>
                                                <hr />
                                                <strong>{arrayData.Order_date}</strong>
                                            </div>
                                        ) : (
                                            <div className='col-12 col-md-6 col-lg-3'>
                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                    {/* <img src={arrayData.img} className="card-img-top" alt="Product" style={{ height: "120px", objectFit: "fill" }} /> */}
                                                    <div className="card-body">
                                                        <h5 className="card-title">{arrayData.name}</h5>
                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                            <span className='m-1'>{arrayData.qty}</span>
                                                            <span className='m-1'>{arrayData.size}</span>
                                                            <span className='m-1'>{arrayData.Order_date}</span>
                                                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                ₹{arrayData.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div>No orders found</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
