const Note = require('../models/noteModel');

// GET all notes for a user
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notes', error: err.message });
  }
};

// POST a new note
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content)
      return res.status(400).json({ message: 'Title and content are required' });

    const newNote = new Note({
      userId: req.userId,
      title,
      content,
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create note', error: err.message });
  }
};

// PUT (update) a note
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, content },
      { new: true }
    );

    if (!note)
      return res.status(404).json({ message: 'Note not found or unauthorized' });

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update note', error: err.message });
  }
};

// DELETE a note
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndDelete({ _id: id, userId: req.userId });

    if (!note)
      return res.status(404).json({ message: 'Note not found or unauthorized' });

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete note', error: err.message });
  }
};
