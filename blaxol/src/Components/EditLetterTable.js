import React, { useState,useEffect } from 'react';

export default function EditLetterTable(props) {
    const [editedTables, setEditedTables] = useState(props.tables || []);
    const [seebutton,setseebutton] = useState(false)

    useEffect(() => {
      if (props.tables && props.tables.length > 0) {
        setEditedTables(props.tables);
      }
    }, [props.tables]);
  

    const handleColumnNameChange = (index, value) => {
        console.log("Column Name Changed:", index, value);
        const updatedTables = editedTables.map(obj => {
            const newObj = {};
            for (let key in obj) {
                if (key === Object.keys(editedTables[0])[index]) {
                    newObj[value] = obj[key];
                } else {
                    newObj[key] = obj[key];
                }
            }
            return newObj;
        });
        setEditedTables(updatedTables);
    };

    console.log(props.tables)
    
    const handleCellChange = (rowIndex, colIndex, value) => {
        console.log("Cell Value Changed:", rowIndex, colIndex, value);
        const updatedTables = editedTables.map((row, rIndex) => {
            if (rIndex === rowIndex) {
                const columnName = Object.keys(row)[colIndex];
                return {
                    ...row,
                    [columnName]: value
                };
            }
            return row;
        });
        setEditedTables(updatedTables);
    };
    console.log(seebutton)
  const handleSubmit = () => {
    // Handle the submission of edited tables
    props.settables(editedTables)
    props.setshowedit(false)
    
    console.log('Edited Tables:', props.tables);
  };

  return (
    <>
      {<table className="table">
        <thead className="thead-light">
          <tr className="table-header">
            {Object.keys(editedTables[0]).map((heading, index) => (
              <th key={index}>
                <input
                  type="text"
                  value={heading}
                  onChange={(e) => handleColumnNameChange(index, e.target.value)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {editedTables.map((content, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(content).map((name, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>}

      <div className="exhibit">
        {<button onClick={handleSubmit}>Submit</button>}
      </div>
    </>
  );
}
