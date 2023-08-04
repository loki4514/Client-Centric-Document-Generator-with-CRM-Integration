import React, { useState } from 'react'
import FieldEntry from './FieldEntry'

export default function Proposal1_body(props) {
  // const [agenda,setagenda] = useState([])

  const [showform,setshowform] = useState(false)
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



  return (
    <>
    <button onClick={click}>Adds Heading and Paragraph</button>
    {props.agenda.map((item,i) => {

      return <div>
        {/* <button onClick={() => edit_item(i)}>edit</button> */}
        <button onClick={() => delete_item(i)}>delete</button>
        <h2>{item.heading}</h2>
        <p>{item.para}</p>
      </div>
    })}
      {showform ? <FieldEntry setagenda={props.setagenda} setshowform={setshowform} agenda = {props.agenda}/>:null}
    </>
  )
}
