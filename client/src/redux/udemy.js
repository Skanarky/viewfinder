import axios from "axios";

const initialState = {
    data: [],
    loading: true,
    errMsg: ""
}

const udemyReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_COURSE":
            return {
                ...state,
                data: action.courses,
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

export const getCourses = (searchWord) => {
    return dispatch => {
        axios.get(`/courses/${searchWord}`)
        .then(response => {
            // console.log(response.data);
            dispatch({
                type: "GET_COURSE",
                courses: response.data
            });
        }).catch(err => {
            dispatch({
                type: "ERR_MSG",
                errMsg: "Sorry, data unavailable!"
            });
        });
    }
}

export default udemyReducer;