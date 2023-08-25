import React,{useState,useEffect} from 'react'

export default function SubsectionEdit(props) {
  const [input, setinput] = useState({ heading: "" , para : "", sub: [],para1: ""})
  // console.log("hello everynyan",props.agenda[props.i])
  // const [index,setindex] = useState()

  useEffect(() => {
      setinput({
        heading: props.agenda1[props.i].heading, 
        para: props.agenda1[props.i].para,
        sub : props.agenda1[props.i].sub,
        para1 : props.agenda1[props.i].para1
      });
    }, [props.i, props.agenda1]);

  const submit = (e) => {
      e.preventDefault();
      const updatedAgenda = [
          ...props.agenda1.slice(0, props.i),
          input,
          ...props.agenda1.slice(props.i + 1),
      ];
      props.setagenda1(updatedAgenda);
      setinput({ heading: "" ,para:"", sub: [],para1:""});
      props.setshoweditform(false);
  }
  
  const onSubChange = (e, subIndex) => {
      const updatedSub = input.sub.map((subItem, idx) => {
        if (idx === subIndex) {
          return { ...subItem, [e.target.name]: e.target.value };
        }
        return subItem;
      });
  
      setinput((prevInput) => ({
        ...prevInput,
        sub: updatedSub,
      }));
    };


return (
  <div>
     <div className='doc-body'>
          <form onSubmit={submit}>
              
              <div className="form-group">
                  <label htmlFor="exampleInputEmail1"></label>
                  <input type="text" name='heading' value={input.heading} onChange={(e) => setinput({ ...input, heading: e.target.value })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Word Document Heading" required />
              </div>
              <div className="form-group">
                  <label htmlFor="exampleInputEmail1"></label>
                  <textarea type="text" name='para' value={input.para} onChange={(e) => setinput({ ...input, para: e.target.value })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Word Document Heading" required />
              </div>

              <br></br>
              {input.sub? input.sub.map((subitem, subIndex) => {
                  return <div className='subsection1'>
                  <br/>
                  <div className='form-group'>
                      <input name = "heading" value = {subitem.heading} onChange={(e) => onSubChange(e, subIndex)} ></input>
                  </div>
                  <br/>
                  <div className='Letter'>
                      <textarea name = "para" value = {subitem.para} onChange={(e) => onSubChange(e, subIndex)} ></textarea>
                  </div>
                  </div>
                  
              }):"nothing to print"}
          {console.log("inside the array of sub won't work",input.sub)}
              {/* <div className="Letter" >
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
              <br></br> */}
              <br></br>
              <div className="form-group">
                  <label htmlFor="exampleInputEmail1"></label>
                  <textarea type="text" name='para1' value={input.para1} onChange={(e) => setinput({ ...input, para1: e.target.value })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Word Document Heading" required />
              </div>
              <br />
              <div className='form-group'>
              <button type="submit" className="btn btn-primary">Submit</button>
              </div>
              <br/>
          

          </form>
      </div>
  </div>
)
}

