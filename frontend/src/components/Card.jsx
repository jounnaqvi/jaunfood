import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatchCart, useCart } from './contextReducer';

const Card = ({ item }) => {
  const dispatch = useDispatchCart();
  const data = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('Quarter');

  const handleAddToCart = async () => {
    let food = data.find((i) => i.id === item._id);
    if (food) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: item._id, price: item.price, qty });
      } else {
        await dispatch({
          type: 'ADD',
          id: item._id,
          name: item.name,
          price: item.price * qty,
          qty,
          size,
        });
      }
    } else {
      await dispatch({
        type: 'ADD',
        id: item._id,
        name: item.name,
        price: item.price * qty,
        qty,
        size,
      });
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card mt-3" style={{ width: '22rem', maxHeight: '520px' }}>
      {/* <img className="card-img-top" src="/momos.jpg" alt="Card image cap" /> */}
      <img className="card-img-top" src="/burger.jpg" alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title" style={{ fontStyle: 'italic' }}>{item.name}</h5>
        <p className="card-text">Category: {item.category}</p>
        <p className="card-text">Price: Rs {item.price.toFixed(2)}</p>
        <p className="card-text">Rating: {item.rating}</p>
        <div className="container w-100">
          <select className="m-2 h-100 bg-success" onChange={(e) => setQty(Number(e.target.value))}>
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select className="m-2 h-100 bg-success" onChange={(e) => setSize(e.target.value)}>
            <option value="Quarter">Quarter</option>
            <option value="Half">Half</option>
            <option value="Full">Full</option>
          </select>
          <div className="d-inline h-100 fs-5">
            Total Price: Rs {(item.price * qty).toFixed(2)}
          </div>
          <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;
