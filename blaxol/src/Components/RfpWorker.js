import React,{useContext, useEffect, useState} from 'react'
import noteContext from '../context/temp/noteContext';
export default function RFP() {

    const context = useContext(noteContext)
    // console.log(context)

    const { getrfps, rfp } = context;

    useEffect(() =>{
      getrfps()
    },[])
      

      // const [formattedDates, setFormattedDates] = useState([]);

    
    const getStatusStyle = (status) => {
        // Customize the colors based on your requirements
        switch (status) {
          case 'Completed':
            return { color: 'green' };
          // Add more cases for other status values if needed
          default:
            return { color: '#F29339' };
        }
      };

      const formatDate = (datestring) => {
        const currentDate = new Date(datestring);
        const month = currentDate.getMonth() + 1; // Months are zero-indexed, so adding 1 to get the correct month
        const day = currentDate.getDate();
        const year = currentDate.getFullYear();

        const formattedDate = `${month}/${day}/${year}`
        return formattedDate
    };

    // useEffect(() => {
    //   // Format the dates and store them in formattedDates state
    //   const formattedDatesArr = rfp.map((rfp) => formatDate(rfp.date));
    //   setFormattedDates(formattedDatesArr);
    // }, [rfp]);

    return (
        <>
    {/* <div>
        <div>
        {rfp.map((rfp) => (
        <div >
            <h2>{rfp.rfp}</h2>
            <p>Call Sign: {rfp.call_sign}</p>
            <p>Description: {rfp.description}</p>
            <p>Customer Name: {rfp.customer_name}</p>
            <p>SPOC: {rfp.spoc}</p>
            <p>Date: {rfp.date}</p>
            <p>Status: {rfp.status}</p>
            <hr />
        </div>
      ))}
    </div>
    </div> */}



<table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">SLNO</th>
          <th scope="col">RFP ID</th>
          <th scope="col">Project Name</th>
          <th scope="col">Description</th>
          <th scope="col">Customer Name</th>
          <th scope="col">SPOC</th>
          <th scope="col">Date</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {rfp.map((rfp, index) => (
          
          <tr>
            {console.log(rfp.date)}
            <th scope="row">{index + 1}</th>
            <td>{rfp.rfp}</td>
            <td>{rfp.call_sign}</td>
            <td>{rfp.description}</td>
            <td>{rfp.customer_name}</td>
            <td>{rfp.spoc}</td>
            <td>{formatDate(rfp.date)}</td>
            <td style={getStatusStyle(rfp.status)}>{rfp.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
    
    </>

    )
}
