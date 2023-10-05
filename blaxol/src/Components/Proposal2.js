
import React, {useState,useEffect } from 'react';
import Project_estimate_front from './Project_estimate_front';
import Project_estimate_letter from './Project_estimate_letter';
import Project_estimate_exhibit from './Project_estimate_exhibit';

export default function Proposal2(props) {
  const [page,setpage] = useState(0);
  
  
  const handlepage = () => {
    
    if (page===0){
      return <Project_estimate_front info = {info} handleSubmit = {handleSubmit} change = {change}/>
  }
  else if (page === 1){
      return <Project_estimate_letter info = {info} handleSubmit = {handleSubmit} 
      // agenda1 = {agenda1} setagenda1 = {setagenda1}
      // agenda2 = {agenda2} setagenda2 = {setagenda2}
      change = {change} tables1 = {tables1} settables1 = {settables1}/>
  }
  else if (page === 2){
    return <Project_estimate_exhibit tablecontent1 = {tablecontent1} settablecontent1 = {settablecontent1} handleSubmit = {handleSubmit} />
  }
  }


  const [info,setInfo] = useState(
    {client_name:"",project_name:"",spoc:"",
    rfp:"",date:"",district:"",
    city:"",letter_half1 : "", letter_half2 : ""})
  // const [agenda1,setagenda1] = useState([])
  // const [agenda2,setagenda2] = useState([])
  const [tables1, settables1] = useState([])
  const [tablecontent1, settablecontent1] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      info: info,
      // agenda1 : agenda1,
      tables1 : tables1,
      // agenda2 : agenda2,
      tablecontent1 : tablecontent1
    };
    try {
      const response = await fetch('http://localhost:3000/api/simple/invoice2',{
      method : 'POST',
      headers : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }) 
    console.log(data)
    if (response.ok) {
      const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Output1.docx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
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
  // console.log("in change in proposal", agenda1)
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
    // setagenda({...agenda,[e.target.name]:[e.traget.value]})

    // setdisable()
  
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
          disabled = {page === 2 }
          onClick={() =>{
            setpage((currPage) => currPage+1)
          }} 
          >Next</button>
      </div>
      
      
    
    </div>

    
    </>
  )
}

