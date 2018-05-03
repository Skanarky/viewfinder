const express = require("express");
const imageRouter = express.Router();

const ImageModel = require("../models/images.js");

imageRouter.route("/")
    .get((req, res) => {
        ImageModel.find(req.query).populate("assignId").populate("lessonId", "title")/*.populate("userId", ("firstName", "lastName"))*/.exec((err, foundImages) => {
            if (err) return res.send(err);
            res.status(200).send(foundImages);
        });
    })
    .post((req, res) => {
        const newImage = new ImageModel(req.body);
        newImage.save((err, addedImage) => {
            if (err) return res.send(err);
            ImageModel.populate(addedImage, { path: "assignId" }, (err, popImage) => {
                if (err) return res.send(err);
                res.status(201).send(popImage);
            });
        });
    });

imageRouter.route("/:id")
    .get((req, res) => {
        ImageModel.findOne({ _id: req.params.id }).populate("assignId").exec((err, foundImage) => {
            if (err) return res.send(err);
            if (!foundImage) return res.status(404).send({ message: "Image not found" })
            res.status(200).send(foundImage);
        });
    })
    .delete((req, res) => {
        ImageModel.findOneAndRemove({ _id: req.params.id }, (err, deletedImage) => {
            if (err) return res.send(err);
            if (!deletedImage) return res.status(404).send({ message: "Image not found" })
            res.status(200).send({ message: `Image with id: ${req.params.id} was successfully deleted!` });
        });
    })
    .put((req, res) => {
        ImageModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).populate("assignId").exec((err, updatedImage) => {
            if (err) return res.send(err);
            if (!updatedImage) return res.status(404).send({ message: "Image not found" });
            res.status(200).send(updatedImage);
        });
    });

module.exports = imageRouter;