const express =require ('express');
const router =express.Router()
const fetchuser =require('../middleware/fetchuser');
const Note =require('../models/Note');
const { body, validationResult } = require('express-validator');
//Route 1 get the routes using the =Get:"/api/auth/getuser". login required
router.get('/fetchallnotes', fetchuser,async (req, res)=>{
    try{
        const notes = await Note.find({user:req.user.id})
        res.json(notes)
    }catch(error){
        console.log(error.message);
        res.status(500).send("Some error occurred in your code");
    }
    
})
//Route 2 add the new notes on  =Post:"/api/auth/addnote". login required
router.post('/addnote', fetchuser,[
    body('title', 'Enter the valid title').isLength({ min: 5 }),
    body('description', 'Description must be atleast 5 characeter').isLength({ min: 5 }),
], async (req, res)=>{ try{
    const {title,description,tag}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    }
    const note = new Note({
        title ,description ,tag ,user:req.user.id
        
    })
    const savenote =await note.save();
    res.json(savenote)}catch(error){
        console.log(error.message);
        res.status(500).send("Some error occurred in your code");
    }
}),
//Route 3: Update  the existing notes:Post""/api/auth/updatenote"
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    
    // Create newNote object
    const newNote = {};
    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }

    try {
        // Find the note to be updated
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }

        // Allow updation only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Check for duplicate description if it's being updated
        if (description) {
            const duplicateNote = await Note.findOne({ description });
            if (duplicateNote && duplicateNote._id.toString() !== req.params.id) {
                return res.status(400).send("Description must be unique");
            }
        }

        // Update the note
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        if (error.code === 11000) {
            return res.status(400).send("Duplicate key error: description must be unique");
        }
        res.status(500).send("Internal Server Error");
    }
});
//Route 4: delete  the existing notes:delet""/api/notes/deletenote"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }

        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Delete the note
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted successfully", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports=router