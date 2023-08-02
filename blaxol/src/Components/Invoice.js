import React, { useContext, useEffect,useState } from 'react';
// import noteContext from '../context/temp/noteContext';


export default function Invoice(props) {
  const [info,setInfo] = useState({name:"",address:"",amount:""})
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/api/simple/invoice1',{
      method : 'POST',
      headers : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info)
    }) 
    if (response.ok) {
      props.showAlert('Successfully generated the document.', 'success');
      window.location.reload()
      // You may handle the response data here if needed
    } else {
      // Handle the case when the response is not OK
      props.showAlert('Failed to generate the document.', 'error');
    }
  }
    catch(error) {
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
        <label htmlFor="exampleInputEmail1">Name</label>
        <input type="text" name='name' value={info.name} onChange = {change} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" required/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Address</label>
        <input type="text" className="form-control" name='address' value={info.address} onChange = {change} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Address"/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Amount</label>
        <input type="number" className="form-control" name='amount' value={info.amount} onChange = {change} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Amount"/>
      </div>
      
      
      <div className="form-group" style={{ margin: '0 auto' }}>
      <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
    </div>
        </>
  )
}
