import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './myProfile.css'
import { useFormik } from 'formik'
import { getUserAccountInfo, updateUserAccountInfoAction } from '../../../../redux/actions/quanLyNguoiDungAction'
import * as Yup from 'yup'
export default function MyProfile() {

  const { userAccountInfo } = useSelector(state => state.quanLyNguoiDungReducer)
  const dispatch = useDispatch()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: userAccountInfo.taiKhoan,
      email: userAccountInfo.email,
      matKhau: userAccountInfo.matKhau,
      soDT: userAccountInfo.soDT,
      hoTen: userAccountInfo.hoTen,
      maLoaiNguoiDung: userAccountInfo.loaiNguoiDung === null ? 'KhachHang' : userAccountInfo.loaiNguoiDung,
      maNhom: userAccountInfo.maNhom
    },
    onSubmit: (values) => {
      dispatch(updateUserAccountInfoAction(values))
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required('Nhập email')
        .email('Email không hợp lệ !'),
      matKhau: Yup.string()
        .required('Nhập mật khẩu')
        .min(6, 'Mật khẩu phải ít nhất 6 ký tự'),
      soDT: Yup.string()
        .required('Nhập số điện thoại')
        .matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ'),
      hoTen: Yup.string()
        .required('Nhập tên của bạn')
        .matches(/^[a-z A-Z]+$/, 'Tên không hợp lệ')
    })


  })

  useEffect(() => {
    dispatch(getUserAccountInfo())
  }, [])

  return (
    <div id='myProfile'>
      <form onSubmit={formik.handleSubmit} className='grid grid-cols-2 justify-self-centen gap-14 p-16 pt-12'>
        <div>
          <label className='primary-text'>Tài Khoản</label>
          <input disabled name='taiKhoan' className="primary-text cursor-not-allowed w-full" value={formik.values.taiKhoan} />
        </div>
        <div className='relative'>
          <label className='primary-text'>Email</label>
          <input onChange={formik.handleChange} name='email' className="primary-text w-full" value={formik.values.email} />
          <span className='text-red-200 absolute left-0' style={{ bottom: '-20px' }}>{formik.errors.email}</span>
        </div>

        <div className='relative'>
          <label className='primary-text'>Mật Khẩu</label>
          <input onChange={formik.handleChange} name='matKhau' className="primary-text w-full" value={formik.values.matKhau} placeholder='matKhau' />
          <span className='text-red-200 absolute left-0' style={{ bottom: '-20px' }}>{formik.errors.matKhau}</span>
        </div>
        <div className='relative'>
          <label className='primary-text'>Số Điện Thoại</label>
          <input onChange={formik.handleChange} name='soDT' className="primary-text w-full" value={formik.values.soDT} placeholder='Số Điện Thoại' />
          <span className='text-red-200 absolute left-0' style={{ bottom: '-20px' }}>{formik.errors.soDT}</span>
        </div>

        <div className='relative'>
          <label className='primary-text'>Họ Tên</label>
          <input onChange={formik.handleChange} name='hoTen' className="primary-text w-full" value={formik.values.hoTen} placeholder='Họ Tên' />
          <span className='text-red-200 absolute left-0' style={{ bottom: '-20px' }}>{formik.errors.hoTen}</span>
        </div>
        <div>
          <label className='primary-text'>Nhóm Người Dùng</label>
          <input disabled onChange={formik.handleChange} name='maLoaiNguoiDung' className="primary-text cursor-not-allowed w-full" value={formik.values.maLoaiNguoiDung} />
        </div>
        <div className='col-span-2 text-right'>
          <button type='submit' className=' px-6 font-bold text-md py-3 bg-gray-100'>Cập Nhật</button>
        </div>
      </form>
    </div>
  )
}
