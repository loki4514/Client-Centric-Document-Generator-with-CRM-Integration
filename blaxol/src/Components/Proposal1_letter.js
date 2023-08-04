import React, { useState } from 'react'

export default function Proposal1_letter(props) {

    
  return (
    <>

{/* <div className='container-admin'> */}
      <form onSubmit={props.handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Proposal Letter</h2>
        <br></br>
        <div className="Letter" >
          <textarea type="text" cols={100} rows={8} style={{textAlign:'justify'}}
           className="form-control" name='letter' value={props.info.letter} onChange={props.change}  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Letter Here" />
        </div>
      </form>
    {/* </div> */}
      
    </>
  )
}
