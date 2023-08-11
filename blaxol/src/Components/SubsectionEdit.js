import React,{useState,useEffect} from 'react'

export default function SubsectionEdit(props) {
    const [input, setinput] = useState({Sub1: {heading2: '',para2: ''}})
    // console.log("hello everynyan",props.agenda[props.i])

    useEffect(() => {
        setinput({
          heading2 : props.agenda[props.i].heading2,
          para2 : props.agenda[props.i].para2
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
        setinput({ Sub1: {heading2: '',para2: ''}});
        props.setshoweditform2(false);
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
            

            </form>
        </div>
    </div>
  )
}
