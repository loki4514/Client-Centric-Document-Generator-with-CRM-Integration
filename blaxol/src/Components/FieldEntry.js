import React,{useState} from 'react'

export default function FieldEntry(props) {
    const [input, setinput] = useState({ heading: "", para: "" })

    const submit = (e) => {
        e.preventDefault();
        props.setagenda([...props.agenda,input]) // adding elements old and new array
        setinput({ heading: "", para: "" }) // again
        props.setshowform(false)
    }

    const onchange = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">RFP</label>
                    <input type="text" name='heading' value={input.heading} onChange={onchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter RFP" required />
                </div>
                <div className="Letter" >
                    <textarea type="text" cols={100} rows={8} style={{ textAlign: 'justify' }}
                        className="form-control" name='para' value={input.para} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Letter Here" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

