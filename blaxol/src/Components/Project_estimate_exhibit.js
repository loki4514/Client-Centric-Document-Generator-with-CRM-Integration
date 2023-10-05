import React, { useState } from 'react'

export default function Project_estimate_exhibit(props) {
    const [content, setconent] = useState({ name: "", designation: "", organisation: "", email: "", mobile: "" })
    console.log(props.tablecontent1)
    const addRow = () => {
        if (!content.name || !content.designation || !content.organisation || !content.email || !content.mobile) {
            return; // Exit function if any required field is empty
        }

        // Add content to the array
        props.settablecontent1([...props.tablecontent1, content]);

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
        <div>

            <br />
            <h1 style={{ textAlign: "center" }} >Exhibit A Form </h1>
            <br />
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
                    {props.tablecontent1.map((item) => (
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

                            <td ><input type="text" name="name" value={content.name} onChange={onchange} placeholder="Enter activity" required /></td>
                            <td><input type="text" name="designation" value={content.designation} onChange={onchange} placeholder="Enter timeline" required /></td>
                            <td><input type="text" name="organisation" value={content.organisation} onChange={onchange} placeholder="Enter professional fee" required /></td>
                            <td><input type="text" name="email" value={content.email} onChange={onchange} placeholder="Enter reimbursement" required /></td>
                            <td><input type="text" name="mobile" value={content.mobile} onChange={onchange} placeholder="Enter government fees" /></td>
                        </tr>
                    </tbody>

                </table>


                <div className='submit-buttons'>
                    <button onClick={addRow}>Add Content</button>
                    <br />
                    {/* <button onClick={handle}> Submit Table</button> */}
                </div>
            </form>

            <div className="form-group" style={{ margin: '0 auto' }}>
          <button type="submit" onClick={props.handleSubmit} id="generateButton" className="btn btn-primary"> Generate Word Document</button>
        </div>





        </div>
    )
}
