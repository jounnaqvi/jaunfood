import React from 'react'
export default function Carausel() {
  return (
  
    <div>
 <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel"style={{objectFit:"contain !important"}} ></div>
 <div className="carousel-caption"style={{zIndex:"10"}}>
 <form className="form-inline">
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
    <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
  </form>



 </div>

      <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="10000">
      <img src="/sandwich.jpg" className="d-block w-100" alt="SANDWICH TIME" style={{filter:"brightness(30%)"}}/>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src="/burger.jpg" className="d-block w-100" alt="BURGER TIME"/>
    </div>
    <div className="carousel-item">
      <img src="/momos.jpg" className="d-block w-100" alt="MOMO TIME"/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}
