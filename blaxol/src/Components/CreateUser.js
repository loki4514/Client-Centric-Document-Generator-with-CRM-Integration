import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function CreateUser(props) {
  const [info,setInfo] = useState({name:"",email:"",phone_number:"",call_sign:"",description:"",spoc:""})
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    
  try {
    const response = await fetch('http://localhost:3000/api/user/createuser',{
      method : 'POST',
      headers : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info)
    }) 
    const data = await response.json();
      console.log(response)
      if (response.ok) {
      navigate('/create-user')
      props.showAlert("New User has been created successfully","success")
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
    setInfo({...info,[e.target.name]:e.target.value})

  }
  
  return (
    <>
    <div className='container-admin'>
      
        <form onSubmit={handleSubmit}>
        <h2 style={{textAlign : "center"}}>Create Customer</h2>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Customer Name</label>
        <input type="text" name='name' value={info.name} onChange = {change} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" required/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" name='email' value={info.email} onChange = {change} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Mobile Number</label>
        <input type="number" className="form-control" name='phone_number' value={info.phone_number} onChange = {change} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Mobile Number"/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Project Name</label>
        <input type="text" className="form-control" name='call_sign' value={info.call_sign} onChange = {change} id="exampleInputPassword1" placeholder="Project"/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Description</label>
        <input type="text" className="form-control" name='description' value={info.description} onChange = {change} id="exampleInputPassword1" placeholder="Info"/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">SPOC</label>
        <input type="text" className="form-control" name='spoc' value={info.spoc} onChange = {change} id="exampleInputPassword1" placeholder="Single Point Of Contact"/>
      </div>
      
      <div className="form-group" style={{ margin: '0 auto' }}>
      <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
    </div>
        </>
  )
}
