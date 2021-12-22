import QuanLyPhongVeModels from "../../_core/modedels.js/QuanLyRap/QuanLyPhongVeModel"
import { RESET_BOOKING_SEATS, SET_BOOKING_SEATS, SET_CINEMA_ROOM_INFO, SET_OTHER_USER_BOOKING } from "../types/QuanLyDatVeType"

const initialState = {
    cinemaRoomInfo: new QuanLyPhongVeModels(),
    seatsOfOtherUserBooking:[{maGhe:47881}, {maGhe:47882}],
    bookingSeats: [
    ]
}

const quanLyDatVeReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CINEMA_ROOM_INFO:
            return { ...state, cinemaRoomInfo: action.cinemaRoomInfo }
        case SET_BOOKING_SEATS: {

            const { ghe } = action;

            const bookingSeatsUpdate = [...state.bookingSeats]

            const index = bookingSeatsUpdate.findIndex(item => item.maGhe === ghe.maGhe);
            if (index != -1) {
                bookingSeatsUpdate.splice(index, 1);
            } else {
                bookingSeatsUpdate.push(ghe)
            }

            return { ...state, bookingSeats: bookingSeatsUpdate }

        }

        case RESET_BOOKING_SEATS:

            return { ...state, bookingSeats: [] }
        
        case SET_OTHER_USER_BOOKING: 

            return {...state, seatsOfOtherUserBooking: action.seatsOfOtherUserBooking}


        default:
            return state
    }
}
export default quanLyDatVeReducer
