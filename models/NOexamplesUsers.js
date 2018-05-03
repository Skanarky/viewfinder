const mongoose = require("mongoose");

const { Schema } = mongoose;

const exampleUserSchema = new Schema({
    imageId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "images"
    }
})

const ExampleUserModel = mongoose.model("examples", exampleUserSchema);
module.exports = ExampleUserModel;