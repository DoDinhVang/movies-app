import { GROUPID } from "../../utilities/settings/config"
import UserAccountInfoModel from "../../_core/modedels.js/QuanLyNguoiDung/UserAccountInfoModel"
import { UserInfo } from "../../_core/modedels.js/QuanLyNguoiDung/UserInfo"
import { UsersPerPage } from "../../_core/modedels.js/QuanLyNguoiDung/UsersPerPage"
import { SET_USERS_PER_PAGE, SET_USER_ACCOUNT_INFO, SET_USER_INFO, SET_USER_LIST, SET_USER_TYPE } from "../types/quanLyNguoiDungType"

const initialState = {
    userAccountInfo: new UserAccountInfoModel(),
    usersPerPage: new UsersPerPage(),
    listOfUserType: [],
    userInfo: new UserInfo(),
    title: ''
}
const quanLyNguoiDungReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_ACCOUNT_INFO:
            return { ...state, userAccountInfo: action.userAccountInfo }
        case SET_USERS_PER_PAGE: 
            return {...state, usersPerPage: action.usersPerPage}
        
        case SET_USER_TYPE:
            return {...state, listOfUserType: action.listOfUserType}
        case SET_USER_INFO: 
            return {...state,userInfo: {...action.userInfo,maNhom: GROUPID},title: action.title}

        default:
            return state
    }
}

export { quanLyNguoiDungReducer }