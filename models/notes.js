const mongoose = require("mongoose");

const { Schema } = mongoose;

const noteSchema = new Schema({
    assignId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "assignments"
    },
    textNote: {
        required: true,
        type: String
    }
}, { timestamps: true })

const NoteModel = mongoose.model("notes", noteSchema);
module.exports = NoteModel;
