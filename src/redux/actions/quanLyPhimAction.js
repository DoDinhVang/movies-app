import { notification } from "antd"
import { quanLyPhimService } from "../../service/QuanLyPhimService"
import { STATUS_CODE } from '../../utilities/settings/config'
import { SET_CAROUSEL } from '../types/carouselType'
import { HIDE_DRAWER } from "../types/drawerAntDesignType"
import { SET_LIST_FILM } from "../types/listFilmType"
import { HIDE_LOADING, SHOW_LOADING } from "../types/loadingType"
import { SET_FILM_INFO } from "../types/QuanLyPhimType"


/**
 * 
 * @desc: goi api LayDanhSachPhim
 */
export const getFilmsList = (tenPhim) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyPhimService.getFilmList(tenPhim)
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_LIST_FILM,
                    filmList: data.content
                })
            }

        } catch (error) {
            console.log(error)
            console.log(error.response?.data);
        }
    }
}

/**
 * 
 * desc: goi api LayDanhSachBanner
 */
export const getCarouselAction = async (dispatch) => { // dispatch do redux-thunk tra ve
   
    dispatch({
        type: SHOW_LOADING
    })
    try {
        const { data, status } = await quanLyPhimService.getBannerList()
        if (status === STATUS_CODE.SUCCESS) {

           await dispatch({
                type: SET_CAROUSEL,
                bannerList: data.content
            })
        }
    } catch (error) {
        console.log(error)
    }
    dispatch({
        type:HIDE_LOADING
    })
}


/**
 * 
 * @param {*} formData
 * @desc: goi api ThemPhimUpLoadHinh
 */
export const addFilm = (formData) => {

    return async dispatch => {


        dispatch({
            type: SHOW_LOADING
        })
        try {
            const { data, status } = await quanLyPhimService.addFilm(formData)
            if (status === STATUS_CODE.SUCCESS) {
                notification['success']({
                    message: data.message,
                    placement: 'topRight'
                })
            }
        } catch (err) {
            console.log(err.response?.data)
            notification['error']({
                message: 'xử lý thất bại',
                placement: 'topRight'
            })
        }
        dispatch({
            type: HIDE_LOADING
        })

    }
}


/**
 * 
 * @param {*} formData 
 * @desc: gọi api CapNhapPhimUpload
 */

export const editFilmAction = (formData) => {

    return async dispatch => {

        dispatch({
            type: HIDE_LOADING
        })

        try {

            const { data, status } = await quanLyPhimService.editFilm(formData);
            if (status === STATUS_CODE.SUCCESS) {

                notification['success']({
                    message: data.message,
                    placement: 'topRight'
                })
                await dispatch(getFilmsList(''))
                await dispatch({
                    type: HIDE_DRAWER
                })
            }

        } catch (error) {
            console.log(error.response?.data)
            notification['error']({
                message: 'xử lý thất bại',
                placement: 'topRight'
            })
        }
        dispatch({
            type: HIDE_LOADING
        })
    }
}

/**
 * 
 * @param {*} maPhim 
 * @desc : goi api LayDanhSachPhim
 */
export const getFilmInfoAction = (maPhim) => {

    return async dispatch => {
        try {

            const { data, status } = await quanLyPhimService.getFilmInfo(maPhim)
            if (status === STATUS_CODE.SUCCESS) {

                dispatch({
                    type: SET_FILM_INFO,
                    filmInfo: data.content
                })
            }

        } catch (error) {

            console.log(error.response?.data)
        }
    }
}

/**
 * @param maPhim
 * @desc: gọi api XoaPhim
 */

export const deleFilmAction = (maPhim) => {

    return async dispatch => {

        dispatch({
            type: SHOW_LOADING
        })
        try {

            const { data, status } = await quanLyPhimService.deleFilm(maPhim)
            if (status === STATUS_CODE.SUCCESS) {

                await dispatch(getFilmsList)
                notification['success']({
                    message: data.message,
                    placement: 'topRight',

                })
            }

        } catch (error) {
            console.log(error.response?.data)
            notification['error']({
                message: 'xử lý thất bại',
                placement: 'topRight'
            })
        }
        dispatch({
            type: HIDE_LOADING
        })
    }
}