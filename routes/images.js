const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("cloudinary");

const imageRouter = express.Router();

const ImageModel = require("../models/images.js");

const upload = multer({
    dest: "../tmp/",
    limits: { fileSize: 5000000 }
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

imageRouter.route("/")
    .get((req, res) => {
        ImageModel.find(req.query).populate("assignId").populate("lessonId", "title")/*.populate("userId", ("firstName", "lastName"))*/.exec((err, foundImages) => {
            if (err) return res.send(err);
            res.status(200).send(foundImages);
        });
    })
    .post(upload.single("file"), (req, res) => {
        console.log("uploaded to multer");
        cloudinary.v2.uploader.upload(req.file.path,
            {crop: "fit", width: 900, height: 600, format: "jpg", quality: 80},
            (err, result) => {
                if (err) return res.status(500).send(err);
                console.log("uploaded to cloudinary");
                const imageUrl = result.secure_url;
                const { public_id } = result;
                const newImage = new ImageModel(Object.assign(req.body, { imageUrl, public_id }));
                newImage.save((err, addedImage) => {
                    if (err) return res.status(500).send(err);
                    ImageModel.populate(addedImage, { path: "assignId" }, (err, popImage) => {
                        if (err) return res.status(404).send(err);
                        console.log("saved to mongoDB");
                        res.status(201).send(popImage);
                    });
                });
            });
    });
// UPLOAD with URL... not from DEVICE
// .post((req, res) => {
//     const newImage = new ImageModel(req.body);
//     newImage.save((err, addedImage) => {
//         if (err) return res.send(err);
//         ImageModel.populate(addedImage, { path: "assignId" }, (err, popImage) => {
//             if (err) return res.send(err);
//             res.status(201).send(popImage);
//         });
//     });
// });

imageRouter.route("/:id")
    .get((req, res) => {
        ImageModel.findOne({ _id: req.params.id }).populate("assignId").exec((err, foundImage) => {
            if (err) return res.send(err);
            if (!foundImage) return res.status(404).send({ message: "Image not found" })
            res.status(200).send(foundImage);
        });
    })
    .delete((req, res) => {
        ImageModel.findOneAndRemove({ public_id: req.params.id }, (err, deletedImage) => {
            if (err) return res.send(err);
            if (!deletedImage) return res.status(404).send({ message: "Image not found" });
            console.log(`Image with id: ${req.params.id} was successfully deleted from MongoDB!`);
            res.status(200).send({ message: `Image with id: ${req.params.id} was successfully deleted!` });
            cloudinary.v2.uploader.destroy(req.params.id, (err, result) => {
                if (err) return res.status(500).send(err);
                console.log(`Image with Cloudinary ID: ${req.params.id} was deleted from Cloudinary`);
                console.log(result);
            })
        });
    })
    // DELETING only in MongoDB - no id from Cloudinary
    // .delete((req, res) => {
    //     ImageModel.findOneAndRemove({ _id: req.params.id }, (err, deletedImage) => {
    //         if (err) return res.send(err);
    //         if (!deletedImage) return res.status(404).send({ message: "Image not found" });
    //         console.log(`Image with id: ${req.params.id} was successfully deleted from MongoDB!`);
    //         res.status(200).send({ message: `Image with id: ${req.params.id} was successfully deleted!` });
    //     });
    // })
    .put((req, res) => {
        ImageModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).populate("assignId").exec((err, updatedImage) => {
            if (err) return res.send(err);
            if (!updatedImage) return res.status(404).send({ message: "Image not found" });
            res.status(200).send(updatedImage);
        });
    });

module.exports = imageRouter;