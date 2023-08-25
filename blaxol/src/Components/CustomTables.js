import React, { useState } from 'react';

export default function CustomTables(props) {
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

    const handleSubmit = () => {
        // Create a new content object with the current values
        const newContent = {};
        Object.entries(content).forEach(([key, value]) => {
          if (value !== '') {
            newContent[key] = value;
          }
        });
      
        // Add the new content object to the table content array
        props.settablecontent((prevTableContent) => [...prevTableContent, newContent]);
      
        // Clear input fields
        const resetContent = {};
        props.colnames.forEach((colname) => {
          resetContent[colname] = '';
        });
        setContent(resetContent);
      };

    return (
        <>
            <table className="table">
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
                                        value={content[name] || ''}
                                        onChange={onchange}
                                        placeholder={`Enter ${name} ${index}`}
                                    />
                                </td>
                            );
                        })}
                    </tr>
                </tbody>
            </table>
            <div className='exhibit'>
            <button onClick={handleSubmit}>Submit</button>
            </div>
        </>
    );
}
