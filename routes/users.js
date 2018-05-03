const express = require("express");
const userRouter = express.Router();

const UserModel = require("../models/users.js");

userRouter.route("/")
    .get((req, res) => {
        UserModel.find(req.query, (err, foundUsers) => {
            if (err) return res.send(err);
            res.status(200).send(foundUsers);
        })
    })
    .post((req, res) => {
        const newUser = new UserModel(req.body);
        newUser.save((err, addedUser) => {
            if (err) return res.send(err);
            res.status(201).send(addedUser);
        })
    });


userRouter.route("/:id")
    .get((req, res) => {
        UserModel.findOne({ _id: req.params.id }, (err, foundUser) => {
            if (err) return res.send(err);
            if (!foundUser) return res.status(404).send({ message: "User not found" })
            res.status(200).send(foundUser);
        })
    })
    .delete((req, res) => {
        UserModel.findOneAndRemove({ _id: req.params.id }, (err, deletedUser) => {
            if (err) return res.send(err);
            if (!deletedUser) return res.status(404).send({ message: "User not found" })
            res.status(200).send({ message: `User '${deletedUser.title}' with id: ${req.params.id} was successfully deleted!` });
        })
    })
    .put((req, res) => {
        UserModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, updatedUser) => {
            if (err) return res.send(err);
            if (!updatedUser) return res.status(404).send({ message: "User not found" });
            res.status(200).send(updatedUser);
        })
    })

module.exports = userRouter;