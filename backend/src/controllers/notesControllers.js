import Note from "../models/Note.js";
import { generateRoast } from "../services/roastService.js";

export const getAllNotes = async (_, res) => {
    try {
        const notes = await Note.find().sort({createdAt: -1})
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getAllNotes controllers", error);
        res.status(500).json({ message: "Internal server error" })
    }
};

export const getNoteById = async (req, res) => {
    
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message: "Note not found"})
          res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById controllers", error);
        res.status(500).json({ message: "Internal server error" })
    }
}

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content })

        const savedNote = await note.save()
        const roast = await generateRoast(title, content)
        res.status(201).json({ note: savedNote, roast })
    } catch (error) {
        console.error("Error in createNote controllers", error);
        res.status(500).json({ message: "Internal server error" })
    }
};

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true })
        if (!updatedNote) return res.status(404).json({ message: "Note not found" })
        const roast = await generateRoast(title, content)
        res.status(200).json({ note: updatedNote, roast })
    } catch (error) {
        console.error("Error in updateNote controllers", error);
        res.status(500).json({ message: "Internal server error" })
    }
};

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" })
        }
        res.status(200).json({message: "Note deleted successfully!"});

    } catch (error) {
        console.error("Error in deletedNote controllers", error);
        res.status(500).json({ message: "Internal server error" })
    }
}