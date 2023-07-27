import React,{useContext, useEffect} from 'react'
import {
  Link,useLocation
} from "react-router-dom";





export default function Navbar() {

  let location = useLocation()
  useEffect(() => {
    console.log(location.pathname)
  },[location])
  
  
  return (
    <>
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/home">Blaxol</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/create-admin"? "active" : ""}`} aria-current="page" to="/create-admin">Create Admin</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/create-user"? "active" : ""}`} aria-current="page" to="/create-user">Create User</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/invoice"? "active" : ""}`} aria-current="page" to="/invoice">Generate Invoice</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Create User</Link>
            </li> */}
            
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  
  


      
  

    </>
  )
}
