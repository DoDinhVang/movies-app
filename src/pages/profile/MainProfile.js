import React, { useState } from 'react'
import './mainProfile.css'
import MyProfile from './component/myProfile/MyProfile'
import MyActivity from './component/myActivity/MyActivity'
import { NavLink } from 'react-router-dom'


export default function MainProfile() {


    const [content, setContent] = useState({
        Component: <MyProfile />,
        infoActive: 'active',
        activityActive: ''
    })

    return (
        <div id='mainProfile'>
            <div className='flex card_btn'>
                <button className= {`mr-3 info ${content.infoActive}`} onClick={() => {
                    setContent({
                        ...content,
                        Component: <MyProfile/>,
                        infoActive: 'active',
                        activityActive: ''
                    })
                }}>Thông Tin Cá Nhân</button>
                <button className= {`activity ${content.activityActive}`} onClick={() => {
                    setContent({
                        ...content,
                        Component:<MyActivity/>,
                        infoActive: '',
                        activityActive: 'active'
                    })
                }}>Lịch Sử Đặt Vé</button>
            </div>
            <div className='card overflow-y-auto' style={{ height: '700px' }}>
                <div className='card_body h-full flex justify-center items-center'>
                    {content.Component}
                </div>
            </div>

        </div>
    )
}
