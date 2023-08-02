const express = require('express');
const router = express.Router();
const RFP = require('../models/RFP')
const PizZip = require('pizzip');
const fs = require('fs');
const path = require('path');
const Docxtemplater = require('docxtemplater');

// const saveAs = require('file-saver');
// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required

router.post('/invoice1', (req, res) => {
    
        // Read the file synchronously using fs.readFileSync
        const content = fs.readFileSync(path.resolve('backend/docfiles', 'input.docx'), 'binary');
        const zip = new PizZip(content);
        var doc
        try {
            doc = new Docxtemplater(zip);
        } catch(error) {
            // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
            console.log(error)
        }
    
        doc.setData({
            name : req.body.name,
            address : req.body.address,
            amount : req.body.amount
        });
        
        try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render()
        }
        catch (error) {
            // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
            console.log(error)
        }
        
        var buf = doc.getZip().generate({type: 'nodebuffer'});
        
        //buf is a nodejs buffer, you can either write it to a file or do anything else with it.
        fs.writeFileSync(path.resolve('backend/docfiles', 'output.docx'), buf);
        res.send(200)
        // const blob = doc.getZip().generate({
        //     type: "blob",
        //     mimeType:
        //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        //     // compression: DEFLATE adds a compression step.
        //     // For a 50MB output document, expect 500ms additional CPU time
        //     compression: "DEFLATE",
        // });
        // // Output the document using Data-URI
        // saveAs(blob, "output.docx");
        
    });

module.exports = router