import { quanLyNguoiDungService } from "../../service/QuanLyNguoiDungService"
import { GROUPID, STATUS_CODE, TOKEN, USERS_PER_PAGE, USER_LOGIN } from "../../utilities/settings/config"
import { history } from "../../App"
import { SET_USERS_PER_PAGE, SET_USER_ACCOUNT_INFO, SET_USER_LIST, SET_USER_TYPE } from "../types/quanLyNguoiDungType"
import { notification } from "antd"
import { HIDE_LOADING, SHOW_LOADING } from "../types/loadingType"


const getUserLogin = (userLogin) => {

    return async (dispatch) => {
        try {

            const { data, status } = await quanLyNguoiDungService.userLoginService(userLogin)
            if (status === STATUS_CODE.SUCCESS) {
                const { accessToken, ...resParams } = data.content;
                //luu token va thong tim nguoi dung vao localstore
                localStorage.setItem(TOKEN, accessToken)
                localStorage.setItem(USER_LOGIN, JSON.stringify(resParams))

                history.push('./home') // quay lại trang trước đó
            }

        } catch (error) {

            const { content } = error.response?.data
            notification['error']({
                message: content,
                placement: 'topRight'
            })
            console.log(error)
            console.log(error.response?.data)
        }
    }
}

const getUserAccountInfo = () => {

    return async dispatch => {

        try {

            const { data, status } = await quanLyNguoiDungService.userAccountInfo();
            if (status === STATUS_CODE.SUCCESS) {

                dispatch({
                    type: SET_USER_ACCOUNT_INFO,
                    userAccountInfo: data.content

                })
            }
        } catch (error) {
            console.log(error)
            console.log(error.response?.data)
        }
    }

}

const signupAccountAction = (thongTinDangKy) => {
    return async dispatch => {

        try {
            const { data, status } = await quanLyNguoiDungService.signupAccount(thongTinDangKy);
            if (status === STATUS_CODE.SUCCESS) {
                history.push('/login')
            }
        } catch (error) {

            const { content } = error.response?.data

            notification['error']({
                message: content,
                placement: 'topRight'
            })

            console.log(error.response?.data)
        }

    }
}

/**
 * @desc: lấy danh sach người dùng
 */
const getUserListAction = (maNhom) => {
    return async dispatch => {

        try {
            const { data, status } = await quanLyNguoiDungService.getUserList(maNhom)
            if (status === STATUS_CODE.SUCCESS) {

                dispatch({
                    type: SET_USER_LIST,
                    userList: data.content
                })
            }

        } catch (error) {
            console.log(error.response?.data)

        }
    }
}

/**
 * @desc: Lấy danh sách người dùng phần trang
 */

const getUsersPerPageAction = (maNhom, soTrang, soPhanTuTrenTrang, tuKhoa) => {
    return async dispatch => {
        try {
            const { data, status } = await quanLyNguoiDungService.getUsersPerPage(maNhom, soTrang, soPhanTuTrenTrang, tuKhoa);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_USERS_PER_PAGE,
                    usersPerPage: data.content
                })
            }
        } catch (error) {
            console.log(error.response?.data);
        }
    }

}


/**
 * @desc:Lấy danh sách loại người dùng
 */
const getUserTypeAction = () => {
   
    return async dispatch => {
        try {
            const { data, status } = await quanLyNguoiDungService.getUserType();
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_USER_TYPE,
                    listOfUserType: data.content
                })
            }

        } catch (error) {
            console.log(error)
            console.log(error.response?.data)
        }

    }
}



/**
 * @desc:  thêm người dùng
 */

const addUserAction = (model) => {

    return async dispatch => {
        try {
            dispatch({
                type: SHOW_LOADING
            })
            const { data, status } = await quanLyNguoiDungService.addUser(model)
            if (status === STATUS_CODE.SUCCESS) {
                notification['success']({
                    message: 'Thêm Thành Công !',
                    placement: 'topRight'
                })
            }

        } catch (error) {

            const { content } = error.response?.data
            console.log(error.response?.data)
            notification['error']({
                message: content,
                placement: 'topRight'
            })
        }
        dispatch({
            type: HIDE_LOADING
        })
    }

}

/**
 * @desc: chỉnh sửa thông tin người dùng
 */
const editUserAction = (model) => {
    return async dispatch => {
        try {
            const { data, status } = await quanLyNguoiDungService.editUser(model)
            if (status === STATUS_CODE.SUCCESS) {
                history.push('/admin/dashboard')
                notification['success']({
                    message: data.message,
                    placement: 'topRight'
                })
            }
        } catch (error) {
            console.log(error.response?.data)

        }
    }
}
/**
 * @desc: xóa người dùng
 */
const deleUserAction = (taiKhoan, currentPage) => {

    return async dispatch => {
        try {

            const { data, status } = await quanLyNguoiDungService.deleUser(taiKhoan)
            if (status === STATUS_CODE.SUCCESS) {
                notification['success']({
                    message: "Xóa Thành Công",
                    placement: 'topRight'
                })

                dispatch(getUsersPerPageAction(GROUPID, currentPage, USERS_PER_PAGE,''))

            }
        } catch (error) {

            const { content } = error.response?.data
            notification['error']({
                message: content,
                placement: 'topRight'
            })
            console.log(error)
            console.log(error.response?.data)
        }

    }
}
/**
 * Cập nhập thông tin  người dung - phần giao diện khách hàng
 */
const updateUserAccountInfoAction = (values) => {
    
    const userLogin = {taiKhoan: values.taiKhoan, matKhau: values.matKhau}
    return async dispatch => {
        try {

            const { data, status } = await quanLyNguoiDungService.updateUserAccountInfo(values)
            if (status === STATUS_CODE.SUCCESS) {

                await dispatch(getUserLogin(userLogin))
                notification['success']({
                    message: "cập nhật Thành Công",
                    placement: 'topRight'
                })


            }
        } catch (error) {
            const { content } = error.response?.data
            notification['error']({
                message: content,
                placement: 'topRight'
            })
            console.log(error)
            console.log(error.response?.data)
        }

    }
   
}
export {
    getUserLogin, getUserAccountInfo, signupAccountAction,
    getUserListAction, getUsersPerPageAction, addUserAction,
    getUserTypeAction, editUserAction, deleUserAction, updateUserAccountInfoAction
}


