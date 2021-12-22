import { connecting } from "../..";
import { quanLyDatVeService } from "../../service/QuanLyDatVeService"
import { STATUS_CODE, USER_LOGIN } from "../../utilities/settings/config";
import DatVeModel from "../../_core/modedels.js/QuanLyRap/DatVeModel";
import { HIDE_LOADING, SHOW_LOADING } from "../types/loadingType";
import { RESET_BOOKING_SEATS, SET_BOOKING_SEATS, SET_CINEMA_ROOM_INFO } from "../types/QuanLyDatVeType";
import { getUserAccountInfo } from "./quanLyNguoiDungAction";
import { CHANGE_TABS_ANDT_DESIGN } from "../types/tabsAntDesignType";


export const quanLyDatVeAction = (maLichChieu) => { // gọi api để lấy thông tin phong vé

    return async dispatch => {

        dispatch({
            type: SHOW_LOADING
        })

        try {

            const { data, status } = await quanLyDatVeService.getCinemaRoomInfo(maLichChieu);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_CINEMA_ROOM_INFO,
                    cinemaRoomInfo: data.content
                })

                dispatch(getUserAccountInfo())
            }

        } catch (error) {
            console.log(error)
            console.log('error', error.response.data)
        }

        dispatch({
            type: HIDE_LOADING
        })
    }
}


// phương thức đặt vé
export const getTicketsListAction = (ticketsList = new DatVeModel()) => { // lây danh sách vé từ api của mỗi lịch chiếu


    return async dispatch => {
        try {
            
            dispatch({
                type: SHOW_LOADING
            })
            const { data, status } = await quanLyDatVeService.getBooKingTickets(ticketsList)

            if (status === STATUS_CODE.SUCCESS) {

                await dispatch(quanLyDatVeAction(ticketsList.maLichChieu))

                await dispatch({
                    type: RESET_BOOKING_SEATS
                })

            

                await dispatch({
                    type: HIDE_LOADING
                })

                const taiKhoan = JSON.parse(localStorage.getItem(USER_LOGIN)).taiKhoan

                // gọi  phương thuc datVeThanhCong tử backend  phuong thuc nay tra ve chi tiết thông danh sách vé của lich chiếu phim
                await connecting.invoke('datGheThanhCong',taiKhoan,parseInt(ticketsList.maLichChieu))
                
                dispatch({
                    type: CHANGE_TABS_ANDT_DESIGN,
                    visibleTabs: '2'
                })



            }

        } catch (error) {
            console.log(error);
            console.log(error.response?.data)
        }
    }

}

/**
 * 
 * @param {*} ghe 
 * @returns : + đưa ghế đang chọn lên reducer để load ra giao diện,
 *            + chức năng real time: goi api từ back end thong qua phương thức invoke
 * 
 */
export const selectingSeatsAction = (ghe,maLichChieu)=>{

    return async (dispatch,getState)=>{

        await dispatch({
            type: SET_BOOKING_SEATS,
            ghe
        })

        // gửi dữ liệu về backend
        let {bookingSeats} = getState().quanLyDatVeReducer

   
        let  taiKhoan = JSON.parse(localStorage.getItem(USER_LOGIN)).taiKhoan

        bookingSeats = JSON.stringify(bookingSeats);

        connecting.invoke('datGhe',taiKhoan,bookingSeats,parseInt(maLichChieu));


    }
}