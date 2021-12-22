import React from 'react'
import { withFormik } from 'formik';
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { getUserLogin } from '../../redux/actions/quanLyNguoiDungAction';
import { NavLink } from 'react-router-dom';


function Login(props) {
    const {
     
        errors,
        handleChange,
        handleSubmit,
    } = props;
    return (
        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
            <div className="w-full py-6 z-20">
                <h1 className="my-6 text-3xl text-gray-700">
                    Đăng Nhập
                </h1>
                <span className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
                    <div className="px-4 py-3">
                        <svg className="h-6 w-6" viewBox="0 0 40 40">
                            <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                            <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                            <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                            <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                        </svg>
                    </div>
                    <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Đăng Nhập Với FaceBook</h1>
                </span>
                <div className="mt-4 flex items-center justify-between">
                    <span className="border-b w-1/5 lg:w-1/4"></span>
                    <span className="text-xs text-center text-gray-500 uppercase">Hoặc Đăng Nhập Bằng Tài Khoản</span>
                    <span className="border-b w-1/5 lg:w-1/4"></span>
                </div>
                
                <form onSubmit={handleSubmit} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                    <div className="pb-2 pt-4">
                        <input onChange={handleChange} name="taiKhoan" id="email" placeholder="tài khoản" className="bg-gray-200 text-lg text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-4 px-4 block w-full appearance-none" />
                        <span style={{ color: '#F79F1F' }} className='inline-block'>{errors.taiKhoan}</span>

                    </div>
                    <div className="pb-4 pt-4">
                        <input onChange={handleChange} className="bg-gray-200 text-gray-700 text-lg focus:outline-none focus:shadow-outline border border-gray-300 rounded py-4 px-4 block w-full appearance-none" type="password" name="matKhau" id="password" placeholder="mật khẩu" />
                        <span style={{ color: '#F79F1F' }} className='inline-block'>{errors.matKhau}</span>
                    </div>
                
                    <div className="px-4 pb-2 pt-4">
                        <button type='submit' className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">Đăng Nhập</button>
                    </div>
                    <span href="#" className="text-xs text-gray-500">Quên Mật Khẩu?</span>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 md:w-1/4"></span>
                        <NavLink to="/signup" className="text-xs text-gray-500 uppercase">Hoặc Đăng Ký Tài Khoản</NavLink>
                        <span className="border-b w-1/5 md:w-1/4"></span>
                    </div>
                </form>
            </div>
        </div>
    )
}
const LoginFormWithFormik = withFormik({
    mapPropsToValues: () => ({
        taiKhoan: '',
        matKhau: ''
    }),

    validationSchema: Yup.object().shape({ // Validate form field
        taiKhoan: Yup.string()
            .required('this field is required'),
    
        matKhau: Yup.string()
            .required('this fieldd is required')
           
    }),

    handleSubmit: (values, { props, setSubmitting }) => {

        props.dispatch(getUserLogin(values))
    },

    displayName: 'BasicForm',
})(Login);

export default connect()(LoginFormWithFormik)