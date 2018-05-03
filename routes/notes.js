const express = require("express");
const noteRouter = express.Router();

const NoteModel = require("../models/notes.js");

noteRouter.route("/")
    .get((req, res) => {
        NoteModel.find(req.query, (err, foundNotes) => {
            if (err) return res.send(err);
            res.status(200).send(foundNotes);
        })
    })
    .post((req, res) => {
        const newNote = new NoteModel(req.body);
        newNote.save((err, addedNote) => {
            if (err) return res.send(err);
            res.status(201).send(addedNote);
        })
    });


noteRouter.route("/:id")
    .get((req, res) => {
        NoteModel.findOne({ _id: req.params.id }, (err, foundNote) => {
            if (err) return res.send(err);
            if (!foundNote) return res.status(404).send({ message: "Note not found" })
            res.status(200).send(foundNote);
        })
    })
    .delete((req, res) => {
        NoteModel.findOneAndRemove({ _id: req.params.id }, (err, deletedNote) => {
            if (err) return res.send(err);
            if (!deletedNote) return res.status(404).send({ message: "Note not found" })
            res.status(200).send({ message: `Note with id: ${req.params.id} was deleted!` });
        })
    })
    .put((req, res) => {
        NoteModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, updatedNote) => {
            if (err) return res.send(err);
            if (!updatedNote) return res.status(404).send({ message: "Note not found" });
            res.status(200).send(updatedNote);
        })
    })

module.exports = noteRouter;