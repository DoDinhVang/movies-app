import { FilmInfo } from "../../_core/modedels.js/QuanLyPhim/FilmInfo"
import { SET_FILM_INFO } from "../types/QuanLyPhimType"

const initialState = {

    filmInfo: new FilmInfo()

}

const quanLyPhimReducer = (state = initialState, action) => {
    switch (action.type) {

    case SET_FILM_INFO:
        return { ...state, filmInfo: action.filmInfo}

    default:
        return state
    }
}
export  {quanLyPhimReducer}
