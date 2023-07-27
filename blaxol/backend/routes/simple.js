const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const RFP = require('../models/RFP')

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ admin : req.admin.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


router.get('/fetchallrfp',async (req,res) => {
    try {
        const rfps = await RFP.find()
        res.json(rfps)
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, admin: req.admin.id
            })
            const savedNote = await note.save()

            res.json(savedNote)
            // console.log(errors)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


// update an exiting rfp 
router.put('/updatenotes/:id',fetchuser, async (req,res) => {
    const {title,description,tag} = req.body


    const newNote = {}

    if (title) {
        newNote.title = title
    }
    if (description) {
        newNote.description = description
    }
    if (tag) {
        newNote.tag = tag
    }

    let note = await Note.findById(req.params.id)
    if (!note) {
        return res.status(400).send("Not found")
    }

    if(note.admin.toString() !== req.admin.id) {
        return res.status(401).send("Not allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set : newNote}, {new:true})
    res.json(note)



})

module.exports = router