const express = require('express');
const router = express.Router();
const RFP = require('../models/RFP')
const PizZip = require('pizzip');
const fs = require('fs');
const path = require('path');
const officegen = require('officegen');
const Docxtemplater = require('docxtemplater');

// const saveAs = require('file-saver');
// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
const formatDate = (dateString) => {
    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    const dateParts = dateString.split("-");
    const year = dateParts[0];
    const month = parseInt(dateParts[1]) - 1; // Adjust month to zero-based index
    const day = dateParts[2];

    const formattedDate = `${months[month]} ${day}, ${year}`;
    return formattedDate;
  }


router.post('/invoice1', async (req, res) => {
    console.log(req.body); 
    console.log(req.body.info.project_name)
    console.log(req.body.agenda)
    try {
        // const content = fs.readFileSync(path.resolve('backend/docfiles', 'input.docx'), 'binary');
        // const zip = new PizZip(content);
        // const doc = new Docxtemplater(zip);

        // doc.setData({
        //     project_name: req.body.info.project_name,
        //     spoc: req.body.info.spoc,
        //     rfp: req.body.info.rfp,
        //     date: req.body.info.date,
        //     client_name: req.body.info.client_name,
        //     district: req.body.info.district,
        //     city: req.body.info.city,
        // });

        // doc.render();

        // // doc.createP();
        // doc.addText('This is a new Paragraph')
        // doc.styles.setFont('Arial',14)

        // const updatedContent = doc.getZip().generate({ type: 'nodebuffer' });

        // // const newParagraph = updatedContent.createP();
        // // newParagraph.addText('This is a new paragraph.');
        // // newParagraph.styles.setFont('Arial', 14);

        // // const finalContent = Buffer.from(newParagraph.generate());

        // fs.writeFileSync(path.resolve('backend/docfiles', 'output.docx'), updatedContent);
const text = `This proposal and contract are the property of Blaxol Risensi LLP (“Blaxol”) and must not be disclosed outside the family of ${req.body.info.client_name} or be duplicated, used, or disclosed—in whole or in part—for any purpose other than to evaluate this proposal. If a contract is awarded to Blaxol as a result of, or in connection with, this proposal, the Promoters shall have the right to duplicate, use, or disclose the data to the extent provided in the resulting contract and subject to the limitations of the Privacy Policy and other applicable bylaws. This proposal contains trade secrets and proprietary commercial or financial information, and information of a personal nature that is exempt from disclosure under OPRAA and other applicable laws.Accordingly, no portion of this document should be released without consulting BLAXOL. This information is contingent on the Parties reaching mutually agreeable terms and conditions and upon acceptance of any limitations described herein`
        const docx = officegen('docx');

    // Create a header with the specified properties
        const header = docx.getHeader().createP();
        header.options.align = 'right'
        header.addText('STRICTLY CONFIDENTIAL', {
            color: 'FF0000', // Red color (Hexadecimal code)
            bold: true,
        });

        // Add a line break
        header.addLineBreak();

        header.addText('PRELIMINARY DRAFT SUBJECT TO REVISION', {
            color: 'FF0000', // Red color (Hexadecimal code)
            bold: true,
        });

        // Add another line break
        header.addLineBreak();

        header.addText('SUBJECT TO FRE 408 AND CONFIDENTIALITY', {
            color: 'FF0000', // Red color (Hexadecimal code)
            bold: true,
        });

        header.addLineBreak();
        header.addLineBreak();
        header.addLineBreak();


        const front_page = docx.createP()

        front_page.addText('Blaxol Risensi LLP',{
            color : '4A55A2',
            bold : true,
            font_face: 'IBM Plex Sans', 
            font_size: 14
        })

        front_page.addLineBreak();

// projec name
        front_page.addText(req.body.info.project_name,{
            color : '4A55A2',
            bold : true,
            font_face: 'IBM Plex Sans', 
            font_size: 24
        })

        front_page.addLineBreak();



        front_page.addText('Consulting Services Engagement Letter,',{
            color : '4A55A2',
            font_face: 'IBM Plex Sans', 
            font_size: 14
        })

        front_page.addLineBreak();



        front_page.addText('Rules for Engagement',{
            color : '4A55A2',
            font_face: 'IBM Plex Sans', 
            font_size: 14
        })

        front_page.addLineBreak();


// proposal name
        front_page.addText(`Proposal for: ${req.body.info.spoc}`,{
            color : '4A55A2',
            font_face: 'IBM Plex Sans', 
            font_size: 14
        })

        front_page.addLineBreak();

// rfp 
        front_page.addText(req.body.info.rfp,{
            color : '4A55A2',
            font_face: 'IBM Plex Sans', 
            font_size: 14
        })

        front_page.addLineBreak();

        front_page.addText('® Blaxol Risensi LLP (A Member of Blaxol LLC)',{
            color : '4A55A2',
            font_face: 'IBM Plex Sans', 
            font_size: 14
        })

        front_page.addLineBreak();


        front_page.addText(formatDate(req.body.info.date),{
            color : '4A55A2',
            font_face: 'IBM Plex Sans', 
            font_size: 14
        })

        front_page.addLineBreak();

        front_page.addText('ENG - BLR',{
            color : '4A55A2',
            font_face: 'IBM Plex Sans', 
            font_size: 14
        })

        front_page.addLineBreak();
        front_page.addLineBreak();
        front_page.addLineBreak();
        
        image1 = docx.createP()
        image1.options.align = 'right'
        image1.addImage(path.resolve('backend/docfiles', 'Picture1.png'), {cx: 300, cy: 200})

        image1.addLineBreak()

        
        pObj = docx.createP()
        pObj.options.align = 'justify'
        pObj.addText(text,{
            font_face: 'Calibri', 
            font_size: 9.5

        })

        front_page.addLineBreak();

        address = docx.createP()
        address.options.align = 'right'
        address.addText('#30, 2 nd Floor, 4 th Main Road,',{
            color : '4A55A2',
            font_face: 'IBM Plex Sans', 
            font_size: 12
        })

        address.addLineBreak();
        address.addText('Jayanagar 7th Block, Bengaluru,',{
            color : '4A55A2',
            font_face: 'IBM Plex Sans', 
            font_size: 12
        })

        address.addLineBreak();
        address.addText('Karnataka, India 560070',{
            color : '4A55A2',
            font_face: 'IBM Plex Sans', 
            font_size: 12
        })

        address.addLineBreak();

        address1 = docx.createP()
        address1.addText(formatDate(req.body.info.date),{
            color : '4A55A2',
            font_face: 'IBM Plex Sans', 
            font_size: 12
        })

        address1.addLineBreak();
        address1.addLineBreak();

        address1.addText(`Attn: ${req.body.info.spoc}`,{
            color : '4A55A2',
            font_face: 'IBM Plex Sans', 
            font_size: 12
        })

        address1.addLineBreak();

        address1.addText(`${req.body.info.client_name}`,{
            color : '4A55A2',
            font_face: 'IBM Plex Sans', 
            font_size: 12
        })

        address1.addLineBreak();

        address1.addText(`${req.body.info.district}`,{
            color : '4A55A2',
            font_face: 'IBM Plex Sans', 
            font_size: 12
        })

        address1.addLineBreak();

        address1.addText(`${req.body.info.city}`,{
            color : '4A55A2',
            font_face: 'IBM Plex Sans', 
            font_size: 12
        })

        address1.addLineBreak();

        address1.addText('INDIA',{
            color : '4A55A2',
            font_face: 'IBM Plex Sans', 
            font_size: 12
        })

        address1.addLineBreak();


// to add letter dummy 

        letter_heading = docx.createP()


        letter_heading.addText("Subject: Letter of Intent / Declaration and Explanation",{
            color : '4A55A2',
            font_face: 'IBM Plex Sans', 
            font_size: 12,
            underline : true
        })
        letter_heading.addLineBreak()

        letter_body = docx.createP()
        letter_body.options.align = 'justify'
        letter_body.addText(req.body.info.letter,{
            color : '4A55A2',
            font_face: 'IBM Plex Sans', 
            font_size: 12,
        })
        letter_heading.addLineBreak()

        // req.body.info.agenda



        letter_heading.addPageBreak()
        // adding actual docx body 
        for (let i = 0; i < req.body.agenda.length; i++) {
            body_heading = docx.createP()


            body_heading.addText(`${i+1.0} ${req.body.agenda[i].heading}`,{
                color : '4A55A2',
                font_face: 'IBM Plex Sans', 
                font_size: 14,
                bold : true
                
            })
            body_heading.addLineBreak()

            letter_body = docx.createP()
            letter_body.options.align = 'justify'
            letter_body.addText(req.body.agenda[i].para,{
                color : '4A55A2',
                font_face: 'IBM Plex Sans', 
                font_size: 12,
            })
            letter_heading.addLineBreak()
          }
        
        


// main body of the document














        // const buffer = await new Promise((resolve, reject) => {
        //     const stream = docx.generate();
        //     const chunks = [];
        //     stream.on('data', (chunk) => chunks.push(chunk));
        //     stream.on('end', () => resolve(Buffer.concat(chunks)));
        //     stream.on('error', (error) => reject(error));
        // });

        // // Save the generated document to a file
        // fs.writeFileSync(path.resolve('backend/docfiles', 'output.docx'), buffer);
        const out = fs.createWriteStream('output.docx')
        docx.generate(out);
        res.sendStatus(200);
        
    } catch (error) {
        console.log('Error generating document:', error);
        console.log("doc",error)
        res.sendStatus(500);
    }
});

router.post('/getrfdata',async(req,res) => {
    const rfpData = await RFP.findOne({ rfp: req.body.rfp });
    if (!rfpData) {
        return res.send("User not found,Check RFP once")
    }
    res.send(rfpData)
})

module.exports = router