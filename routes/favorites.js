const express = require("express");
const favoriteRouter = express.Router();

const FavoriteModel = require("../models/favorites.js");

favoriteRouter.route("/")
    .get((req, res) => {
        FavoriteModel.find(req.query).populate("imageId").exec((err, foundFavorites) => {
            if (err) return res.send(err);
            res.status(200).send(foundFavorites);
        });
    })
    .post((req, res) => {
        const newFavorite = new FavoriteModel(req.body);
        newFavorite.save((err, addedFavorite) => {
            if (err) return res.send(err);
            FavoriteModel.populate(addedFavorite, { path: "imageId" }, (err, popFavorite) => {
                if (err) return res.send(err);
                res.status(201).send(popFavorite);
            });
        });
    });


favoriteRouter.route("/:id")
    .get((req, res) => {
        FavoriteModel.findOne({ _id: req.params.id }).populate("imageId").exec((err, foundFavorite) => {
            if (err) return res.send(err);
            if (!foundFavorite) return res.status(404).send({ message: "Favorite not found" })
            res.status(200).send(foundFavorite);
        });
    })
    .delete((req, res) => {
        FavoriteModel.findOneAndRemove({ _id: req.params.id }, (err, deletedFavorite) => {
            if (err) return res.send(err);
            if (!deletedFavorite) return res.status(404).send({ message: "Favorite not found" })
            res.status(200).send({ message: `Favorite with id: ${req.params.id} was successfully deleted!` });
        });
    })
    .put((req, res) => {
        FavoriteModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).populate("imageId").exec((err, updatedFavorite) => {
            if (err) return res.send(err);
            if (!updatedFavorite) return res.status(404).send({ message: "Favorite not found" });
            res.status(200).send(updatedFavorite);
        });
    });

module.exports = favoriteRouter;