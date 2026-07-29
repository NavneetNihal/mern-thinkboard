import Note from "../models/Note.js";
import { generateRoast } from "../services/roastService.js";

export const getAllNotes = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        // If x-user-id header is provided, return only notes for that client device
        const filter = userId ? { userId } : {};
        const notes = await Note.find(filter).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controllers", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getNoteById = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        const filter = userId ? { _id: req.params.id, userId } : { _id: req.params.id };
        const note = await Note.findOne(filter);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById controllers", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.headers["x-user-id"] || "anon_default";
        
        const note = new Note({ title, content, userId });

        const savedNote = await note.save();
        const roast = await generateRoast(title, content);
        res.status(201).json({ note: savedNote, roast });
    } catch (error) {
        console.error("Error in createNote controllers", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.headers["x-user-id"];
        const filter = userId ? { _id: req.params.id, userId } : { _id: req.params.id };

        const updatedNote = await Note.findOneAndUpdate(filter, { title, content }, { new: true });
        if (!updatedNote) return res.status(404).json({ message: "Note not found" });
        
        const roast = await generateRoast(title, content);
        res.status(200).json({ note: updatedNote, roast });
    } catch (error) {
        console.error("Error in updateNote controllers", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        const filter = userId ? { _id: req.params.id, userId } : { _id: req.params.id };

        const deletedNote = await Note.findOneAndDelete(filter);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully!" });

    } catch (error) {
        console.error("Error in deletedNote controllers", error);
        res.status(500).json({ message: "Internal server error" });
    }
};