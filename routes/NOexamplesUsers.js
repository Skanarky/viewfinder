const express = require("express");
const exampleUserRouter = express.Router();

const ExampleUserModel = require("../models/examplesUsers.js");

exampleUserRouter.route("/")
    .get((req, res) => {
        ExampleUserModel.find(req.query).populate("imageId").exec((err, foundExampleUsers) => {
            if (err) return res.send(err);
            res.status(200).send(foundExampleUsers);
        });
    })
    .post((req, res) => {
        const newExampleUser = new ExampleUserModel(req.body);
        newExampleUser.save((err, addedExampleUser) => {
            if (err) return res.send(err);
            ExampleUserModel.populate(addedExampleUser, { path: "imageId" }, (err, popExampleUser) => {
                if (err) return res.send(err);
                res.status(201).send(popExampleUser);
            });
        });
    });


exampleUserRouter.route("/:id")
    .get((req, res) => {
        ExampleUserModel.findOne({ _id: req.params.id }).populate("imageId").exec((err, foundExampleUser) => {
            if (err) return res.send(err);
            if (!foundExampleUser) return res.status(404).send({ message: "ExampleUser not found" })
            res.status(200).send(foundExampleUser);
        });
    })
    .delete((req, res) => {
        ExampleUserModel.findOneAndRemove({ _id: req.params.id }, (err, deletedExampleUser) => {
            if (err) return res.send(err);
            if (!deletedExampleUser) return res.status(404).send({ message: "ExampleUser not found" })
            res.status(200).send({ message: `ExampleUser with id: ${req.params.id} was successfully deleted!` });
        });
    })
    .put((req, res) => {
        ExampleUserModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).populate("imageId").exec((err, updatedExampleUser) => {
            if (err) return res.send(err);
            if (!updatedExampleUser) return res.status(404).send({ message: "ExampleUser not found" });
            res.status(200).send(updatedExampleUser);
        });
    });

module.exports = exampleUserRouter;