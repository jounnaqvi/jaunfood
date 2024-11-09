import React ,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './contextReducer';


export default function Navbar() {
  const [cartView,setcartView] = useState(false);
  const navigate = useNavigate();
  let data = useCart();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const navStyle = {
    backgroundColor: '#470D0D', 
  };

  const linkStyle = {
    color: '#FFFFFF', 
  };

  return (
    <nav className="navbar navbar-expand-lg" style={navStyle}>
      <Link className="navbar-brand fs-1 fst-italic" to="#" style={linkStyle}>JaunFood</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2">
          <li className="nav-item active">
            <Link className="nav-link active fs-5" to="/" style={linkStyle}>Home <span className="sr-only"></span></Link>
          </li>
          {localStorage.getItem("authToken") && (
            <li className="nav-item active">
              <Link className="nav-link active fs-5" to="/myOrder" style={linkStyle}>
                MY ORDERS <span className="sr-only"></span>
              </Link>
            </li>
          )}
        </ul>
        {localStorage.getItem("authToken") ? (
          <div className="d-flex">
            <div className="btn bg-white text-success mx-2"onClick={()=>{setcartView(true)}}>
              My Cart{" "}
              <Badge pill bg="danger">
                {data.length}
              </Badge>
            </div>
            {cartView? <Modal onClose={()=>setcartView(false)}><Cart/></Modal>:null}
            <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
              Logout
            </div>
          </div>
        ) : (
          <div className="d-flex">
            <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
            <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
