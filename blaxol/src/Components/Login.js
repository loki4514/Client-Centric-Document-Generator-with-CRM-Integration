import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Login(props) {
    
    const [credentials,setCredentials] = useState({email : "",password:""})
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
       
        e.preventDefault();
        
        try {
          const response = await fetch('http://localhost:3000/api/admin/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });
          console.log(e.target.name,"this won't owk")
          // if (!response.ok) {
          //   throw new Error('Failed to login');
          // }
      
          const json = await response.json();

          console.log(json);
          
          if (json.success) {
            // redirect

            sessionStorage.setItem('isLoggedIn', 'true');
            // localStorage.setItem('token',json.authtoken)
            navigate('/home')
            window.location.reload();
          }
          else {
            const errorMessage = json.error;
            props.showAlert(errorMessage,"danger")
          }
        } catch (error) {
          props.showAlert('Error during login:', "danger");
          console.log(error)
        }
      };
    
    const change = (e) => {
        console.log(e.target.name)
        setCredentials({ ...credentials, [e.target.name]: e.target.value });

      };

    
  return (

    
    <>
    <div className='LoginForm'>
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Login</h5>
    <form onSubmit={handleSubmit}>

        <div className="form-group">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" name='email' className="form-control" value={credentials.email} onChange={change} id="email" aria-describedby="emailHelp" placeholder='Enter Your Email' required/>
            <div id="emailHelp" className="form-text"></div>
        </div>
        
        <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" className="form-control" value={credentials.password} onChange={change} id="password" placeholder='Enter Your Password' required/>
        </div>
        <div className="form-group">
        <button type="submit" className="btn btn-primary" >Submit</button>
        </div>
    </form>
    </div>
    </div>
    </div>
    
    </>
    
    )
}
