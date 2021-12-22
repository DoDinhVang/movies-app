import { SET_INFO_OF_THEATER_SYSTEM, SET_SHOWTIMES } from "../types/quanLyRapType"

const initialState = {
    lstTheaterSystem: [

    ],
    
}

const quanLyRapReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_INFO_OF_THEATER_SYSTEM:
            return { ...state, lstTheaterSystem: action.lstTheaterSystem }
    
        default:
            return {...state}
    }
}
export { quanLyRapReducer }
