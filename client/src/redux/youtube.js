import axios from "axios";

const initialState = {
    data: [],
    loading: true,
    errMsg: ""
}

const youtubeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_VIDEO":
            return {
                ...state,
                data: action.videos,
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

export const getVideos = (searchWord) => {
    return dispatch => {
        axios.get(`/videos/${searchWord}`)
            .then(response => {
                // console.log(response.data);
                dispatch({
                    type: "GET_VIDEO",
                    videos: response.data
                });
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, data unavailable!"
                });
            });
    }
}

export default youtubeReducer;