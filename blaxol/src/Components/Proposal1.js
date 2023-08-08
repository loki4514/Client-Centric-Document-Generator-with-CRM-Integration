import React, { useContext, useEffect,useState } from 'react';
import Proposal1_FrontPage from './Proposal1_FrontPage';
import Proposal1_letter from './Proposal1_letter';
import Proposal1_body from './Proposal1_body';
import Proposal1_last from './Proposal1_last';

// import noteContext from '../context/temp/noteContext';


export default function Proposal1(props) {
  const [page,setpage] = useState(0);
  

  // handling page 

  const handlepage = () => {
    if (page===0){
      return <Proposal1_FrontPage info = {info} handleSubmit = {handleSubmit} change = {change}/>
  }
  else if (page === 1){
      return <Proposal1_letter info = {info} handleSubmit = {handleSubmit} change = {change}/>
  }
  else if (page === 2){
    return <Proposal1_body info = {info} agenda = {agenda} setagenda = {setagenda} handleSubmit = {handleSubmit} change = {change}/>
  }
  else {
    return <Proposal1_last info = {info} handleSubmit = {handleSubmit} change = {change}/>
  }
  }

  const [info,setInfo] = useState(
    {client_name:"",project_name:"",spoc:"",
    rfp:"",date:"",district:"",
    city:"",letter:""})
  const [agenda,setagenda] = useState([])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      info: info,
      agenda: agenda
    };
    try {
      const response = await fetch('http://localhost:3000/api/simple/invoice1',{
      method : 'POST',
      headers : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }) 
    console.log(data)
    if (response.ok) {
      props.showAlert('Successfully generated the document.', 'success');
      window.location.reload()
      // You may handle the response data here if needed
    } else {
      // Handle the case when the response is not OK
      props.showAlert('Failed to generate the document.', 'danger');
    }
  }
    catch(error) {
      console.log(error)
    }
  }

const change = async (e) => {
  console.log("in change in proposal",agenda)
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
    // setagenda({...agenda,[e.target.name]:[e.traget.value]})

    setdisable()
  
    if (name === 'rfp') {
      try {
        const response = await fetch('http://localhost:3000/api/simple/getrfdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rfp: value }), // Sends only the rfp value
        });
  
        if (response.ok) {
          const rfpData = await response.json();
          setInfo({
            ...info,
            rfp : rfpData.rfp,
            client_name: rfpData.customer_name,
            project_name: rfpData.call_sign,
            spoc: rfpData.spoc,
          });
        } else {
          console.log('RFP data not found');
          // Handle the case when the RFP data is not found
        }
      } catch (error) {
        console.log(error);
      }
    }
  };


  const [buttondis,setButttonDis] = useState(true)
  const setdisable = () => {
    console.log("hi")
    if (page === 0){
    if (info.client_name && info.rfp && info.date && info.city && info.district && info.spoc && info.project_name) {
      setButttonDis(false)
      
    }
    else {
      setButttonDis(true)
    }
  }
  }

  return (
    <>
    
      <div className='progressbar'>
        <div className='footer'></div>
        <div className='body'>{handlepage()}</div>
        
      {/* <div className="form-group">
        <label htmlFor="exampleInputEmail1">Letter</label>
        <textarea type="text" className="form-control" name='letter' value={info.letter} onChange = {change} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Letter Here"/>
      </div> */}
      <div className='footer'>
          <button
          disabled = {page===0}
          onClick={() =>{
            setpage((currPage) => currPage-1)
          }} 
          >Prev</button>
          <button
          disabled = {page===3 }
          onClick={() =>{
            setpage((currPage) => currPage+1)
          }} 
          >Next</button>
      </div>
      
      {/* <div className="form-group" style={{ margin: '0 auto' }}>
      <button type="submit" className="btn btn-primary">Submit</button>
      </div> */}
    
    </div>
    
        </>
  )
}
