import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
export default function CreateAdmin(props) {

  const [admin,SetAdmin] = useState({name:"",email:"", phone_number:"",password:"",cpassword:""})
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const {name,email,phone_number,password} = admin;
    try {
      
      const response = await fetch('http://localhost:3000/api/admin/createAdmin',{
        
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify({name,email,phone_number,password})
      }
      )
      
      const data = await response.json();
      console.log(response)
      if (response.ok) {
      navigate('/create-admin')
      props.showAlert("Admin has been created successfully","success")
      window.location.reload();
      }
      else {
        const errorMessage = data.error;
        console.log(errorMessage)
        props.showAlert(`${errorMessage}`,'warning');
      }

    }catch (error) {
      props.showAlert("Some Error occured","danger")
      console.log(error)
    }
  }


  const change = (e) => {
    SetAdmin({...admin,[e.target.name]:e.target.value})

  }

  return (
    <>
<div className='container-admin' onSubmit={handleSubmit}>
  
    <form>
    <h2 style={{textAlign : "center"}}>Create Admin</h2>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Admin's Name</label>
    <input type="text" name='name' value = {admin.name} onChange = {change} minLength = {3} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" required/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" name = 'email' value = {admin.email} onChange = {change} minLength = {5} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Mobile Number</label>
    <input type="number" name = 'phone_number' value = {admin.phone_number} onChange = {change} minLength = {5} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Mobile Number" required/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" name = 'password' value = {admin.password} onChange = {change} minLength = {5} className="form-control" id="exampleInputPassword1" placeholder="Password" required/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Confirm Password</label>
    <input type="password" name = 'cpassword' value = {admin.cpassword} onChange = {change} minLength = {5} className="form-control" id="exampleInputPassword1" placeholder="Password" required/>
  </div>
  
  <div className="form-group" style={{ margin: '0 auto' }}>
  <button type="submit" className="btn btn-primary">Submit</button>
  </div>
</form>
</div>
    </>
  )
}
