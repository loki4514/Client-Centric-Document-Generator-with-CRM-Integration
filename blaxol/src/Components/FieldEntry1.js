import React,{useState} from 'react'

export default function FieldEntry1(props) {
    const [input, setinput] = useState({  heading: "", para: "" , Sub: [{heading1: '',para1: ''}]})

    const submit = (e) => {
        e.preventDefault();
        props.setagenda([...props.agenda,input]) // adding elements old and new array
        setinput({ heading: "", para: "" , Sub: [{heading1: '',para1: ''}]}) // again
        props.setshowform1(false)
    }

    const onchange = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }

    const deltesubmit = (e) => {
        e.preventDefault();
        props.setshowform1(false)
        setinput({  heading: "", para: "" , Sub: [{heading1: '',para1: ''}]});
    }

    return (
        <div className='doc-body'>
            <form onSubmit={submit}>
                
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1"></label>
                    <input type="text" name='heading' value={input.heading} onChange={onchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Word Document Heading" required />
                </div>
                <br></br>
                <div className="Letter" >
                    <textarea type="text" cols={100} rows={8} style={{ textAlign: 'justify' }}
                        className="form-control" name='para' value={input.para} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Word Document Body" />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1"></label>
                    <input type="text" name='heading1' value={input.heading1} onChange={onchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Word Document Sub Heading" required />
                </div>
                {console.log("this is sub",input.Sub)}
                <br></br>
                <div className="Letter" >
                    <textarea type="text" cols={100} rows={8} style={{ textAlign: 'justify' }}
                        className="form-control" name='para1' value={input.para1} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Word Document Sub Body" />
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