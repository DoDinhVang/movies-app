import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { history } from '../../../App';
import { Input } from 'antd';
import { deleUserAction, getUsersPerPageAction } from '../../../redux/actions/quanLyNguoiDungAction';
import { GROUPID, USERS_PER_PAGE } from '../../../utilities/settings/config';
import { SET_TITLE_ADD_USER, SET_TITLE_EDIT_USER, SET_USER_INFO } from '../../../redux/types/quanLyNguoiDungType';
import { UserInfo } from '../../../_core/modedels.js/QuanLyNguoiDung/UserInfo';
import { Empty } from 'antd';
const { Search } = Input;

export default function DashBoard() {

    const { usersPerPage } = useSelector(state => state.quanLyNguoiDungReducer);
    const { currentPage, totalPages, totalCount, items } = usersPerPage;
    const [tuKhoa, setTuKhoa] = useState('');
    const ref = useRef(null)
    const dispatch = useDispatch();
    let prevPageCss = '';
    let nextPageCss = ''
    let leftSide = currentPage - 2;
    if (leftSide <= 0) {
        leftSide = 1
        prevPageCss = 'cursor-not-allowed'

    } else {
        prevPageCss = ''
    }
    let rightSide = currentPage + 2;
    if (rightSide > totalPages) {
        rightSide = totalPages
        nextPageCss = 'cursor-not-allowed'
    } else {
        nextPageCss = ''
    }
 
    const nextPage = () => {
        if (currentPage < totalPages) {
            dispatch(getUsersPerPageAction(GROUPID, currentPage + 1, USERS_PER_PAGE, tuKhoa));
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            dispatch(getUsersPerPageAction(GROUPID, currentPage - 1, USERS_PER_PAGE, tuKhoa));
        }
    }

    // renderPagesNumber
    const pageNumbers = [];

    for (let pageNumber = leftSide; pageNumber <= rightSide; pageNumber++) {

        let pagNumberActive = '';
        if (pageNumber === currentPage) {
            pagNumberActive = 'bg-gray-300';
        } else {
            pagNumberActive = '';
        }

        pageNumbers.push(<button key={pageNumber} type="button" title="Page 1" onClick={() => {
            dispatch(getUsersPerPageAction(GROUPID, pageNumber, USERS_PER_PAGE, tuKhoa))
        }} className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md bg-coolGray-50 ${pagNumberActive} text-violet-600 border-violet-600`}>
            {pageNumber}
        </button>)
    }


    const renderUsersPerPage = () => {
        if (items.length === 0) {
            return <tr>
                <td colSpan={6} className="px-6 py-4 whitespace-nowrap">
                    <Empty className='text-center' image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </td>
            </tr>
        }
        return items.map((item, index) => {
            return (
                <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src='https://picsum.photos/200/300' alt="hinh-anh" />
                            </div>
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{item.hoTen}</div>
                                <div className="text-sm text-gray-500">{item.email}</div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.taiKhoan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.matKhau}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.soDt}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.maLoaiNguoiDung}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <span onClick={() => {
                            history.push('/admin/dashboard/edituser')
                            dispatch({
                                type: SET_USER_INFO,
                                title: SET_TITLE_EDIT_USER,
                                userInfo: item
                            })
                        }} className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                            chỉnh sửa
                        </span>
                        <span onClick={() => {

                            dispatch(deleUserAction(item.taiKhoan, currentPage))

                        }} className="text-indigo-600 mx-3 hover:text-indigo-900 cursor-pointer">
                            xóa
                        </span>

                    </td>
                </tr>
            )
        })
    }



    useEffect(() => {
        dispatch(getUsersPerPageAction(GROUPID, 1, USERS_PER_PAGE, tuKhoa));
    }, [])
    return (
        <div className='px-6 py-3'>
            <div className='mb-5'>
                <h3 className='text-xl mb-0'>Quản Lý Người Dùng</h3>
                <button onClick={() => {
                    history.push('/admin/dashboard/adduser')
                    dispatch({
                        type: SET_USER_INFO,
                        title: SET_TITLE_ADD_USER,
                        userInfo: new UserInfo()
                    })
                }
                } className='py-2 px-3 my-3' style={{ background: '#F5F5F5' }}>Thêm NGười Dùng</button>
                <Search
                    placeholder="Tìm kiếm " enterButton={<i className="fa fa-search"></i>}
                    onChange={(e) => {
                        const userName = e.target.value;
                        setTuKhoa(userName)
                        if (ref.current !== null) {
                            clearTimeout(ref.current)
                        }
                        ref.current = setTimeout(() => {

                            dispatch(getUsersPerPageAction(GROUPID, 1, USERS_PER_PAGE, tuKhoa))
                        }, 700)
                    }}
                >

                </Search>
            </div>
            <div>

                <div className="flex flex-col mb-5">
                    <div className="-my-2  sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Họ Tên
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Tài Khoản
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Mật Khẩu
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Số Điện Thoại
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Trạng Thái
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Loại Người Dùng
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {renderUsersPerPage()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-center space-x-1 text-coolGray-800">
                        <button onClick={prevPage} title="previous" type="button" className={`${prevPageCss} inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md bg-coolGray-50 border-coolGray-100`}>
                            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        {pageNumbers}
                        <button onClick={nextPage} title="next" type="button" className={`${nextPageCss} inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md bg-coolGray-50 border-coolGray-100`}>
                            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </div>

    )
}
