import { quanLyRapService } from "../../service/QuanLyRapService";
import { STATUS_CODE } from "../../utilities/settings/config";
import { SET_SHOWTIMES } from "../types/listFilmType";
import { SET_INFO_OF_THEATER_SYSTEM } from "../types/quanLyRapType";



export const getShowtimes = (id)=>{ 
    return async (dispatch)=>{

        try {
            
            const{data, status} = await quanLyRapService.getShowtimes(id)
            if(status === STATUS_CODE.SUCCESS){
                dispatch({
                    type: SET_SHOWTIMES,
                    showtimes: data.content
                })
            }


        } catch (error) {
            console.log(error.response?.data);
        }

    }
}

export const getInfoOfTheaterSystemAction = async (dispatch)=>{
        
        try {
            const {data, status} = await quanLyRapService.getInfoOfTheaterSystem();
            if(status === STATUS_CODE.SUCCESS){
                dispatch({
                    type: SET_INFO_OF_THEATER_SYSTEM,
                    lstTheaterSystem: data.content
                })
            }

        } catch (error) {
            console.log(error)
            console.log(error.response?.data)
        }
};