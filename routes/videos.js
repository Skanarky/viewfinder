const express = require("express");
const axios = require("axios");
const videosRouter = express.Router();

const access = "AIzaSyBCHEOzAQaUxp1gUDedcMhATVe3YaIjxfM";

videosRouter.route("/")
    .get((req, res) => {
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=learn+photography&maxResults=30&type=video&key=${access}`)
        .then(response => res.status(200).send(response.data.items))
            .catch(() => res.status(404).send());
    });

videosRouter.route("/:searchKey")
    .get((req, res) => {
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=learn+photography+${req.params.searchKey}&maxResults=40&type=video&key=${access}`)
        .then(response => res.status(200).send(response.data.items))
            .catch(() => res.status(404).send());
    });

module.exports = videosRouter;