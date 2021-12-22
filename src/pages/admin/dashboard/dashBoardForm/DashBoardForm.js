import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RollbackOutlined } from '@ant-design/icons'
import { useFormik } from 'formik';
import './dashBoardForm.css';
import { GROUPID } from '../../../../utilities/settings/config';
import { addUserAction, editUserAction, getUserTypeAction } from '../../../../redux/actions/quanLyNguoiDungAction';
import { SET_TITLE_ADD_USER, SET_TITLE_EDIT_USER } from '../../../../redux/types/quanLyNguoiDungType';
import { history } from '../../../../App';
import * as Yup from 'yup'

export default function DashBoardForm(props) {
    const { path } = props.match
    const dispatch = useDispatch();
    const { listOfUserType, userInfo, title } = useSelector(state => state.quanLyNguoiDungReducer)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: userInfo.taiKhoan,
            matKhau: userInfo.matKhau,
            email: userInfo.email,
            soDt: userInfo.soDt,
            maNhom: userInfo.maNhom,
            maLoaiNguoiDung: userInfo.maLoaiNguoiDung === '' ? listOfUserType[0]?.maLoaiNguoiDung : userInfo.maLoaiNguoiDung,
            hoTen: userInfo.hoTen
        },
        validationSchema: Yup.object().shape({
            taiKhoan: Yup.string()
                .required('Nhập tài khoản'),
            email: Yup.string()
                .required('Nhập email')
                .email('email không hợp lệ'),
            matKhau: Yup.string()
                .required('Nhập mật khẩu')
                .min(6,'Mật khẩu tối thiểu 6 ký tự'),
            soDt: Yup.string()
                .required('Nhập số điện thoại')
                .matches(/^[0-9]+$/,'Số điện thoại không hợp lệ')
                .min(6,'Số điện thoại tối thiểu 6 chữ số'),
            hoTen: Yup.string()
                .required('Nhập họ tên')
        }),
        onSubmit: (values) => {
            if (title === SET_TITLE_ADD_USER) {
                dispatch(addUserAction(values))
            } else if (title === SET_TITLE_EDIT_USER) {
                dispatch(editUserAction(values))
            }
        }
    })

    useEffect(() => {
        dispatch(getUserTypeAction())

    }, [])
    return (
        <div id='dashboard__action' className='h-screen text-black'>
            <h3 className='text-center mb-14 text-2xl'>{title}</h3>
            <form onSubmit={formik.handleSubmit} className='grid grid-cols-2'>
                {title === SET_TITLE_EDIT_USER ?
                    <div className='form__group'>
                        <input disabled value={formik.values.taiKhoan} className='form__control cursor-not-allowed' onChange={formik.handleChange} name='taiKhoan' required></input>
                        <label>Tài Khoản</label>
                    </div> :
                    <div className='form__group'>
                        <input value={formik.values.taiKhoan} className='form__control' onChange={formik.handleChange} name='taiKhoan' required></input>
                        <label>Tài Khoản</label>
                        <span className='text-red-500'>{formik.errors.taiKhoan}</span>
                    </div>
                }

                <div className='form__group'>
                    <input value={formik.values.email} className='form__control' onChange={formik.handleChange} name='email' required></input>
                    <label>Email</label>
                    <span className='text-red-500'>{formik.errors.email}</span>
                </div>
                <div className='form__group'>
                    <input value={formik.values.matKhau} className='form__control' onChange={formik.handleChange} name='matKhau' required></input>
                    <label>Mật Khẩu</label>
                    <span className='text-red-500'>{formik.errors.matKhau}</span>
                </div>
                <div className='form__group'>
                    <input value={formik.values.soDt} className='form__control' onChange={formik.handleChange} name='soDt' required></input>
                    <label>Số Điện Thoại</label>
                    <span className='text-red-500'>{formik.errors.soDt}</span>
                </div>
                <div className='form__group'>
                    <input value={formik.values.hoTen} className='form__control' onChange={formik.handleChange} name='hoTen' required></input>
                    <label>Họ Tên</label>
                    <span className='text-red-500'>{formik.errors.hoTen}</span>
                </div>
                <div className='form__group'>
                    <select value={formik.values.maLoaiNguoiDung} name='maLoaiNguoiDung' onChange={formik.handleChange} className='form__control'>
                        {listOfUserType.map((item, index) => {

                            return <option key={index} value={item.maLoaiNguoiDung}>{item.tenLoai}</option>

                        })}
                    </select >
                </div>
                <div onClick={()=>{
                    history.goBack()
                }} className='ml-14 text-xl cursor-pointer h-10 w-40 flex items-center'>
                    <RollbackOutlined className='mr-2' />
                    <span>Quay Lại</span>
                </div>
                <div className='mr-14 text-right'>
                    {title === SET_TITLE_ADD_USER ?
                        <div>
                            <button type='submit' className='bg-transparent mr-3 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Thêm Người Dùng</button>
                            <button type='submit' disabled className='bg-transparent cursor-not-allowed  text-blue-400 bg-gray-50 font-semibold py-2 px-4 border border-blue-500 rounded'>Lưu Thay Đổi</button>
                        </div>
                        : title === SET_TITLE_EDIT_USER ?
                            <div>
                                <button type='submit' disabled className='bg-transparent mr-3 cursor-not-allowed  text-blue-400 bg-gray-50 font-semibold py-2 px-4 border border-blue-500 rounded'>Thêm Người Dùng</button>
                                <button type='submit' className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Lưu Thay Đổi</button>
                            </div> : ''

                    }

                </div>

            </form>
        </div>
    )
}
