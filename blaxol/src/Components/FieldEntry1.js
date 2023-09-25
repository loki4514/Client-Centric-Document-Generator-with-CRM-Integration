import React,{useState} from 'react'
import SubForm from './SubForm';

export default function FieldEntry1(props) {
    const [input, setinput] = useState({heading : "", para : "",sub : [],para1 : " "})
    const [AddSubHeadPara, setAddSubHeadPara] = useState(false)

    const submit = (e) => {
        e.preventDefault();
        props.setagenda([...props.agenda,input]) // adding elements old and new array
        setinput({heading : "", para : "", sub : [], para1 : " "}) // again
        props.setshowform1(false)
    }

    const onchange = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }

    const deltesubmit = (e) => {
        e.preventDefault();
        props.setshowform1(false)
        setinput({heading : "",para : "", sub : [] , para1 : " " });
    }

    return (
        <div className='subsection'>
            <form onSubmit={submit}>
            
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1"></label>
                    <input type="text" name='heading' value={input.heading} onChange={onchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Word Document Heading" required />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1"></label>
                    <textarea type="text" name='para' value={input.para} onChange={onchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Word Document Paragraph" required />
                </div>
                <br></br>
                
                {input.sub? input.sub.map((subitem) => {
                    return <div>
                        <h3>{subitem.heading}</h3>
                        <br/>
                        <p>{subitem.para}</p>
                        <br/>
                    </div>
                }):null}
                <br/>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1"></label>
                    <textarea type="text" name='para1' value={input.para1} onChange={onchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Word Document Paragraph" required />
                </div>
                <br/>
                <br/>
                <br/>
                {AddSubHeadPara ? <SubForm input = {input} setinput = {setinput} setAddSubHeadPara = {setAddSubHeadPara} /> : null }
                {console.log('AddSubHeadPara:', AddSubHeadPara)}
                {console.log('input.sub:', input.sub)}
                <div className='form-group'>
                <button type="button" onClick={() => setAddSubHeadPara(true)} className="btn btn-primary">Add Subheading and SubPara</button>
                
                
                <br />
                <div className='form-group'>
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <br/>
                <div className='form-group'>
                <button className="btn btn-danger" onClick={deltesubmit}>Delete Section</button>
                </div>
            </div>
            </form>
        </div>
    )
}