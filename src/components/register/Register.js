import React from 'react'
import { useDispatch } from 'react-redux'
import './register.css'
import { history } from '../../App'
import { useFormik } from 'formik'
import { values } from 'lodash'
import { signupAccountAction } from '../../redux/actions/quanLyNguoiDungAction'
import * as Yup from 'yup'


export default function Register() {

    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            xacNhanMatKhau: '',
            soDt: '',
            email: '',
            hoTen: '',
        },
        onChange: (errors) => {
            console.log('err', errors)
        },
        onSubmit: (values, errors) => {
            console.log('errors', errors)
            dispatch(signupAccountAction(values))
        },
        
        validationSchema: Yup.object().shape({ // Validate form field
            taiKhoan: Yup.string()
                .required('Nhập tài khoản'),
            hoTen: Yup.string().required('Nhập họ tên'),
            soDt: Yup.string()
                .required('Nhập Số Điện Thoại')
                .matches(/^[0-9]+$/,'Số điện thoại không hợp lệ')
                .min(6,'Số điện thoại tối thiếu 6 chữ số')
                ,
            email: Yup.string()
                .required('Nhập email')
                .email('email không hợp lệ'),

            matKhau: Yup.string()
                .required('Nhập mật khẩu')
                .min(6, 'Mật khẩu tối thiểu 6 ký tự'),
            xacNhanMatKhau: Yup.string()
                .required('Xác nhận lại mật khẩu')
                .oneOf([Yup.ref('matKhau'), null], 'Mật khẩu phải trùng khớp'),



        }),
    })
    return (
        <div id='register' className='text-black signup__container lg: w-1/2 md:px-16 px-0 z-0'>
            <h3 className='signup__title'>Đăng Ký Tài Khoản</h3>
            <form onSubmit={formik.handleSubmit} style ={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gridColumnGap: '38px'}}>
                <div className='form__group'>
                    <label>Họ tên</label>
                    <input name='hoTen' onChange={formik.handleChange} type='string' className='form__control'></input>
                    <span className='text-red-500'>{formik.errors.hoTen}</span>
                </div>
                <div className='form__group'>
                    <label>Email</label>
                    <input name='email' onChange={formik.handleChange} type='string' className='form__control'></input>
                    <span className='text-red-500'>{formik.errors.email}</span>
                </div>
                <div className='form__group'>
                    <label>Số điện thoại</label>
                    <input name='soDt' onChange={formik.handleChange} type='string' className='form__control'></input>
                    <span className='text-red-500'>{formik.errors.soDt}</span>
                </div>
                <div className='form__group'>
                    <label>Tài Khoản</label>
                    <input name='taiKhoan' onChange={formik.handleChange} type='string' className='form__control'></input>
                    <span className='text-red-500'>{formik.errors.taiKhoan}</span>
                </div>
                <div className='form__group'>
                    <label>Mật khẩu</label>
                    <input name='matKhau' onChange={formik.handleChange} type='password' className='form__control'></input>
                    <span className='text-red-500'>{formik.errors.matKhau}</span>
                </div>
                <div className='form__group'>
                    <label>Xác nhận mật khẩu</label>
                    <input name='xacNhanMatKhau' onChange={formik.handleChange} type='password' className='form__control'></input>
                    <span className='text-red-500'>{formik.errors.xacNhanMatKhau}</span>
                </div>
                <div className='form__group  flex items-center justify-between col-span-2'>
                    <button type='submit' className='btn__signup'>Đăng ký tài khoản</button>
                    <div className='btn__signin' onClick={() => {
                        history.push('./login')
                    }}>
                        <span className='mr-2'>Đăng Nhập</span>
                        <i className="fa fa-arrow-right"></i>
                    </div>
                </div>
            </form>
        </div>
    )
}
