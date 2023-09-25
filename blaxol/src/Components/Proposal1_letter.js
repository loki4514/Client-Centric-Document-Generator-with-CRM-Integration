import React, { useState } from 'react'
import LetterTable from './LetterTable'

export default function Proposal1_letter(props) {

  const [content, setconent] = useState({ activity: "", timeline: "", prof_fee: "", reimbursment_fee: "", gov_fee: "" })
  const [sample, setsample] = useState()

  const addRow = () => {
    console.log("i have been called")
    console.log(props.tables)
    props.settables([...props.tables, content]);
    setconent({
      activity: '',
      timeline: '',
      prof_fee: '',
      reimbursment_fee: '',
      gov_fee: ''
    });
  };

  const onchange = (e) => {
    setconent({ ...content, [e.target.name]: e.target.value })
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
      {/* <div className='doc-buttons'>
        <button onClick={click}>Add Tables</button>
      </div> */}
      <form >



        <br />
        <div className="Letter" >
          <textarea type="text" cols={100} rows={8} style={{ textAlign: 'justify' }}
            className="form-control" name='letter_half1' value={props.info.letter_half1} onChange={props.change} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your First Half of Letter Here" />
        </div>

        <br />


        <div className='tables'>
        
          <div>
          <table className="table">
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
              {props.tables.map((item, index) => (
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
          
        </div>
      </div>
        <br />


        <div>
          <table class="table">
            <thead class="thead-light">
              <tr className='table-header'>
                <th scope="col">Activity</th>
                <th scope="col">Timeline</th>
                <th scope="col">Professional Fee</th>
                <th scope="col">Reimbursement</th>
                <th scope="col">Government Fees</th>
              </tr>
            </thead>
            <tbody>

              <tr className='table-header'>

                <td ><input type="text" name="activity" value={content.activity} onChange={onchange} placeholder="Enter activity" required /></td>
                <td><input type="text" name="timeline" value={content.timeline} onChange={onchange} placeholder="Enter timeline" required /></td>
                <td><input type="text" name="prof_fee" value={content.prof_fee} onChange={onchange} placeholder="Enter professional fee" required /></td>
                <td><input type="text" name="reimbursment_fee" value={content.reimbursment_fee} onChange={onchange} placeholder="Enter reimbursement" required /></td>
                <td><input type="text" name="gov_fee" value={content.gov_fee} onChange={onchange} placeholder="Enter government fees" required /></td>
              </tr>
            </tbody>

          </table>

          <div className='submit-buttons'>
            <button onClick={addRow}>Add Content</button>
            <br />

          </div>
        </div>













        <br />


        <div className="Letter" >
          <textarea type="text" cols={100} rows={8} style={{ textAlign: 'justify' }}
            className="form-control" name='letter_half2' value={props.info.letter_half2} onChange={props.change} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Second half of Letter Here" />
        </div>
      </form>
      {/* </div> */}
      <br />


      <br />





    </div>


  )
}
