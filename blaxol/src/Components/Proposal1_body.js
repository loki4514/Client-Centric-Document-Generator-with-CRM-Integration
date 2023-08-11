import React, { useState,useLocation } from 'react'
import FieldEntry from './FieldEntry'
import EditForm from './EditForm'
import FieldEntry1 from './FieldEntry1'
import EditForm1 from './EditForm1'
import Subsection from './Subsesction'
import SubsectionEdit from './SubsectionEdit'

export default function Proposal1_body(props) {
  // const [agenda,setagenda] = useState([])

  // let location = useLocation()
  const [showform,setshowform] = useState(false)
  const [showform1,setshowform1] = useState(false)
  const [showeditform,setshoweditform] = useState(false) 
  const [showeditform1,setshoweditform1] = useState(false) 
  const [showform2,setshowform2] = useState(false)
  const [showeditform2,setshoweditform2] = useState(false) 
  const [i, seti] = useState(null)
  
  const click = () => {
    setshowform(true)
    // setshowform1(false);
    
  }
  // const edit_item = (i) => {
  //     props.agenda[i]
  // }
  const click1 = () => {
    setshowform1(true)
    // setshowform(false)
    
  }

  const click2 = () => {
    setshowform2(true)
  }

  const delete_item = (i) => {
    const updatedAgenda = props.agenda.filter((item, index) => index !== i); // delete here and send remain back
    props.setagenda(updatedAgenda);

  }

  const edit_item = (i) => {
    console.log("i ain't iing",i)
    console.log(props.agenda[i])
    seti(i)
    
    if (props.agenda[i].hasOwnProperty('Sub')) {
      setshoweditform1(true)
      setshoweditform(false)
      setshoweditform2(false)
    }

    else if (props.agenda[i].hasOwnProperty('Sub1')) {
      setshoweditform1(false)
      setshoweditform(false)
      setshoweditform2(true)
    }

    else {
      setshoweditform(true) 
      setshoweditform1(false)
      setshoweditform2(false)

    }


  }





  return (
    <>

<div className='doc-buttons'>
    <button onClick={click}>Generates Heading and Paragraph</button>
    <br></br>
    <button onClick={click1}>Generates Heading, Sub-Heading and Paragraph</button>
    <br></br>
    <button onClick={click2}>Generates Sub-Heading and Sub-Paragraph</button>
</div>
    {props.agenda.map((item,i) => {

      return <div className='actual-document'>
        <div className='for-border'>
        <div>
        <h2> {item.heading}</h2>
        <br></br>
        <p>{item.para}</p>
        <h4> {item.heading1}</h4>
        <br></br>
        <p>{item.para1}</p>
        <br></br>
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
      {showform1 ? <FieldEntry1 setagenda={props.setagenda} setshowform1={setshowform1} agenda = {props.agenda}/>:null}
      {showeditform1 ?<EditForm1 setagenda={props.setagenda}  setshoweditform1={setshoweditform1} agenda={props.agenda} i={i}/>: null}
      {showform2 ?  <Subsection setagenda={props.setagenda} setshowform2={setshowform2} agenda = {props.agenda}/>:null}
      {showeditform2 ? <SubsectionEdit setagenda={props.setagenda}  setshoweditform2={setshoweditform2} agenda={props.agenda} i={i}/>: null}
    </>
  )
} 
