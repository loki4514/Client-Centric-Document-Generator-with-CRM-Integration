import React,{useState,useEffect} from 'react'

export default function EditForm1(props) {
    const [input, setinput] = useState({ heading: "", para: "" , Sub: [{heading1: '',para1: ''}]})
    // console.log("hello everynyan",props.agenda[props.i])

    useEffect(() => {
        setinput({
          heading: props.agenda[props.i].heading,
          para: props.agenda[props.i].para,
          heading1 : props.agenda[props.i].heading1,
          para1: props.agenda[props.i].para1
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
        setinput({ heading: "", para: "" , Sub: [{heading1: '',para1: ''}]});
        props.setshoweditform1(false);
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
            

            </form>
        </div>
    </div>
  )
}
