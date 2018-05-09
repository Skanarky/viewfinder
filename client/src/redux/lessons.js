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
                
                data: [...state.data, ...action.lessons],
                loading: false
            }
        // case "ADD_ISSUE":
        //     return {
        //         ...state,
        //         data: [...state.data, action.issue],
        //         loading: false
        //     }
        // case "EDIT_ISSUE":
        //     return {
        //         ...state,
        //         data: state.data.map(issue => {
        //             if (issue._id === action.id) {
        //                 return {...issue, ...action.editedIssue};
        //             } else {
        //                 return issue;
        //             }
        //         }),
        //         loading: false
        //     }
        // case "DELETE_ISSUE":
        //     return {
        //         ...state,
        //         data: state.data.filter((issue) => issue._id !== action.id),
        //         loading: false
        //     }
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

// export const addIssue = (issue) => {
//     return dispatch => {
//         axios.post(`/issues/`, issue)
//         .then(response => {
//             // console.log(response.data);
//             dispatch({
//                 type: "ADD_ISSUE",
//                 issue: response.data
//             });
//         }).catch(err => {
//             dispatch({
//                 type: "ERR_MSG",
//                 errMsg: "Sorry, data unavailable!"
//             });
//         });
//     }
// }
// export const deleteIssue = (id) => {
//     return dispatch => {
//         axios.delete(`/issues/${id}`)
//         .then(response => {
//             // console.log(response.data);
//             dispatch({
//                 type: "DELETE_ISSUE",
//                 id
//             });
//         }).catch(err => {
//             dispatch({
//                 type: "ERR_MSG",
//                 errMsg: "Sorry, data unavailable!"
//             });
//         });
//     }
// }

// export const editIssue = (id, issue) => {
//     return dispatch => {
//         axios.put(`/issues/${id}`, issue)
//         .then(response => {
//             // console.log(response.data);
//             dispatch({
//                 type: "EDIT_ISSUE",
//                 id,
//                 editedIssue: response.data
//             });
//         }).catch(err => {
//             dispatch({
//                 type: "ERR_MSG",
//                 errMsg: "Sorry, data unavailable!"
//             });
//         });
//     }
// }

export default lessonReducer;