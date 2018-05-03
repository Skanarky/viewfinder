const mongoose = require("mongoose");

const { Schema } = mongoose;

const lessonSchema = new Schema({
    mainSubject: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    },
    shortDescription: {
        required: true,
        type: String
    },
    exampleImgOneUrl: {
        required: true,
        type: String
    },
    exampleImgTwoUrl: {
        required: true,
        type: String
    },
    exampleImgThreeUrl: {
        required: true,
        type: String
    },
    instructions: {
        required: true,
        type: String
    },
    googleLink: {
        required: true,
        type: String
    }
})

const LessonModel = mongoose.model("lessons", lessonSchema);
module.exports = LessonModel;
