const express = require("express");
const lessonRouter = express.Router();

const LessonModel = require("../models/lessons.js");

lessonRouter.route("/")
    .get((req, res) => {
        LessonModel.find(req.query, (err, foundLessons) => {
            if (err) return res.send(err);
            res.status(200).send(foundLessons);
        })
    })
    .post((req, res) => {
        const newLesson = new LessonModel(req.body);
        newLesson.save((err, addedLesson) => {
            if (err) return res.send(err);
            res.status(201).send(addedLesson);
        })
    });


lessonRouter.route("/:id")
    .get((req, res) => {
        LessonModel.findOne({ _id: req.params.id }, (err, foundLesson) => {
            if (err) return res.send(err);
            if (!foundLesson) return res.status(404).send({ message: "Lesson not found" })
            res.status(200).send(foundLesson);
        })
    })
    .delete((req, res) => {
        LessonModel.findOneAndRemove({ _id: req.params.id }, (err, deletedLesson) => {
            if (err) return res.send(err);
            if (!deletedLesson) return res.status(404).send({ message: "Lesson not found" })
            res.status(200).send({ message: `Lesson '${deletedLesson.title}' with id: ${req.params.id} was successfully deleted!` });
        })
    })
    .put((req, res) => {
        LessonModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, updatedLesson) => {
            if (err) return res.send(err);
            if (!updatedLesson) return res.status(404).send({ message: "Lesson not found" });
            res.status(200).send(updatedLesson);
        })
    })

module.exports = lessonRouter;