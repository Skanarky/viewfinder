const express = require("express");
const axios = require("axios");
const coursesRouter = express.Router();

const access = {
    auth: {
        username: "PRXxcMDxIV9Z4GoO5KhCeKC4WwI5XSEwjuygaNpW",
        password: process.env.UDEMY_PASS
    }
};

coursesRouter.route("/")
    .get((req, res) => {
        axios.get(`https://www.udemy.com/api-2.0/courses/?search=photography&page_size=30`, access)
        .then(response => res.status(200).send(response.data.results))
            .catch(() => res.status(404).send());
    });

coursesRouter.route("/:searchKey")
    .get((req, res) => {
        axios.get(`https://www.udemy.com/api-2.0/courses/?search=photography+${req.params.searchKey}&page_size=40`, access)
        .then(response => res.status(200).send(response.data.results))
            .catch(() => res.status(404).send());
    });

module.exports = coursesRouter;