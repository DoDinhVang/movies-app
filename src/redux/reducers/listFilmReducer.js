import { SET_LIST_FILM, SET_LIST_FILM_COMING_SOON, SET_LIST_FILM_NOW_SHOWING, SET_SHOWTIMES } from "../types/listFilmType"
import _, { compact } from 'lodash'
const initialState = {
    filmList: [
        {
            "maPhim": 1360,
            "tenPhim": "Home",
            "biDanh": "home",
            "trailer": "https://www.youtube.com/embed/MyqZf8LiWvM",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/home.jpg",
            "moTa": "Oh, an alien on the run from his own people, lands on Earth and makes friends with the adventurous Tip, who is on a quest of her own.",
            "maNhom": "GP02",
            "ngayKhoiChieu": "2021-10-17T00:00:00",
            "danhGia": 10,
            "hot": true,
            "dangChieu": true,
            "sapChieu": true
        }

    ],
    filmListRender: [

    ],
    showtimes:{}
}

const listFilmReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_LIST_FILM:
            state.filmList = action.filmList
            state.filmListRender = _.filter(state.filmList, film => film.dangChieu === true)
            return { ...state }
        case SET_LIST_FILM_NOW_SHOWING:
            state.filmListRender = _.filter(state.filmList, film => film.dangChieu === true)
            return { ...state }

        case SET_LIST_FILM_COMING_SOON:
            state.filmListRender = _.filter(state.filmList, film => film.sapChieu === true)
            return { ...state }

        case SET_SHOWTIMES:{
            return{...state, showtimes:action.showtimes}
        }
        default:
            return { ...state }
    }
}
export { listFilmReducer }