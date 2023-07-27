
import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {

  const rfps_inital = []
  const [rfp,setRfp] = useState(rfps_inital)
  const getrfps = async () => {

    const response = await fetch('http://localhost:3000/api/simple/fetchallrfp',{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json() 
    setRfp(json)
    }

    
    return (
        <NoteContext.Provider value = {{rfp,getrfps}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;