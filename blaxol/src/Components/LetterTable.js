import React, { useState, useEffect } from 'react'

export default function LetterTable(props) {

  const [content, setconent] = useState({ activity: "", timeline: "", prof_fee: "", reimbursment_fee: "", gov_fee: "" })
  const [sample, setsample] = useState()

  const addRow = () => {
    console.log("i have been called")
    console.log(props.table)
    props.settable([...props.table, content]);
    setconent({
      activity: '',
      timeline: '',
      prof_fee: '',
      reimbursment_fee: '',
      gov_fee: ''
    });
  };

  const handle = (e) => {
    e.preventDefault()
    // props.settable([...props.table,content])

    // if (content.activity !== '' || content.timeline !== '' || content.prof_fee !== '' || content.reimbursment_fee !== '' || content.gov_fee  !== '') { // Check if any content is present
    //     addRow();
    //     console.log("yes it is ")
    //     }
    // console.log("tables",props.tables)
    // console.log("table",props.table)
    // console.log(content)

    // props.settables([...props.tables,props.table]);
    // // props.settables([...props.tables,props.table])
    // // props.submittable()

    // // props.settables([...props.tables, props.table]) // 

    // // setconent({activity:"",timeline:"",prof_fee:"",reimbursment_fee: "",gov_fee : ""})
    // props.settable([])
    // props.setshowtable(false)
    if (props.table.length > 0) {
      props.settables([...props.tables, props.table]);
      props.settable([]);
      props.setshowtable(false);
      props.setshowcol(false)
    }
  };


  const onchange = (e) => {
    setconent({ ...content, [e.target.name]: e.target.value })
  }

  // useEffect(() => {
  //   // This code will run when `props.table` changes
  //   if (props.table.length > 0) {
  //     props.settables([...props.tables, props.table]);
  //     props.settable([]);
  //     props.setshowtable(false);
  //   }
  // }, []);



  return (
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
          { }
          <tr className='table-header'>

            <td ><input type="text" name="activity" value={content.activity} onChange={onchange} placeholder="Enter activity" /></td>
            <td><input type="text" name="timeline" value={content.timeline} onChange={onchange} placeholder="Enter timeline" /></td>
            <td><input type="text" name="prof_fee" value={content.prof_fee} onChange={onchange} placeholder="Enter professional fee" /></td>
            <td><input type="text" name="reimbursment_fee" value={content.reimbursment_fee} onChange={onchange} placeholder="Enter reimbursement" /></td>
            <td><input type="text" name="gov_fee" value={content.gov_fee} onChange={onchange} placeholder="Enter government fees" /></td>
          </tr>
        </tbody>

      </table>

      <div className='submit-buttons'>
        <button onClick={addRow}>Add Content</button>
        <br />
        <button onClick={handle}> Submit Table</button>
      </div>
    </div>


  )
}

