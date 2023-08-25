import React, { useState } from 'react'
import LetterTable from './LetterTable'

export default function Proposal1_letter(props) {

  const [table, settable] = useState([])
  // const [tables, settables] = useState([])
  const [showtable, setshowtable] = useState(false)
  const [showcol, setshowcol] = useState(false)
  console.log("primary table", table)
  console.log("this is multiple tables", props.tables)

  
  const click = () => {
    setshowtable(true)
    setshowcol(true)

  }

  const deleteTable = (e, i) => {
    e.preventDefault();
    const updatedTables = [...props.tables];
    updatedTables.splice(i, 1);
    props.settables(updatedTables);

  };
  return (
    
    <div>



      {/* <div className='container-admin'> */}
      <br />
      <h2 style={{ textAlign: "center" }}>Proposal Letter</h2>
      <br></br>
      <div className='doc-buttons'>
        <button onClick={click}>Add Tables</button>
      </div>
      <form onSubmit={props.handleSubmit}>



        <br />
        <div className="Letter" >
          <textarea type="text" cols={100} rows={8} style={{ textAlign: 'justify' }}
            className="form-control" name='letter' value={props.info.letter} onChange={props.change} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Letter Here" />
        </div>
      </form>
      {/* </div> */}
      <br />
      

      <br />

      {showcol ? <div className='tables'>
        <table className="table">
          <thead className="thead-light">
            <tr className="table-header">
              <th scope='col'>SLNo.</th>
              <th scope="col">Activity</th>
              <th scope="col">Timeline</th>
              <th scope="col">Professional Fee</th>
              <th scope="col">Reimbursement</th>
              <th scope="col">Government Fees</th>
            </tr>
          </thead>
          <tbody>
            {table.map((item, index) => (
              <tr key={index} className="table-header">
                <td scope="row">{index + 1}</td>
                <td>{item.activity}</td>
                <td>{item.timeline}</td>
                <td>{item.prof_fee}</td>
                <td>{item.reimbursment_fee}</td>
                <td>{item.gov_fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> : null}

      <br />
      <div className='tables'>
        {props.tables.map((childtable, tableIndex) => (
          <div key={tableIndex}>
          <table key={tableIndex} className="table">
            <thead className="thead-light">
              <tr className="table-header">
                <th scope='col' className="table-header">SLNo.</th>
                <th scope="col" className="table-header">Activity</th>
                <th scope="col" className="table-header">Timeline</th>
                <th scope="col" className="table-header">Professional Fee</th>
                <th scope="col" className="table-header">Reimbursement</th>
                <th scope="col" className="table-header">Government Fees</th>
              </tr>
            </thead>
            <tbody>
              {childtable ? childtable.map((item, index) => (
                <tr key={index} className="table-header">
                  <td scope="row">{index + 1}</td>
                  <td>{item.activity}</td>
                  <td>{item.timeline}</td>
                  <td>{item.prof_fee}</td>
                  <td>{item.reimbursment_fee}</td>
                  <td>{item.gov_fee}</td>
                </tr>
                
              )) : null}
            </tbody>
          </table>
          <div>
          <button onClick={(e) => deleteTable(e, tableIndex)} > Delete Table</button>
        </div>
        </div>
        ))}
      </div>
      
  

      {showtable ? <LetterTable table={table} 
      settables = {props.settables} 
      tables={props.tables} 
      settable={settable} 
      showcol = {showcol}
      setshowcol = {setshowcol}
      setshowtable={setshowtable} 
       /> : null}


</div>

    
  )
}
