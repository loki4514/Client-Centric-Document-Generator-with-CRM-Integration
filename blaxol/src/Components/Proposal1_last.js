import React from 'react'

export default function Proposal1_last(props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Proposal Letter</h2>
        <br></br>
        <div className="form-group" style={{ margin: '0 auto' }}>
      <button type="submit" className="btn btn-primary">Submit</button>
      </div>
      </form>
    </div>
  )
}
