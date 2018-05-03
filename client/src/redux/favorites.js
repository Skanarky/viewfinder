import axios from "axios";

const initialState = {
    data: [],
    loading: true,
    errMsg: ""
}

const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_FAVORITES":
            return {
                ...state,
                data: [...state.data, ...action.favorites],
                loading: false
            }
        case "ADD_FAVORITE":
            return {
                ...state,
                data: [...state.data, action.favorite],
                loading: false
            }
        case "DELETE_FAVORITE":
            return {
                ...state,
                data: state.data.filter((favorite) => favorite._id !== action.id),
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

export const getFavorites = (id) => {
    return dispatch => {
        axios.get(`/api/favorites/?userId=${id} `)
        .then(response => {
            // console.log(response.data);
            dispatch({
                type: "GET_FAVORITES",
                favorites: response.data
            });
        }).catch(err => {
            dispatch({
                type: "ERR_MSG",
                errMsg: "Sorry, data unavailable!"
            });
        });
    }
}

export const addFavorite = (favoriteItem) => {
    return dispatch => {
        axios.post(`/api/favorites/`, favoriteItem)
        .then(response => {
            // console.log(response.data);
            dispatch({
                type: "ADD_FAVORITE",
                favorite: response.data
            });
        }).catch(err => {
            dispatch({
                type: "ERR_MSG",
                errMsg: "Sorry, data unavailable!"
            });
        });
    }
}

export const deleteFavorites = (id) => {
    return dispatch => {
        axios.delete(`/api/favorites/${id}`)
        .then(response => {
            // console.log(response.data);
            dispatch({
                type: "DELETE_FAVORITE",
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

export default favoriteReducer;