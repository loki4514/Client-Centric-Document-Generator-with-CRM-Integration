import React,{useState} from 'react'

export default function Subsection(props) {
    const [input, setinput] = useState({ Sub1: {heading2: '',para2: ''}})

    const submit = (e) => {
        e.preventDefault();
        props.setagenda([...props.agenda,input]) // adding elements old and new array
        setinput({  Sub1: {heading2: '',para2: ''}}) // again
        props.setshowform2(false)
    }

    const onchange = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }

    const deltesubmit = (e) => {
        e.preventDefault();
        props.setshowform2(false)
        setinput({ Sub1: {heading2: '',para2: ''}});
    }

    return (
        <div className='doc-body'>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1"></label>
                    <input type="text" name='heading2' value={input.heading2} onChange={onchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Word Document Sub Heading" required />
                </div>
                <br></br>
                <div className="Letter" >
                    <textarea type="text" cols={100} rows={8} style={{ textAlign: 'justify' }}
                        className="form-control" name='para2' value={input.para2} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Word Document Sub Body" />
                </div>
                <br></br>

                <div className='form-group'>
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <br/>
                <div className='form-group'>
                <button className="btn btn-danger" onClick={deltesubmit}>Delete Section</button>
                </div>

            </form>
        </div>
    )
}