import React,{useState} from 'react'
import Subsection from './Subsesction'
import SubsectionEdit from './SubsectionEdit'

export default function Proposal1_last(props) {
  const [input, setinput] = useState({para : "" , sub : [],para1 : ""})
  const [showform,setshowform] = useState(false)
  const [AddSubHeadPara, setAddSubHeadPara] = useState(false)
  const [showeditform,setshoweditform] = useState(false)
  const [i, seti] = useState(null)

    const submit = (e) => {
        e.preventDefault();
        props.setagenda1([...props.agenda1,input]) // adding elements old and new array
        setinput({para : "", sub : [],para1 : ""}) // again
        setshowform(false)
    }

    const onchange = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }

    const deltesubmit = (e) => {
        e.preventDefault();
        setshowform(false)
        setinput({ para : "", sub : [],para1 : ""});
    }
    const click = () => {
      setshowform(true)
    }

    const delete_item = (i) => {
      const updatedAgenda = props.agenda1.filter((item, index) => index !== i); // delete here and send remain back
      props.setagenda1(updatedAgenda);
  
    }
  
    const edit_item = (i) => {
      setshoweditform(true)
      seti(i)
      
    }


    return (
      <>
      <div className='doc-buttons'>
        <button onClick={click}>Generates Heading, Sub-Heading and Paragraph</button>
    </div>
    {props.agenda1.map((item,i) => {

    return <div className='actual-document'>
        <div className='for-border'>
          <div>
          <h2> {item.heading}</h2>
          <br></br>
          <p>{item.para ?  item.para:null}</p>
          <br>
          </br>
          <h4>{item.sub ? item.sub.map((subitem) => {
         return <div>
          <h3>{subitem.heading}</h3>
          <br></br>
          <p style={{fontWeight : "lighter"}}>{subitem.para}</p>
          <br/>
          <br></br>
        </div>})  : null}</h4>
        <p>{item. para1? item.para1:null}</p>
        </div>
        <br/>
  
          <button style={{backgroundColor : '#A2FF86'}} onClick={() => edit_item(i)}>Edit</button>
          <button style={{backgroundColor : '#F24C3D'}}  onClick={() => delete_item(i)}>Delete</button>
</div>
</div>
})}
    
    

    <br/>

    {showform ?   <div className='subsection'>
            <form onSubmit={submit}>
            
                {/* <div className="form-group">
                    <label htmlFor="exampleInputEmail1"></label>
                    <input type="text" name='heading' value={input.heading} onChange={onchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Word Document Heading" required />
                </div> */}
                <br></br>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1"></label>
                    <textarea type="text" name='para' value={input.para} onChange={onchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Word Document Paragraph" required />
                </div>
                <br></br>
                <br/>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1"></label>
                    <textarea type="text" name='para1' value={input.para1} onChange={onchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Word Document Last Paragraph" required />
                </div>
                <br />
                {input.sub? input.sub.map((subitem) => {
                    return <div>
                        <h3>{subitem.heading}</h3>
                        <br/>
                        <p>{subitem.para}</p>
                        <br/>
                    </div>
                }):null}
                <br/>
                <br/>
                
                
                {AddSubHeadPara ? <Subsection input = {input} setinput = {setinput} setAddSubHeadPara = {setAddSubHeadPara} /> : null }
                {console.log('AddSubHeadPara:', AddSubHeadPara)}
                {console.log('input.sub:', input.sub)}
                <div className='form-group'>
                <button type="button" onClick={() => setAddSubHeadPara(true)} className="btn btn-primary">Add Subheading and SubPara</button>
                
                <br/>
                <br/>
                <div className='form-group'>
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <br/>

                <div className='form-group'>
                  <button className="btn btn-danger" onClick={deltesubmit}>Delete Section</button>
                </div>
            </div>
            </form>
        </div> : null }
        <br/>
        <br/>
        {showeditform ? <SubsectionEdit input = {input} agenda1 = {props.agenda1} setagenda1 = {props.setagenda1} setinput = {setinput} i = {i} setshoweditform = {setshoweditform} /> : null}
        {/* <div className="form-group" style={{ margin: '0 auto' }}>
          <button onClick={props.handleSubmit1}>Preview Document</button>

        </div> */}
        <br>
        </br>
        <div className="form-group" style={{ margin: '0 auto' }}>
          <button type="submit" onClick={props.handleSubmit} id="generateButton" className="btn btn-primary"> Generate Word Document</button>
        </div>

        </>
    )
}