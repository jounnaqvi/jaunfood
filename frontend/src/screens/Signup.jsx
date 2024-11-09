import React, { useState } from 'react';
import { Link } from "react-router-dom";
// const cors = require('cors');

export default function Signup() {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: ""
  });
  // app.use(cors(corsOptions));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credential.name,
        email: credential.email,
        password: credential.password,
        location: credential.geolocation
      })
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid details");
    }
  }

  const handleChange = (event) => {
    setCredential({
      ...credential,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={credential.name}
            onChange={handleChange}
          />
          <small id="nameHelp" className="form-text text-muted">
            We'll never share your Name with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credential.email}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credential.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="geolocation">Address</label>
          <input
            type="text"
            className="form-control"
            name="geolocation"
            value={credential.geolocation}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="m-3 btn btn-primary">Submit</button>
        <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
      </form>
    </div>
  );
}