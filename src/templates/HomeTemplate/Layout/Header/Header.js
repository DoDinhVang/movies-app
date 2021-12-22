import _, { initial } from 'lodash'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App'
import { TOKEN, USER_LOGIN } from '../../../../utilities/settings/config'
import { Menu, Dropdown } from 'antd';
import { CaretDownOutlined, LogoutOutlined, UploadOutlined } from '@ant-design/icons';
import './header.css'

const styleBtn = {
    color: '#fff',
    fontSize: '0.9rem',
    padding: '7px 21px',
    backgroundColor: '#09AFE4',
    borderRadius: '5px',
    "button:hover": {
        backgroundColor: "#efefef"
    },
}

export default function Header(props) {

    return (
        <header id='header' className="p-5 text-white absolute top-0 left-0 z-50 w-full">
            <div className="container flex justify-between items-center h-16 mx-auto">

                <NavLink to="/home" aria-label="Back to homepage" className="flex items-center p-2">
                    <p className='text-4xl mb-0  font-semibold' style={{ color: '#09AFE4' }}>MOVIES</p>
                </NavLink>
                <div className='flex items-center'>
                    <ul className="items-stretch hidden space-x-3 lg:flex mb-0 mr-7">
                        <li className="flex">
                            <NavLink to='/home' activeClassName='header__active' className="flex text-lg font-bold items-center px-4 -mb-1 border-b-2 border-transparent header__redirect  border-violet-600">{props.t('Trang Chủ')}</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to='/contact' activeClassName='header__active' className="flex text-lg  font-bold items-center px-4 -mb-1 border-b-2 border-transparent header__redirect   border-violet-600">{props.t('Liên Hệ')}</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to='/news' activeClassName='' className="flex text-lg font-bold items-center px-4 -mb-1 border-b-2 border-transparent header__redirect  border-violet-600">{props.t('Tin Tức')}</NavLink>
                        </li>
                    </ul>

                    {_.isEmpty(JSON.parse(localStorage.getItem(USER_LOGIN))) ? <>
                        <div className="items-center flex-shrink-0 hidden lg:flex">
                            <button onClick={() => {
                                history.push('/login')
                            }} style={styleBtn} className='mr-3' >{props.t('Đăng Nhập')}</button>
                            <button style={styleBtn}>{props.t('Đăng Ký')}</button>
                        </div>
                        <button className="p-4 lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-coolGray-800">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>

                    </> : <div>
                        <Dropdown.Button className='h-11' icon={<CaretDownOutlined />} overlay={
                            <Menu>
                                <Menu.Item style={{ fontSize: '16px' }} onClick={() => {
                                    history.push('/profile')
                                }} key="1" icon={<UploadOutlined style={{ fontSize: '16px' }} />} >
                                    Thông Tin Cá Nhân
                                </Menu.Item>
                                <Menu.Item style={{ fontSize: '16px' }} onClick={() => {
                                    localStorage.removeItem(USER_LOGIN)
                                    localStorage.removeItem(TOKEN)
                                    history.push('/home')

                                }} key="2" icon={<LogoutOutlined style={{ fontSize: '16px' }} />}>
                                    Đăng Xuất
                                </Menu.Item>
                            </Menu>
                        }>
                            <div className='flex items-center justify-center'>
                                <img src='https://picsum.photos/30/30' className='rounded-full mr-2' alt='hinhanh'></img>
                                <div>{JSON.parse(localStorage.getItem(USER_LOGIN)).taiKhoan}</div>
                            </div>
                        </Dropdown.Button>
                    </div>
                    }


                </div>
            </div>
        </header>
    )
}
