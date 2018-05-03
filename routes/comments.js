const express = require("express");
const commentRouter = express.Router();

const CommentModel = require("../models/comments.js");

commentRouter.route("/")
    .get((req, res) => {
        CommentModel.find(req.query, (err, foundComments) => {
            if (err) return res.send(err);
            res.status(200).send(foundComments);
        })
    })
    .post((req, res) => {
        const newComment = new CommentModel(req.body);
        newComment.save((err, addedComment) => {
            if (err) return res.send(err);
            res.status(201).send(addedComment);
        })
    });


commentRouter.route("/:id")
    .get((req, res) => {
        CommentModel.findOne({ _id: req.params.id }, (err, foundComment) => {
            if (err) return res.send(err);
            if (!foundComment) return res.status(404).send({ message: "Comment not found" })
            res.status(200).send(foundComment);
        })
    })
    .delete((req, res) => {
        CommentModel.findOneAndRemove({ _id: req.params.id }, (err, deletedComment) => {
            if (err) return res.send(err);
            if (!deletedComment) return res.status(404).send({ message: "Comment not found" })
            res.status(200).send({ message: `Comment with id: ${req.params.id} was deleted!` });
        })
    })
    .put((req, res) => {
        CommentModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, updatedComment) => {
            if (err) return res.send(err);
            if (!updatedComment) return res.status(404).send({ message: "Comment not found" });
            res.status(200).send(updatedComment);
        })
    })

module.exports = commentRouter;