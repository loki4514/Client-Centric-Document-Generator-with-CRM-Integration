import React, { useState } from 'react'


export default function Project_estimate_letter(props) {
    const [content, setconent] = useState({ activity: "", timeline: "", prof_fee: "", reimbursment_fee: "", gov_fee: "" })
  const [sample, setsample] = useState()
//   const capitalize = (word)=>{
//     if (word === 'danger'){
//       word = 'Error'
//     }
//     const lower = word.toLowerCase();
//     return lower.charAt(0).toUpperCase() + lower.slice(1);
// }

// const small_alert = (msg, type) => {
//     return (
//       <div className='alert'>
//         {props.alert && (
//           <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
//             <strong>{capitalize(type)}</strong> : {msg} 
//             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   }
  

  const addRow = () => {
    if (!content.activity || !content.timeline || !content.prof_fee || !content.reimbursment_fee) {
        
        return; // Exit function if any required field is empty
      }
    
      // Add content to the array
      props.settables1([...props.tables1, content]);
    
      // Reset content state
      setconent({
        activity: '',
        timeline: '',
        prof_fee: '',
        reimbursment_fee: '',
        gov_fee: ''
      });
  };

//   const handle = (e) => {
//     e.preventDefault()
//     // props.settable([...props.table,content])

//     // if (content.activity !== '' || content.timeline !== '' || content.prof_fee !== '' || content.reimbursment_fee !== '' || content.gov_fee  !== '') { // Check if any content is present
//     //     addRow();
//     //     console.log("yes it is ")
//     //     }
//     // console.log("tables",props.tables)
//     // console.log("table",props.table)
//     // console.log(content)

//     // props.settables([...props.tables,props.table]);
//     // // props.settables([...props.tables,props.table])
//     // // props.submittable()

//     // // props.settables([...props.tables, props.table]) // 

//     // // setconent({activity:"",timeline:"",prof_fee:"",reimbursment_fee: "",gov_fee : ""})
//     // props.settable([])
//     // props.setshowtable(false)
    
//       props.settables1([...props.tables1, props.tables1]);
//     //   props.settable([]);
//       props.setshowtable(false);
//       props.setshowcol(false)
//   };


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
      {/* <div className='container-admin'> */}
      <br />
      <h2 style={{ textAlign: "center" }}>Proposal Letter</h2>
      <div className="Letter" >
          <textarea type="text" cols={100} rows={8} style={{ textAlign: 'justify' }}
            className="form-control" name='letter_half1' value={props.info.letter_half1} onChange={props.change} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your First of  Letter Here" />
        </div>
      <br></br>
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
        {props.tables1.map((item, index) => (
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

        <br/>
      <div>
      <form>
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

            <td ><input type="text" name="activity" value={content.activity} onChange={onchange} placeholder="Enter activity" required/></td>
            <td><input type="text" name="timeline" value={content.timeline} onChange={onchange} placeholder="Enter timeline" required/></td>
            <td><input type="text" name="prof_fee" value={content.prof_fee} onChange={onchange} placeholder="Enter professional fee" required/></td>
            <td><input type="text" name="reimbursment_fee" value={content.reimbursment_fee} onChange={onchange} placeholder="Enter reimbursement" required/></td>
            <td><input type="text" name="gov_fee" value={content.gov_fee} onChange={onchange} placeholder="Enter government fees" /></td>
          </tr>
        </tbody>

      </table>
    

      <div className='submit-buttons'>
        <button onClick={addRow}>Add Content</button>
        <br />
        {/* <button onClick={handle}> Submit Table</button> */}
      </div>
</form>
      <br/>
      <div className="Letter" >
        <textarea type="text" cols={100} rows={8} style={{ textAlign: 'justify' }}
            className="form-control" name='letter_half2' value={props.info.letter_half2} onChange={props.change} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Second Half of  Letter Here" />
    </div>
    </div>

      
    </div>
  )
}
