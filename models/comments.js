const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "users"
    // },
    imageId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "images"
    },
    textComment: {
        required: true,
        type: String
    }
}, { timestamps: true })

const CommentModel = mongoose.model("comments", commentSchema);
module.exports = CommentModel;