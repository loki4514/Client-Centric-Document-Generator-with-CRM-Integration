import React,{useContext, useEffect} from 'react'
import {
  Link,useLocation,useNavigate
} from "react-router-dom";





export default function Navbar() {

  let location = useLocation()
  useEffect(() => {
    console.log(location.pathname)
  },[location])

  const navigate = useNavigate()
  const Logout =() =>{
    localStorage.setItem('isLoggedIn', false);
    window.localStorage.clear()
    navigate('/login')
    window.location.reload()
    
    
  }

  const onclick = () => {
    console.log("hi")
    if (localStorage.getItem("isLoggedIn") === undefined) {
      console.log("hi1")
      navigate("/");
    }
    console.log("this will work now!", localStorage.getItem("isLoggedIn"));
  };
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  console.log(isLoggedIn)
  
  return (
    <>
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div className="container-fluid">
    <Link className="navbar-brand"  to={isLoggedIn ? '/' : '/login'} onClick={onclick} >Blaxol</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/create-admin"? "active" : ""}`} aria-current="page" to={isLoggedIn ? '/create-admin' : '/login'} onClick={onclick}>Create Admin</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/create-user"? "active" : ""}`} aria-current="page" to={isLoggedIn ? '/create-user' : '/login'} onClick={onclick}>Create User</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/invoice"? "active" : ""}`} aria-current="page" to={isLoggedIn ? '/invoice' : '/login'} onClick={onclick}>Generate Invoice</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Create User</Link>
            </li> */}
            
            
            
          </ul>
          <div className="d-flex">
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                  <li className="nav-item">
                    <Link className={"nav-link active"} onClick = {Logout} aria-current="page" to="/login">Logout</Link>
                </li>
              </ul>
        </div>
        </div>
      </div>
    </nav>
  
  


      
  

    </>
  )
}
