import React, { useState } from 'react'
import FieldEntry from './FieldEntry'
import EditForm from './EditForm'

export default function Proposal1_body(props) {
  // const [agenda,setagenda] = useState([])

  const [showform,setshowform] = useState(false)
  const [showeditform,setshoweditform] = useState(false) 
  const [i, seti] = useState(null)
  
  const click = () => {
    setshowform(true)
    
  }
  // const edit_item = (i) => {
  //     props.agenda[i]
  // }
  const delete_item = (i) => {
    const updatedAgenda = props.agenda.filter((item, index) => index !== i); // delete here and send remain back
    props.setagenda(updatedAgenda);

  }

  const edit_item = (i) => {
    console.log("i ain't iing",i)
    console.log(props.agenda[i])
    seti(i)
    setshoweditform(true)

  }





  return (
    <>

<div className='doc-buttons'>
    <button onClick={click}>Generates Heading and Paragraph</button>
    <br></br>
    <button >Generates Heading, Sub-Heading and Paragraph</button>
</div>
    {props.agenda.map((item,i) => {

      return <div className='actual-document'>
        <div className='for-border'>
        <div>
        <h3>{i+1.0}.0 {item.heading}</h3>
        <br></br>
        <p>{item.para}</p>
        </div>
        <br/>
        
        <button style={{backgroundColor : '#A2FF86'}} onClick={() => edit_item(i)}>Edit</button>
        <button style={{backgroundColor : '#F24C3D'}}  onClick={() => delete_item(i)}>Delete</button>
      </div>
      </div>
    })}
    {console.log(props.agenda)}
      {showform ? <FieldEntry setagenda={props.setagenda} setshowform={setshowform} agenda = {props.agenda}/>:null}
      {showeditform ? <EditForm setagenda={props.setagenda}  setshoweditform={setshoweditform} agenda={props.agenda} i={i}/>: null}
    </>
  )
}
