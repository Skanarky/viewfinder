import axios from "axios";

const initialState = {
    data: [],
    loading: true,
    errMsg: ""
}

const lessonReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_LESSONS":
            return {
                ...state,
                data: action.lessons,
                loading: false
            }
        case "ERR_MSG":
            return {
                ...state,
                errMsg: action.errMsg,
                loading: false
            }
        default:
            return state
    }
}


// action creators:

//topic = "composition" || "light"
export const getLessons = (topic) => {
    return dispatch => {
        axios.get(`/api/lessons/?mainSubject=${topic} `)
        .then(response => {
            // console.log(response.data);
            dispatch({
                type: "GET_LESSONS",
                lessons: response.data
            });
        }).catch(err => {
            dispatch({
                type: "ERR_MSG",
                errMsg: "Sorry, data unavailable!"
            });
        });
    }
}

export default lessonReducer;