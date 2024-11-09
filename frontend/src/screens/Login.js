import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      })
    });

    const json = await response.json();
    console.log(json); // Log the response to check the structure

    if (json.success) {
      localStorage.setItem("userEmail",credential.email);
      localStorage.setItem("authToken",json.authToken);
      navigate("/");
    } else {
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
    <form onSubmit={handleSubmit}>
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
      <button type="submit" className="m-3 btn btn-primary">Submit</button>
      <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
    </form>
  );
}
