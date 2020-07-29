const express = require("express");
require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const logger = require("./middleware/logger.js");

const coursesRouter = require("./routes/courses.js");
const videosRouter = require("./routes/videos.js");
const lessonRouter = require("./routes/lessons.js");
const assignmentRouter = require("./routes/assignments.js");
const imageRouter = require("./routes/images.js");
const commentRouter = require("./routes/comments.js");
const noteRouter = require("./routes/notes.js");
const favoriteRouter = require("./routes/favorites.js");
const userRouter = require("./routes/users.js");

const app = express();

const port = process.env.PORT;
// const db = process.env.MONGODB_URI;
const db = process.env.DB_URI;

//middleware
app.use(bodyParser.json());
app.use(logger);
app.use(express.static(path.join(__dirname, "client", "build")));

//routes
app.use("/courses", coursesRouter);
app.use("/videos", videosRouter);
app.use("/api/lessons", lessonRouter);
app.use("/api/assignments", assignmentRouter);
app.use("/api/images", imageRouter);
app.use("/api/comments", commentRouter);
app.use("/api/notes", noteRouter);
app.use("/api/favorites", favoriteRouter);
app.use("/api/users", userRouter);

// route for deployment
app.get("*", (req, res) => {  
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//db
mongoose.connect(db, (err) => {
    if (err) console.error(err);
    console.log("Connected to MongoDB");
});

//server
app.listen(port, () => console.log("Server running on port: " + port));

