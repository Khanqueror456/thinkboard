import Note from "../../models/Note.js"

export const getAllNotes = async (req, res) => { 

    try{
            const result = await Note.find().sort({createdAt : -1});
            res.status(201).json({message : "Fetched all notes", notes : result})
    }
    catch(error){
            console.error(error);
            res.status(500).json({message : "Internal Server Error"})
    }


}

export const getNoteById = async (req, res) => {

    try{
        const id = req.params.id;
        const note = await Note.findById(id);

        if (!note) return res.status(404).json({message : "Note not found"});
        res.status(200).json({message : "Note found", note})
    }

    catch(error){
        console.error(error);
        res.status(500).json({message : "Internal server error"});
    }
}

export const createNote = async (req, res) => {

    try{
        const {title, content} = req.body;
        const newNote = new Note({title, content});

        const savedNote = await newNote.save();

        res.status(201).json({message : "Note created successfully", createdNote : savedNote});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message : "Internal server error"});
    }
}

export const updateNote = async (req, res) => {

    try{

        const {title, content} = req.body;
        const id = req.params.id;

        const result = await Note.findByIdAndUpdate(id, {title, content}, {new : true});

        if (!result) return res.status(404).json({message : "Note does not exists"})
        
        res.status(201).json({message : "Note update successfully", updatedNote : result});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message : "Internal server error"});
    }
}

export const deleteNote = async (req, res) => {

    try{
        const id = req.params.id;
        const result = await Note.findByIdAndDelete(id);
        if(!result) return res.status(404).json({message : "Note does not exists"});
        res.status(200).json({message : "Note deleted successfully", deleteNote : result});
    }

    catch(error){
        console.error(error);
        res.status(500).json({message : "Internal server error"})
    }
}