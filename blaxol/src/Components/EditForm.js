import React,{useState,useEffect} from 'react'

export default function EditForm(props) {
    const [input, setinput] = useState({ heading: "", para: "" })
    console.log("hello everynyan",props.agenda[props.i])

    useEffect(() => {
        setinput({
          heading: props.agenda[props.i].heading,
          para: props.agenda[props.i].para,
        });
      }, [props.i, props.agenda]);

    const submit = (e) => {
        e.preventDefault();
        const updatedAgenda = [
            ...props.agenda.slice(0, props.i),
            input,
            ...props.agenda.slice(props.i + 1),
        ];
        props.setagenda(updatedAgenda);
        setinput({ heading: '', para: '' });
        props.setshoweditform(false);
    }
    
    const onchange = (e) => {
        
        console.log("prop ain't proping",props.agenda[props.i])
        setinput({...input,[e.target.name]:e.target.value})
        
    }
  return (
    <div>
       <div className='doc-body'>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1"></label>
                    <input type="text" name='heading' value={input.heading} onChange={onchange} className="form-control"  aria-describedby="emailHelp" placeholder="Enter RFP" required />
                </div>
                <br></br>
                <div className="Letter" >
                    <textarea type="text" cols={100} rows={8} style={{ textAlign: 'justify' }}
                        className="form-control" name='para' value={input.para} onChange={onchange} aria-describedby="emailHelp" placeholder="Enter Your Letter Here" />
                </div>
                <br></br>
                <div className='form-group'>
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}
