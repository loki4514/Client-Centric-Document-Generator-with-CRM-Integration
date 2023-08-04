import React, { useContext, useEffect,useState } from 'react';
// import noteContext from '../context/temp/noteContext';
import { useNavigate } from "react-router-dom";



export default function Invoice(props) {
  const navigate = useNavigate()
  const click1 = () => {
    navigate('/generate1')
  }
  const click2 = () => {
    navigate('/generate2')
  }
  const click3 = () => {
    navigate('/generate3')
  }
  return (
    <>
    <div className='project-buttons'>
      <button onClick={click1}> Generate Project Proposal</button>
      <button onClick={click2}>Generate Project Estimate</button>
      <button onClick={click3}>Generate Invoice</button>
    </div>

        </>
  )
}
