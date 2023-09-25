import React, { useState } from 'react';
import CustomTables from './CustomTables';

export default function Proposal1_Exhibit(props) {
  const [content, setconent] = useState({ name: "", designation: "", organisation: "", email: "", mobile: "" })
    console.log(props.tablecontent)
    const addRow = () => {
        if (!content.name || !content.designation || !content.organisation || !content.email || !content.mobile) {
            return; // Exit function if any required field is empty
        }

        // Add content to the array
        props.settablecontent([...props.tablecontent, content]);

        // Reset content state
        setconent({
            name: '',
            designation: '',
            organisation: '',
            email: '',
            mobile: ''
        });
    };

    const onchange = (e) => {
        setconent({ ...content, [e.target.name]: e.target.value })
    }

  return (
    <>
      <div>
        <br />
        <h2 style={{ textAlign: 'center' }}>Exhibit A Form</h2>
        <br />
      </div>
      <table class="table">
                <thead class="thead-light">
                    <tr className='table-header'>
                        <th scope="col">Name</th>
                        <th scope="col">Designation</th>
                        <th scope="col">Organisation</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile</th>
                    </tr>
                </thead>
                <tbody>
                    {props.tablecontent.map((item) => (
                        <tr className="table-header">
                            {/* <td scope="row">{index + 1}</td> */}
                            <td>{item.name}</td>
                            <td>{item.designation}</td>
                            <td>{item.organisation}</td>
                            <td>{item.email}</td>
                            <td>{item.mobile}</td>
                        </tr>

                    ))}
                </tbody>

            </table>



            <br />
            <form>
                <table class="table">
                    <thead class="thead-light">
                        <tr className='table-header'>
                            <th scope="col">Name</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Organisation</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr className='table-header'>

                            <td ><input type="text" name="name" value={content.name} onChange={onchange} placeholder="Enter Name" required /></td>
                            <td><input type="text" name="designation" value={content.designation} onChange={onchange} placeholder="Enter Designation" required /></td>
                            <td><input type="text" name="organisation" value={content.organisation} onChange={onchange} placeholder="Enter Organisation" required /></td>
                            <td><input type="text" name="email" value={content.email} onChange={onchange} placeholder="Enter Email" required /></td>
                            <td><input type="text" name="mobile" value={content.mobile} onChange={onchange} placeholder="Enter Mobile Number" /></td>
                        </tr>
                    </tbody>

                </table>


                <div className='submit-buttons'>
                    <button onClick={addRow}>Add Content</button>
                    <br />
                    {/* <button onClick={handle}> Submit Table</button> */}
                </div>
            </form>
    </>
  );
}
