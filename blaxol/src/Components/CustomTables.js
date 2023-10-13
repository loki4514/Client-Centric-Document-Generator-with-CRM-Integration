import React, { useState } from 'react';
import EditLetterTable from './EditLetterTable';


export default function CustomTables(props) {
    const [showedit,setshowedit] = useState(false)
    const [showbutton,setshowbutton] = useState(true)
    const [content, setContent] = useState(() => {
        const initialContent = {};
        props.colnames.forEach((colname) => {
          initialContent[colname] = '';
        });
        return initialContent;
      });

    const onchange = (e) => {

        setContent({...content,[e.target.name]: e.target.value})
    };

    const handleSubmit = (e) => {
        // Create a new content object with the current values
        e.preventDefault();
    //     const isEmpty = Object.values(content).some(value => value.trim() === '');
    //     console.log(isEmpty)
    //     if (isEmpty) {
    //         alert('Please fill in all required fields');
    //     return;
    // }
        const newContent = {};
        Object.entries(content).forEach(([key, value]) => {
          if (value !== '') {
            newContent[key] = value;
          }
        });
      
        // Add the new content object to the table content array
        props.settables((prevTableContent) => [...prevTableContent, newContent]);
      
        // Clear input fields
        const resetContent = {};
        props.colnames.forEach((colname) => {
          resetContent[colname] = '';
        });
        setContent(resetContent);
      };
    const handleSubmit1 = () => {
       
        setshowbutton(false)


    }

    const click1 = () => {
        setshowedit(true)
        console.log("i am clicking",showedit)

    }

    

    return (
        <>
        <form>
            {showbutton && <table className="table">
                <thead className="thead-light">
                    <tr className='table-header'>
                        {props.colnames.map((name) => {
                            return <th>{name}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr className='table-header'>
                        {props.colnames.map((name,index) => {
                            return (
                                <td >
                                    <input
                                        type="text"
                                        name={name}
                                        value={content[name]}
                                        onChange={onchange}
                                        placeholder={`Enter ${name} ${index}`}
                                        required
                                    />
                                </td>
                            );
                        })}
                    </tr>
                </tbody>
            </table>}
            </form>
            {showbutton && <div className='exhibit'>
            <button onClick={handleSubmit}>Add Content</button>
            </div>}
            <br/>
            {showbutton &&<div className='exhibit'>
            <button onClick={handleSubmit1}>Submit Table</button>
            </div> }
            
            
            {props.tables.length > 0 &&
            <div className='exhibit'>
            {!showbutton && <button onClick={click1}>Edit</button>} 
            </div>
             }
             {showedit ? <EditLetterTable
            colnames={props.colnames}
            setColNames={props.setColNames}
            tables={props.tables}
            settables={props.settables}
            showedit = {showedit}
            setshowedit = {setshowedit}
            content = {content}/> : null}
        </>
    );
}
