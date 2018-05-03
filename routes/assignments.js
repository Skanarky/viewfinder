const express = require("express");
const assignmentRouter = express.Router();

const AssignmentModel = require("../models/assignments.js");

assignmentRouter.route("/")
    .get((req, res) => {
        AssignmentModel.find(req.query).populate("lessonId").exec((err, foundAssignments) => {
            if (err) return res.send(err);
            res.status(200).send(foundAssignments);
        });
    })
    .post((req, res) => {
        const newAssignment = new AssignmentModel(req.body);
        newAssignment.save((err, addedAssignment) => {
            if (err) return res.send(err);
            AssignmentModel.populate(addedAssignment, { path: "lessonId" }, (err, popAssignment) => {
                if (err) return res.send(err);
                res.status(201).send(popAssignment);
            });
        });
    });


assignmentRouter.route("/:id")
    .get((req, res) => {
        AssignmentModel.findOne({ _id: req.params.id }).populate("lessonId").exec((err, foundAssignment) => {
            if (err) return res.send(err);
            if (!foundAssignment) return res.status(404).send({ message: "Assignment not found" })
            res.status(200).send(foundAssignment);
        });
    })
    .delete((req, res) => {
        AssignmentModel.findOneAndRemove({ _id: req.params.id }, (err, deletedAssignment) => {
            if (err) return res.send(err);
            if (!deletedAssignment) return res.status(404).send({ message: "Assignment not found" })
            res.status(200).send({ message: `Assignment with id: ${req.params.id} was successfully deleted!` });
        });
    })
    .put((req, res) => {
        AssignmentModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).populate("lessonId").exec((err, updatedAssignment) => {
            if (err) return res.send(err);
            if (!updatedAssignment) return res.status(404).send({ message: "Assignment not found" });
            res.status(200).send(updatedAssignment);
        });
    });

module.exports = assignmentRouter;