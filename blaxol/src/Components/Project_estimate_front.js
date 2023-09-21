import React from 'react'

export default function Project_estimate_front(props) {
  return (
    <>
    <div className='container-admin'>
        <form onSubmit={props.handleSubmit}>
        <h2 style={{textAlign : "center"}}>Generate Project Estimate</h2>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">RFP</label>
        <input type="text" name='rfp' value={props.info.rfp} onChange = {props.change} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter RFP" required/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Client Name</label>
        <input type="text" className="form-control" name='client_name' value={props.info.client_name} onChange = {props.change} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Client Name"/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Project Name</label>
        <input type="text" className="form-control" name='project_name' value={props.info.project_name} onChange = {props.change} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Project Name"/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Spoc</label>
        <input type="text" className="form-control" name='spoc' value={props.info.spoc} onChange = {props.change} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Project Name"/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Date</label>
        <input type="date" name='date' value={props.info.date} onChange = {props.change} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Date" required/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">District</label>
        <input type="text" className="form-control" name='district' value={props.info.district} onChange = {props.change} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter District"/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">City</label>
        <input type="text" className="form-control" name='city' value={props.info.city} onChange = {props.change} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter City"/>
      </div> 
      

      
      {/* <div className="form-group" style={{ margin: '0 auto' }}>
      <button type="submit" className="btn btn-primary">Submit</button>
      </div>  */}
    </form>
    </div>
    </>
  )
}
