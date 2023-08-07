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
    <button onClick={click}>Adds Heading and Paragraph</button>
    {props.agenda.map((item,i) => {

      return <div>
        <button onClick={() => edit_item(i)}>Edit</button>
        <button onClick={() => delete_item(i)}>Delete</button>
        <h2>{item.heading}</h2>
        <p>{item.para}</p>
      </div>
    })}
    {console.log(props.agenda)}
      {showform ? <FieldEntry setagenda={props.setagenda} setshowform={setshowform} agenda = {props.agenda}/>:null}
      {showeditform ? <EditForm setagenda={props.setagenda}  setshoweditform={setshoweditform} agenda={props.agenda} i={i}/>: null}
    </>
  )
}
