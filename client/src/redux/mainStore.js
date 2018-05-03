import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";


import youtubeReducer from "./youtube.js";
import udemyReducer from "./udemy.js";
import lessonReducer from "./lessons.js";
import favoriteReducer from "./favorites.js";
import assignmentReducer from "./assignments.js";
import imageReducer from "./images.js";
import commentReducer from "./comments.js";

const store = createStore(combineReducers({videos: youtubeReducer
    , courses: udemyReducer
    , lessons: lessonReducer
    , favorites: favoriteReducer
    , assignments: assignmentReducer
    , images: imageReducer
    , comments: commentReducer }), applyMiddleware(thunk));

export default store;