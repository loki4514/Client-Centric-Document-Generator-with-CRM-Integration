import React, { useState } from 'react';
import CustomTables from './CustomTables';


export default function LetterTable(props) {
  const [custcolumns, setcustcolumns] = useState(0);
  const [showtable, setshowtable] = useState(false);
  const [colnames, setColNames] = useState([]);
  // const [props.tables, setprops.tables] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [fieldhidden, setFieldHidden] = useState(true);

  const change = (e) => {
    
    setcustcolumns(parseInt(e.target.value));
  };

  const click = () => {
    if (custcolumns === 0){
      props.showAlert("Please fill the number of columns","warning")
      return
    }
    const initialColNames = Array.from({ length: custcolumns }, () => "");
    setColNames(initialColNames);
    setshowtable(true);
  };
  console.log(props.tables)

  const handleColumnNameChange = (e, i) => {
    
    const updatedColNames = [...colnames];
    updatedColNames[i] = e.target.value;
    setColNames(updatedColNames);
  };

  const handleSubmitColumnNames = () => {
    for (const col of colnames) {
      if (col === "") {
        props.showAlert("Please fill in all column names",'warning');
        return;
      }
    }
    // Do something with the submitted column names (e.g., store in state)
    console.log('Submitted Column Names:', colnames);
    setSubmitted(true); // Mark the submission as complete
    setFieldHidden(false);
  };

  return (
    <>
      <div>
        <br />
      
      </div>
    
      <div className='exhibit'>
        <div>
          <input
            type="number"
            name="column"
            value={custcolumns}
            onChange={change}
            placeholder="Enter the columns"
            disabled={submitted}
            required
          />
        </div>
        <br />
        <div>
          <button onClick={click} disabled={submitted}>
            Submit
          </button>
        </div>
        <br />
        <div>
          {colnames.map((colname, i) => (
            <input
              key={i}
              type="text"
              value={colname}
              onChange={(e) => handleColumnNameChange(e, i)}
              placeholder={`Enter column name ${i + 1}`}
              hidden={submitted}
            required />
          ))}
        </div>
        <br />
        <div>
          <button onClick={handleSubmitColumnNames} disabled={submitted}>
            Submit Column Names
          </button>
        </div>
        
      </div>
      
      <br></br>
      {props.tables.length > 0 && (
  <table className="submitted-table">
    <thead>
      <tr className='table-header'>
        {Object.keys(props.tables[0]).map((name) => (
          <th key={name}>{name}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {props.tables.map((submission, index) => (
        <tr key={index}>
          {Object.keys(submission).map((name) => (
            <td key={name}>{submission[name]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)}

      <br></br>

      <br></br>
      {showtable ? (
        <CustomTables
          setshowtable={setshowtable}
          colnames={colnames}
          setColNames={setColNames}
          tables={props.tables}
          settables={props.settables}
        />
      ) : null}
    </>
  );
}


