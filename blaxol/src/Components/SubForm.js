import React,{useState} from 'react'

export default function SubForm(props) {
    const [subinput, setsubinput] = useState({ heading: "", para: "" })

    const submit = (e) => {
        console.log("swear to god i won't work")
        e.preventDefault();
        
        // props.setinput({...props.input,sub : {...props.input.sub,subinput}}) // adding elements old and new array
        props.setinput({
            ...props.input,
            sub: [...props.input.sub,subinput],
          });
        setsubinput({ heading: "", para: "" }) // again
        props.setAddSubHeadPara(false)
    }

    const onchange = (e) => {
        
        setsubinput({ ...subinput, [e.target.name]: e.target.value })
    }

    const deltesubmit = (e) => {
        e.preventDefault();
        props.setAddSubHeadPara(false)
        setsubinput({ heading: '', para: '' });
    }
  return (
    <div>
      <div className='doc-body'>
            <form >
                
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1"></label>
                    <input type="text" name='heading' value={subinput.heading} onChange={onchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Word Document Heading" />
                </div>
                <br></br>
                <div className="Letter" >
                    <textarea type="text" cols={100} rows={8} style={{ textAlign: 'justify' }}
                        className="form-control" name='para' value={subinput.para} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Word Document Body" />
                </div>
                <br></br>
                <div className='form-group'>
                <button  onClick={submit} className="btn btn-primary">Submit Sub-Heading & Para</button>
                </div>
                <br></br>
                <div className='form-group'>
                <button className="btn btn-danger" onClick={deltesubmit}>Delete Sub-Heading & Para</button>
                </div>
                <br/>
            </form>
        </div>
    </div>
  )
}

