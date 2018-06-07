import axios from "axios";

const initialState = {
    data: [],
    loading: true,
    errMsg: ""
}

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_IMAGES":
            return {
                ...state,
                data: action.images,
                loading: false
            }
        // case "GET_IMAGES_ASSIGN":
        //     return {
        //         ...state,
        //         data: [...state.data, ...action.images],
        //         loading: false
        //     }
        case "ADD_IMAGE":
            return {
                ...state,
                data: [...state.data, action.image],
                loading: false
            }
        case "EDIT_IMAGE":
            return {
                ...state,
                data: state.data.map(image => {
                    if (image._id === action.id) {
                        return { ...image, ...action.editedImage };
                    } else {
                        return image;
                    }
                }),
                loading: false
            }
        case "DELETE_IMAGE":
            return {
                ...state,
                data: state.data.filter((image) => image.public_id !== action.id),
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
export const getImages = () => {
    return dispatch => {
        axios.get(`/api/images/`)
            .then(response => {
                // console.log(response.data);
                dispatch({
                    type: "GET_IMAGES",
                    images: response.data
                });
            }).catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, data unavailable!"
                });
            });
    }
}

// export const getImagesByAssign = (assignId) => {
//     return dispatch => {
//         axios.get(`/api/images/?assignId=${assignId} `)
//         .then(response => {
//             // console.log(response.data);
//             dispatch({
//                 type: "GET_IMAGES_ASSIGN",
//                 images: response.data
//             });
//         }).catch(err => {
//             dispatch({
//                 type: "ERR_MSG",
//                 errMsg: "Sorry, data unavailable!"
//             });
//         });
//     }
// }

export const addImage = (image) => {
    return dispatch => {
        axios.post(`/api/images/`, image)
            .then(response => {
                // console.log(response.data);
                dispatch({
                    type: "ADD_IMAGE",
                    image: response.data
                });
            }).catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, data unavailable!"
                });
            });
    }
}


export const deleteImage = (id) => {
    return dispatch => {
        axios.delete(`/api/images/${id}`)
            .then(response => {
                // console.log(response.data);
                dispatch({
                    type: "DELETE_IMAGE",
                    id
                });
            }).catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, data unavailable!"
                });
            });
    }
}

export const editImage = (id, editedImage) => {
    return dispatch => {
        axios.put(`/api/images/${id}`, editedImage)
            .then(response => {
                // console.log(response.data);
                dispatch({
                    type: "EDIT_IMAGE",
                    id,
                    editedImage: response.data
                });
            }).catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, data unavailable!"
                });
            });
    }
}

export default imageReducer;