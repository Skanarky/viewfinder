import axios from "axios";

const initialState = {
    data: [],
    loading: true,
    errMsg: ""
}

const assignmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ASSIGNMENT":
            return {
                ...state,
                data: [...state.data, action.assignment],
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

//provide lessonId AND userId
export const getAssignment = (lessonId) => {
    return dispatch => {
        axios.get(`/api/assignments/?lessonId=${lessonId} `)
        .then(response => {
            // console.log(response.data);
            dispatch({
                type: "GET_ASSIGNMENT",
                assignment: response.data[0]
            });
        }).catch(err => {
            dispatch({
                type: "ERR_MSG",
                errMsg: "Sorry, data unavailable!"
            });
        });
    }
}

export default assignmentReducer;